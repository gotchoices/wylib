# Wyattized button widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval wbutton {
    namespace export button
    variable cfig
    variable v
    set cfig(swar) {{help 3} {repeat 3 rep} {minimum 2 min} {acceleration 3 acc}}
}

# Handle the press of a repeating button
#------------------------------------------
proc wbutton::press {w {delay {}} {first 1}} {
    variable cfig
    variable v
    if {![info exists bf(aid$w)]} {set v(aid$w) {}}
    if {$cfig(rep$w) <= 0} {set v(aid$w) {}; return}
    
    if {$delay == {}} {set delay $cfig(rep$w)}
    if {$delay > $cfig(min$w)} {set ndelay [expr $delay - $cfig(acc$w)]} else {set ndelay $delay}
#puts "ndelay:$ndelay first:$first"
    if {$first} {set delay [expr $delay * 2]}
    set v(aid$w) [after $delay "$w invoke; wbutton::press $w $ndelay 0"]	;#reschedule
}

# Handle the release of a repeating button
#------------------------------------------
proc wbutton::release {w} {
    variable v
    if {[info exists v(aid$w)] && $v(aid$w) != {}} {after cancel $v(aid$w)}
}

# Get configuration for a button
#------------------------------------------
proc wbutton::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    switch -- $option {
        -help	{return $cfig(help$w)}
        -rep	{return $cfig(rep$w)}
        -min	{return $cfig(min$w)}
        -acc	{return $cfig(acc$w)}
    	default	{return [eval _$w cget $option]}
    }
}

# Configure an existing button
#------------------------------------------
proc wbutton::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag {help rep min acc} {xswitchs ${tag}.* args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a button
#------------------------------------------
proc wbutton::button {w args} {
    variable cfig

#puts "button:$w args:$args)"
    argform {text command help} args
    argnorm $cfig(swar) args
    array set cfig "rep$w 0 min$w 25 acc$w 2 help$w {}"
    foreach tag {help rep min acc} {xswitchs $tag args cfig($tag$w)}
    eval _button $w $args

#    bind $w <Return> "$w invoke"		;#in default bindings now?
    if {[string is digit -strict $cfig(rep$w)]} {
#puts "rep:$cfig(rep$w)"
        if {$cfig(rep$w) < 1} {
            set cfig(rep$w) 0
        } elseif {$cfig(rep$w) == 1} {
            set cfig(rep$w) 180
        }
        bind $w <Button-1>		"+wbutton::press $w"
        bind $w <ButtonRelease-1>	"+wbutton::release $w"
    }
    widginit $w wbutton *$w
    set v(aid$w) {}
    return $w
}

# Widget command
#------------------------------------------
proc wbutton::wcmd {w cmd args} {
#puts "w:$w cmd:$cmd args:$args"
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

bind Button <Return> {%W invoke}
bind Button <KP_Enter> {%W invoke}

rename ::button ::wbutton::_button	;#replace standard widget with wrapper
namespace import wbutton::button
