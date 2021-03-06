# Wyattized checkbutton widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- add modified routine
#- 

namespace eval wcheckbutton {
    namespace export checkbutton
    variable cfig
    variable v
    set cfig(swar) {{help 3} {initialize 2 init}}
}

# Set to default state
#------------------------------------------
proc wcheckbutton::initialize {w} {
    variable cfig
    set b [ww::modblock 0]
    if {$cfig(init$w) != {}} {
        if {$cfig(init$w)} {_$w select} else {_$w deselect}
    }
    ww::modblock $b
    modified $w 0		;#initially unmodified
}

# Keep track of whether contents have been modified
#------------------------------------------
proc wcheckbutton::modified {w {setclr {}} {gen 1}} $ww::modified

# Get configuration for a checkbutton
#------------------------------------------
proc wcheckbutton::cget {w option} {
    variable cfig
#puts "cget w:$w option:$option"
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain {help init} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing checkbutton
#------------------------------------------
proc wcheckbutton::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag {help init} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a checkbutton
#------------------------------------------
proc wcheckbutton::checkbutton {w args} {
    variable cfig
    variable v
    argnorm $cfig(swar) args
    foreach tag {help init} {set cfig($tag$w) [xswitchs $tag args]}
    eval _checkbutton $w $args
    widginit $w wcheckbutton *$w
    
    set v(modif$w)	1
    wcmd $w init
    
    return $w
}

# Widget command
#------------------------------------------
proc wcheckbutton::wcmd {w cmd args} {
    variable cfig
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{cget 2} {configure 4} {initialize 4} {modified 3}} $cmd]
    if {[lcontain {select deselect toggle invoke} $cmd]} {modified $w 1}
    if {[lcontain {initialize configure cget modified} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {w}} {
        return $w
    } 
    return [eval _$w $cmd $args]
}

rename ::checkbutton ::wcheckbutton::_checkbutton	;#replace standard widget with wrapper
namespace import wcheckbutton::checkbutton
