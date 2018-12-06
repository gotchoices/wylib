#Database searching widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- redo query logic:
#X-   saved queries not kept in prefs file
#X-   save current query (each saves to its own file in prefs dir)
#X-   load query -> current (loads from its own file)
#X-   import query from file -> current
#X-   export current query -> file
#X-   delete query (deletes the file)
#X- dbs window should close if parent toplevel (containing dbp) closed
#X- Close button doesn't seem to save prefs
#X- how to use this for the default dbp load
#X- include a help menu with help on dbs
#- how to check if a value is in an array (= any (array))
#- 
#- get aliases working right from dbs query
#- allow to add join tables into mlb fields?
#- 
#- LATER:
#- store cfig history in a list, have back/fwd buttons
#- allow to delete any clause (from the middle, not just the end)
#-   or allow to move clauses up or down in the list
#- 

option add *Dbs.wh.height 150 widgetDefault
option add *Dbs.wh.width 500 widgetDefault
option add *Dbs.j.height 100 widgetDefault
#option add *Dbs.j.width 150 widgetDefault
option add *Dbs.j.t.borderWidth 1 widgetDefault
option add *Dbs.j.t.relief raised widgetDefault
option add *Dbs*Scrollbar.width 10 widgetDefault
#option add *Dbs*Listbox.font fixed widgetDefault

package require wyseman
namespace eval dbs {
    namespace export dbs saved_queries
    variable cfig
    variable v				;#holds dynamic values
    variable q				;#holds saved queries

    image create bitmap b-lf -data "#define lfs_width 8\n#define lfs_height 9\nstatic unsigned char lfs_bits[] = {\n0xc0, 0xf0, 0xfc, 0xfe, 0xff, 0xfe, 0xfc, 0xf0, 0xc0};"
    image create bitmap b-rt -data "#define rts_width 8\n#define rts_height 9\nstatic unsigned char rts_bits[] = {\n0x03, 0x0f, 0x3f, 0x7f, 0xff, 0x7f, 0x3f, 0x0f, 0x03};"
    image create photo .img-clr -file $lib::cfig(imgdir)/clear.png
    image create photo .img-qry -file $lib::cfig(imgdir)/list_bullets.png
#    image create bitmap b-cl -data "#define close_width 14\n#define close_height 14\nstatic unsigned char close_bits[] = {\n0xff, 0x3f, 0x01, 0x20, 0x05, 0x28, 0x09, 0x24, 0x11, 0x22, 0x21, 0x21,0xc1, 0x20, 0xc1, 0x20, 0x21, 0x21, 0x11, 0x22, 0x09, 0x24, 0x05, 0x28,0x01, 0x20, 0xff, 0x3f};"

    set cfig(swar) {{table 2} {value 2 val} {function 2 func} {default 3 def} {maxmenu 2} {preclear 4} {auto 2}}
    set cfig(sdef) {func {~} maxmenu 24 preclear 1 dbp nop}
    set cfig(sblk) {table val def auto}

    set cfig(opn)   {{eq = !=} {re ~ !~} {wm ~~ !~~} {lt < >=} {le <= >} {gt > <=} {ge >= <} {co = !=} {in in {not in}} {nu isnull {is not null}} {tr {is true} {is not true}} {dg > <=} {dl < >=}}
    set cfig(opa) {\
     -o {eq  {Equal =}		-h {The left and right values are exactly the same}}\
     -o {re  {Regex Match}	-h {The left value Matches a Regular Expression (.*+[]) given on the right}}\
     -o {wm  {Wildcard Match}	-h {The left value Matches a Wildcard expression (*) given on the right}}\
     -o {lt  {Less Than <}	-h {The left value is Less Than the value on the right}}\
     -o {le  {Less or Equal <=}	-h {The left value is Less Than or Equal to the value on the right}}\
     -o {gt  {Greater Than >}	-h {The left value is Greater Than the value on the right}}\
     -o {ge  {Greater or Equal >=} -h {The left value is Greater Than or Equal to the value on the right}}\
     -o {co  {Contains}		-case 0 -h {The left value is an array of values {a,b,c...} which contains an element equal to the value given on the right}}\
     -o {in  {In The List}	-val 1 -rhs 0 -case 0 -h {The left value is Equals Any value in a comma separated list (a,b,c...) given on the right}}\
     -o {nu  {Is Null}		-rhs 0 -val 0 -case 0 -h {The field has no valid value assigned to it (Null)}}\
     -o {tr  {Is True}		-rhs 0 -val 0 -case 0 -h {The boolean (true or false) field has the value true (t, yes, 1, etc.)}}\
     -o {dg  {After Date Offset >}	-h {The date offset from today is Greater Than to date value on the right (usage: keyword sign number interval ex. today - 2 weeks )}}\
     -o {dl  {Before Date Offset <}	-h {The date offset from today is Less Than to date value on the right (usage: keyword sign number interval ex. today + 3 days )}}\
    }
}

