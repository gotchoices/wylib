# Allow the user to create/edit a list of logic blocks: (this == that) and !(the != other)
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- enable/disable rhs settable fields (constant only)
#X- disallow case, rhs for certain operators
#X- disallow lhs for blank operator (disabled)
#X- allow fields to be flat or hierarchical
#X- implement dump call
#X- implement prefs call
#X- implement mailman using this widget
#X- seam this back into dbs.tcl
#X- right click on value returns possible choices
#- 

option add *Loglst*Text.height 10 widgetDefault
option add *Loglst*Text.width 90 widgetDefault
option add *Loglst*Scrollbar.width 10 widgetDefault
option add *Loglst.*Button.padY 0 widgetDefault
option add *Loglst.*Menubutton.padY 0 widgetDefault

namespace eval loglst {
    namespace export loglst dia
    variable cfig
    variable v				;#holds dynamic values

    image create bitmap b-lf -data "#define lfs_width 8\n#define lfs_height 9\nstatic unsigned char lfs_bits[] = {\n0xc0, 0xf0, 0xfc, 0xfe, 0xff, 0xfe, 0xfc, 0xf0, 0xc0};"
    image create bitmap b-rt -data "#define rts_width 8\n#define rts_height 9\nstatic unsigned char rts_bits[] = {\n0x03, 0x0f, 0x3f, 0x7f, 0xff, 0x7f, 0x3f, 0x0f, 0x03};"
    image create photo .img-mre -file $lib::cfig(imgdir)/plus.png
    image create photo .img-fwr -file $lib::cfig(imgdir)/minus.png
    image create photo .img-clr -file $lib::cfig(imgdir)/clear.png

#    image create bitmap b-cl -data "#define close_width 14\n#define close_height 14\nstatic unsigned char close_bits[] = {\n0xff, 0x3f, 0x01, 0x20, 0x05, 0x28, 0x09, 0x24, 0x11, 0x22, 0x21, 0x21,0xc1, 0x20, 0xc1, 0x20, 0x21, 0x21, 0x11, 0x22, 0x09, 0x24, 0x05, 0x28,0x01, 0x20, 0xff, 0x3f};"

    set cfig(swar) {{menu 2} {left 3 lhs} {value 2 val} {function 2 func} {case 2} {condition 3 cond} {maxmenu 2} {preclear 4} {operator 1 opr} {field 1 fld} {both 2} {blank 2} {contextmenu 3 cmenu} {extension 2 ext}}
    set cfig(sdef) {case nc cond OR maxmenu 36 preclear 1 both 1 blank 1 menu {Logic Builder:} ext {lgc}}
    set cfig(sblk) {val lhs func cmenu}
}

# In/out-dent the specified condition
#------------------------------------------
proc loglst::indent {w x amt} {
    variable v

    incr v(ind:$x$w) $amt		;#change indentation
    if {$v(ind:$x$w) < 0} {set v(ind:$x$w) 0}	;#stop from underflowing
    $w.c$x.sp configure -width [expr ($v(ind:$x$w) + 1) * 10]
}

# Change a conditional from "and" to "or" or back
#------------------------------------------
proc loglst::swapbut {i cnd} {
    lassign $cnd c1 c2
    if {$loglst::v($i) == $c1} {set loglst::v($i) $c2} else {set loglst::v($i) $c1} 
}

# Write a new comparison function operator into a clause
#------------------------------------------
proc loglst::setfunc {w x ftag} {
    variable cfig
    variable v
    if {[set v(fnc:$x$w) $ftag] == {}} {
        $w.c$x.fnc configure -text {}
        foreach i {cas rhs lhs not val} {$w.c$x.$i configure -state disabled}
        return
    }
    $w.c$x.fnc configure -text $cfig(title.$ftag.opr$w)	;#show new function on widget

    foreach i {cas rhs lhs not val} {
        if {$cfig($i.$ftag.opr$w)} {
            $w.c$x.$i configure -state normal
        } else {
            $w.c$x.$i configure -state disabled
        }
    }
}

