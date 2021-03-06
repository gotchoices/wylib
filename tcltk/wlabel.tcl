# Wyattized label widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval ww {
    namespace export label
    variable cfig
    set cfig(label_swar) {{help 3}}
}

# Get configuration for a label
#------------------------------------------
proc ww::label_cget {w option} {
    variable cfig
    argnorm $cfig(label_swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing label
#------------------------------------------
proc ww::label_configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(label_swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a label
#------------------------------------------
proc ww::label {w args} {
    variable cfig
    argform {text help} args
    argnorm $cfig(label_swar) args
    set cfig(help$w) [xswitchs help args]
    eval _label $w $args
    widginit $w ww *$w label_wcmd
    return $w
}

# Widget command
#------------------------------------------
proc ww::label_wcmd {w cmd args} {
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval label_cget $w $args]}
        {configure}	{return [eval label_configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::label ::ww::_label	;#replace standard widget with wrapper
namespace import ww::label
