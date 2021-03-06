# Display widgets on a canvas, allow to drag them around and save the configuration
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

option add *Wboard.Scanvas.height	300		widgetDefault
option add *Wboard.Scanvas.width	800		widgetDefault
option add *Wboard.Scanvas.pad		0		widgetDefault
#option add *Wboard.borderWidth		1		widgetDefault
#option add *Wboard.Button.background	CadetBlue	widgetDefault
#option add *Wboard.Button.height	1		widgetDefault
#option add *Wboard.Button.borderWidth	1		widgetDefault

namespace eval wboard {
    namespace export wboard
    variable cfig		;#config values for each widget
    variable v

    set cfig(swar) {{field 1 f} {menu 2} {initialize 2 init}}
#    set cfig(args) {focus init}
#    set cfig(fshort) {style size sub title help}	;#must agree with dbe.tcl
}

#Anytime the widget main frame is configured, reconfigure the inner component sizes (only for gridded wboard's)
#--------------------------------
proc wboard::config {w} {
    variable cfig
puts "Configure: $w"
}

# Handle events associated with dragging widgets around the canvas
# --------------------------------------------------------------------
proc wboard::drag {c cmd x y id} {
#debug c cmd x y id
    lassign [$c coords $id] wx wy		;#where is this widget on the canvas
    $c drag $cmd [expr $wx + $x] [expr $wy + $y] $id		;#feed drag pointer coords on the canvas (not in the dragged widget)
}

# Move the dragged widget adjacent to its nearest neighbor
# --------------------------------------------------------------------
proc wboard::snap {mxv myv x y s t } {
    upvar $mxv mx
    upvar $myv my
    set gap 10
    if {![info exists mx]} {set mx 0}
    if {![info exists my]} {set my 0}
    if {[expr abs($s - $x) < $gap]} {set mx [expr $s - $x]}
    if {[expr abs($t - $y) < $gap]} {set my [expr $t - $y]}
}

# Do at the end of a drag
# --------------------------------------------------------------------
proc wboard::postdrag {c id} {
debug postdrag: c id
    lassign [$c bbox $id] x1 y1 x2 y2
debug id x1 y1 x2 y2
    set gap 10
    foreach i [$c find withtag widget] {	;#look at all other widgets on the canvas
        if {$i == $id} continue
        lassign [$c bbox $i] s1 t1 s2 t2
debug {  } i s1 t1 s2 t2
        snap x y $x1 $y1 $s1 $t1
        snap x y $x1 $y1 $s2 $t2
    }
    if {$x != 0 || $y != 0} {$c move $id $x $y}
}

#Reset all fields to their default values
#------------------------------------------
proc wboard::initialize {w} {
    variable cfig
    variable v
xxxxxxxx
    set b [ww::modblock 1]
    if {[info exists cfig(init$w)]} {		;#if upper level initial value given
#puts "wboard Init w:$w $cfig(init$w)"
        eval setvals $w $cfig(init$w)		;#write it in
    } else {
#puts "wboard Init w:$w each $cfig(tags$w)"
        foreach tag $cfig(tags$w) {$w field $tag initialize}	;#else ask each cell to init
    }
    if {$cfig(focus$w) != {}} {after idle "catch {focus [$w field $cfig(focus$w) w]}"}
#puts "blocked:$ww::modblocked"
    modified $w 0
    ww::modblock $b
    ww::modgen $w 0		;#force a clean event
}

# Set/clear/query modified status
#------------------------------------------
proc wboard::modified {w {setclr {}} {gen 1}} {
    variable cfig
    variable v
xxxxxx
    if {$setclr != {}} {		;#set or clear 'modified' state
        foreach tag $cfig(tags$w) {$w field $tag modified $setclr $gen}	;#send to each child
        return $setclr
    }
    foreach tag $cfig(tags$w) {if {[$w field $tag modified]} {return 1}}	;#if any child is modified then we are
    return 0				;#otherwise, we are clean
}

# Check all (or some) fields against their validity templates
#------------------------------------------
proc wboard::check {w args} {
    variable cfig
xxxxxxxx
    argform {fields} args
    argnorm {{report 1} {fields 1}} args
    set fields [xswitchs fields args]
    set report 0
    xswitchs report args report
    if {$fields == {}} {set fields $cfig(tags$w)}
    foreach tag $fields {
        if {[fcheck $w $tag example]} continue
        if {$report} {
            if {$example != {}} {set example "\nValue should be like: $example"}
            dia::err "Illegal value in field: [$w field $tag cget -title]=[$w field $tag get] $example"
        }
        return 0
    }
    return 1
}

# Check a field against a validity template
#------------------------------------------
# Return 1 if the value fits its template
proc wboard::fcheck {w tag {helpvnam {}}} {
    variable cfig; variable tpt
xxxxxxxxx
    if {$helpvnam != {}} {upvar $helpvnam example}

    proc deps_met {w fnam dep} {	;#need to check templates on this field?
        if {$dep == {}} {return 1}
        foreach k $dep {		;#for each dependency
            lassign $k tag val
            if {![winfo exists $w.nd.$tag] && ![winfo exists $w.od.$tag]} continue	;#if dep field doesn't exist, keep trying
            if {[$w field $tag get] == $val} {return 1}		;#if the value matches, OK
        }
        return 0
    }
    set fn $w.$tag
    if {[set tem $cfig(tem$fn)] == {}} {return 1}
    if {[llength $tem] == 1 && [info exists tpt($tem)]} {set tem $tpt($tem)}
#puts "tptcheck-- $fn:[$w field $tag get] tem:$tem"
    lassign $tem matches example depends
    if {![deps_met $w $tag $depends]} {return 1}	;#should we run the template check
    set val [$w field $tag get]		;#get field value
    foreach j $matches {		;#compare each match expression
#puts "  cmp :$j:$val:"			;# if any match found, OK
        if {($j == {} && $val == {}) || ([regexp $j $val len] && $len == $val)} {
            return 1
        }
    }
    return 0
}

