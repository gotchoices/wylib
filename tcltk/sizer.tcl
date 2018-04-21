# Create a stretcher bar between two frames
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO
#- 

namespace eval sizer {
    namespace export sizer create
    variable cfig
    variable v
}

option add *Sizer.selectBackground darkblue widgetDefault
option add *Sizer.background CadetBlue widgetDefault
option add *Sizer.size 2 widgetDefault
#option add *Sizer.relief flat widgetDefault

# After idle, run this once to establish initial pane sizes
#------------------------------------------
proc sizer::firstupdate {w f} {
    variable cfig
    variable v
#puts "firstupdate w:$w hs:$sizer::v(haveset$w)"
    if {!$sizer::v(haveset$w)} update	;#if we have already set sizes from prefs, don't update

    if {[winfo exists $f]} {		;#now further prevent resizing of parent
        pack propagate $f no
        grid propagate $f no
    }
}

# Set the sizes of all controlled panes from a list of sizes
#------------------------------------------
proc sizer::setsizes {w args} {
    variable cfig
    variable v
    set i 0

    set v(haveset$w) 1
#puts "setsizes $w $args haveset:$v(haveset$w)"
    set cmd {}
    foreach f "$cfig(plus$w) $cfig(minus$w)" {
        set size [lindex $args $i]
        if {$size != {}} {
            if {$cfig(orient$w) == {vertical}} {
                append cmd "$f configure -width $size; "
            } else {
                append cmd "$f configure -height $size; "
            }
        }
        incr i
    }
    after idle $cmd
}

# Yield/restore preferences
#------------------------------------------
proc sizer::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set sarr {}
#puts "plus:$cfig(plus$w) minus:$cfig(minus$w)"
    foreach f "$cfig(plus$w) $cfig(minus$w)" {
        if {$cfig(orient$w) == {vertical}} {
            lappend sarr [winfo width $f]
        } else {
            lappend sarr [winfo height $f]
        }
    }
    set parr "{set $sarr}"
#puts "Dump $w pref:$parr"
    return $parr
}

#When the sizer button is pressed
#------------------------------------------
proc sizer::press {w pos} {
    variable v
    variable cfig

    foreach f "$cfig(plus$w) $cfig(minus$w)" {set v(size$f) [winfo $cfig(wid$w) $f]}
    set v(start$w) $pos
#puts "press pos:$pos"
    bind $w <Any-Motion> "sizer::motion $w $cfig(ps$w)"
    $w configure -relief sunken		;#press the button
}

#When the sizer button is moved
#------------------------------------------
proc sizer::motion {w pos} {
    variable cfig
    variable v
    foreach {lst op} [list $cfig(plus$w) + $cfig(minus$w) -] {
        foreach f $lst {
            set par [winfo parent $f]
#puts "motion pos:$pos par:$par"
            if {$cfig(orient$w) == {vertical}} {
                if {$pos < [set min [winfo rootx $par]]} {set pos $min}
                if {$pos > [set max [expr $min + [winfo width $par] - $cfig(size$w)]]} {set pos $max}
            } else {
                if {$pos < [set min [winfo rooty $par]]} {set pos $min}
                if {$pos > [set max [expr $min + [winfo height $par] - $cfig(size$w)]]} {set pos $max}
            }
            set delta [expr $pos - $v(start$w)]
            set new [expr $v(size$f) $op $delta]
            if {$new < 0} {set new 1}
#puts "pos:$pos min:$min max:$max new:$new"
            $f configure -$cfig(wid$w) $new
        }
    }
}
    
#When the button is released
#------------------------------------------
proc sizer::release {w pos} {
    bind $w <Any-Motion> {}
    $w configure -relief raised		;#unpress the button
}

#Create a partition that sizes adjoining frames
#------------------------------------------
proc sizer::sizer {w args} {
    variable cfig
    variable v

    argform {plus minus} args
    argnorm {{orient 1} {size 1} {select 1} {plus 1} {minus 1}} args
    array set cfig "orient$w h plus$w {} minus$w {}"
    foreach s {select} {set cfig($s$w) [xswitchs $s args]}
    foreach s {orient size} {xswitchs $s args cfig($s$w)}
    while {[xswitch plus args va] != {}} {lappend cfig(plus$w) $va}
    while {[xswitch minus args va] != {}} {lappend cfig(minus$w) $va}

    if {[regexp {v.*} $cfig(orient$w)]} {	;#vertical
        set cfig(wid$w) width
        set cfig(ps$w) %X
        set cursor sb_h_double_arrow
        set cfig(orient$w) vertical
    } else {
        set cfig(wid$w) height
        set cfig(ps$w) %Y
        set cursor sb_v_double_arrow
        set cfig(orient$w) horizontal
    }
    wframe::_frame $w -class Sizer
    widginit $w sizer *$w
    swores $w args cfig(%s$w) {size}
    eval $w configure -$cfig(wid$w) $cfig(size$w) -cursor $cursor $args
    set cfig(bg$w) [$w cget -background]
    if {$cfig(select$w) == {}} {set cfig(select$w) [option get $w selectBackground Sizer]}

    bind $w <Enter>		"$w configure -bg $sizer::cfig(select$w)"
    bind $w <Leave>		"$w configure -bg $sizer::cfig(bg$w)"
    bind $w <Button-1>		"sizer::press $w $cfig(ps$w)"
    bind $w <ButtonRelease-1>	"sizer::release $w $cfig(ps$w)"
    bind $w <B1-Leave>		{}

    set v(haveset$w) 0
    foreach f "$cfig(plus$w) $cfig(minus$w)" {
#        pack propagate $f no; grid propagate $f no	;#prevents dbe's from establishing their size
        after idle "sizer::firstupdate $w $f"		;#do this instead
    }
    return $w
}

#Widget command
#------------------------------------------
proc sizer::wcmd {w cmd args} {
    set cmd [unabbrev {{preferences 2 pref} {set 2}} $cmd]
    if {[lcontain {pref} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact $cmd {
        {w}		{return $w}
        {set}		{return [eval setsizes $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}
