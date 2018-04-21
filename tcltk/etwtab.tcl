#This widget is a table.  Puting the cell address as row, column is a little
#strange (y,x) but it is probably needed as all cells of a single row are 
#in a single frame.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval etwtab {
    namespace export create lout get margin
    variable cfig
    variable tv
    set cfig(lmargin)	0
    set cfig(rb)	4		;#where row data starts
    set cfig(cb)	1		;#where column data starts
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwtab::lout {w} {
    variable tv
    variable cfig

    lassign [$w.d get {tag ind ttp title}] tag ind ttp title
    set ret {//1v }
    set collst {}
    set cellmarg {}
    set lmargin [expr $cfig(lmargin) + $ind]
#puts "ttp:$ttp"
    if {$ttp == {Figure}} {		;#Full @Table, not @Tab
        set ind 0
        append ret "@Table "
        if {$tag != {}} {
            set tp [lindex [split $w {.}] 1]
            append ret "@Tag \{$tp.$tag\} "
        }
        if {$title != {}} {
#puts "caption:$title"
            append ret "@Caption \{[lout::quote $title]\}\n"
        }
        append ret "@Location {TryAfterLine}\n@OnePage {no}\n"
    } elseif {$ttp == {Centered}} {
        set ind 0
        append ret "@Center "
    } else {			;#Plain:
        set cellmarg {ml {0i}}
        if {$lmargin > 0} {
            set collst [list "${lmargin}i @Wide @Cell Z"]
        }
    }
    append ret "@Tbl\n"
    for {set c 0} {$c < $tv(cols$w)} {incr c} {	;#for each column
        set colname($c) [format "%c" [expr 65 + $c]]
        lappend collst "@Cell $cellmarg $colname($c)"
    }
    append ret "bformat \{[join $collst " | "]\}\n"
    append ret "aformat \{[join $collst " | "]\}\n"
    append ret "\{\n"

    append ret {@Rowb }
    for {set c 0; set collst {}} {$c < $tv(cols$w)} {incr c} {	;#for each column
        append ret "$colname($c) \{[lout::quote $tv(h,$c$w)]\} "
    }
    append ret "\n"

    for {set r 0} {$r < $tv(rows$w)} {incr r} {
        append ret {@Rowa }
        for {set c 0; set collst {}} {$c < $tv(cols$w)} {incr c} {	;#for each column
            append ret "$colname($c) \{[lout::quote $tv($r,$c$w)]\} "
        }
        append ret "\n"
    }
    append ret "\} //\n"
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwtab::splist {w} {
    variable tv
    set wlist [$w.d field title entry w]
    for {set r 0} {$r < $tv(rows$w)} {incr r} {
        for {set c 0} {$c < $tv(cols$w)} {incr c} {
            lappend wlist $w.${r}_$c
        }
    }
    return $wlist
}

# Specify a default left margin for tables
#------------------------------------------
proc etwtab::margin {margin} {
    variable cfig
    set cfig(lmargin) $margin
}

#Dump the widget contents as a list
#------------------------------------------
proc etwtab::get {w} {
    variable tv
    set coalst {}			;#list of column attributes
    for {set c 0} {$c < $tv(cols$w)} {incr c} {	;#for each column
        lappend coalst [list $tv(h,$c$w) $tv(wid.$c$w)]	;#title, width
    }
    set rowlst {}
    for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each row
        set collst {}
        for {set c 0} {$c < $tv(cols$w)} {incr c} {	;#for each column
            lappend collst $tv($r,$c$w)			;#list of cell contents
#puts "COL:$tv($r,$c$w) collst:$collst"
        }
        lappend rowlst $collst				;#list of row contents
    }
    return [list [$w.d get title] [$w.d get ttp] $tv(rows$w) $tv(cols$w) $rowlst $coalst [$w.d get ind]]
}

#Load the widget contents from a list
#------------------------------------------
proc etwtab::load {w vals} {
    variable tv

    lassign $vals title ttp tv(rows$w) tv(cols$w) rowlst coalst ind

#Legacy fixes:
    if {$ind == {}} {$w.d set ind 0}		;#Didn't used to have indent parameter
    if {$ttp == {Indented:}} {$w.d set ind 0.5 ttp {Plain}}	;#no indented type anymore
    set ttp [string trimright $ttp :]		;#lose old trailing colon at end of style
#puts "title:$title ttp:$ttp ind:$ind"
    $w.d set tag [lrange [split $w {:}] end end] title $title ttp $ttp ind $ind
    
    for {set r 0} {$r < $tv(rows$w)} {incr r} {		;#for each row
        set rowrec [lindex $rowlst $r]
        for {set c 0} {$c < $tv(cols$w)} {incr c} {	;#for each column
            set tv($r,$c$w) [lindex $rowrec $c]
#puts "SET:tv($r,$c$w) [lindex $rowrec $c]"
        }
    }
    for {set c 0} {$c < $tv(cols$w)} {incr c} {		;#for each column
        lassign [lindex $coalst $c] tv(h,$c$w) tv(wid.$c$w)	;#title, width
    }
}

#Import the widget contents from a file
#args
#	file	file we're writing to, {} means prompt for it
#------------------------------------------
proc etwtab::import {w args} {
    variable cfig
    variable tv
    variable impfile

    argproc ca(\$s) $args {{file {}} {headers yes} {auto yes} {delim $cfig(delim$w)}}
    if {$ca(file) == {}} {
        if {![info exists impfile($w)]} {set impfile($w) {}}
        if {[sfile::dia {Import From} -mask "*.csv" -dest etwtab::impfile($w) -extension .csv -wait 1] == {}} return
        set ca(file) $impfile($w)
    }
    set impfile($w) $ca(file) 
    if {[catch {set fp [open $ca(file) r]} err]} {dia::err "Opening file: $ca(file): $err"; return}
    if {$ca(headers)} {
        gets $fp iline
        set collst [csv::split $iline $ca(delim)]
        for {set c 0} {$c < [llength $collst]} {incr c} {set tv(h,$c$w) [lindex $collst $c]}
    }
    set maxc 0
    for {set r 0} {[gets $fp iline] > 0} {incr r} {	;#for file line
        set collst [csv::split $iline $ca(delim)]
        for {set c 0} {$c < [llength $collst]} {incr c} {set tv($r,$c$w) [lindex $collst $c]}
        set maxc [max $maxc $c]
    }
    close $fp
#puts "maxc:$maxc r:$r"
    if {$ca(auto)} {
        if {$maxc > $tv(cols$w)} {add_cols $w -cols [expr $maxc - $tv(cols$w)] -ask no}
        if {$r > $tv(rows$w)} {add_rows $w -rows [expr $r - $tv(rows$w)] -ask no}
    }
}

#Export the widget contents to a file
#------------------------------------------
proc etwtab::export {w args} {
    variable cfig
    variable tv
    variable expfile

    argproc ca(\$s) $args {{file {}} {headers yes} {delim $cfig(delim$w)}}
    if {$ca(file) == {}} {
        if {![info exists expfile($w)]} {set expfile($w) {}}
        if {[sfile::dia {Export To} -mask "*.csv" -dest etwtab::expfile($w) -extension .csv -wait 1] == {}} return
        set ca(file) $expfile($w)
    }
    set expfile($w) $ca(file) 
    set fp [open $ca(file) w]
    if {$ca(headers)} {
        set collst {}
        for {set c 0} {$c < $tv(cols$w)} {incr c} {lappend collst $tv(h,$c$w)}
        puts $fp [csv::join $collst $ca(delim)]
    }
    for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each row
        set collst {}
        for {set c 0} {$c < $tv(cols$w)} {incr c} {lappend collst $tv($r,$c$w)}
        puts $fp [csv::join $collst $ca(delim)]
    }
    close $fp
}