# Do a search based on the criteria in the search box
#------------------------------------------
proc dbs::search {w} {
    variable cfig
    variable v

    lassign 0 level where lastcnd
    foreach rec [$w.wh get] {				;#for each clause
        array set ca $rec				;#get clause settings
#puts "rec:$rec left:$ca(left)"

        if {$ca(function) == {}} continue		;#skip if disabled
        foreach frec $cfig(opn) {			;#find correct operator
            lassign $frec ftag func fneg
            if {$ftag == $ca(function)} break
        }
        lassign [split $ca(left) .] lali ltag		;#extract alias, field name
        set ltab [tab_name $w $lali]
        set lft [wmdd::type $ltab $ltag]		;#remember field type
#puts "ltab:$ltab lali:$lali ltag:$ltag lft:$lft"

        if {$ca(right) != {}} {				;#if value is a db field
            lassign [split $ca(right) .] rali rtag	;#extract alias, field
            set val "t$rali.$rtag"
            set rtab [tab_name $w $rali]
            set rft [wmdd::type $rtab $rtag]
            if {$lft != $rft} {dia::err "The type on the left: ${ltag}($lft) is different than the type on the right: ${rtag}($rft)"; return}
        } elseif {$ftag == {in}} {
            set val "([sql::quote_list $ltab $ltag $ca(value) ,])"	;#don't use quoted val or commas will be gone
#puts "list val:$val"
        } elseif {[lcontain {nu tr} $ftag]} {		;#null check or boolean
            set val {}
        } elseif {$ftag == {co} && [string range $lft 0 0] == {_}} {		;#special handling for 'array contains scaler'
            set val "'$ca(value)'"
#puts "value:$ca(value) lft:$lft val:$val"
        } elseif {[lcontain {dg dl} $ftag]} {			;#date offset greater than
            lassign [regexp -all -inline {\S+} $ca(value)] keywrd sign value interv
            if {![lcontain {today tomorrow yesterday} $keywrd]} {dia::err "Invalid date keyword; $keywrd"; return}				;# Error if date keyword is not today, yesterday or tomorrow
            if {![lcontain {- +} $sign]} {dia::err "Date offset values must in the format; sign number interval (ex. + 14 days)"; return}	;# Error if sign is not - or +
            set val "('$keywrd'::date $sign '$value $interv'::interval)" 
        } else {
            if {[set val [sql::quote $ltab $ltag $ca(value)]] == {}} return
            if {($ftag == {re} && $val == {''})} {dia::err "Value required for comparison: ${ltag}($lft) $func <blank>"; return}
        }
        if {$ftag == {wm}} {		;#use 'like' operator for wildcarding
            set val [translit * % $val]
            regsub -all {_} $val {\_} val
        }
        if {$ca(not) != {}} {set func $fneg}	;#negate operator if needed
#puts "lft:$lft ftag:$ftag"

        if {[lcontain {int float date timestamp numeric} $lft]} {		;#if non-quoted type
            if {$ca(case) == {ca}} {dia::err "You should not specify the distinct upper/lower case operator for values of type: $lft"; return}
            if {[lcontain {re wm} $ftag]} {dia::err "You should only use regular expression or wildcard matches on fields of a character type (not $lft).  Try one of =, <, >, etc."; return}
        } else {
            if {$ca(case) != {ca} && [lcontain {eq re wm lt le gt ge} $ftag]} {append func {*}}
        }

        if {$ftag == {co}} {
            set func {=}
            if {[string range $lft 0 0] != {_}} {dia::err "The field on the left side of the comparison must be an array type to use the Contains operator"; return}
            set clause "$val $func any (t$lali.$ltag)"
            if {$ca(not) != {}} {set clause "not ($clause)"}
        } else {
            set clause "t$lali.$ltag $func $val"
        }
        append where $lastcnd
        for {} {$level < $ca(indent)} {incr level} {append where {(}}
        append where $clause
        for {} {$level > $ca(indent)} {incr level -1} {append where {)}}
#puts "clause:$clause:"
        set lastcnd " $ca(condition) "
#        set used($ltab) 1
    }
    for {} {$level > 0} {incr level -1} {append where {)}}