# Establish a new field name into the menubutton as "currently selected"
#------------------------------------------
proc loglst::setfield {w x sx ftag} {
    variable cfig
    variable v
#puts " setfield:$sx:$ftag:"
    set v($sx:$x$w) $ftag
    if {$sx == {rhs}} {
        if {$ftag == {}} {		;#if constant rhs value
            pack $w.c$x.val -after $w.c$x.fnc -fill both -side left
            $w.c$x.rhs configure -text {}
        } else {			;#else field rhs value
            pack forget $w.c$x.val
        }
        if {$cfig(both$w)} {
            pack $w.c$x.rhs -before $w.c$x.cas -fill both -side left
        }
    }
    if {$ftag != {}} {		;#lhs or rhs with field value
        if {![info exists cfig(par.$ftag.fld$w)]} {
            error "Unknown field: $ftag"
        } elseif {$cfig(par.$ftag.fld$w) == {}} {
            set title $cfig(title.$ftag.fld$w)
        } else {
            set ptag $cfig(par.$ftag.fld$w)
            set title "$cfig(title.$ptag.fld$w):$cfig(title.$ftag.fld$w)"
        }
        $w.c$x.$sx configure -text $title
    }
}

# Delete the last comparison line in the query spec
#------------------------------------------
proc loglst::delete {w} {
    variable v
    set x $v(ccnt$w)
    if {$x <= 1} return		;#always leave one clause
    incr v(ccnt$w) -1
    destroy $w.c$x		;#is this redundant?
    [set t $w.b] configure -state normal
    $t delete $x.0 end
    $t insert end "\n"
    if {$x > 1} {pack forget $w.c[expr $x - 1].c}
    $t configure -state disabled
}