#Create an empty cell at location: row,col
#------------------------------------------
proc etwtab::new_cell {w row col} {
    variable cfig
    variable tv

    entry $w.${row}_$col -textv etwtab::tv($row,$col$w) -width $tv(wid.$col$w)
    bind $w.${row}_$col <Button-3> "edwin::edwin .edcell_\[$w.d get tag\]_${row}_$col -dest $w.${row}_$col"
    grid $w.${row}_$col -row [expr $row + $cfig(rb)] -column [expr $col + $cfig(cb)]
}

#Add new rows to the end of an existing table
#------------------------------------------
proc etwtab::add_rows {w args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{rows 1} {ask no} {init no}}
    if {$ca(ask)} {if {[dia::query "How many new rows:" ca(rows) 0 OK Cancel] < 0} return}
    if {$ca(init)} {set tv(rows$w) 0}
    set ridx $tv(rows$w)	;#start inserting after last row
    incr tv(rows$w) $ca(rows)
#puts "adding $ca(rows) rows at index $ridx"
    for {set r 0} {$r < $ca(rows)} {incr r} {	;#for each new row
        set nrow [expr $ridx + $r]
        row_menu $w $nrow
        for {set c 0} {$c < $tv(cols$w)} {incr c} {	;#for each existing column
            new_cell $w $nrow $c
        }
    }
}

