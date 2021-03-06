# Wyattized radiobutton widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- add modified routine
#- 

namespace eval ww {
    namespace export radiobutton
    variable cfig
    set cfig(radiobutton_swar) {{help 3}}
}

# Get configuration for a radiobutton
#------------------------------------------
proc ww::radiobutton_cget {w option} {
    variable cfig
    argnorm $cfig(radiobutton_swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing radiobutton
#------------------------------------------
proc ww::radiobutton_configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(radiobutton_swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a radiobutton
#------------------------------------------
proc ww::radiobutton {w args} {
    variable cfig
    argform {text variable help} args
    argnorm $cfig(radiobutton_swar) args
    set cfig(help$w) [xswitchs help args]
    eval _radiobutton $w $args
    widginit $w ww *$w radiobutton_wcmd
    return $w
}

# Widget command
#------------------------------------------
proc ww::radiobutton_wcmd {w cmd args} {
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval radiobutton_cget $w $args]}
        {configure}	{return [eval radiobutton_configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::radiobutton ::ww::_radiobutton	;#replace standard widget with wrapper
namespace import ww::radiobutton