# Add a clause to the query specification
#------------------------------------------
proc loglst::add {w args} {
    variable cfig
    variable v
#puts "add w:$w args:$args"

#set start [clock clicks -mil]
    argform {left func val not cond ind case} args
    argnorm {{left 2 lhs} {not 2} {function 2 fnc} {value 2 val} {right 2 rhs} {indent 2 ind} {condition 2 cnd} {case 2 cas}} args
    array set ca [list lhs $cfig(lhs$w) fnc $cfig(func$w) val $cfig(val$w) not {} rhs {} cnd $cfig(cond$w) cas $cfig(case$w) ind 0]
    foreach tag {lhs not fnc val rhs ind cnd cas} {xswitchs $tag args ca($tag)}
#puts " func:$cfig(func$w) fnc:$ca(fnc) cnd:$ca(cnd) not:$ca(not)"
    if {[lcontain {Or or o OR O} $ca(cnd)]} {	;#assure valid value
        set ca(cnd) {OR}
    } else {
        set ca(cnd) {AND}
    }
    if {[lcontain {Not not n NOT N !} $ca(not)]} {	;#assure valid value
        set ca(not) {Not}
    } else {
        set ca(not) {}
    }
    if {$ca(ind) < 0} {set ca(ind) 0}

    set x [incr v(ccnt$w)]		;#index of this clause
    set n $w.c$x			;#name of widget to hold this clause
    destroy $n				;#in case it already exists
    frame $n -bd 1 -relief raised	;#frame to hold it all

    [set t $w.b] configure -state normal	;#show new widget in text window
    $t window create {end - 1 chars} -window $n
    $t insert end "\n"
    $t configure -state disabled

    frame $n.c				;#frame to old and/or condition
    frame $n.is -width 10 -bg white ;#-bg #ffff80
    button $n.rt -image b-rt -pady 0 -bd 1 -command "loglst::indent $w $x 1" -help {Move this condition to a more inner grouping}
    button $n.lf -image b-lf -pady 0 -bd 1 -command "loglst::indent $w $x -1" -help {Move this line to a more outer grouping} -rep 1
    set loglst::v(ind:$x$w) $ca(ind)	;#indentation (nesting) level
    frame $n.sp -width [expr ($ca(ind) + 1) * 10] -bg white ;#-bg #ffff80
    set loglst::v(cnd:$x$w) $ca(cnd)
    button $n.cnd -bd 1 -textvariable loglst::v(cnd:$x$w) -anchor w -command "loglst::swapbut cnd:$x$w {AND OR}" -help {Toggle "and" (both conditions must be true) to/from "or" (either must be true)}
    frame $n.es -bg white ;#-bg #ffff80
    pack $n.is $n.lf $n.rt $n.sp $n.cnd -in $n.c -side left -fill both
    pack $n.es -in $n.c -side left -fill both -expand yes
    if {$x > 1} {pack $w.c[expr $x - 1].c -side bottom -fill x -expand yes}	;#don't pack and/or for last clause in list

    frame $n.f; pack $n.f -side top	;#frame to hold comparison clause
    menubutton $n.lhs -bd 1 -menu $n.lhs.m0 -relief raised -cursor top_left_arrow -indicatoron yes -anchor w -help {Select the field this criterion will compare}

    button $n.not -text {} -textvariable loglst::v(not:$x$w) -padx 2 -width 3 -bd 1 -command "loglst::swapbut not:$x$w {Not {}}" -help "(blank): Use the comparison specified to the right\nNot: Negate the comparison function (do the opposite)"
    set v(not:$x$w) $ca(not)
    menubutton $n.fnc -bd 1 -menu $n.fnc.m -relief raised -cursor top_left_arrow -indic yes -help {Select the type of comparison to use in this criterion}
    menubutton $n.rhs -menu $n.rhs.m0 -bd 1 -relief raised -indic 1 -help "Select \"Constant\" to type in a value, or select a database field to use in the comparison"

    entry $n.val -textv loglst::v(val:$x$w) -help "Type here the value to compare to\nRight click for additional functions"
    set v(val:$x$w) $ca(val)
    if {$cfig(cmenu$w) != {}} {
        bind $n.val <Button-3> "$cfig(cmenu$w) $x"
    }
    
    bind $n.val <Return> "event generate $w <<Ok>>"
    bind $n.val <KP_Enter> "event generate $w <<Ok>>"
    set v(cas:$x$w) $ca(cas)
    button $n.cas -textvariable loglst::v(cas:$x$w) -width 2 -bd 1 -command "loglst::swapbut cas:$x$w {ca nc}" -help "ca: Consider upper/lower case as distinct in this comparison (if applicable)\nnc: Ignore upper/lower case"
    pack $n.lhs $n.not $n.fnc $n.cas -in $n.f -side left -fill both

    setfield $w $x rhs $ca(rhs)
    setfield $w $x lhs $ca(lhs)
    setfunc $w $x $ca(fnc) 

    menu $n.lhs.m0
    menu $n.rhs.m0
    field_menus $w $x		;#add menus for all applicable fields/subfields

    menu $n.fnc.m		;#menu of comparison functions
    foreach otag $cfig(oprs$w) {
#puts otag:$otag
        $n.fnc.m add command -label $cfig(title.$otag.opr$w) -help $cfig(help.$otag.opr$w) -command "loglst::setfunc $w $x $otag"
    }
    if {$cfig(blank$w)} {
        $n.fnc.m add command -label Disabled -help {Ignore this comparison} -command "loglst::setfunc $w $x {}"
    }
    focus $n.val
#puts "loglst::add [expr [clock clicks -mil] - $start]"
}

# Load the query widget with the specified statement logic
# should handle either name/value pairs or switch (-name value) format
#------------------------------------------
proc loglst::setval {w logic} {
    variable cfig
#puts "loglst::setval $w $logic"
    clear $w 0
    foreach ln $logic {
#puts " ln:$ln"
        set sargs {}
        foreach {sw va} $ln {
            if {[string range $sw 1 1] == {-}} {lappend sargs $sw $va} else {lappend sargs -$sw $va}
        }
        eval $w add $sargs
    }
}

# Output a list expressing the contents of the logic statement
#------------------------------------------
proc loglst::get {w args} {
    variable cfig
    variable v
    argform {index} args
    argnorm {{index 1} {switches 1 sw}} args
    foreach s {index sw} {set $s [xswitchs $s args]}
    if {$sw != {}} {set sw {-}}
#puts "loglst::get w:$w index:$index"
    
    set rarr {}
    for {set i 1} {$i <= $v(ccnt$w)} {incr i} {	;#for each conditional
        lappend rarr [list ${sw}left [lindex $v(lhs:$i$w) 0] ${sw}not $v(not:$i$w) ${sw}function $v(fnc:$i$w) ${sw}value $v(val:$i$w) ${sw}right [lindex $v(rhs:$i$w) 0] ${sw}case $v(cas:$i$w) ${sw}indent $v(ind:$i$w) ${sw}condition $v(cnd:$i$w)]
    }
    if {$index == {}} {
        return $rarr			;#return all clauses
    } else {
        return [lindex $rarr [expr $index - 1]]	;#return a single clause (index is 1-based)
    }
}