#puts "where:$where"

    lassign {} tabs lnks
    foreach rec [$w.j.b get 0 end] {		;#for each table in join
        lassign $rec ndx jdx table title help col ftab fcol
        lappend tabs "$table t$ndx"		;#list of tables
#puts "ndx:$ndx jdx:$jdx table:$table col:$col ftab:$ftab fcol:$fcol"
        if {$ndx <= 0} continue			;#skip first table
        set i 0; foreach kf $col {		;#for each keyfield
            set ff [lindex $fcol $i]		;#find field in foreign table
            lappend lnks "t$ndx.$kf = t$jdx.$ff"	;#form link clause
            incr i
        }
    }
    set unique 0
    if {$lnks != {}} {
        set where "([join $lnks { and }]) and ($where)"
#        set unique 1		;#this causes problem if a formatting wrapper is on one of the fields we are ordering by.  Do we need it?
    }
#puts "Tabs:$tabs: lnks:$lnks:"
#puts "Where:$where"

#    display $w [$cfig(dbp$w) display]
#    order $w [$cfig(dbp$w) order]
#puts "Order:[$cfig(dbp$w) display]"
#puts "Display:[$cfig(dbp$w) order]"

    $cfig(dbp$w) reload -unique $unique -where $where -table $tabs
}

# Create an editing widget specific to the data type
#------------------------------------------
proc dbs::dew {w x} {
    variable cfig
    variable v
    
    array set ca [$w.wh get $x]
#puts "dbs::dew w:$w x:$x left:$ca(left)"
    lassign [split $ca(left) .] alias tag
    set table [tab_name $w $alias]

    lassign [wmdd::column $table $tag] title help
    if {[set data [wmdd::value $table $tag]] != {}} {set data [list -data $data]}
    set fargs [list -f [concat $tag [wmdd::style $table $tag] [list -title $title: -help $help -sub {0 0}] $data]]
    if {[eval dia::dia .dbs_datsel -but \{OK Cancel\} -message \{Field-specific data selector:\} -def 0 -entry mdew::mdew -dest nvpair -pre 1 $fargs] < 0} return

    $w.wh clause $x value set [lindex $nvpair 1]		;#write value
}

# Create a menu of choices of all available values in the database
#------------------------------------------
proc dbs::existing {w x} {
    variable cfig
    variable v

    array set ca [$w.wh get $x]
#puts "existing w:$w x:$x left:$ca(left)"
    lassign [split $ca(left) .] alias field
    set table [tab_name $w $alias]
    lib::cwatch $w

    set data [sql::qlist "select distinct $field from $table order by $field"]
    set value [$w.wh clause $x value get]
    scm::dia {Select from existing values:} -tag dbsx_${table}_$field -dest value -f $field -token $field -data $data

    $w.wh clause $x value set $value		;#write value
    lib::cnorm $w
}

# Return a table name from its index in the joins area
#------------------------------------------
proc dbs::tab_name {w idx} {
    return [$w.j.b column tab get $idx]
}

# Clear the whole dbs widget
#------------------------------------------
proc dbs::clear {w {add 1}} {
    variable v
    joins_clear $w

    $w where clear $add
    set v(qtag$w) {}
    set v(qdes$w) {}
}

# Delete only the join area
#------------------------------------------
proc dbs::joins_clear {w} {
    variable cfig
    variable v

#set start [clock clicks -mil]
    lassign [wmdd::table $cfig(table$w)] title help
    [set b $w.j.b] delete 0 end
#puts "Clearing b:$b table:$cfig(table$w) $title $help"
    $b insert end [list 0 {} $cfig(table$w) $title $help]
    set ptag 0
    set flds [list -f [list $ptag $ptag.$title -h $help]]
    foreach frec [wmdd::columns $cfig(table$w)] {
        lassign $frec ftag ftitle fhelp
        if {![info exists f1]} {set f1 $ftag}
        lappend flds -f [list $ptag.$ftag "$ftitle ($ftag)" -p $ptag -h $fhelp]
    }
#puts "flds:$flds"
    eval $w.wh configure -left 0.$f1 $flds
#puts "dbs::joins_clear [expr [clock clicks -mil] - $start]"
}

