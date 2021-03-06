# Database record previewer
# This is designed to be used with dbe.  It will preview a bunch of records in
# a listbox and allow the user to select one to be edited in the dbe widget.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- search menu function
#X- old header field functions put into menus
#X- set/clear reexec in menu somewhere
#X- save configuration, geometry in prefs
#X- is pk variable obsolete?
#X- summary fields still working?
#X- do dbp side of aggregate
#X- implement formatting option in mlb
#X- do dbp side of field formatting
#X- set format defaults based on db field types
#- Respect wyseman -default display fields on initial load (if preferences don't override)
#- 
#- how to alias selected fields when dbs (multiple tables) used
#- can print function preview in a dbedit before printing?
#-   how wide to make fields?
#- 
#- do we handle multiple tables correctly
#- is canvas resized properly if -bd != 1
#- 
#LATER:
#- keep history list of queries?
#- clone current dbp to a standalone toplevel
#- 

package require wyseman
#package require Img
option add *Dbp.*Listbox.width 200 widgetDefault
option add *Dbp.*Listbox.height 100 widgetDefault
option add *Dbp.*Canvas.width 2000 widgetDefault
option add *Dbp.*Canvas.height 2000 widgetDefault
option add *Dbp.relief raised widgetDefault
option add *Dbp.borderWidth 1 widgetDefault

namespace eval dbp {
    namespace export dbp table
    variable cfig		;#config values for each widget
    variable dbs		;#variables for each search widget
    variable v			;#variable values for each widget
    variable lq			;#keep details of latest query

    image create photo .img-fnd -file $lib::cfig(imgdir)/binocular.png
    image create photo .img-rld -file $lib::cfig(imgdir)/reload.png
    image create photo .img-nxt -file $lib::cfig(imgdir)/forward.png 
    image create photo .img-exe -file $lib::cfig(imgdir)/lightning.png
    image create photo .img-prv -file $lib::cfig(imgdir)/back.png
    image create photo .img-hme -file $lib::cfig(imgdir)/home-crop.png
    image create photo .img-lst -file $lib::cfig(imgdir)/tools.png

    set cfig(swar) {{table 2} {master 2} {slaves 2} {menu 2} {summary 3} {primarykey 2 pkey} {ewidget 2} {execute 2} {kdelim 2} {default 2 def} {count 2} {and 2} {load.pre 5} {exec.pre 6} {exec.pst 6} {reexecute 3 reexec} {load 2} {highlight 5} {remark 3} {selectmode 3} {display 4} {unique 2} {where 2} {preord 4} {order 3} {pstord 3} {scrollbar 3} {minimumheight 3} {map 2} {foreign 2} {limit 2} {update 2} {fnd 3}}
    set cfig(sdef) {kdelim {-} menu {?} count {Cnt:} reexec 0 load 0 highlight lightblue remark 1 unique 0 limit 20000}
    set cfig(sblk) {pkey ewidget master slaves execute def and load.pre load.pst exec.pre exec.pst where preord order pstord map foreign update}
    foreach {sw} $cfig(swar) {
        if {[llength $sw] > 2} {lappend cfig(star) [lindex $sw 2]} else {lappend cfig(star) [lindex $sw 0]}
    }
    set cfig(spas) {selectmode f display summary see scrollbar minimumheight}	;#fields to pass to mlb

    set cfig(all) {-text {Load All} -und 0 -com {dbp::loadall %w} -help {Load all records normally accessible by this preview and sort them in their default order}}
    set cfig(def) {-text {Default Load} -und 0 -com {dbp::dbs %w -auto default} -s {-image .img-hme} -help {Load records according to the program default or user default query}}
    set cfig(lby) {-text {Search For Records} -und 0 -com {dbp::dbs %w} -s { -image .img-fnd} -help {Open a dialog which allows you to choose certain records according to defined search criteria from the database to load into the preview}}
    set cfig(clr) {-text {Clear} -und 0 -com {dbp::clear %w} -help {Remove all records from the preview}}
    set cfig(rld) {-text {Reload} -und 0 -com {dbp::reload %w} -s {-image .img-rld} -help {Load the preview again according to the same criteria as were used in the previous load}}
    set cfig(prv) {-text {Previous Record} -und 0 -com {dbp::nxtrec %w -1} -s {-image .img-prv -rep 1} -help {Execute on the record before (above) the currently marked record}}
#    set cfig(sel) {-text {Current Record} -und 0 -com {dbp::nxtrec %w 0} -s {-image .img-exe} -help {Execute on the currently marked record}}
    set cfig(nxt) {-text {Next Record} -und 0 -com {dbp::nxtrec %w 1} -s {-image .img-nxt -rep 1} -help {Execute on the record after (below) the currently marked record}}
    set cfig(aex) {-text {Auto Execute} -type checkbutton -variable {dbp::cfig(reexec%w)} -s {Au} -help {Automatically execute the selected line after each new load or reload}}
    set cfig(squ) {-text {Saved Queries:} -type cascade -s {-image .img-lst } -post {dbp::fill_ql %w %t} -menu {menu %t.squ -postcommand {dbp::fill_ql %w %t.squ}} -help {List of previously saved queries}}
    set cfig(upr) {-text {Update Records} -und 0 -com {dbp::update %w} -help {Update the selected records}}
    set cfig(dlr) {-text {Delete Records} -und 1 -com {dbp::delete %w} -help {Delete the selected records}}