# Populate the field menus on a line with all available tables/fields
#------------------------------------------
proc loglst::field_menus {w {x {}}} {
    variable cfig
    variable v

    proc fmenu {mname} {			;#create a menu even if one already exists with the same name
        if {[winfo exists $mname]} {destroy $mname}
        menu $mname
    }
#puts "field_menus w:$w x:$x"
    if {$x == {}} {				;#if no clause index specified
        for {set i 1} {$i <= $v(ccnt$w)} {incr i} {	;#for each clause
            field_menus $w $i			;#call this routine
        }
        return
    }
    
    set n $w.c$x			;#window name for this clause
    $n.lhs.m0 delete 0 end		;#delete any existing menu items
    $n.rhs.m0 delete 0 end
    $n.rhs.m0 add command -label Constant -command "loglst::setfield $w $x rhs {}"

#puts " pars:$cfig(pars$w)"

    foreach par $cfig(pars$w) {				;#for each parent menu
        foreach sx {lhs rhs} {				;#for left and right sides of comparison
#puts " par:$par sx:$sx"
            if {$par == {}} {				;#for toplevel items
                set pmenu $n.$sx.m			;#add them into the main menubutton
            } else {
                $n.$sx.m0 add cascade -label "$cfig(title.$par.fld$w)" -menu $n.$sx.${par}_m0 -help $cfig(help.$par.fld$w)
                fmenu [set pmenu $n.$sx.${par}_m]0	;#else create a cascade for sub-items
            }
            set m 0; set z 0				;#for cascade menus if too many fields
            foreach tag $cfig(flds$w) {			;#for each field
                if {$cfig(par.$tag.fld$w) != $par || [lcontain $cfig(pars$w) $tag]} continue	;#which belongs to this parent menu
#puts "       tag:$tag"
                if {[incr z] > $cfig(maxmenu$w)} {	;#if too many fields for one menu
                    set z 0				;#reset field counter
                    ${pmenu}$m add cascade -label {More-->} -menu [fmenu ${pmenu}[incr m]]
                }
                ${pmenu}$m add command -label "$cfig(title.$tag.fld$w)" -command "loglst::setfield $w $x $sx $tag" -help $cfig(help.$tag.fld$w)
            }
        }
    }
}

# Delete everything in the query pane
#------------------------------------------
proc loglst::clear {w {add 1}} {
    variable cfig
    variable v
#set start [clock clicks -mil]
    [set t $w.b] configure -state normal
    $t delete 0.0 end
    set v(ccnt$w) 0			;#how many clauses in query
    $t configure -state disabled
#puts "loglst::clear [expr [clock clicks -mil] - $start]"
    if {$add} {add $w}
}

# Yield/restore preferences
#------------------------------------------
proc loglst::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {
        clear $w 0
        eval pref::restore $args
    } else {
        set parr {}
        for {set i 1} {$i <= $v(ccnt$w)} {incr i} {	;#for each conditional
            lappend parr [list add -left [lindex $v(lhs:$i$w) 0] -not $v(not:$i$w) -func $v(fnc:$i$w) -val $v(val:$i$w) -right [lindex $v(rhs:$i$w) 0] -cas $v(cas:$i$w) -ind $v(ind:$i$w) -cnd $v(cnd:$i$w)]
        }
#puts "Dump $w pref:[join $parr "\n"]"
        return $parr
    }
}

#Add a new operator
#------------------------------------------
proc loglst::opr_add {w args} {
    variable cfig
    variable v
#puts "opr_add: $w $args"

    argform {tag title help} args
    argnorm {{title 1} {help 1} {case 1 cas} {rhs 1} {lhs 1} {not 2} {value 2 val}} args
    if {[set tag [xswitchs tag args]] == {}} return
    lappend cfig(oprs$w) $tag
    foreach t {title help} {set cfig($t.$tag.opr$w) [xswitchs $t args]}
    foreach t {cas rhs lhs not val} {
        set cfig($t.$tag.opr$w) 1
        xswitchs $t args cfig($t.$tag.opr$w)
    }
}

