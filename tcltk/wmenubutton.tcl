# Wyattized menubutton widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- if we configure in a -textv, the trace doesn't get set
#- should we make a separate widget that implements a pdm with search/undo/redo and keep this simpler (just a menubutton)?
#- send unmodified event when returning choice to original?
#- 

namespace eval wmenubutton {
    namespace export menubutton
    variable cfig
    variable v
    set cfig(swar) {{help 3} {initialize 2 init}}
}

option add *Menubutton.indWidth		12		widgetDefault
option add *Menubutton.indHeight	6		widgetDefault

# Initialize the widget
#------------------------------------------
proc wmenubutton::initialize {w} {
    variable cfig
    set b [ww::modblock 1]
    if {[regexp {^\$} $cfig(init$w)] && [info exists [string range $cfig(init$w) 1 end]]} {	;#if accessing global variable for initial value
        set init [subst -nobackslashes -nocommands $cfig(init$w)]
    } elseif {[regexp {\[.*\]} $cfig(init$w)]} {						;#if accessing procedure for initial value
        set init [subst -nobackslashes -novariables $cfig(init$w)]
    } else {
        set init "$cfig(init$w)"
    }
    if {[set tv [_$w cget -textv]] != {}} {
        uplevel #0 [list set $tv $init]
    } else {
        _$w configure -text "$init"
    }
    ww::modblock $b
    modified $w 0
}

# Keep track of whether contents have been modified
#------------------------------------------
proc wmenubutton::modified {w {setclr {}} {gen 1}} $ww::modified

# Get configuration for a menubutton
#------------------------------------------
proc wmenubutton::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain {help} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing menubutton
#------------------------------------------
proc wmenubutton::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag {help init} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {
        if {[lcontain $args {-text}]} {modified $w 1}
        return [eval _$w configure $args]
    }
    return {}
}

# Handle Modified event in case of change via textvariable
#------------------------------------------
proc wmenubutton::trhand {w n1 n2 op} {
#puts "w:$w n1:$n1 n2:$n2 op:$op"
    if {$op == {w}} {modified $w 1}
}

# Create a menubutton
#------------------------------------------
proc wmenubutton::menubutton {w args} {
    variable cfig
    variable v
    argform {text menu help} args
    argnorm $cfig(swar) args
    foreach tag {help} {set cfig($tag$w) [xswitchs $tag args]}
    foreach tag {init} {xswitchs $tag args cfig($tag$w)}
    eval _menubutton $w $args
    widginit $w wmenubutton *$w
    if {[set tv [$w cget -textv]] != {}} {
        uplevel #0 "trace variable $tv w {wmenubutton::trhand $w}"	;#to handle modifies through the textvariable
    }

    set v(modif$w)	1
    if {[info exists cfig(init$w)]} {initialize $w} else {set cfig(init$w) {}}
    modified $w 0		;#initially unmodified
    return $w
}

# Widget command
#------------------------------------------
proc wmenubutton::wcmd {w cmd args} {
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{menu 1} {cget 2} {configure 4} {initialize 2} {modified 3}} $cmd]
    if {[lcontain {configure cget initialize modified} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {menu}} {
        return [eval [_$w cget -menu] $args]
    } elseif {$cmd == {w}} {
        return $w
    } 
    return [eval [_$w cget -menu] $cmd $args]
}

rename ::menubutton ::wmenubutton::_menubutton	;#replace standard widget with wrapper
namespace import wmenubutton::menubutton
