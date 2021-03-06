# Database record Editor
# This is the main editor widget where fields can be veiwed and edited.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- re-instate lv() to check for actual changes? (or change how x::modified works?)
#X- make prefs call do something useful?
#X- take out zip function, use '-spf dbe' instead and put zip function in waplib
#- 
#- When checkfield dialog appears, 'modified 0' at end of ::updrec doesn't seem to take (record shows dirty)
#- Can we do a dia::query on the textvariable for a field that is type mle now?
#- update doc.dbe
#- 
#- how to specify -underline for dbe/dbp menu in a language independent way?
#- make/implement a pixmap dew type (use for the employee's picture)
#- Allow to reference fields more than once on invocation? (make options additive)
#- 

package require wyseman
#package require Img
option add *Dbe.relief raised widgetDefault
option add *Dbe.borderWidth 1 widgetDefault

namespace eval dbe {
    namespace export dbe
    variable cfig		;#config values for each widget
    variable v

    array set cfig {adr:und 0	upr:und 0	dlr:und 0	clr:und 0	prv:und 0	rld:und 0	nxt:und 0	ldr:und 0}
    array set cfig {adr:com {dbe::add %w}	upr:com {dbe::updrec %w}	dlr:com {dbe::delete %w}	clr:com {dbe::clear %w}		prv:com {dbe::ldhist %w -1}	rld:com {dbe::ldhist %w 0}	nxt:com {dbe::ldhist %w 1}	ldr:com {dbe::keyload %w}}
    array set cfig {adr:s {-image .img-add}	upr:s {-image .img-upd}	dlr:s {}	clr:s {-image .img-clr}	prv:s {-image .img-prv -rep 1}	rld:s {}	nxt:s {-image .img-nxt -rep 1}	ldr:s {-image .img-ld}}
    array set cfig {adr:text {Add New Record}	upr:text {Update Current Record}	dlr:text {Delete Current Record}	clr:text {Clear Entry Fields}	prv:text {Previous Record}	rld:text {Reload Current Record}	nxt:text {Next Record}	ldr:text {Load record}}
    array set cfig {adr:help {Add a new record to the database using the fields currently showing} upr:help {Make changes to the database according to the data currently showing} dlr:help {Remove from the database the record currently showing (can't be undone)} clr:help {Reset the entry fields to a state ready for the entry of a new record (does not affect the database)} prv:help {Move backward through the list of previously loaded records} rld:help {Re-get the current record from the database} nxt:help {Move forward through the list of previously loaded records}	ldr:help {Load a specific record by its primary key (unique identifier) value}}

    set cfig(swar) {{menu 2} {table 2} {primarykey 3 pkey} {record 3} {auto 2} {keyseparator 3 pksep} {preclear 3} {pwidget 2} {master 2} {slaves 2} {focus 2} {check 3} {help 2} {ldr.pst 5} {ldr.prompt 5} {clr.pre 6} {clr.pst 6} {clr.message 5} {clr.prompt 5} {dlr.pre 5} {dlr.pst 5} {dlr.message 5} {dlr.prompt 5} {adr.pre 5} {adr.pst 5} {adr.reload 5} {adr.message 5} {adr.prompt 5} {upr.pre 5} {upr.pst 5} {upr.reload 5} {upr.message 5} {upr.prompt 5}}
    set cfig(sdef) [list preclear 1 pksep - auto 1 nulemp 1 adr.reload 1 record {Key: -width 14} ldr.prompt 1 dlr.message $cfig(dlr:text) adr.message $cfig(adr:text) clr.message $cfig(clr:text) upr.message $cfig(upr:text) dlr.prompt 1 adr.prompt 0 clr.prompt 0 upr.prompt 0 upr.reload 1]
    set cfig(sblk) {pkey menu pwidget master slaves focus gmc sargs foid ldr.pst check clr.pre clr.pst dlr.pre dlr.pst adr.pre adr.pst upr.pre upr.pst}
    foreach {sw} $cfig(swar) {if {[llength $sw] > 2} {lappend cfig(star) [lindex $sw 2]} else {lappend cfig(star) [lindex $sw 0]}}

    set cfig(fwar) {{write 2} {read 2} {field 2} {dependency 3 fdep} {format 2} {query 2} {hot 2}}
    set cfig(fdef) {write 1 read 1 hot 0}
    set cfig(fblk) {fdep field query}
    set cfig(fshort) {style size sub title help}	;#must agree with mdew.tcl and wyseman
    foreach {sw} $cfig(fwar) {lappend cfig(ftar) [lindex $sw 0]}

    image create bitmap smile -data "#define smiley_width 14\n#define smiley_height 14\nstatic unsigned char smiley_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x02, 0x38, 0x07, 0x00, 0x00,0x00, 0x00, 0x00, 0x00, 0x04, 0x08, 0x08, 0x04, 0x10, 0x02, 0xe0, 0x01,0x00, 0x00, 0x00, 0x00};"
    image create bitmap frown -data "#define frowny_width 14\n#define frowny_height 14\nstatic unsigned char frowny_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x02, 0x38, 0x07, 0x00, 0x00,0x00, 0x00, 0x00, 0x00, 0xe0, 0x01, 0x10, 0x02, 0x08, 0x04, 0x04, 0x08,0x00, 0x00, 0x00, 0x00};"

    image create photo .img-upd -file $lib::cfig(imgdir)/save.png
    image create photo .img-clr -file $lib::cfig(imgdir)/clear.png
    image create photo .img-rld -file $lib::cfig(imgdir)/reload.png
    image create photo .img-nxt -file $lib::cfig(imgdir)/forward.png 
    image create photo .img-prv -file $lib::cfig(imgdir)/back.png
    image create photo .img-add -file $lib::cfig(imgdir)/plus.png
    image create photo .img-ld -file $lib::cfig(imgdir)/magnifying_glass.png
#    image create photo .img-ld -file $lib::cfig(imgdir)/load.png

    bind Dbp <Alt-m> "dbe::postmenu %W"
}

# Post the menu for this dbp.  w is some widget inside the dbe
#------------------------------------------
proc dbe::postmenu {w} {
    variable cfig
    set p [split $w .]
    while {[llength $p] > 1} {			;#search for a Dbp at or above w
        set d [join $p .]
#puts " p:$p d:$d class:[winfo class $d]"
        if {[winfo class $d] == {Dbe}} {
            lassign [winfo pointerxy .] x y
            tk_popup [$d.t menu menu w] $x $y
            return
        }
        set p [lreplace $p end end]
    }
}

# Get an entry value and quote it appropriately for the data type
#------------------------------------------
proc dbe::quoted {w tag} {
    variable cfig
    return [sql::quote $cfig(table$w) $tag [$w.d get $tag] 0]
}

# SPF handler to select from all existing values in a DB field
#------------------------------------------
proc dbe::exist {w entry table column} {
#puts "dbe::exist w:$w entry:$entry table:$table column:$column"
    if {[scm::dia {Existing values:} dbexs_${table}_$column -eval "sql::qlist {select distinct $column from $table order by $column}" -dest value -f [list $column [$entry cget -title]] -token $column] >= 0} {
        $w set $column $value
    }
}

#Set or return the primary field values for the current record
#------------------------------------------
proc dbe::pk {w {vals {_?_}}} {
    variable cfig; variable v

    if {$vals == {_?_}} {				;#return pk of current record
        return $v(pkvals$w)
    } elseif {$vals == {_!_}} {				;#note primary key from loaded fields
        set v(pkvals$w) {}
        foreach f $cfig(pkey$w) {lappend v(pkvals$w) [$w.d get $f]}
    } else {						;#set pk to the value we specify
        set v(pkvals$w) $vals				;#list version
    }
    set v(recid$w) [join $v(pkvals$w) $cfig(pksep$w)]	;#display version
}

#Return a where clause based on the currently loaded primary key(s)
#------------------------------------------
proc dbe::keywhere {w {prefix {}}} {
    variable cfig
    set wharr {}
    set pkval [pk $w]
    set i 0; foreach tag $cfig(pkey$w) {
        set fval [lindex $pkval $i]
        if {[set val [sql::quote $cfig(table$w) $tag [lindex $pkval $i] 0]] == {null}} {
            lappend where "$prefix$tag is $val"
        } else {
            lappend wharr "$prefix$tag = $val"
        }
        incr i
    }
    return [join $wharr { and }]
}

#Load a record as defined by the primary key the user will enter
#------------------------------------------
proc dbe::keyload {w} {
    variable cfig; variable v
    set strgs {}
    set vnams {}
    set fargs {}
    set fvpair {}
    set i 0; foreach tag $cfig(pkey$w) {
        lassign [wmdd::column $cfig(table$w) $tag] title help
        if {[set data [wmdd::value $cfig(table$w) $tag]] != {}} {set data [list -data $data]}
        set dargs [wmdd::style $cfig(table$w) $tag]
#puts "tag:$tag dargs:$dargs"
        argnorm $cfig(fwar) dargs
        foreach sw $cfig(ftar) {xswitchs $sw dargs}		;#strip dbe arguments (make suitable for mdew)
        foreach sw {hide state sub} {xswitchs $sw dargs}	;#strip disabling arguments
        
        lappend fargs -f [concat $tag $dargs [list -title $title: -help $help] [list -sub "0 $i" -state normal -hide 0] $data]
        lappend fvpair $tag [$w.d get $tag]
        incr i
    }
#puts "fargs:$fargs\nfvpair:$fvpair"
    if {[eval dia::dia .dbepk_[translit . _ $cfig(table$w)] -but \{OK Cancel\} -message \{Load what record:\} -def 0 -entry mdew::mdew -dest fvpair -pre 1 $fargs] < 0} return
#puts "Fvpair:$fvpair"
    foreach {sw va} $fvpair {lappend pkval $va}
    ldrec $w $pkval
}

#Load the data for the specified record into the edit widget
#------------------------------------------
proc dbe::ldrec {w args} {
    variable cfig; variable v

    argform {id} args
    argnorm {{history 1 hist} {post 2 pst} {identity 1 id} {slaves 2} {where 1}} args
    array set ca [list id {} hist 1 pst $cfig(ldr.pst$w) slaves $cfig(slaves$w) mod $cfig(ldr.prompt$w) where {}]
    foreach sw {id hist pst mod slaves where} {xswitchs $sw args ca($sw)}
#puts "ldrec $w id:$ca(id) chk:$ca(mod) mod:[$w modified]"
    if {$ca(mod) && [$w modified]} {
        if {[dia::ask "Modified fields in \"[$w menu menu cget -text]\" pane not yet saved" 0 {Load New Record Anyway} Cancel] < 0} {return 0}
    }
    if {$ca(id) == {} && $ca(where) == {}} {return 0}	;#no record identifier given
    if {$ca(where) != {}} {		;#explicit where clause
        set where "where $ca(where)"
    } else {				;#otherwise use normal primary key
        set where {}
#puts "pkey:$cfig(pkey$w):"
        set i 0; foreach k $cfig(pkey$w) {	;#for each field of the key
            if {[set qs [sql::quote $cfig(table$w) $k [lindex $ca(id) $i] 0]] == {null}} {
                lappend where "$k is $qs"
            } else {
                lappend where "$k = $qs"
            }
            incr i
        }
        set where "where [join $where { and }]"
    }
    set query [subst "select [fields $w] from $cfig(table$w) $where"]
#puts "query:$query"
    set pgres [sql::exe $query]
    set cnt [pg_result $pgres -numTuples]	;#how many did we get
    if {$cnt == 1} {set tuple [pg_result $pgres -getTuple 0]}
    pg_result $pgres -clear
    if {$cnt < 1} {
        dia::err "No record found in $cfig(title$w)\n(table: $cfig(table$w) $where)"; return 0
    } elseif {$cnt > 1} {
        error "Multiple records found: $ca(id) ($cnt)" {In dbe ldrec}; return 0
    } else {
        fill_fields $w $tuple			;#puts "tuple:$tuple"
    }
    if {$ca(hist)} {				;#save primary key in history stack
        set kfv [pk $w]				;#primary key value
        if {[lindex $cfig(hist$w) end] != $kfv} {lappend cfig(hist$w) $kfv}
        set cfig(hidx$w) [expr [llength $cfig(hist$w)] - 1]
    }

    foreach i {clr adr dlr upr} {m_endis $w $i normal}	;#update button statuses
    eval_pstfunc $w $ca(pst)			;#execute post function

    foreach sl $ca(slaves) {			;#reload any slave dbp's with related records
#puts "w:$w slave:$sl"				;# "w:[eval $sl w]"
        if {![catch {eval $sl w}]} {		;#if the widget seems to exist
            eval $sl obey $w			;#try asking it to obey
        }
    }

    $w modified 0
#puts "done mod:[$w modified]"
    event generate $w <<Execute>>		;#in case anyone is tracking new loads
    return 1
}

#Load the previous record in the history list
#------------------------------------------
proc dbe::ldhist {w off} {
    variable cfig
    set last [expr [llength [set hist $cfig(hist$w)]] - 1]
    set idx [expr $cfig(hidx$w) + $off]
#puts "hist:$cfig(hist$w) hidx:$cfig(hidx$w) off:$off last:$last idx:$idx"
    if {$idx < 0} {
        dia::brief {No previous record} 800
    } elseif {$idx > $last} {
        dia::brief {No next record} 800
    } elseif {$last < 0} {
        dia::brief {No current record} 800
    } else {
#puts "ldrec $w idx:$idx"
#        if {$off == 0} {dia::brief Reloading 200}
        ldrec $w [lindex $hist $idx] -hist 0
        incr cfig(hidx$w) $off
    }
}

# Eval the prefunc if appropriate, return any additional query string given
#------------------------------------------
proc dbe::eval_prefunc {w sql func {insupd 0}} {
    variable cfig

    if {$sql} {return {}}				;# Suppress field checking if caller just wants sql returned
    if {$func == {}} {
        if {!$insupd} {return {}}			;# No function specified and not insert/update
        if {$cfig(check$w) != {}} {proc dummy_prefunc {w} {return ?}; set func {dummy_prefunc}}
    }
#puts "0 func:$func"
    if {$func == {}} {return {}}			;# Still nothing to call/do so return
    
    if {[regexp {%w} $func]} {regsub -all %w $func $w func} else {append func { } $w}	;#pass widget variable into pre-function
    while 1 {
        if {$insupd} {
            foreach {c f} $cfig(check$w) {checkfield $w $c {*}$f}	;#mark any mandatory check fields
        }
        set res [eval $func]
#puts "prefunc:$func res:$res"
        if {$res == {?}} {
            if {[set res [checkfield $w prompt]] == {?}} continue
        }
        if {![lcontain {0 1 yes no {}} $res]} {		;#function passed back sql
            return $res
        } elseif {[lcontain {0 no {}} $res]} {		;#user data failed
            checkfield $w clear
            return -code return 0
        } else {					;#user data OK
            return {}
        }
    }
}

# Eval the post-function, substituting the widget argument
#------------------------------------------
proc dbe::eval_pstfunc {w func} {
    if {$func == {}} return
    if {[regexp {%w} $func]} {regsub -all %w $func $w func} else {append func { } $w}	;#pass widget variable into function
    return [eval $func]
}

# Build the total query from the primary and the additional query
#------------------------------------------
proc dbe::cat_query {query aquery} {
#debug query aquery
    if {$aquery == {}} {
        return $query
    } elseif {[regexp -- {%q} $aquery]} {
        set query [string map [list %q $query] $aquery]
    } else {
        append query ";\n$aquery"
    }
#debug query
    return "$query"
}

#Produce a list of fields suitable for a select clause on the dbe table
#------------------------------------------
proc dbe::fields {w {delim ,}} {
    variable cfig; variable v
    set fields {}
    foreach tag [$w.d tags] {			;#for each field
        if {!$cfig(read$w.$tag)} continue	;#ignore if we don't read this field from db
        if {$cfig(field$w.$tag) != {}} {	;#if field spec is different from tag
            lappend fields $cfig(field$w.$tag)	;#use it
        } elseif {[lcontain {date timestamp} [wmdd::type $cfig(table$w) $tag]]} {
            lappend fields "norm_date($tag)"
        } elseif {[string range [wmdd::type $cfig(table$w) $tag] 0 0] == {_}} {
            lappend fields "array_to_string($tag,',')"
        } else {
            lappend fields $tag			;#else use tag for field name
        }
    }
    if {$delim != {}} {return [join $fields $delim]} else {return $fields}
}

#Distribute a data record into the data fields of the dbe
#------------------------------------------
proc dbe::fill_fields {w data} {
    variable cfig; variable v

    set b [ww::modblock 1]			;#more efficient to block all modified-events
    set f 0; foreach tag [$w.d tags] {		;#for each result field
        set val [lindex $data $f]
        $w.d field $tag set $val
        set v(last.$tag$w) $val			;#to remember previous value
#puts "tag:$tag val:$val"
        incr f
    }
    $w.d modified 0			;#mark as clean
    ww::modblock $b			;#unblock modified events
    ww::modgen $w.d 0			;#force a clean event
    pk $w {_!_}				;#note our record ID from fields
}

#Clear all fields
#------------------------------------------
proc dbe::clear {w args} {
    variable cfig; variable v

    argproc ca(\$s) $args {{mod 1} {focus 1} {pre $cfig(clr.pre$w)} {pst $cfig(clr.pst$w)} {msg $cfig(clr.message$w)} {prompt $cfig(clr.prompt$w)}}
    eval_prefunc $w 0 $ca(pre)
    if {$ca(mod) && [$w modified] && $ca(prompt)} {
        if {[dia::ask $ca(msg)? 0 OK Cancel] != 0} {return 0}
    }

    $w.d initialize
    foreach {sw va} [$w.d get] {set v(last.$sw$w) $va}	;#init previous values
    pk $w {}
    checkfield $w clear
    foreach i {dlr upr} {m_endis $w $i disabled}
    eval_pstfunc $w $ca(pst)
    
    foreach sl $cfig(slaves$w) {		;#attempt to clear slaves too
        catch {eval $sl clear -focus 0}		;#some widget types can't clear (like reports)
    }

    if {$ca(focus) && $cfig(focus$w) != {}} {
        after idle "update; focus [$w field $cfig(focus$w) entry w]"	;#we got hangs from slave dbe's without the "after idle" and update, also some hangs after checkfield issued warnings
#        focus [$w field $cfig(focus$w) entry w]				;#fixed now with -focus 0 in dbp::clear (hmm, guess not fixed yet...)
    }
    return 1
}

#Delete the currently showing record
#------------------------------------------
proc dbe::delete {w args} {
    variable cfig; variable v

    argproc ca(\$s) $args {{pre $cfig(dlr.pre$w)} {pst $cfig(dlr.pst$w)} {prompt $cfig(dlr.prompt$w)} {sql 0} {clear 1} {auto $cfig(auto$w)} {msg $cfig(dlr.message$w)}}
    
    set aquery [eval_prefunc $w $ca(sql) $ca(pre)]
    if {[set where [keywhere $w]] == {}} {return 0}
    set query "delete from $cfig(table$w) where $where"
#puts "query:$query aquery:$aquery"
    if {!$ca(sql) && $ca(prompt)} {if {[dia::ask $ca(msg)? 0 OK Cancel] != 0} {return 0}}
    if {$ca(sql)} {return $query}
    set pgres [sql::exe [cat_query $query $aquery] -t 1]
    set cnt [pg_result $pgres -cmdTuples]
    pg_result $pgres -clear
    if {$cnt < 1 || $cnt == {}} {dia::warn "Record not deleted"; return 0}

    pk $w {}			;#erase the primary key
    foreach i {del upd} {m_endis $w $i disabled}
    foreach p $cfig(pwidget$w) {if {$ca(auto)} {$p reload}}
    eval_pstfunc $w $ca(pst)
    return 1
}

# Load any fields derived from a master widget
#------------------------------------------
proc dbe::master {w {check 0}} {
    variable cfig

#puts "masters:$cfig(master$w)"
    foreach ma $cfig(master$w) {		;#set foreign keys for any table(s) we're related to
#puts "master:$ma"
        if {[catch {eval $ma cget table} tab]} {continue}
#puts " tab:$tab"
        foreach rec [wmdd::columns_fk $cfig(table$w) $tab] {
            lassign $rec cols fcols
#puts "  cols:$cols fcols:$fcols"
            set i 0; foreach col $cols {
                set ftag [lindex $fcols $i]; incr i
                if {[catch {set newval [eval $ma get $ftag]}]} continue		;#fields may not exist in one or the other widget
                if {[catch {set oldval [$w.d field $col get]}]} continue
                set title [$w.d field $col title cget -text]
                if {$check && $newval != $oldval} {
                    if {[set res [dia::ask "Column $title ($col) is currently: $oldval.  Change it to: $newval?" 0 {Yes, Change it} {No, Leave the Same} Cancel]] < 0} {return 0}
                    if {$res >= 1} continue
                }
                $w.d field $col set [eval $ma get $ftag]
#puts "  col:$col val:[eval $ma get $ftag]"
            }
        }
    }
    return 1
}

#Add a new record with the information showing
#------------------------------------------
proc dbe::add {w args} {
    variable cfig; variable v
    argproc ca(\$s) $args {{mod 1} {pre $cfig(adr.pre$w)} {pst $cfig(adr.pst$w)} {prompt $cfig(adr.prompt$w)} {sql 0} {reload $cfig(adr.reload$w)} {msg $cfig(adr.message$w)} {auto $cfig(auto$w)}}

    if {![master $w]} {return 0}
    set aquery [eval_prefunc $w $ca(sql) $ca(pre) 1]
#puts "aquery:$aquery"
    if {!$ca(sql)} {
        if {$ca(mod) && ![$w modified]} {
            if {[dia::ask {No fields yet edited} 0 {Add Anyway} Cancel] < 0} {return 0}
        } elseif {$ca(prompt)} {
            if {[dia::ask $ca(msg)? 0 OK Cancel] != 0} {return 0}
        }
    }
    set fields {}			;#holds fieldnames
    set values {}			;#holds values
    foreach {tag val} [$w.d get] {
        set fn $w.$tag
#puts "w:$w fn:$fn"

        if {$cfig(field$fn) == {}} {set fname $tag} else {set fname $cfig(field$fn)}
        if {!$cfig(write$fn)} continue			;#skip non-writable fields
        if {![$w.d check $tag -rep 1]} {return 0}	;#check field against any templates
        if {$val == {} && ![wmdd::nonull $cfig(table$w) $tag]} continue	;#don't write empty fields (if the column can accept nulls)

        lappend fields $tag			;#keep track of the fields we're writing
        if {[set val [sql::quote $cfig(table$w) $tag $val 0]] == {}} {return 0}
        set v(last.$tag$w) $val			;#remember previous value
        lappend values $val
    }
    if {$fields == {} || $values == {}} {dia::warn "Nothing to add"; return 0}
    
    set query "insert into $cfig(table$w) ([join $fields ,]) values ([join $values ,])"
    if {$cfig(foid$w) == {}} {append query " returning [join $cfig(pkey$w) ,]"}
    set query [cat_query $query $aquery]
#debug query
    if {$ca(sql)} {return $query}
    if {[set pgres [sql::exe $query -t 1]] == 0} {return 0}

#    set cnt [pg_result $pgres -numTuples]	;#if tuples returned, there may be a new primary key value
    if {[pg_result $pgres -numTuples] >= 1} {
        if {$ca(reload)} {ldrec $w -mod 0 [pg_result $pgres -getTuple 0]}
        $w modified 0
    } elseif {[pg_result $pgres -cmdTuples] >= 1 && $cfig(foid$w) != {} && [set tupoid [pg_result $pgres -oid]] > 0} {
        if {$ca(reload)} {ldrec $w -mod 0 -where "$cfig(foid$w) = $tupoid"}
    } else {
        dia::brief {The record was not added}
        pg_result $pgres -clear
        return 0
    }
    pg_result $pgres -clear
    foreach p $cfig(pwidget$w) {if {$ca(auto)} {$p reload -autoload 0}}
    eval_pstfunc $w $ca(pst)
    return 1
}

#Update the current record with all changes
#------------------------------------------
proc dbe::updrec {w args} {
    variable cfig; variable v

    argproc ca(\$s) $args {{warn 1} {pre $cfig(upr.pre$w)} {pst $cfig(upr.pst$w)} {msg $cfig(upr.message$w)} {prompt $cfig(upr.prompt$w)} {sql 0} {reload $cfig(upr.reload$w)} {auto $cfig(auto$w)}}
    if {[pk $w] == {}} {dia::err "No record loaded"; return 0}
    if {![master $w 1]} {return 0}
    set aquery [eval_prefunc $w $ca(sql) $ca(pre) 1]
    if {!$ca(sql) && $ca(prompt)} {if {[dia::ask $ca(msg)? 0 OK Cancel] != 0} {return 0}}
    if {[set where [keywhere $w]] == {}} {return 0}	;#where primary key...

    set updates {}				;#field update clause
    foreach {tag val} [$w.d get] {
        set fn $w.$tag
        if {!$cfig(write$fn)} continue			;#exclude non-writable fields
        if {$val == $v(last.$tag$w)} continue		;#exclude fields that haven't changed (or: ![$w.d $tag modified])
        if {![$w.d check $tag -rep 1]} {return 0}	;#check field against any templates
        set qval [sql::quote $cfig(table$w) $tag $val]
        if {$qval == {}} {return 0}
        lappend ltag $tag
        lappend updates "$tag = $qval"
    }
    if {[llength $updates] <= 0} {		;#if no updates to do
        set query {}
    } else {
        set query "update $cfig(table$w) set [join $updates ,] where $where"
    }
    if {$ca(sql)} {return $query}
    if {$query == {}} {			;#if no updates to do
        if {$ca(warn)} {dia::warn "Nothing modified"}
        modhand $w 0
        return 0
    }
    if {$cfig(foid$w) == {}} {append query " returning [join $cfig(pkey$w) ,]"}
    set query [cat_query $query $aquery]
#debug query
    if {[set pgres [sql::exe $query -t 1]] == 0} {return 0}
    if {[pg_result $pgres -numTuples] >= 1} {
        if {$ca(reload)} {ldrec $w -mod 0 [pg_result $pgres -getTuple 0]}	;#pkey can possibly have a new value now
    } elseif {[pg_result $pgres -cmdTuples] >= 1 } {
	pk $w {_!_}                         ;#in case pk was changed
  	if {$ca(reload)} {ldrec $w -mod 0 [pk $w]}          ;#if no reload, v(last*) values don't get updated...
    } else {
        dia::warn "The command did not update any record"
        pg_result $pgres -clear
        return 0
    }
    pg_result $pgres -clear

    foreach p $cfig(pwidget$w) {if {$ca(auto)} {$p reload}}
    eval_pstfunc $w $ca(pst)
    $w modified 0
    modhand $w 0
    return 1
}

#Perform the specified backend function on the current record
#------------------------------------------
proc dbe::func {w func args} {
    variable cfig; variable v

    argnorm {{sql 2} {reload 1} {prompt 2} {modified 2 mod}} args
    array set ca [list sql 0 prompt 0 auto $cfig(auto$w) mod $cfig(ldr.prompt$w) reload $cfig(upr.reload$w)]
    foreach sw {sql auto prompt mod reload} {xswitchs $sw args ca($sw)}

    if {[pk $w] == {}} {dia::err "No record loaded"; return 0}
    if {!$ca(sql) && $ca(prompt)} {if {[dia::ask "Perform function: $func on the current record?" 0 OK Cancel] != 0} {return 0}}
    if {[set where [keywhere $w]] == {}} {return 0}		;#where primary key...

    if {$ca(mod) && [$w modified]} {
        if {[dia::ask "Modified fields in \"[$w menu menu cget -text]\" pane not yet saved" 0 "Run Function $func Anyway" Cancel] < 0} {return 0}
    }

    set karr {}
    set pkval [pk $w]
    set i 0; foreach tag $cfig(pkey$w) {
        set fval [lindex $pkval $i]
        if {[set val [sql::quote $cfig(table$w) $tag [lindex $pkval $i]]] == {}} {return {}}
        lappend karr $val
        incr i
    }
#debug karr
    set query "select [join $cfig(pkey$w) ,] from ${func}([join [concat $karr $args] ,])"	;#add user specified args after primary key
#debug query
    if {$ca(sql)} {return $query}
    if {[set pgres [sql::exe $query -t 1]] <= 0} {return 0}
#    set cnt [pg_result $pgres -numTuples]
    if {[pg_result $pgres -numTuples] < 1} {
        dia::brief {The function had no effect}
        pg_result $pgres -clear
        return 0
    } 
    set res [pg_result $pgres -getTuple 0]
    pg_result $pgres -clear
#puts "pgres:$pgres res:$res"

    if {$ca(reload)} {
        ldrec $w -mod 0 $res
        $w modified 0
    }
    foreach p $cfig(pwidget$w) {if {$ca(auto)} {$p reload}}
    return 1
}

#Return (or set) the previous value for a field
#------------------------------------------
proc dbe::last {w tag args} {
    variable cfig; variable v
    if {$args != {}} {set v(last.$tag$w) $args}
    return $v(last.$tag$w)
}

#Enable/disable a menu item (and its shortcut button)
#------------------------------------------
proc dbe::m_endis {w tag state} {
    catch {$w.t menu entryconfigure $tag -state $state}	;#it might not exist
}

#Check a field to see if the user needs to populate it
#This is typically called from a pre_add or pre_update script
#------------------------------------------
proc dbe::checkfield {w cmd args} {
    variable cf
#puts "checkfield w:$w cmd:$cmd args:$args"    
    set cmd [unabbrev {{force 1} {request 1} {verify 1} {prompt 1} {clear 1}} $cmd]
    if {$cmd == {prompt}} {
        set retval {?}
        if {[llength $cf(tags$w)] <= 0} {return 1}		;#everything's OK
        if {[llength $cf(tags$w)] > 1} {set pl {s}} else {set pl {}}	;#use plural in prompt
#debug cf(vers$w) cf(reqs$w) cf(fors$w) cf(tags$w)
        set nw .dbe_checkfield
        set strg "Certain data fields should be examined before you can continue:"
        if {[llength $cf(vers$w)] > 0} {
            append strg "\n\nFields marked with a blue title contain a value but you are asked to verify its accuracy."
            after idle "$nw.msg configure -bg lightblue"
        }
        if {[llength $cf(reqs$w)] > 0} {
            append strg "\n\nFields marked with a yellow title should be filled in with a valid value if possible."
            after idle "$nw.msg configure -bg yellow"
        }
        if {[llength $cf(fors$w)] > 0} {
            append strg "\n\nFields marked with a red title must be filled in with a valid value."
            append strg "\n\nPlease correct the marked field${pl}."
            after idle "$nw.msg configure -bg red"
            if {[dia::dia $nw -mess $strg -default 0 -buttons {Recheck Cancel} -place c] < 0} {set retval 0}
        } else {
            append strg "\n\nPlease examine the marked field${pl}."
            set res [dia::dia $nw -mess $strg -default 0 -buttons {Recheck {Continue Anyway} Cancel} -place c]
            if {$res < 0}	{set retval 0}
            if {$res == 1}	{set retval 1}
        }
        checkfield $w clear
        return $retval

    } elseif {$cmd == {clear}} {
        if {[info exists cf(tags$w)]} {
            foreach tag $cf(tags$w) {[$w.d field $tag title w] configure -bg $cf(bg.$tag$w)}
        }
        lassign {} cf(fors$w) cf(reqs$w) cf(vers$w) cf(tags$w)
    }

    foreach tag $args {
        set val [$w.d get $tag]
        if {$val == {} && $cmd == {force}} {
                set color red;		lappend cf(fors$w) $tag
        } elseif {$val == {} && $cmd == {request}} {
                set color yellow;	lappend cf(reqs$w) $tag
        } elseif {$cmd == {verify}} {
                set color lightblue;	lappend cf(vers$w) $tag
        } else {
            continue			;#field seems OK
        }
        lappend cf(tags$w) $tag
        set cf(bg.$tag$w) [[set fw [$w.d field $tag title w]] cget -bg]
        $fw configure -bg $color
    }
}

#Add a menu item into a dbe widget
#------------------------------------------
proc dbe::m_add {w tag args} {
    variable cfig
#puts "M_add w:$w tag:$tag args:$args"
    argform {text command help} args

    if {[lcontain {adr clr dlr upr prv rld nxt ldr} $tag]} {	;#if a built-in command
        foreach f {s text help com und} {
            if {![regexp -- -$f $args]} {lappend args -$f $cfig($tag:$f)}
        }
    }
    regsub -all %w $args $w args
#puts "BARGS:$args"
    eval $w.t menu mi $tag $args
}

# Yield/restore preferences
#------------------------------------------
proc dbe::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    
#    lappend parr [eval list mdew pref [$w.d pref]]	;#restore mdew fields from last save
    set mdew {}
    foreach rec [$w.d pref] {		;#don't save prefs that restore fields (dbe inits these anyway)
        if {[lindex $rec 0] != {set}} {lappend mdew $rec}
    }
    lappend parr [eval list mdew pref $mdew]

    lappend parr [list configure -adr.prompt $cfig(adr.prompt$w) -upr.prompt $cfig(upr.prompt$w) -dlr.prompt $cfig(dlr.prompt$w)]
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

#Update dependent fields when their source field is edited/changed
#------------------------------------------
proc dbe::auxupdate {w {sflds {}} {force 0}} {
    variable cfig
    variable v
#puts "auxupdate w:$w sflds:$sflds dfields:$cfig(dfields$w)"

    if {[info exists cfig(inauxup)]} return	;#avoid recursion (can lose/gain focus if query below generates an error)
    set cfig(inauxup) 1
    if {$sflds == {}} {			;#if no source fields given, find all
        foreach tag [$w.d tags] {	;#for all entries, find the ones referenced by dependent fields
            set val $cfig(fdep$w.$tag)
            if {$val != {} && ![lcontain $sflds $val]} {lappend sflds $val}
        }
    }
    foreach sf $sflds {			;#now find all fields that depend on each source field
        if {![$w field $sf modified]} continue	;#skip unmodified fields
        set dfs {}
        foreach df $cfig(dfields$w) {
            if {$cfig(fdep$w.$df) == $sf} {lappend dfs $df}
        }
#debug sf dfs
        set sval [$w get $sf]
        foreach df $dfs {		;#for each dependent field
#debug df sval cfig(query$w.$df)
            set dval {}
            if {$sval != {}} {
                set query "select distinct $df from $cfig(table$w) where $sf = [sql::quote $cfig(table$w) $sf $sval] limit 1;"	;#distinct seems to make it faster in some cases
                if {$cfig(query$w.$df) != {}} {regsub -all % $cfig(query$w.$df) [sql::quote $cfig(table$w) $sf $sval] query}
#debug query
                lassign [sql::one $query] dval
            }
            if {[$w get $df] != $dval} {$w set $df $dval}	;#so we don't mark dirty needlessly
        }
    }
    unset cfig(inauxup)
}

# Call when "contents modified" status changes
#------------------------------------------
proc dbe::modhand {w dirty} {
    variable cfig

#puts "dbe::modhand w:$w dirty:$dirty"
    if {$dirty} {
        $w.t.cln configure -image frown -bg pink
        if {[pk $w] != {}} {m_endis $w upr normal}
    } else {
        $w.t.cln configure -image smile -bg lightgreen
        if {$cfig(master$w) == {}} {
            m_endis $w upr disabled
        } else {
            m_endis $w upr normal
        }
    }
}

# Add a window from this widget's slave list
#------------------------------------------
proc dbe::slaves {w slave} {
    variable cfig
    if {![lcontain $cfig(slaves$w) $slave]} {lappend cfig(slaves$w) $slave}
}

# Get configuration
#------------------------------------------
proc dbe::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget opt:$opt star:$cfig(star)"
    if {[lcontain $cfig(star) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure the dbe
#------------------------------------------
proc dbe::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    foreach tag $cfig(star) {xswitch $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Constructor
#------------------------------------------
proc dbe::dbe {w args} {
    variable cfig
    variable v

#puts "args:$args"
    argform {table menu} args
    argnorm $cfig(swar) args
    set cfig(table$w) [xswitchs table args]	;#get table name
    lassign [wmdd::table $cfig(table$w)] cfig(title$w) help tkind
    set args "-menu {[list -text "Edit: $cfig(title$w)" -help "A menu of options for viewing and editing records from table:\n$cfig(title$w) ($cfig(table$w)):\n$help"]} $args"		;#default table args
    foreach tag $cfig(sblk) {set cfig($tag$w) [xswitchs $tag args]}
    foreach {tag val} $cfig(sdef) {
        set cfig($tag$w) $val
        xswitchs $tag args cfig($tag$w)
    }
#puts "Args:$args"

#    set cfig(tags$w) {}				;#list of field tags
    lassign {} mvals fvals
    while {[xswitch m args margs] != {}} {	;#for each menu item
        lappend mvals $margs			;#keep specs for menu item
    }

    set zargs {}
    while {[xswitch f args fargs] != {}} {	;#grab all field descriptions
        lappend zargs $fargs
    }
    if {[llength $zargs] <= 0} {		;#if none given
        foreach tag [wmdd::style $cfig(table$w) {_}] {	;#find all the ones that have defaults in the database
            lappend zargs $tag			;#remember field name
        }
    }

    set cfig(dfields$w) {}    
    foreach fargs $zargs {			;#for each field description
        set fargs [lassign $fargs tag]		;#strip off field tag
        argform $cfig(fshort) fargs		;#get rid of shortcut args
        argnorm $cfig(fwar) fargs

        lassign [wmdd::column $cfig(table$w) $tag] title help
        set data [wmdd::value $cfig(table$w) $tag]
        if {[llength $data] > 1} {		;#create a more verbose help message with possible values
            append help "\nValues:"
            foreach rec $data {
                lassign $rec x y z
                append help "\n  $x: ($y) $z"
            }
        }
        set dargs [wmdd::style $cfig(table$w) $tag]	;#get defaults from data dictionary
        argnorm "$cfig(fwar) {special 3 spf}" dargs
        set fargs [concat [list -title $title: -help "$title ($tag):\n$help" -data $data] $dargs $fargs]		;#put defaults first
        if {[set spf [xswitchs spf fargs]] != {}} {
            if {$spf == {exs}} {		;#spf's handled at dbe level
                set spf [list dbe::exist $w %w %d $tag]
                lappend fargs -data $cfig(table$w) -b {-help {Allow the user to choose from values already existing in the database for this field}}
            } elseif {$spf == {dbe}} {
                set data [xswitchs data fargs]
                regsub -all %w $data $w data
                set spf $data
            }
            lappend fargs -spf $spf
        }
#puts "Fargs:$fargs"
        foreach sw $cfig(fblk) {		;#grab dbe args with no defaults
            set cfig($sw$w.$tag) [xswitchs $sw fargs]
            if {$sw == {fdep} && $cfig($sw$w.$tag) != {}} {
                lappend fargs -state readonly -write 0	;#dependent fields must always be unwritable
                lappend cfig(dfields$w) $tag
                after idle "$w.d field $tag button configure -bg blue"
            }
        }
        foreach {sw va} $cfig(fdef) {		;#grab dbe args having defaults
            set cfig($sw$w.$tag) $va		;#set default
            xswitchs $sw fargs cfig($sw$w.$tag)	;#extract switch if present
            if {$sw == {hot} && $cfig($sw$w.$tag)} {
                lappend fargs -insertbackground red -highlightcolor red
                after idle "bind \[$w.d field $tag entry w\] <Return> {$w.t menu invoke adr}"
            }
        }

        lappend fvals -f "$tag $fargs"		;#keep remaining args for mdew
    }
    
    if {$tkind == {v}} {
        set cfig(foid$w) [wmdd::view_oid $cfig(table$w)]	;#get name of oid field for views, if one defined
    }
    if {$cfig(pkey$w) == {}} {			;#if no key given
        set cfig(pkey$w) [wmdd::pkey $cfig(table$w)]	;#get it from database
        if {$cfig(pkey$w) == {}} {error "No primary key defined for table: $cfig(table$w)"}
    }
#puts "w:$w pkey:$cfig(pkey$w): sep:$cfig(pksep$w):"
#puts "frame: w: $w args: $args"
    if {[winfo exists $w]} {eval $w configure -class Dbe $args} else {eval wframe::_frame $w -class Dbe $args}
    widginit $w dbe *$w

#puts "mdew::mdew $w.d $fvals"
    mdew::mdew $w.d {*}$fvals -bind Dbp

    if {$cfig(menu$w) != {}} {
        mbar::mbar $w.t -mb "menu $cfig(menu$w)" 	;#-gmc.bf {-fill x -exp 1}
        pack $w.t -side top -fill x

        label $w.t.cln -help "This tells whether any of the data entries have been changed since the last load or initialization"
        pack $w.t.cln -side right
        bind $w.d <<Modified>> "dbe::modhand $w %s"
        modhand $w 0

        if {$cfig(record$w) != {}} {		;#show current record id
            eval dew::dew $w.t.rid ent -textv dbe::v(recid$w) -just r -help \{The identifying ID (primary key) for the currently loaded record\} -state readonly $cfig(record$w) -takefocus 0
            pack $w.t.rid -side right
        }
    }
    pack $w.d -side top -exp 0 -fill both

    foreach val $mvals {eval m_add $w $val}	;#build menu items
    $w.t menu mi sep
    $w.t menu mi clrp {Clear prompt}	-type checkbutton -variable dbe::cfig(clr.prompt$w) -help {Ask for confirmation before clearing the editing pane}
    $w.t menu mi adrp {Add prompt}	-type checkbutton -variable dbe::cfig(adr.prompt$w) -help {Ask for confirmation before adding a new record}
    $w.t menu mi uprp {Update prompt}	-type checkbutton -variable dbe::cfig(upr.prompt$w) -help {Ask for confirmation before updating a record}
    $w.t menu mi dlrp {Delete prompt}	-type checkbutton -variable dbe::cfig(dlr.prompt$w) -help {Ask for confirmation before deleting a record}
    $w.t menu mi ldrp {Load prompt}	-type checkbutton -variable dbe::cfig(ldr.prompt$w) -help {Ask for confirmation before loading a new record when the current editing pane has been modified}
    $w.t menu mi sep
    $w.t menu mi print {Print Grab}	-command "print::grab $w" -help {View a printable rendering of the editing pane}
    $w.t menu mi prev  {Preview Table}	-command "dbp::table $cfig(table$w) -ewidget $w" -help "Launch a toplevel window containing a preview listing for the table: $cfig(title$w)"
    $w.t menu mi sep
    $w.t menu mi help {Widget Help}	-command {help::locate dbe} -help {Instructions on using the DBE (DataBase Editing) Widget}

    foreach tag $cfig(dfields$w) {		;#prepare dependent fields to clear/update
        set ent [$w.d field $cfig(fdep$w.$tag) w]
#        bind $ent <<Changed>> "dbe::auxupdate $w $cfig(fdep$w.$tag)"	;#triggers on internal changes :(
        foreach ev {<FocusOut>} {		;#also <leave>?
            bind $ent $ev "dbe::auxupdate $w $cfig(fdep$w.$tag)"
        }
    }

    set cfig(hist$w) {}
    set cfig(hidx$w) 0
    pk $w {}
    if {$cfig(preclear$w)} {
        clear $w -prompt 0 -mod 0
    } else {
        foreach {sw va} [$w.d get] {set v(last.$sw$w) $va}	;#init previous values
    }
    return $w
}

#The widget command
#------------------------------------------
proc dbe::wcmd {w cmd args} {
    variable cfig; variable v
    set cmd [unabbrev {{menu 2} {clear 2} {add 2} {update 2} {delete 2} {last 2} {checkfield 3} {next 2} {reload 3} {previous 4} {load 2} {primarykey 3 pk} {keyload 4} {keywhere 4} {frame 3} {force 3} {request 3} {verify 3} {preference 4 pref} {pwidget 2} {configure 2} {cget 2} {quoted 1} {function 2 func} {slaves 2}} $cmd]
    if {[lcontain {pref clear add delete last checkfield keyload pk quoted keywhere slaves cget configure func} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact $cmd {
        {w}		{return $w}
        {menu}		{return [eval $w.t $args]}
        {next}		{eval ldhist $w 1}
        {reload}	{eval ldhist $w 0}
        {previous}	{eval ldhist $w -1}
        {load}		{eval ldrec $w $args}
        {where}		{eval keywhere $w $args}
        {update}	{eval updrec $w $args}
        {force}		{eval checkfield $w force $args}
        {verify}	{eval checkfield $w verify $args}
        {request}	{eval checkfield $w request $args}
        {auxupdate}	{eval auxupdate $w $args}
        {pwidget}	{eval $cfig(pwidget$w) $args}
        {frame}		{return [eval _$w $args]}
        {mdew}		{return [eval $w.d $args]}
        {obey}		{}
        {default}	{return [eval $w.d \$cmd $args]}
    }
}

if {[info commands locawyze] != {}} {locawyze dbe}
