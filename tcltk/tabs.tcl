# Wyattized tabset widget, a wrapper around blt::tabset
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33
package require BLT

#TODO:
#X- add modified routine
#- 

namespace eval tabs {
    namespace export tabs
    variable cfig
}

# Insert a new tab
#------------------------------------------
proc tabs::insert {w pos name args} {
    variable cfig

    argnorm {{help 2} {window} 2} args
    set help [xswitchs help args]	;#grab help parm
    set window [xswitchs window args]
    if {$help != {}} {help::init $window $help}
    $w bind $name <Motion> "+help::motion $window"
    $w bind $name <Leave> "+help::leave $window"

    return [eval ::tabs::_$w insert $pos $name -window $window $args]
}

# Create a tabset
#------------------------------------------
proc tabs::tabs {w args} {
    variable cfig
    eval blt::tabset $w $args
    widginit $w tabs *$w
    
    return $w
}

# Widget command
#------------------------------------------
proc tabs::wcmd {w cmd args} {
    variable cfig
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{insert 2}} $cmd]
    if {[lcontain {insert} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {w}} {
        return $w
    } 
    return [eval _$w $cmd $args]
}

#bind Tab <Leave>	{+help::leave %W}	;#doesn't seem to work
#bind Tab <Motion>	{+help::motion %W}