    image create bitmap cornbut -data "#define dot_width 7\n#define dot_height 7\nstatic unsigned char dot_bits[] = {\n0x08, 0x14, 0x2a, 0x55, 0x2a, 0x14, 0x08};"
}

# Fill the query list with a list of saved queries
#------------------------------------------
proc dbp::fill_ql {w m} {
#puts "fill_ql $w $m"
    variable cfig

    $m delete 1 end

    foreach rec [dbs::saved_queries $cfig(table$w)] {
        lassign $rec share tag desc
        set lab $tag
        if {$share == {pub}} {
            set lab "$tag (Public)"
        }
        $m add command -label $lab -command "dbp::dbs $w -auto \{$share $tag\}" -help $desc
    }
}

#Restore all default settings for next load
#------------------------------------------
proc dbp::setdefs {w {flds {unique table where and reexec remark preord order pstord}}} {
    foreach sw $flds {set dbp::lq($sw$w) $dbp::cfig($sw$w)}
    set dbp::lq(whand$w) {}
}

# Delete all entries in the preview
#------------------------------------------
proc dbp::clear {w args} {
    variable cfig

    $w.l init					;#clear the mlb
    foreach sl $cfig(slaves$w) {                ;#clear each slave
        if {[winfo exists $sl]} {eval $sl clear}
    }
}

# Add a window from this widget's slave list
#------------------------------------------
proc dbp::slaves {w slave} {
    variable cfig
    if {![lcontain $cfig(slaves$w) $slave]} {lappend cfig(slaves$w) $slave}
}

#Load according to (most) defaults
#------------------------------------------
proc dbp::loadall {w args} {
    setdefs $w {unique table where and reexec remark}
    eval genload $w $args
}

#Load again just like last time
#------------------------------------------
proc dbp::reload {w args} {
#puts "reload args:$args"
    setdefs $w {reexec remark}
    eval genload $w $args
}