#Add a new field
#------------------------------------------
proc loglst::fld_add {w args} {
    variable cfig
    variable v
#puts "fld_add: $w $args"

    argform {tag title help} args
    argnorm {{title 2} {parent 1 par} {help 1}} args
    if {[set tag [xswitchs tag args]] == {}} return
    if {![lcontain $cfig(flds$w) $tag]} {lappend cfig(flds$w) $tag}	;#only add if we don't already have it
    foreach t {title par help} {set cfig($t.$tag.fld$w) [xswitchs $t args]}
    if {![lcontain $cfig(pars$w) $cfig(par.$tag.fld$w)]} {		;#keep list of parent menus
        lappend cfig(pars$w) $cfig(par.$tag.fld$w)
    }	
}

#Delete one or more existing fields
#If it is a parent field, drop its children too
#------------------------------------------
proc loglst::fld_drop {w args} {
    variable cfig
    variable v

#puts "fld_drop w:$w args:$args"
#puts "  before: $cfig(flds$w)"
    foreach tag $args {
        if {[set idx [lsearch -exact $cfig(pars$w) $tag]] >= 0} {	;#find it in parent list
            set cfig(pars$w) [lreplace $cfig(pars$w) $idx $idx]		;#and drop it
            foreach ctag $cfig(flds$w) {				;#then search for children
                if {$cfig(par.$ctag.fld$w) == $tag && ![lcontain $args $ctag]} {
                    if {[set idx [lsearch -exact $cfig(flds$w) $ctag]] >= 0} {	;#find its location in list
                        set cfig(flds$w) [lreplace $cfig(flds$w) $idx $idx]		;#and drop it
                    }
                }
            }
        }
    }

    foreach tag $args {					;#now drop parents
        if {[set idx [lsearch -exact $cfig(flds$w) $tag]] >= 0} {
            set cfig(flds$w) [lreplace $cfig(flds$w) $idx $idx]
        }
    }
#puts "  after: $cfig(flds$w)"
    field_menus $w		;#rebuild menus after drop
}

# Write the current logic statement to a file
#------------------------------------------
proc loglst::export_rules {w {fname {}}} {
    variable cfig
    variable v

    if {$fname == {}} {
       if {[sfile::dia "Export to what filename:" -dest fname -ext .$cfig(ext$w) -mask *.$cfig(ext$w)] < 0} return
    }
#puts "pref:[pref $w]:"
    write_file $fname $cfig(ext$w) [pref $w]
    dia::brief "Saved to file $fname" 300
}

# Load a saved query from a file
#------------------------------------------
proc loglst::import_rules {w {fname {}}} {
    variable cfig
    variable v

    if {$fname == {}} {
        if {[sfile::dia "Import what file:" -dest fname -ext .$cfig(ext$w) -mask *.$cfig(ext$w)] < 0} return
    }
    set cont [lassign [read_file $fname] fmt]
    if {$fmt != {$cfig(ext$w)}} {dia::err "Unknown file format $fmt"; return}
    eval pref $w $cont
}