#Add new columns to the end of an existing table
#------------------------------------------
proc etwtab::add_cols {w args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{cols 1} {ask no} {init no}}
    if {$ca(ask)} {if {[dia::query "How many new columns:" ca(cols) 0 OK Cancel] < 0} return}
    set cidx $tv(cols$w)	;#start inserting after last column
    incr tv(cols$w) $ca(cols)
#puts "adding $ca(cols) cols at index $cidx"
    for {set c 0} {$c < $ca(cols)} {incr c} {	;#for each new column
        set ncol [expr $cidx + $c]
        col_menu $w $ncol
        for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each existing row
            new_cell $w $r $ncol
        }
    }
}

#Remove rows from the end of an existing table
#------------------------------------------
proc etwtab::rem_rows {w args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{rows 1} {ask no}}
    if {$ca(ask)} {if {[dia::query "Remove how many rows:" ca(rows) 0 OK Cancel] < 0} return}
    incr tv(rows$w) -$ca(rows)		;#how many we'll have now
    for {set r 0} {$r < $ca(rows)} {incr r} {	;#for each row
        set rrow [expr $tv(rows$w) + $r]
        destroy $w.${rrow}_b
        for {set c 0} {$c < $tv(cols$w)} {incr c} {
            destroy $w.${rrow}_$c
        }
    }
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Remove columns from the end of an existing table
#------------------------------------------
proc etwtab::rem_cols {w args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{cols 1} {ask no}}
    if {$ca(ask)} {if {[dia::query "Remove how many columns:" ca(cols) 0 OK Cancel] < 0} return}
    incr tv(cols$w) -$ca(cols)		;#how many we'll have now
    for {set c 0} {$c < $ca(cols)} {incr c} {	;#for each column we're killing
        set rcol [expr $tv(cols$w) + $c]
        destroy $w.e_$rcol				;#kill header
        destroy $w.b_$rcol				;#kill menu
        for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each row
            destroy $w.${r}_$rcol
        }
    }
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Create a blank row at the specified index, move data down to make space
#trow:	first row to bump
#------------------------------------------
proc etwtab::bump_rows {w trow args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{rows 1} {ask no} {auto yes}}
    if {$ca(ask)} {if {[dia::query "How many new empty rows:" ca(rows) 0 OK Cancel] < 0} return}
    for {set c 0} {$c < $tv(cols$w)} {incr c} {		;#for each existing column
        for {set r [expr $tv(rows$w) - 1]} {$r >= $trow} {incr r -1} {	;#for each higher row
            set nrow [expr $r + $ca(rows)]
            set tv($nrow,$c$w) $tv($r,$c$w)
        }
        for {set r 0} {$r < $ca(rows)} {incr r} {	;#clear old rows
            set nrow [expr $trow + $r]
            set tv($nrow,$c$w) {}
        }
    }
    if {$ca(auto)} {add_rows $w -rows $ca(rows) -ask no}
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Create a blank column at the specified index, move data right to make space
#tcol:	first column to bump
#------------------------------------------
proc etwtab::bump_cols {w tcol args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{cols 1} {ask no} {auto yes}}
    if {$ca(ask)} {if {[dia::query "How many new empty columns:" ca(cols) 0 OK Cancel] < 0} return}
    for {set r 0} {$r < $tv(rows$w)} {incr r} {		;#for each existing row
        for {set c [expr $tv(cols$w) - 1]} {$c >= $tcol} {incr c -1} {	;#for each higher column
            set tv($r,[expr $c + $ca(cols)]$w) $tv($r,$c$w)
        }
        for {set c 0} {$c < $ca(cols)} {incr c} {	;#clear old columns
            set tv($r,[expr $tcol + $c]$w) {}
        }
    }
    #now move headers
    for {set c [expr $tv(cols$w) - 1]} {$c >= $tcol} {incr c -1} {	;#for each higher column
        set tv(h,[expr $c + $ca(cols)]$w) $tv(h,$c$w)
    }
    for {set c 0} {$c < $ca(cols)} {incr c} {
        set tv(h,[expr $tcol + $c]$w) {}
    }
    if {$ca(auto)} {add_cols $w -cols $ca(cols) -ask no}
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Delete the row at the specified index, move data up to fill it
#trow:	first row to delete
#------------------------------------------
proc etwtab::suck_rows {w trow args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{rows 1} {ask no} {auto yes}}
    if {$ca(ask)} {if {[dia::query "Delete how many rows:" ca(rows) 0 OK Cancel] < 0} return}
    for {set c 0} {$c < $tv(cols$w)} {incr c} {		;#for each existing column
        for {set r [expr $trow + $ca(rows)]} {$r < $tv(rows$w)} {incr r} {	;#for each remaining row
            set prow [expr $r - $ca(rows)]
            set tv($prow,$c$w) $tv($r,$c$w)
#puts "set tv($prow,$c$w) tv($r,$c$w)"
        }
        for {set r 0} {$r < $ca(rows)} {incr r} {	;#clear old rows
            set nrow [expr $tv(rows$w) - 1 - $r]
            set tv($nrow,$c$w) {}
        }
    }
    if {$ca(auto)} {rem_rows $w -rows $ca(rows) -ask no}
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Delete the column at the specified index, move data left to fill it
#tcol:	first column to delete
#------------------------------------------
proc etwtab::suck_cols {w tcol args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{cols 1} {ask no} {auto yes}}
    if {$ca(ask)} {if {[dia::query "Delete how many columns:" ca(cols) 0 OK Cancel] < 0} return}
    for {set r 0} {$r < $tv(rows$w)} {incr r} {		;#for each existing row
        for {set c [expr $tcol + $ca(cols)]} {$c < $tv(cols$w)} {incr c} {	;#for each remaining row
            set tv($r,[expr $c - $ca(cols)]$w) $tv($r,$c$w)
        }
        for {set c 0} {$c < $ca(cols)} {incr c} {	;#clear old rows
            set tv($r,[expr $tv(cols$w) - 1 - $c]$w) {}
        }
    }
    #now move headers
    for {set c [expr $tcol + $ca(cols)]} {$c < $tv(cols$w)} {incr c} {	;#for each remaining row
        set tv(h,[expr $c - $ca(cols)]$w) $tv(h,$c$w)
    }
    for {set c 0} {$c < $ca(cols)} {incr c} {	;#clear old rows
        set tv(h,[expr $tv(cols$w) - 1 - $c]$w) {}
    }
    if {$ca(auto)} {rem_cols $w -cols $ca(cols) -ask no}
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Make a row menu button
#r:	row number
#------------------------------------------
proc etwtab::row_menu {w r} {
    variable cfig
    variable tv

    menubutton $w.${r}_b -menu $w.${r}_b.m -width 3 -bd 1 -relief raised -text "[expr $r + 1]:" -indic yes -help {Menu options affecting this row}
    grid $w.${r}_b -row [expr $r + $cfig(rb)] -column 0 -sticky ew
    menu $w.${r}_b.m
    $w.${r}_b.m add command -label "Bump 1"   -command "etwtab::bump_rows $w $r" -help {Insert a blank row just before this one}
    $w.${r}_b.m add command -label "Bump n"   -command "etwtab::bump_rows $w $r -rows 2 -ask yes" -help {Insert a specified number of blank rows just before this one}
    $w.${r}_b.m add command -label "Delete 1" -command "etwtab::suck_rows $w $r" -help {Remove this column}
    $w.${r}_b.m add command -label "Delete n" -command "etwtab::suck_rows $w $r -rows 2 -ask yes" -help {Remove a specified number of rows starting with this one and toward the right}
}