# Ask the user for a new table to join in
#------------------------------------------
proc dbs::joins_ref {w {refme {}}} {
    variable cfig
    variable v

    if {[set line [[set lb $w.j.b] mark ?]] == {}} return
    lassign [$lb get $line] idx jidx table
    
    if {$refme == {}} {set refme [dia::ask {Select from tables:} 0 "Which are referenced by: ($table.FK --> PK in:)" "Which reference: ($table.PK <-- FK in:)" Cancel]}
    if {$refme < 0} return
    if {[set data [wmdd::tables_ref $table $refme]] == {}} {dia::brief "No tables found"; return}
#puts "data:$data"
    if {$refme} {
        set title	"Join table which references: $table"
        set tth		"Title of the table which references $table"
        set thh		"Description of the table which references $table"
        set disp	{tablename tt th columns ct ch}
    } else {
        set title	"Join table referenced by: $table"
        set tth		"Title of the table which is referenced by $table"
        set thh		"Description of the table referenced by $table"
        set disp	{columns ct ch ftablename tt th}
    }
    if {[scm::dia $title -dest jtab -data $data -tag dbs_scm_join_$refme \
      -f {tablename	{Table}			60	-help {The referencing table (the one with a foriegn key pointing to another table)}} \
      -f {columns	{Column}		60	-help {The column(s) that point to the referenced table's primary key}} \
      -f {ftablename	{Ref Table}			-help {The table which is referenced (pointed to)}} \
      -f {fcolumns	{Ref Column PK}			-help {The primary key column(s) in the referenced table}} \
      -f "tt		{Ref Title}		80	-help {$tth}" \
      -f "th		{Ref Table Description} 150	-help {$thh}" \
      -f {ct		{Column Title}		80	-help {Title of the (first) foreign key column}} \
      -f {ch		{Column Description}	150	-help {Description of the (first) foreign key column}} \
      -disp $disp ] < 0} return
    lassign $jtab tablename columns ftablename fcolumns tt th ct ch
    if {$refme} {
        joins_add $w $tablename $line $columns $ftablename $fcolumns $tt $th
    } else {
        joins_add $w $ftablename $line $fcolumns $tablename $columns $tt $th
    }
}

# Add a new Join table for future queries
#------------------------------------------
proc dbs::joins_add {w args} {
    variable cfig
    variable v
    argform {table with col ftab fcol title help} args
#puts "join:$args"
    argnorm {{table 2} {with 2} {column 3 col} {foreigntable 8 ftab} {foreigncolumn 8 fcol} {title 2} {help 2}} args
    foreach tag {table with col ftab fcol title help} {set ca($tag) [xswitchs $tag args]}
    if {$ca(table) == {} || $ca(with) == {}} {error "Must specify the tables to join"}
    set size [[set b $w.j.b] size]	;#index of next entry
#puts " size:$size"
    if {$ca(title) == {} || $ca(help) == {}} {lassign [wmdd::table $ca(table)] ca(title) ca(help)}
    
#puts " insert:[list $size $ca(with) $ca(table) $ca(title) $ca(help) $ca(col) $ca(ftab) $ca(fcol)]"
    $b insert end [list $size $ca(with) $ca(table) $ca(title) $ca(help) $ca(col) $ca(ftab) $ca(fcol)]

    if {$ca(title) == {}} {set ca(title) $ca(table)}
    set ptag $size
    set flds [list -f [list $ptag $ptag.$ca(title) -h $ca(help)]]
    foreach frec [wmdd::columns $ca(table)] {
        lassign $frec ftag ftitle fhelp
        lappend flds -f [list $ptag.$ftag "$ftitle ($ftag)" -p $ptag -h $fhelp]
    }
#puts " flds:$flds"
    if {[llength $flds] > 2} {eval $w.wh configure $flds}

}

# Delete the last table in the join list
#------------------------------------------
proc dbs::joins_delete {w args} {
    set size [[set b $w.j.b] size]	;#index of next entry
    if {$size <= 0} {
        dia::err "You can't remove the primary table entry"
    } else {
        $b delete [set idx [expr $size - 1]] end
        $w.wh configure -drop $idx
    }
}

# Dump out the join table in a format that can be easily restored
#------------------------------------------
proc dbs::joins_dump {w args} {
    set size [[set b $w.j.b] size]	;#how many entries
    set rarr {}
    for {set i 1} {$i < $size} {incr i} {	;#for each joined table (don't include the base table)
        lassign [$w.j.b get $i] ndx jdx table title help col ftab fcol
        lappend rarr [list -table $table -with $jdx -ftab $ftab -col $col -fcol $fcol]
    }
    return $rarr
}

# Globally accessable method to retrieve a list of (query tag, description, file name)
# for each saved query with the given table name
#------------------------------------------
proc dbs::saved_queries {fbase} {
    set fbase "dbp_dbs_$fbase"
    set recs {}
    proc do_rec {file share} {
        upvar fbase fbase
        upvar recs recs
        set tag [lindex [split [file rootname $file] .] end]
        if {$share==1} {
            set fname [file join [lib::cfig sharedir] $fbase.$tag.dbs]
        } else {
            set fname [file join [lib::cfig appdir] $fbase.$tag.dbs]
        }
        set args [lassign [read_file $fname] fmt qtag]
#        if {$qtag != $tag} {dia::warn "The query name ($qtag) in the filename: $fname does not match the name ($tag) inside the file"; set qtag $tag}
        set desc [xswitchs desc args]

        if {$share} {set tag [list pub $tag]} else {set tag [list pri $tag]}

        lappend recs [eval list $tag $desc]
    }
    foreach file [glob -nocomplain -types f [file join [lib::cfig appdir] $fbase.*.dbs]] {do_rec $file 0}
    foreach file [glob -nocomplain -types f [file join [lib::cfig sharedir] $fbase.*.dbs]] {do_rec $file 1}
    return $recs
}

# Return a list of tags for available saved queries for this widget
# Or if tag given, return the name of the file for that tag
#------------------------------------------
proc dbs::query_file {w {tag {}}} {

    set fbase "[[winfo toplevel $w] tag]"		;#a name for this family of dbs
#debug tag fbase
    if {$tag != {}} {
        lassign $tag p t
        if {$p == {pub}} {
            return [file join [lib::cfig sharedir] $fbase.$t.dbs]
        } elseif {$p == {pri}} {
            return [file join [lib::cfig appdir] $fbase.$t.dbs]
        } elseif {$t == {} && [file exists [file join [lib::cfig appdir] $fbase.$p.dbs]]} {
            return [file join [lib::cfig appdir] $fbase.$p.dbs]
        } elseif {$t == {} && [file exists [file join [lib::cfig sharedir] $fbase.$p.dbs]]} {
            return [file join [lib::cfig sharedir] $fbase.$p.dbs]
        } else {
            return {}
        }
    }
    
    set tags {}
    foreach file [glob -nocomplain -types f [file join [lib::cfig appdir] $fbase.*.dbs]] {
        lappend tags [list pri [lindex [split [file rootname $file] .] end]]
    }
    foreach file [glob -nocomplain -types f [file join [lib::cfig sharedir] $fbase.*.dbs]] {
        lappend tags [list pub [lindex [split [file rootname $file] .] end]]
    }
    return $tags
}

# Write the current query out to a file
#------------------------------------------
proc dbs::query_save {w {export 0}} {
    variable cfig
    variable v

    if {[set ctag [query_select $w {Save query:} 0 $export]] == {}} return
    if {[llength $ctag] == 2 && ([lindex $ctag 0] == {pri} || [lindex $ctag 0] == {pub})} {set ctag [lindex $ctag 1]} ;# if starts in pub or pri, clean it so it is just the query name
    if {![regexp {^[a-zA-Z_~0-9]+$} $ctag]} {
        dia::err {Please use only alphanumeric characters (and _ or ~) for the query name}
        return
    }
    set v(qtag$w) $ctag
    if {$export} {set v(qtag$w) [list pub $v(qtag$w)]} else {set v(qtag$w) [list pri $v(qtag$w)]}

    if {[lcontain [query_file $w] $v(qtag$w)]} {
        if {[dia::ask "A query named $v(qtag$w) already exists:" 1 "OK, overwrite it" Cancel] < 0} return
        set args [lassign [read_file [query_file $w $v(qtag$w)]] fmt qtag]
        set v(qdes$w) [xswitchs desc args]
    }
    if {[dia::query "Query Description:" v(qdes$w) 0 OK Cancel] > 0} return
    

    set where [$w.wh get -s 1]				;#get parts of current query
    set joins [joins_dump $w]
    set order [$cfig(dbp$w) order]
    set disp [$cfig(dbp$w) display]
    if {[$cfig(dbp$w) listbox cget -summary]} {		;#if summaries showing
        set sum [$cfig(dbp$w) listbox summary func]	;#get summary functions
    } else {
        set sum {}
    }
    set aggs [$cfig(dbp$w) aggregate]
    set fmts [$cfig(dbp$w) format]

#    if {$export} {
#        if {[sfile::dia "Export to what file:" -dest fname -ext .dbs -mask *.dbs] < 0} return
#    } else {
        set fname [query_file $w $v(qtag$w)]
#    }

#    write_file $fname [list [[winfo toplevel $w] tag] $v(qtag$w) -desc $v(qdes$w) -where $where -joins $joins -order $order -display $disp -summary $sum -aggregate $aggs -format $fmts]
    write_file $fname [list [[winfo toplevel $w] tag] $ctag -desc $v(qdes$w) -where $where -joins $joins -order $order -display $disp -summary $sum]
    chmod 0644 $fname
}

# Select a query from a list
#------------------------------------------
proc dbs::query_select {w prompt {warn 1} {export -1}} {
    variable cfig
    variable v

    set darr {}
    foreach tag [query_file $w] {
        if {$export == 1} {
            if {[lindex $tag 0] == {pri}} {continue} ;# when exporting, continue if the tag is not shared
        } elseif {$export == 0} {
            if {[lindex $tag 0] == {pub}} {continue} ;# when not exporting, continue if the tag is shared
        }
        set ctag [lindex $tag 1] ;# clean tag without the pub/pri
        set fname [query_file $w $tag]
        set args [lassign [read_file $fname] fmt qtag]
        if {$ctag != $qtag} {dia::warn "The query name ($ctag) in the filename: $fname does not match the name ($qtag) inside the file"; set qtag $tag}
        lappend darr [list [lindex $tag 0] [lindex $tag 1] [xswitchs desc args] $fname $tag]		;#get name and description
    }
#puts "darr:$darr:"
    if {$warn && [llength $darr] <= 0} {dia::warn {No stored queries found}; return {}}
    if {[scm::dia $prompt -dest ftag -data $darr -token ftag -tag dbs_query_select \
        -f {pupr  {Public:}		-help {Whether this query is public or private}} \
        -f {qtag {Query Name:}		-help {The short-hand name given for this query}} \
        -f {qdes {Query Description:}	-help {The description of what this query is for}} \
        -f {file {Filename:}		-hide 1 -help {The file in the filesystem where this query is saved}} \
        -f {ftag {Tag Name:}		-hide 1 -help {The full tag name of the query}} \
    ] < 0} {return {}}
    return $ftag
}    

# Load a saved query from a file
#------------------------------------------
proc dbs::query_load {w args} {
    variable cfig
    variable v

    argform {tag} args
    argnorm {{tag 1} {file 1} {run 1}} args
    set run 0
    foreach s {tag file} {set $s [xswitchs $s args]}
    foreach s {run} {xswitchs $s args $s}
#debug tag file run    
    if {$file == {?}} {
        if {[sfile::dia "Import what file:" -dest file -ext .dbs -mask {*.dbs}] < 0} return
    }
    if {$tag == {?}} {
        if {[set tag [query_select $w {Load which query:}]] == {}} return
        set file [query_file $w $tag]
    } elseif {$tag != {}} {
        set file [query_file $w $tag]
    }
#debug file
    if {[file exists $file]} {
        set qargs [lassign [read_file $file] fmt qtag]
        if {$fmt != [[winfo toplevel $w] tag]} {
            if {[dia::ask "The file $file is incompatible with this query type:" 1 "Attempt to Load Anyway" Cancel] < 0} return
        }
    } elseif {$tag == {default} && $cfig(dbp$w) != {}} {
        set qargs [$cfig(dbp$w) cget -default]
    } else {dia::err "The selected query does not exist" ; return }
    
    argform {desc where joins order display} qargs
    argnorm {{description 2 desc} {where 2} {joins 2} {order 2} {display 2 disp} {summary 2 sum}} qargs

    clear $w 0
#puts "query_load:$tag $qargs"
    foreach ln [xswitchs joins qargs] {eval joins_add $w $ln}

    if {[set wheres [xswitchs where qargs]] != {}} {
        $w.wh clear 0
        foreach cl $wheres {eval $w.wh add $cl}
    }

    if {[set order [xswitchs order qargs]] != {}} {$cfig(dbp$w) order   $order}
    if {[set disp  [xswitchs disp  qargs]] != {}} {$cfig(dbp$w) display $disp}

    if {[set summary [xswitchs sum qargs]] != {}} {	;#if summaries specified
        $cfig(dbp$w) listbox configure -summary 1
        eval $cfig(dbp$w) listbox summary $summary

#else leave them alone?
#    } else {
#        $cfig(dbp$w) listbox configure -summary 0	;#else turn them off
    }

    set v(qtag$w) $tag
    set v(qdes$w) [xswitchs desc qargs]
    if {$qargs != {}} {dia::warn "Leftover query arguments: $qargs"}

    if {$run} {search $w}		;#run the query
}

# Delete a saved query
#------------------------------------------
proc dbs::query_delete {w {tag {}}} {
    variable cfig
    variable v
    if {$tag == {}} {
        if {[set tag [query_select $w {Delete which query:}]] == {}} return
    }
    if {[set fname [query_file $w $tag]] == {}} return

    dia::brief "Deleting query: $tag" 500
    file delete -force $fname
}

# Yield/restore preferences
#------------------------------------------
proc dbs::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
#    lappend parr [list where configure -width [winfo width $w.wh] -height [winfo height $w.wh]]
    lappend parr [eval list join pref [$w.j.b pref]]
    foreach ln [joins_dump $w] {lappend parr [eval list joins add $ln]}
    lappend parr [eval list where pref [$w.wh pref]]		;#must come after joins so fields exists in loglst
    if {$cfig(dbp$w) != {nop}} {

    lappend parr "sizer [$w.wh_j pref]"

#Save dbp settings as part of the dbs (annoying to change dbp every time dbs opens)
#    lappend parr [list dbp order [$cfig(dbp$w) order]]
#        lappend parr [list dbp display [$cfig(dbp$w) display]]
#
#        lappend parr [list dbp listbox configure -summary [set sumon [$cfig(dbp$w) listbox cget -summary]]]	;#show summaries
#        if {$sumon} {
#            lappend parr [eval list dbp listbox summary set [eval $cfig(dbp$w) listbox summary func]]		;#summary functions
#        }
    }
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

# Deploy context menu
#------------------------------------------
proc dbs::loglst_cmenu {w idx} {
    variable v
    set v(logidx$w) $idx
    lassign [winfo pointerxy .] x y
    tk_popup $w.llcm $x $y
}

#Create the search window and initialize it
#------------------------------------------
proc dbs::dbs {w args} {
    variable cfig; variable v

    argform {table} args
    argnorm $cfig(swar) args
    foreach tag $cfig(sblk) {set cfig($tag$w) [xswitchs $tag args]}
    foreach {tag val} $cfig(sdef) {set cfig($tag$w) $val; xswitchs $tag args cfig($tag$w)}

    if {$cfig(table$w) == {}} {if {$cfig(dbp$w) != {nop}} {set cfig(table$w) $dbp::cfig(table$cfig(dbp$w))} else {error "No table defined"}}
#puts "w:$w table:$cfig(table$w)"
    if {$cfig(def$w) == {}} {set cfig(def$w) [lindex [lindex [wmdd::columns $cfig(table$w)] 0] 0]}	;#take first field as default
    wframe::_frame $w -class Dbs -borderwidth 2 -relief raised
    widginit $w dbs *$w

    eval loglst::loglst $w.wh -menu \{Query Builder:\} -func eq -cond AND -bd 0 $cfig(opa) -cmenu \{dbs::loglst_cmenu $w\}
    frame $w.j			;#holds join info
    sizer::sizer $w.wh_j $w.wh $w.j -o h -size 3
    pack $w.j -side bottom -fill both -exp 0
    pack $w.wh_j -side bottom -fill x
    pack $w.wh -side bottom -fill both -exp 1

    bind $w.wh <<Ok>> "dbs::search $w"		;#search when they hit Enter
    
#    $w.wh bar s dew::dew qtag ent Query: -width 10 -textv dbs::v(query$w) -help {The name of the currently loaded query} -gmc {-side right}
    pack forget [$w.wh bar clr w]		;#get rid of default loglst Clear button
    $w.wh bar menu configure -help {A menu for creating and using special report queries}

    frame $w.j.t		;#title bar for tables area
    mlb::mlb $w.j.b -sort none -min 70\
      -f {n	{N}		14	-just r -help {A unique number (index) to identify each joined table}} \
      -f {j	{J}		14	-just r -help {The line number (index) of the table this table is joined to}} \
      -f {tab	{Table}		80	-help {The name of this table}} \
      -f {tit	{Title}		100	-help {This table's title}} \
      -f {des	{Description}	200	-help {A description of what this table is for}} \
      -f {col	{Column}	80	-help {The column(s) in this table that refer to the foreign table}} \
      -f {ftab	{Foreign Table}	80	-help {The name of the foreign table}} \
      -f {fcol	{F-Column}	80	-help {The column(s) in the foreign table}}
    $w.j.b bind <Double-1> "dbs::joins_ref $w"
    pack $w.j.t -side top -fill x
    pack $w.j.b -side top -fill both -exp 1
    
    $w.wh bar menu mi sep
    set idx 0
    foreach {tg ti cm he} [list \
        ct {Clear join table list}	"dbs::joins_clear $w"	{Reset the list of query tables back to a single table}\
        jt {Join referenced table} 	"dbs::joins_ref $w 0"	{Include an additional table which is referenced (pointed to) by a table already included in this query}\
        jf {Join referencing table}	"dbs::joins_ref $w 1"	{Include an additional table which references (points to) a table already included in this query}\
        jd {Remove table from join}	"dbs::joins_delete $w"	{Remove the last table from the join list}\
    ] {
        $w.j.b menu insert [incr idx] command -label $ti -command $cm -help $he
        $w.wh bar menu mi $tg $ti $cm $he
    }
    $w.j.b menu insert [incr idx] separator

    $w.wh bar menu mi sep
    $w.wh bar menu mi cl {Clear query} -s {-image .img-clr} "dbs::clear $w"		{Reset the clauses and the joins to their default settings}
    $w.wh bar menu mi sq {Save query}		"dbs::query_save $w" -under 0	{Save the current query with a name so it can be used later}
    $w.wh bar menu mi lq {Load Query}  -s {-image .img-qry}	"dbs::query_load $w -t ?" -under 0	{Execute and run a previously saved query}
    $w.wh bar menu mi dq {Delete query}		"dbs::query_delete $w"		{Delete a query which has been previously saved}
    $w.wh bar menu mi eq {Publish query}	"dbs::query_save $w 1"		{Make this query available to all users}
    $w.wh bar menu mi iq {Import query}		"dbs::query_load $w -f ?"	{Load a query from a file (created from the export function)}
    $w.wh bar menu mi sep
    $w.wh bar menu mi he {Widget Help}	-command {help::locate dbs} -help {Instructions on using the DBS (DataBase Search) Widget}

    $w.wh bar menu mi sep -before 1
    $w.wh bar menu mi s {Search database} "dbs::search $w" -under 0 -s {Search -bg lightgreen -bd 2 -gmc {-fill x -exp 1}} -help {Scan the database for records matching the search criteria} -before 1

    label $w.j.t.tv -text Tables/views: -help "What tables/views are eligible to be searched in this query.\nClick on a table to add other tables related to it."
    pack $w.j.t.tv -side left -exp 1 -anchor w
    label $w.j.t.tt -text Query:
    entry $w.j.t.et -width 10 -textv dbs::v(qtag$w) -help "The short-cut name for the current query"
    pack $w.j.t.tt -side left -exp 0 -anchor e
    pack $w.j.t.et -side left -exp 0 -fill x
    entry $w.j.t.ed -textv dbs::v(qdes$w) -help "A description of what the current query does"
    pack $w.j.t.ed -side left -exp 1 -fill x

#loglst rhs value context menu
    menu $w.llcm -tearoff 0
    $w.llcm add command ex -label {Existing values}	-command "dbs::existing $w \$dbs::v(logidx$w)"	-help {Find all existing values in the database for this field}
    $w.llcm add command ew -label {Data entry widget}	-command "dbs::dew $w \$dbs::v(logidx$w)"	-help {Allow user to input data in a method specific to this field type}

    set v(qtag$w)	{}			;#no stored query yet
    set v(qdes$w)	{}
    
    if {$cfig(auto$w) != {}} {			;#automatically run a query and then close
#debug cfig(auto$w)
        query_load $w -tag $cfig(auto$w) -run 1
        after idle "top::closewin [winfo toplevel $w]"
    } elseif {$cfig(preclear$w)} {
        clear $w 0
    }
    return $w
}

# Pseudo widget command for join pane
#------------------------------------------
proc dbs::joins {w cmd args} {
#puts "joins:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{delete 3} {add 2} {dump 2} {clear 2} {frame 2}} $cmd]
    if {[lcontain {add delete clear dump} $cmd]} {return [eval joins_$cmd $w $args]}
    if {$cmd == {frame}} {return [eval $w.j $args]}
    return [eval $w.j.b $cmd $args]		;#send it to the mlb
}

#The main widget command
#------------------------------------------
proc dbs::wcmd {w cmd args} {
    variable cfig
#puts "widgcmd:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{initialize 4} {delete 3} {add 2} {joins 2} {search 2} {cget 2} {configure 4} {preference 3 pref} {where 2} {menu 2} {sizer 2}} $cmd]
    if {[lcontain {search clear joins pref order display} $cmd]} {return [eval $cmd $w $args]}
    if {$cmd == {menu}} {
        return [eval $w.h $args]
    } elseif {$cmd == {where}} {
        return [eval $w.wh $args]
    } elseif {$cmd == {sizer}} {
        return [eval $w.wh_j $args]
    } elseif {$cmd == {dbp}} {
        return [eval $cfig(dbp$w) $args]
    } else {
        return [eval _$w $cmd $args]		;#send it to the frame
    }
}