#Low level load
#------------------------------------------
proc dbp::genload {w args} {
    variable cfig
    variable lq
    variable v

    foreach {sw} {unique table where and reexec remark preord pstord} {xswitchs $sw args lq($sw$w)}
    if {[set ord [xswitchs order args]] != {}} {	;#if order explicitly given
        $w order {}					;#clear the widget order buttons
        set lq(order$w) $ord
    } else {
        if {[set ord [$w.l order ?]] != {}} {set lq(order$w) $ord}	;#get order from mlb buttons
    }
#puts "LQ:$lq(where$w):$lq(order$w):reexec:$cfig(reexec$w):$lq(reexec$w):"
    if {$cfig(load.pre$w) != {}} {if {![eval $cfig(load.pre$w)]} return}

#FIXME: retain select markings and yview after a load:
    set marked [$w.l mark ?]
    set selected [$w.l curselection]
#puts "selected:$selected"
    set yview [lindex [$w.l yview] 0]

    if {$lq(where$w) == {} && $lq(and$w) == {}} {
        set lq(whand$w) {}
    } elseif {$lq(where$w) == {} && $lq(and$w) != {}} {
        set lq(whand$w) "$lq(and$w)"
    } elseif {$lq(where$w) != {} && $lq(and$w) == {}} {
        set lq(whand$w) "$lq(where$w)"
    } else {
        set lq(whand$w) "($lq(and$w)) and ($lq(where$w))"
    }
#puts "tables: $lq(table$w)"
    set t0 [lindex $lq(table$w) 0]		;#first table
    if {[llength $t0] <= 1} {
        set alias {}
    } else {
        lassign $t0 t0 alias
        append alias .
    }
#puts "alias:$alias"
#puts "pkey:$cfig(pkey$w):"

    lassign {} grpflds aggflds	    #Check for aggregate settings:
    set idx 0
    foreach {tg va} [$w.l aggregate func] {
        if {[set func [sumagfunc $va]] == {}} {
            lappend grpflds $tg
            lappend groupby [incr idx]
        } else {
            lappend aggflds $tg
            set agg($tg) $func
        }
    }
#puts "grpflds:$grpflds aggflds:$aggflds groupby:$groupby"

    set gby {}
    if {$aggflds == {}} {			;#if no aggregates specified
        set lq(fields) $cfig(pkey$w)		;#always query PK fields
        foreach f [$w.l display] {		;#also collect display fields
            if {![lcontain $lq(fields) $f]} {lappend lq(fields) $f}
        }
    } else {
        set lq(fields) [concat $grpflds $aggflds]
        if {[llength $groupby] > 0} {set gby "group by [join $groupby ,]"}
    }
#puts "lq(fields):$lq(fields)"

#puts "lq(order$w):$lq(order$w)"
    set ordlst {}
    foreach rec $lq(order$w) {
        lassign $rec tag ascdes
        if {![lcontain {asc desc} $ascdes]} {set ascdes {asc}}
        if {[lcontain $lq(fields) $tag]} {
            lappend ordlst [list $alias$tag $ascdes]
        } else {
            lappend ordlst "$tag $ascdes" ;# don't do a list here, it breaks tags that are really commands (called later)
        }
    }
    if {$ordlst != {}} {set order "order by [join $ordlst ,]"} else {set order {}}
#puts "order:$order"
    
    set fields {}
    array set map $cfig(map$w)		;#load up map array
    array set fmt [$w.l format]		;#load up formatting array
    foreach tag $lq(fields) {
        set fspec $alias$tag
        if {[info exists agg($tag)]} {
            set fspec $agg($tag)($fspec)
        }
        if {[info exists fmt($tag)]} {
            set fspec [fmtfunc $fmt($tag) $fspec]
            regsub {%O} $fspec [join $ordlst ,] fspec	;#if doing a running sum
        }
        if {[info exists map($tag)]} {
            regsub -all %f $map($tag) $fspec fspec
        }
        lappend fields "$fspec"
    }

    if {$lq(unique$w)} {set selmod { distinct}} else {set selmod {}}
    set lq(command$w) "select$selmod"
    set lq(target$w) "from [join $lq(table$w) {,}]"
    if {$lq(whand$w) == {}} {set lq(wh$w) {}} else {set lq(wh$w) "where $lq(whand$w)"}
    set lq(spec$w) "[subst -nocommands "$lq(wh$w) $gby$lq(preord$w) $order $lq(pstord$w)"]"
    set query "$lq(command$w) [join $fields {,}] $lq(target$w) $lq(spec$w)"
    if {$cfig(limit$w) != {}} {append query " limit $cfig(limit$w)"}
#debug query

    lib::cwatch [winfo toplevel $w]
    $w.l delete 0 end

# Method: list of rows (faster)
    set data [sql::qlist $query]				;#query faster (37 sec)
    eval $w.l insert end -tags \{$lq(fields)\} $data		;#insert slower (11 sec)
    set v(count$w) [llength $data]

# Method: array of columns (slower)
#set secs [clock seconds]
#    set v(count$w) [sql::qlist $query data $lq(fields)]	;#query slower (41 sec)
#    foreach f $lq(fields) {					;#insert (9 sec)
#        eval $w.l column $f insert end $data($f)
#    }
#puts "time:[expr [clock seconds] - $secs]"

    $w.l summary update			;#update summary fields
    lib::cnorm
    if {$lq(remark$w) && $marked != {}} {
        $w.l yview moveto $yview
        $w.l mark $marked		;#mark line(s) we had marked before
        foreach s $selected {$w.l selection set $s}
    } elseif {$lq(reexec$w)} {
        $w.l mark 0
    }
    if {$lq(reexec$w)} {execute $w}	;#execute marked lines
    if {[info exists cfig(load.pst$w)]} {eval $cfig(load.pst$w)}

    foreach sl $cfig(slaves$w) {		;#reload any slaves with related records
#puts "w:$w slave:$sl"				;# "w:[eval $sl w]"
        if {![catch {eval $sl w}]} {		;#if the widget seems to exist
            eval $sl obey $w			;#try asking it to obey
        }
    }
    if {$v(count$w) >= $cfig(limit$w)} {dia::brief "Warning:\nResults in [$w menu menu cget -text] truncated to $v(count$w) rows"}
}