#Make a column menu button and title field
#c:	column number
#------------------------------------------
proc etwtab::col_menu {w c} {
    variable cfig
    variable tv

    if {![info exists tv(wid.$c$w)]} {set tv(wid.$c$w) $cfig(colwidth$w)}

    entry $w.e_$c -textv etwtab::tv(h,$c$w) -width $tv(wid.$c$w) -help {A title for this column}
    grid $w.e_$c -row 3 -column [expr $c + $cfig(cb)] -sticky ew
    bind $w.e_$c <Button-3> "edwin::edwin .edtitle_\[$w.d get tag\]_e_$c -dest $w.e_$c"

    menubutton $w.b_$c -menu $w.b_$c.m -bd 1 -relief raised -text "[format "%c" [expr 65 + $c]]:" -indic yes -help {Menu options affecting this column}
    grid $w.b_$c -row 2 -column [expr $c + $cfig(cb)] -sticky ew
    
    menu $w.b_$c.m
    $w.b_$c.m add command -label "Bump 1"   -command "etwtab::bump_cols $w $c" -help {Insert a blank column just before this one}
    $w.b_$c.m add command -label "Bump n"   -command "etwtab::bump_cols $w $c -cols 2 -ask yes" -help {Insert a specified number of blank columns just before this one}
    $w.b_$c.m add command -label "Delete 1" -command "etwtab::suck_cols $w $c" -help {Remove this column}
    $w.b_$c.m add command -label "Delete n" -command "etwtab::suck_cols $w $c -cols 2 -ask yes" -help {Remove a specified number of columns starting with this one and toward the right}
    $w.b_$c.m add separator
    $w.b_$c.m add command -label "Display Width" -command "etwtab::col_width $w $c" -help {Modify the width of the entries for this column on the screen (does not affect the final printout)}
}

