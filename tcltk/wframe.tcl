# Wyattized frame widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval wframe {
    namespace export frame
    variable cfig
    set cfig(swar) {{help 3}}
}

# Get configuration for a frame
#------------------------------------------
proc wframe::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing frame
#------------------------------------------
proc wframe::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a frame
#------------------------------------------
proc wframe::frame {w args} {
    variable cfig
    argnorm $cfig(swar) args
    set cfig(help$w) [xswitchs help args]
    eval _frame $w $args
    widginit $w wframe *$w
    return $w
}

# Widget command
#------------------------------------------
proc wframe::wcmd {w cmd args} {
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::frame ::wframe::_frame	;#replace standard widget with wrapper
namespace import wframe::frame
