# Wyattized message widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval ww {
    namespace export message
    variable cfig
    set cfig(message_swar) {{help 3}}
}

# Get configuration for a message
#------------------------------------------
proc ww::message_cget {w option} {
    variable cfig
    argnorm $cfig(message_swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing message
#------------------------------------------
proc ww::message_configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(message_swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a message
#------------------------------------------
proc ww::message {w args} {
    variable cfig
    argform {text help} args
    argnorm $cfig(message_swar) args
    set cfig(help$w) [xswitchs help args]
    eval _message $w $args
    widginit $w ww *$w message_wcmd
    return $w
}

# Widget command
#------------------------------------------
proc ww::message_wcmd {w cmd args} {
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {cget}		{return [eval message_cget $w $args]}
        {configure}	{return [eval message_configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::message ::ww::_message	;#replace standard widget with wrapper
namespace import ww::message