#Resort data according to mlb sort buttons
#------------------------------------------
proc dbp::sort {w args} {
    variable v
#puts "resort:$w $args count:$v(count$w)"
    if {$v(count$w) <= 0} return		;#nothing to sort
    reload $w
}

#Translate a formatting function tag into a function name
#------------------------------------------
proc dbp::fmtfunc {tag value} {
    switch $tag {
        _	{return $value}
        cur	{return "comma_dollar($value)"}
        fl2	{return "($value)::numeric(14,2)"}
        fl4	{return "($value)::numeric(14,4)"}
        pe0	{return "($value * 100)::numeric(14,0)"}
        pe2	{return "($value * 100)::numeric(14,2)"}
        int	{return "($value)::int4"}
        bol	{return "norm_bool($value)"}
        dat	{return "norm_date($value)"}
        dao	{return "($value - current_date)"}
        arr	{return "array_to_string($value,',')"}
        bal	{return "sum($value) over (order by %O)"}
    }
    return $value
}

#Translate a summary/aggregate tag into a function name
#------------------------------------------
proc dbp::sumagfunc {tag} {
    switch $tag {
        A {return {avg}}
        S {return {sum}}
        X {return {max}}
        N {return {min}}
        C {return {count}}
        V {return {variance}}
        D {return {stddev}}
    }
    return {}
}

#Update the mlb summary fields
#------------------------------------------
proc dbp::summary {w args} {
    variable cfig
    variable lq
#puts "Update:$w $args"
    array set fmt [$w.l format]		;#load up formatting array
    set fields {}
    set tags {}
    foreach {tg va} [eval $w.l summary function $args] {	;#get summary types
        set agg [sumagfunc $va]
        if {$agg == {}} {
            lappend fields {''}
        } else {
            set type [wmdd::type $cfig(table$w) $tg]
            set field "${agg}($tg)"
#puts "  tag:$tg type:$type field:$field"
            if {[info exists fmt($tg)]} {
                lappend fields [fmtfunc $fmt($tg) $field]
            } else {
                lappend fields $field
            }
        }
        lappend tags $tg
    }
    if {$fields == {} || ![info exists lq(command$w)]} {return {}}
    set query "$lq(command$w) [join $fields {,}] $lq(target$w) $lq(wh$w)"
#puts "  query:$query"

    set data [sql::one $query]
    set n 0
    set nvals {}
    foreach tg $tags {
        lappend nvals $tg [string trim [lindex $data $n]]
        incr n
    }
#puts "nvals:$nvals"
    return $nvals
}

#Return a list of selected items in the listbox
#------------------------------------------
proc dbp::keys {w {idx {}}} {
    variable cfig
    variable v

    if {$idx == {}} {			;#no line specified, so get marked lines
        set marked [$w.l mark ?]
        if {$marked == {}} {set idx 0} else {set idx $marked}
    }
    set ids {}
    set size [$w.l size]
    set selectmode [$w.l column cget -selectmode]
#puts "idx:$idx selectmode:$selectmode size:$size"
    if {[lcontain {browse single} $selectmode]} {
        $w.l mark [set idx [$w.l index $idx]]
        if {$idx >= $size} return
        lappend ids [$w.l get $idx -tags $cfig(pkey$w)]
    } else {
        $w.l mark $idx
        foreach i $idx {
            if {$i >= $size} continue
            lappend ids [$w.l get $i -tags $cfig(pkey$w)]
        }
        if {[llength $ids] <= 0} return		;#nothing left to execute
#puts "ids:$ids id:$id"
    }
    return $ids
}

#Load the data for the selected record into the entry widget
#------------------------------------------
proc dbp::execute {w {idx {}}} {
    variable cfig
    variable v

#puts "execute w:$w idx:$idx"
    if {$cfig(exec.pre$w) != {}} {if {![eval $cfig(exec.pre$w)]} return}
    if {$v(count$w) <= 0} {
        foreach ewid $cfig(ewidget$w) {eval $ewid clear -prompt no}
#        if {$cfig(ewidget$w) != {}} {eval $cfig(ewidget$w) clear -prompt no}
        return
    }
    set ids [keys $w $idx]
    set id [lindex $ids 0]
#puts "  id:$id ids:$idx execute:$cfig(execute$w) w:$w"
    regsub -all %w $cfig(execute$w) $w cmd
    if {[llength $ids] > 1} {
        set cmd "$cmd \{$ids\} \{$idx\}"
    } else {
        set cmd "$cmd \{$id\} $idx"
    }
#puts "cmd:$cmd ewidget:$cfig(ewidget$w)"
    if {$cfig(execute$w) != {}} {lib::cwatch $w.l; eval $cmd; lib::cnorm $w.l}
    foreach ewid $cfig(ewidget$w) {
#puts "$ewid load {$id}"
        eval $ewid load \$id
    }
#    if {$cfig(ewidget$w) != {}} {eval $cfig(ewidget$w) load \$id}
    eval $cfig(exec.pst$w)
    event generate $w <<Execute>>
}