#Set a column width
#c:	column number
#------------------------------------------
proc etwtab::col_width {w c args} {
    variable tv

    argproc ca(\$s) $args {{width {}}}
    if {$ca(width) == {}} {
        set ca(width) $tv(wid.$c$w)
        if {[dia::query "New column width:" ca(width) 0 OK Cancel] < 0} return
    }
    $w.e_$c configure -width $ca(width)
    for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each row
        $w.${r}_$c configure -width $ca(width)
        set tv(wid.$c$w) $ca(width)
    }
}

#Clear to a blank, empty table
#------------------------------------------
proc etwtab::clear {w args} {
    variable tv
    set tv(cols$w) 1
    set tv(rows$w) 1
    $w.d set ind 0
    cleardat $w -full 1 -ask 0
}

#Clear the cells in the table
#------------------------------------------
proc etwtab::cleardat {w args} {
    variable cfig
    variable tv

    argproc ca(\$s) $args {{ask no} {full yes}}
    if {$ca(ask)} {
        if {[dia::ask "Confirm:\nDelete contents of this table" 1 {Delete} Cancel] < 0} return
    }
    if {$ca(full)} {
        $w.d set ttp {Plain} title {}
    }
    for {set c 0} {$c < $tv(cols$w)} {incr c} {		;#for each column
        set tv(h,$c$w) {}				;#clear header
        for {set r 0} {$r < $tv(rows$w)} {incr r} {	;#for each row
            set tv($r,$c$w) {}				;#clear cell
        }
    }
#    if {$cfig(mod$w) != {}} {eval $cfig(mod$w)}
}