# Get configuration for a logic list
#------------------------------------------
proc loglst::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget w:$w option:$option opt:$opt"
    if {[lcontain {case maxmenu preclear both blank ext val lhs func} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing logic list
#------------------------------------------
proc loglst::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(sblk)       {xswitchs $tag args cfig($tag$w)}
    foreach {tag val} $cfig(sdef) {xswitchs $tag args cfig($tag$w)}

    set upd 0
    while {[xswitch fld args va] != {}}  {eval fld_add $w $va; set upd 1}	;#collect fields
    while {[xswitch drop args va] != {}} {eval fld_drop $w $va; set upd 1}
    if {$upd} {field_menus $w}

#We don't have an opr_menus call yet so we can't add/drop operators
#    set upd 0
#    while {[xswitch opr args va] != {}} {eval opr_add $w $va; set upd 1}	;#collect operators
#    if {$upd} {opr_menus $w}

    if {$args != {}} {eval _$w configure $args}
    return {}
}

#Create the logic expression builder window and initialize it
#------------------------------------------
proc loglst::loglst {w args} {
    variable cfig
    variable v

    argform {left function value} args
    argnorm $cfig(swar) args
    foreach tag $cfig(sblk) {set cfig($tag$w) [xswitchs $tag args]}
    foreach {tag val} $cfig(sdef) {set cfig($tag$w) $val; xswitchs $tag args cfig($tag$w)}

    set cfig(pars$w) {}						;#parent menus
    set cfig(flds$w) {}
    while {[xswitch fld args va] != {}} {eval fld_add $w $va}	;#collect fields

    set cfig(oprs$w) {}
    while {[xswitch opr args va] != {}} {eval opr_add $w $va}	;#collect operators

#puts "args:$args"
    eval wframe::_frame $w -class Loglst -borderwidth 2 -relief raised $args
    widginit $w loglst *$w

    if {$cfig(menu$w) != {}} {			;#if showing menu
        mbar::mbar $w.t -mb [list menu $cfig(menu$w)]
        pack $w.t -side top -fill x
        $w.t menu mi add {More clauses}  -under 0 -s {-image .img-mre} -command "loglst::add $w" -help {Increase the number of lines (logical clauses) by adding a new one at the bottom}
        $w.t menu mi del {Fewer clauses} -under 0 -s {-image .img-fwr} -command "loglst::delete $w" -help {Decrease the number of lines (logical clauses) by removing the last one}
        $w.t menu mi clr {Clear clauses} -under 0 -s {-image .img-clr} -command "loglst::clear $w" -help {Reset to a blank default (for making a new logic statement)}

        $w.t menu mi sep
        $w.t menu mi exp {Export clauses} "loglst::export_rules $w" {Output the current logic expression list to a file}
        $w.t menu mi imp {Import clauses} "loglst::import_rules $w" {Load a logic expression list from a file}
    }
    scrollbar $w.s -command "$w.b yview"		;#holds query info
    text $w.b -yscroll "$w.s set" -relief flat -state disabled
    pack $w.s -side right -fill y
    pack $w.b -side left -fill both -exp 1
    bind $w.b <Button-3> {}		;#don't want standard text context menu here

    if {$cfig(preclear$w)} {clear $w 0}
    return $w
}

# Pseudo widget command for clause line
#------------------------------------------
proc loglst::clause {w x args} {
    variable v
    if {[string is integer $x]} {		;#i.e: loglst clause 2 <get>
        if {$x > $v(ccnt$w) || $x <= 0} {error "Clause: $x does not exist"}
        set args [lassign $args cmd]
        set cmd [unabbrev {{get 1} {rindent 2} {lindent 2} {condition 2} {lmenu 2} {rmenu 2} {value 2} {not 2} {function 2} {case 2}} $cmd]
        if {$cmd == {get}} {return [eval get $w $x]}

        foreach {tag wid} {rindent .rt lindent .lf condition .cnd lmenu .lhs.m0 rmenu .rhs.m0 value .val function .fnc.m not .not case .cas} {
            if {$tag == $cmd} {return [eval $w.c$x$wid $args]}
        }
    } else {					;#no index given, so send cmd to all clauses
        for {set i 1} {$i <= $v(ccnt$w)} {incr i} {
            return [eval clause $w $i \$x $args]
        }
    }
}

#Widget command
#------------------------------------------
proc loglst::wcmd {w cmd args} {
    variable cfig
#puts "widgcmd:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{initialize 4} {delete 3} {get 2} {set 2} {add 2} {joins 2} {drop 2} {clause 2} {cget 2} {configure 4} {preference 3 pref}} $cmd]
    if {[lcontain {add delete get load clear pref clause cget configure} $cmd]} {return [eval $cmd $w $args]}
    if {$cmd == {set}} {
        return [eval setval $w $args]
    } elseif {$cmd == {drop}} {
        return [eval fld_drop $w $args]
    } elseif {$cmd == {bar}} {
        return [$w.t $args]
    } elseif {[string is integer $cmd]} {	;#if cmd is an integer
        return [eval clause $cmd $args]		;#send it to that clause
    } else {
        return [eval _$w $cmd $args]		;#send it to the frame
    }
}

# Allow to edit a logic list in a toplevel dialog box
#------------------------------------------
proc loglst::dia {args} {
#puts "args:$args"
    return [eval dia::dia .loglst_dia -pre 1 -ent loglst::loglst $args -uplevel 2 -grab {}]
}