#Return a where clause suitable for returning the currently selected (or all) records
#keys: return an explicit list of key matches
#where: return the where string used for the query (if any)
#both: return an and expression of both
#------------------------------------------
proc dbp::where {w {type keys}} {
    variable cfig
    variable lq
    variable v

#puts "pkey:$cfig(pkey$w)"
    if {$type == {both}} {set pfx {t0.}} else {set pfx {}}
    set wharr {}
    foreach pkval [keys $w] {
        set i 0
        set karr {}
        foreach tag $cfig(pkey$w) {
            set fval [lindex $pkval $i]
            if {[set val [sql::quote $cfig(table$w) $tag [lindex $pkval $i] 0]] == {}} {set val null}
            if {$val == {null}} {
                lappend karr "$pfx$tag is null"
            } else {
                lappend karr "$pfx$tag = $val"
            }
            incr i
        }
        lappend wharr "([join $karr { and }])"
    }
#puts "whand:$lq(whand$w)"
#puts "wharr:[join $wharr { or }]"
    
    if {[lcontain {where 1} $type]} {		;#1 gives compatibility to old "all" parameter
        return $lq(whand$w)
    } elseif {$type == {keys} || $lq(whand$w) == {}} {
        return [join $wharr { or }]
    } else {					;#both
        return "($lq(whand$w)) and ([join $wharr { or }])"
    }
}

#Delete the selected database records
#------------------------------------------
proc dbp::delete {w args} {
    variable cfig

    if {[set num [llength [$w keys]]] <= 0} return	;#how many selected rows
    if {$num <= 0} {error "Nothing specified to delete"; return}
    if {[dia::ask "About to delete [plural $num row] from table: $cfig(table$w)\nThis can not be un-done.\nAre you sure you want to continue?" 0 OK Cancel] < 0} return
    set query "delete from $cfig(table$w) where [$w where]"
#debug query
    sql::exe $query
    $w reload
}

#Update the selected database records as specified
#------------------------------------------
proc dbp::update {w args} {
    variable cfig

    argform {column} args
    argnorm {{column 2} {values 2}} args
    foreach s {column values} {set $s [xswitch $s args]}
#debug column values
    if {[set num [llength [$w keys]]] <= 0} return	;#how many selected rows
    if {$cfig(update$w) == {}} {dia::err "This preview not configured for updating"; return}
    if {$column == {} && $values == {}} {
        if {$cfig(update$w) == {*}} {set in {}} else {set in "and col in ('[join $cfig(update$w) {','}]')"}
        if {[scm::dia {Select Column to Update:} dbp_colsel -eval "sql::qlist \"select col,type,title,help from wm.column_pub where obj = '$cfig(table$w)' $in order by 3\"" -dest column -f col -f type -f title -f help -token col] < 0} return
#debug column
    }
    if {$column != {}} {
        if {$cfig(update$w) != {*} && ![lcontain $cfig(update$w) $column]} {dia::err "This preview is not configured for updating column: $column"; return}
        lassign [wmdd::column $cfig(table$w) $column] title help
        if {[set data [wmdd::value $cfig(table$w) $column]] != {}} {set data [list -data $data]}
        if {[catch {
            set fargs [list -f [concat $column [wmdd::style cfig(table$w) $column] [list -title $title: -help $help -sub {0 0} -state normal] $data]]
        }]} {
            if {[dia::query "Input the value to write into [plural $num row] of table $cfig(table$w), column: $title ($column):" value] < 0} return
        } else {
#debug fargs
            if {[eval dia::dia .dbp_update -but \{OK Cancel\} -message \{Field-specific data selector:\} -def 0 -entry mdew::mdew -dest nvpair -pre 1 $fargs] < 0} return
            set value [lindex $nvpair 1]
        }
        lappend values $column $value
    }
    set nvlist {}
    foreach {f v} $values {
        if {$cfig(update$w) != {*} && ![lcontain $cfig(update$w) $f]} {dia::err "Preview not configured for updating column: $f"; return}
        lappend nvlist "$f = [sql::quote $cfig(table$w) $f $v]"
        lappend collist $f
    }
    if {[set cols [llength $nvlist]] <= 0} {error "Nothing specified to update"; return}
    if {[dia::ask "About to update [plural $cols column] ([join $collist ,]) in [plural $num row] of table: $cfig(table$w)?" 0 OK Cancel] < 0} return
    set query "update $cfig(table$w) set [join $nvlist ,] where [$w where]"
#debug query
    sql::exe $query
    $w reload
}