#Insert a table
#------------------------------------------
proc etwtab::create {t {tag {}} args} {
    variable cfig
    variable tv

    etw::create_atag
    etw::create_begin

    foreach {n v} {width 42 colwidth 16 delim ,} {set ca($n) $v}
    foreach a {delim colwidth} {set cfig($a$w) $ca($a)}

    $w configure -bg tan
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg tan \
        -mb {menu Table {Common functions operating on this table container}}

    $w.m menu mi addc {Add Columns}	-command "etwtab::add_cols $w -cols 1 -ask yes" -help {Add more columns at the right end of the table} -s Column
    $w.m menu mi addr {Add Rows}	-command "etwtab::add_rows $w -rows 1 -ask yes" -help {Add more rows at the bottom of the table} -s Row
    $w.m menu mi delc {Remove Columns} -command "etwtab::rem_cols $w -cols 1 -ask yes" -help {Remove the column at the right end of the table}
    $w.m menu mi delr {Remove Rows}	-command "etwtab::rem_rows $w -rows 1 -ask yes" -help {Remove the row at the bottom of the table}
    $w.m menu mi sep
    $w.m menu mi clr  {Clear Table}	-command "etwtab::cleardat $w -ask yes -full no" -help {Erase all the cells in the table}
    $w.m menu mi sep
    $w.m menu mi imp  {Import Table}	-command "etwtab::import $w" -help {Load the table cells from data contained in a CSV file you specify}
    $w.m menu mi exp  {Export Table}	-command "etwtab::export $w" -help {Create a CSV file on the disk from the data in the table cells}
    $w.m menu mi sdel {Set Delimiter} -command "dia::query {Import/Export delimiter:} etwtab::cfig(delim$w) 0 OK Cancel" -help {Specify a field separator to use when importing/exporting data from a file (normally a comma)}
    $w.m menu mi sep
    $w.m menu mi help {Widget Help} -command {help::locate etwtab} -help {Instructions on using the table widget}

    mdew::mdew $w.d \
        -f {tag		ent	10	{0 0}		{Tag:}		-state disabled -help {A unique name by which this table will be referred to in any references}}\
        -f {ind		ent	5	{1 0}		{Indent:}	-just r -init 0.50 -spin {float {0.00 7.90} -inc 0.10} -help {How far to indent the table (in inches)}}\
        -f {ttp		pdm	8	{2 0}		{Style:}	-init Plain -data {{Plain {No caption is printed, table is indented according to indent parameter}} {Figure {Table is centered and includes a caption, allows use of a cross-reference to the table tag}} {Centered {Table is centered on the page, but with no caption}}} -help {Specify how the table will be displayed}}\
        -f {title	ent	50	{0 1 3}		{Title:}	-spf edw -help {A descriptive title for the table}}
   
   $w.d set tag $tag
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }

    grid $w.m -row 0 -column 0 -rowspan 3 -sticky ns
    grid $w.d -row 0 -column 1 -rowspan 2 -columnspan 100 -sticky wn

    label $w.ct -text Titles:
    grid $w.ct -row 3 -column 0 -sticky ew

    etw::create_end
    if {![info exists tv(rows$w)]} {set tv(rows$w) 4}	;#reasonable defaults
    if {![info exists tv(cols$w)]} {set tv(cols$w) 3}

    for {set c 0} {$c < $tv(cols$w)} {incr c} {col_menu $w $c}	;#column menus
    add_rows $w -rows $tv(rows$w) -ask no -init yes

    if {$ca(focus)} {after idle "focus $w.0_0"}
}
