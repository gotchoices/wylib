# Wyattized scale widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval ww {
    namespace export scale
    variable cfig
    set cfig(scale_swar) {{help 3}}
}

# Get configuration for a scale
#------------------------------------------
proc ww::scale_cget {w option} {
    variable cfig
    argnorm $cfig(scale_swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing scale
#------------------------------------------
proc ww::scale_configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(scale_swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a scale
#------------------------------------------
proc ww::scale {w args} {
    variable cfig
    argform {text help} args
    argnorm $cfig(scale_swar) args
    set cfig(help$w) [xswitchs help args]
    eval _scale $w $args
    widginit $w ww *$w scale_wcmd
    return $w
}

# Widget command
#------------------------------------------
proc ww::scale_wcmd {w cmd args} {
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval scale_cget $w $args]}
        {configure}	{return [eval scale_configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::scale ::ww::_scale	;#replace standard widget with wrapper
namespace import ww::scale
