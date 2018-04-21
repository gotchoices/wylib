# Wyattized canvas widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- implement modified function?
#- 

namespace eval ww {
    namespace export canvas
    variable cfig
    set cfig(canvas_swar) {{help 3}}
}

# Get configuration for an canvas
#------------------------------------------
proc ww::canvas_cget {w option} {
    variable cfig
    argnorm $cfig(canvas_swar) option
    switch -exact -- $option {
        -help	{return $cfig(help$w)}
    	default	{return [eval _$w cget $option]}
    }
}

# Configure an existing canvas
#------------------------------------------
proc ww::canvas_configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(canvas_swar) args
    foreach tag {help} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

#Create an canvas widget
#------------------------------------------
proc ww::canvas {w args} {
    variable cfig

    argnorm $cfig(canvas_swar) args
    foreach tag {help} {set cfig($tag$w) [xswitchs $tag args]}
    eval _canvas $w $args
    widginit $w ww *$w canvas_wcmd

    bind $w <Button-3> "eval tk_popup $w.cmenu \[winfo pointerxy .\]"
    menu [set m $w.cmenu]
    $m add command pr -label {Print Grab} -command "print::grab $w" -help "View a printable rendering of the canvas"
    
    return $w
}

# Widget command
#------------------------------------------
proc ww::canvas_wcmd {w cmd args} {
    variable cfig
    switch -exact -- [unabbrev {{cget 2} {configure 4}} $cmd] {
        {w}		{return $w}
        {menu}		{return $w.cmenu}
        {cget}		{return [eval canvas_cget $w $args]}
        {configure}	{return [eval canvas_configure $w $args]}
        {default}	{return [eval _$w $cmd $args]}
    }
}

rename ::canvas ::ww::_canvas	;#replace standard widget with wrapper
namespace import ww::canvas