# Yield/restore preferences
#------------------------------------------
proc wboard::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {eval pref::restore $args; return}
xxxxxxxxx    
    set parr {}
    if {$v(haveopt$w)} {lappend parr [list optional [optional $w ?]]}
    lappend parr [list set [getvals $w]]	;#dbe may discard these
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

# Get data from one or more fields
# If no fields specified, return a all fields in a name,value pair list
#------------------------------------------
proc wboard::getvals {w {fields {}}} {
    variable cfig
#puts "getvals w:$w fields:$fields"
xxxxxxx
    set ret {}
    if {$fields == {}} {
        foreach tag $cfig(tags$w) {lappend ret $tag [$w field $tag get]}
    } elseif {[llength $fields] == 1} {
        return [$w field [lindex $fields 0] get]
    } else {
        foreach tag $fields {lappend ret [$w field $tag get]}
    }
    return $ret
}

# Set data into one or more fields
# Provide a list of name value pairs
#------------------------------------------
proc wboard::setvals {w args} {
    variable cfig
xxxxxxxx
    if {[llength $args] == 1} {		;#can pass in a list as args[0] or as all args
        set fvpairs [lindex $args 0]
    } else {
        set fvpairs $args
    }
#puts "setval: args:$args fvpairs:$fvpairs"
    foreach {tag val} $fvpairs {
#puts "setval: tag:$tag val:$val"
        if {[winfo exists $w.nd.$tag]} {$w.nd.$tag set $val} elseif {[winfo exists $w.od.$tag]} {$w.od.$tag set $val}
    }
}

# Add a widget onto the canvas
#------------------------------------------
proc wboard::add {w tag args} {
    variable cfig
    variable v
puts "add w:$w tag:$tag args:$args"

    set f $w.$tag				;#field index
    argform {location} args
    argnorm {{location 2 loc}} args
    foreach s {loc} {set cfig($s$f) [xswitchs $s args]}
    lassign $cfig(loc$f) x y

    set c [$w.c canvas w]
    set args [lassign $args wcmd]
    $wcmd [set t $c.$tag] {*}$args
    set id [$c create window $x $y -window $c.$tag -anchor nw -tag widget]

    bind $t <Button-1>        "wboard::drag $w start %x %y $id"
    bind $t <B1-Motion>       "wboard::drag $w move  %x %y $id"
    bind $t <ButtonRelease-1> "wboard::drag $w end   %x %y $id; postdrag $w $id"

    lappend cfig(tags$w) $tag
    return $f
}

# Get configuration
#------------------------------------------
proc wboard::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    if {[lcontain $cfig(args) $option]} {return $cfig(option$w)}
    return [eval _$w cget $option]
}

# Configure the wboard
#------------------------------------------
proc wboard::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(args) {xswitch $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

#Create the widget
#------------------------------------------
proc wboard::wboard {w args} {
    variable cfig
    variable v

#    argform {} args
    argnorm $cfig(swar) args
    for {set fields {}} {[xswitch f args va sw] != {}} {} {lappend fields $sw $va}
    foreach s {init} {xswitch $s args cfig($s$w)}
    foreach s {menu} {set cfig($s$w) [xswitchs $s args]}

    eval wframe::_frame $w -class Wboard $args
    widginit $w wboard *$w
    bind $w <Configure> "wboard::config $w"		;#automatically align titles

    scanvas::scanvas $w.c
    set cfig(tags$w) {}
    foreach {sw va} $fields {eval add $w $va}		;#add fields

    set v(modif$w) 1
    if {[info exists cfig(init$w)]} {initialize $w}
    return $w
}

#The widget command
#------------------------------------------
proc wboard::wcmd {w cmd args} {
    variable cfig
puts "wboard::wcmd w:$w cmd:$cmd args:$args"

    set cmd [unabbrev {{get 1} {set 1} {canvas 2} {frame 2} {initialize 2} {preferences 2 pref} {field 1} {cget 2} {configure 2} {tags 2} {modified 3}} $cmd]
    if {[lcontain {initialize cget configure modified pref} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact -- $cmd {
        {get}		{return [eval getvals $w $args]}
        {set}		{return [eval setvals $w $args]}
        {w}		{return $w}
        {frame}		{return [eval _$w $args]}
        {canvas}	{return [eval $w.c canvas $args]}
        {field}		{
            set args [lassign $args tag]
            if {![lcontain $cfig(tags$w) $tag]} {error "Field: $tag not found in widget: $w"}
            return [eval $w.$tag $args]
        }
        {tags}		{return $cfig(tags$w)}
        {default}	{
            if {[lcontain $cfig(tags$w) $cmd]} {	;#if command is a field name
                return [eval $w.$cmd $args]
            } else {
                return [eval $w.c $cmd $args]
            }
        }
    }
}

if {[info commands locawyze] != {}} {locawyze wboard}