#Load the next/prev record after the one selected in the listbox
#------------------------------------------
proc dbp::nxtrec {w {inc 1}} {
    variable cfig
    variable v
    set marked [$w.l mark ?]
#puts "marked:$marked"
    if {$marked == {}} {set line -1} else {set line [lindex $marked 0]}
    incr line $inc
#puts "line:$line end:[$w.l index end]"
    if {$line >= [$w.l index end] || $line < 0} {return 0}
    $w.l selection clear 0 end
    execute $w $line
    return 1
}

#Fill the toplevel dbs widget with stuff (has to be separate call for top::top to be happy)
#------------------------------------------
proc dbp::dbs_build {z dbp args} {
    top::add [eval dbs::dbs $z.f -dbp $dbp $args]
    pack $z.f -fill both -exp 1
    $z.f where bar menu mi z Close "$z close" -help {Close this search window} -hot C-w -s Close
    return 1
}

#Create a toplevel window to contain the search widget
#------------------------------------------
proc dbp::dbs {w args} {
    variable cfig

    argnorm {{auto 2}} args
    if {[set auto [xswitchs auto args]] != {}} {set restore 0} else {set restore 1}

    set tag [translit . _ dbp_dbs_$cfig(table$w)]	;#unique tag for pref saving
    set z [top::top $tag -title {Database Search} -menu 0 -build "dbp::dbs_build %w $w $args -auto {$auto}" -restore $restore -par $w]
#    if {$auto == {}} {dia::place $z}
}

# Yield/restore preferences
#------------------------------------------
proc dbp::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    lappend parr [eval list listbox pref [$w.l pref]]
    lappend parr [list configure -reexec $cfig(reexec$w)]
    lappend parr [list configure -limit $cfig(limit$w)]
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

#Add an item into the main menu
#------------------------------------------
proc dbp::m_add {w tag args} {
    variable cfig
#puts "M_add w:$w tag:$tag args:$args"
    argform {text command help} args
#    if {[lcontain {ord def all rld lby clr prv sel nxt aex squ upr dlr} $tag]} {set args "$cfig($tag) $args"}
    if {[lcontain {ord def all rld lby clr prv nxt aex squ upr dlr} $tag]} {set args "$cfig($tag) $args"}
    regsub -all %w $args $w args
    eval $w.t menu mi $tag $args
}

# Reload the preview according to a record in a master dbe
#------------------------------------------
proc dbp::obey {w master {table {}}} {
    variable cfig
    if {$table == {}} {set table [$master cget table]}

#puts "obey w:$w table:$cfig(table$w) ftable:$table master:$master pk:[$master pk]"
    if {[$master pk] == {}} return		;#if first element of pk blank, assume no record loaded
    set wlist {}
    if {$cfig(foreign$w) == {} || $cfig(foreign$w) == {{}}} {set cfig(foreign$w) [wmdd::columns_fk $cfig(table$w) $table]}
    if {$cfig(foreign$w) == {}} {dia::err "Finding key relationship from $cfig(table$w) to $table"; return}
#puts "foreign:$cfig(foreign$w)"
    foreach rec $cfig(foreign$w) {
        lassign $rec cols fcols
#puts "  cols:$cols fcols:$fcols"
        set flist {}
        set i 0; foreach col $cols {
            lappend flist [list $col = [sql::quote $cfig(table$w) $col [$master get [lindex $fcols $i]]]]
            incr i
        }
        lappend wlist "([join $flist {) and (}])"
    }

    if {[llength $wlist] <= 0} {dia::warn "No key fields found from table $cfig(table$w) to $table"; return}
#puts "  wlist:$wlist"
    reload $w -where [join $wlist { or }]
}

# Get configuration
#------------------------------------------
proc dbp::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain $cfig(star) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure the dbp
#------------------------------------------
proc dbp::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(star) {xswitch $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

#Create the preview listbox window
#------------------------------------------
proc dbp::dbp {w args} {
    variable cfig
    variable v

#puts "dbp w:$w args:$args"
    argform {menu} args
    argnorm $cfig(swar) args
    set cfig(table$w) [xswitchs table args]	;#get table name
    foreach tag $cfig(sblk) {set cfig($tag$w) [xswitchs $tag args]}
    foreach {tag val} $cfig(sdef) {set cfig($tag$w) $val; xswitchs $tag args cfig($tag$w)}
    lassign {} margs fargs
    while {[xswitch m args va] != {}} {lappend margs -m $va}
    set gotanf 0				;#have we been given any explicit field definitions
    foreach t $cfig(spas) {			;#save fields to pass to mlb
        while {[xswitch $t args va] != {}} {
            lappend fargs -$t $va
            if {$t == {f}} {set gotanf 1}
        }
    }
#puts "fargs:$fargs"
    set ewidget [lindex $cfig(ewidget$w) 0]
    if {$cfig(table$w) == {}} {if {$ewidget != {}} {set cfig(table$w) [eval $ewidget cget -table]} else {error "No table defined"}}
    if {$cfig(pkey$w) == {}} {
        if {$ewidget != {} && $cfig(table$w) == [eval $ewidget cget -table]} {
            set cfig(pkey$w) [eval $ewidget cget -pkey]
        }
        if {$cfig(pkey$w) == {}} {set cfig(pkey$w) [wmdd::pkey $cfig(table$w)]}
        if {$cfig(pkey$w) == {}} {set cfig(pkey$w) [wmdd::view_oid $cfig(table$w)]}
        if {$cfig(pkey$w) == {}} {error "No primary key defined"}
    }
#puts "table:$cfig(table$w):  pkey:$cfig(pkey$w):"

    if {!$gotanf} {				;#if we didn't get any explicit field specs
        foreach rec [wmdd::columns $cfig(table$w)] {	;#add all of table's columns by default
            lassign $rec tag title help type
#debug tag type title
            set farg [list $tag $title -help "$title ($tag):\n$help"]

            if {[lcontain {date timestamp} $type]} {
                append farg { -form dat}
            } elseif {$type == {bool}} {
                append farg { -form bol}
            } elseif {$type == {numeric}} {
                append farg { -form cur}
            } elseif {$type == {int}} {
                append farg { -form int}
            } elseif {[string range $type 0 0] == {_}} {
                append farg { -form arr}
            }
            if {[catch {set dargs [wmdd::style $cfig(table$w) $tag]}]} {		;#if we can't get dbe default args for field,
                if {[lcontain {numeric int4 int8 float8} $type]} {		;#Right justify all numbers
                    append farg { -just r -width 40}	
                } elseif {[lcontain {boolean} $type]} {
                    append farg { -width 10}					;#set narrow for booleans
                }
            } else {				;#else use dbe default widths, justification
#puts "tag:$tag dargs:$dargs"
                argnorm {{justify 2} {size 2} {format 2}} dargs			;#Use same abbreviations as in mlb::add
                if {[set val [xswitchs format  dargs]] != {}} {append farg " -format $val"}
                if {[set val [xswitchs justify dargs]] != {}} {append farg " -just $val"}
                if {[set val [xswitchs size    dargs]] != {}} {
                    set length [lindex $val 0]
                    if {$length == {} || $length > 25} {set length 25}
                    if {$length < 2} {set length 2}
                    append farg " -width [expr $length * 7]"
                }
#puts "w:$w tag:$tag farg:$farg"
            }

            lappend fargs -f $farg
        }
    }
    if {$cfig(pkey$w) == {oid}} {lappend fargs -f oid}	;#if no real primary key available, use oid
#puts "Fargs:$fargs"

    if {[winfo exists $w]} {eval $w configure -class Dbp $args} else {eval wframe::_frame $w -class Dbp $args}
    widginit $w dbp *$w

    foreach i {marked srchhist tags fields} {set cfig($i$w) {}}

#puts "menu:$cfig(menu$w)"
    if {$cfig(menu$w) == {?}} {
        lassign [wmdd::table $cfig(table$w)] title help
        set cfig(menu$w) [list "Prev: $title" -help "A menu of options for previewing records from table:\n${title} ($cfig(table$w)):,\n$help"]
    }
    set v(count$w) 0				;#no records loaded yet
    set menarg {}
    if {$cfig(menu$w) != {}} {
        mbar::mbar $w.t -mb "menu $cfig(menu$w)" -gmc.bf {-fill x -exp 1}
        pack $w.t -side top -fill x
        dew::dew $w.t.fnd ent {Find:} -textv dbp::v(fnd$w) -just r -width 5 -help "Find records by text in any column\nEnter => Forward search\nCrt+Enter => Backward search"
        pack $w.t.fnd -side left
        bind $w.t.fnd.e <Return> "mlb::qfind $w.l 1 dbp::v(fnd$w)"
        bind $w.t.fnd.e <Control-Return> "mlb::qfind $w.l -1 dbp::v(fnd$w)"
        if {$cfig(count$w) != {}} {		;#show current record count
            eval dew::dew $w.t.count ent -textv dbp::v(count$w) -just r -help \{How many records currently loaded in the preview\} -width 5 -state readonly $cfig(count$w)
            pack $w.t.count -side left
        }
        
        foreach {sw va} $margs {		;#build menus
            m_add $w {*}$va
            if {$va == {upr}} {lappend fargs -selectmode extended}	;#if updating enabled, make sure we can select multiple records
        }
        $w.t menu mi sep
        $w.t menu mi limit {Set Query Limit} -under 4 -command "dia::query {Maximum number of rows to return in this window:} dbp::cfig(limit$w)" -help {Set the maximum number of rows allowed to be returned in this preview}
        $w.t menu mi find  {Find in Column}  -under 0 -command "$w column %m find" -help {Search (and possibly replace) items in only this column of the list}
        $w.t menu mi print {Print Grab} -command "print::grab $w" -help {View a printable rendering of the preview pane}
        $w.t menu add cascade -label {Column Options} -underline 4 -menu [$w.t menu w].lbm -help {Menu items associated with the display columns (also accessible by right-clicking on a column)}
        $w.t menu mi sep
        $w.t menu mi help {Widget Help}	-command {help::locate dbp} -help {Instructions on using the DBP (DataBase Preview) Widget}
        set menarg "-menu [$w.t menu w].lbm"
    }
    mlb::mlb $w.l {*}$menarg -resort 0 -sort "dbp::sort $w" -calc "dbp::summary $w" {*}$fargs
    pack $w.l -side top -fill both -exp 1
    bind $w.l <<Execute>> "lib::cwatch $w; update; dbp::execute $w; lib::cnorm $w"
    if {$cfig(update$w) != {}} {
        $w.l menu insert ex command -label {Update Column} -underline 0 -command "dbp::update $w \[$w.l master\]" -help {Update the value in this column for selected records}
        $w.l menu insert ex sep
    }

    setdefs $w
    
#puts "w:$w master:$cfig(master$w)"
    if {$cfig(master$w) != {}} {
        after idle [list dbp::obey $w [eval $cfig(master$w) w]]		;#wait for prefs (sort order) to kick in
    } elseif {$cfig(load$w)} {		;#if you load at this point, you will also get a second load when prefs are restored
        loadall $w
    }
    return $w
}

#The widget command for the preview box widget
#------------------------------------------
proc dbp::wcmd {w cmd args} {
    set cmd [unabbrev {{listbox 2} {menu 2} {obey 2} {clear 2} {keys 2} {where 2} {dbsearch 3 dbs} {preferences 4 pref} {previous 4 prev} {next 2} {reload 2} {configure 2} {cget 2} {load 2} {update 2} {slaves 2}} $cmd]
    if {[lcontain {dbs pref clear reload obey keys where update slaves cget configure} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact $cmd {
        {w}		{return $w}
        {load}		{return [eval loadall $w $args]}
        {menu}		{return [eval $w.t $args]}
        {column}	{return [eval $w.l $cmd $args]}
        {listbox}	{return [eval $w.l $args]}
        {next}		{return [eval nxtrec $w $args]}
        {prev}		{return [eval nxtrec $w -1]}
        {default}	{return [eval $w.l $cmd $args]}
    }
}

# Launch a toplevel window previewing a specified table
#------------------------------------------
proc dbp::table {table args} {
    variable cfig
    lassign [wmdd::table $table] title
    top::top dbp_[translit . _ $table] -title "Preview $title" -build "top::dbp %w -table $table -m clr -m def -m rld -m all -m prv -m sel -m nxt -m lby -m aex -m see $args" -reopen 1
}

if {[info commands locawyze] != {}} {locawyze dbp}
