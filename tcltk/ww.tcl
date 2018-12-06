# Misc functions common to wyattized TK widgets
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval ww {
    namespace export hook modgen modblock
    variable hkfunc
    set hkfunc {}

    variable modblocked		;#block Modified event generation
    set modblocked 0
}

# Generic modified routine for low level data entry widgets (parse into module)
#------------------------------------------
set ww::modified {
    variable v
#puts "mod:$w setclr:$setclr gen:$gen"
    if {$setclr != {}} {		;#set or clear 'modified' state
        if {$gen} {
            if {$v(modif$w) != $setclr} {ww::modgen $w $setclr}	;#generate event only on first time modified
            if {$setclr} {ww::chagen $w}			;#if dirty, generate <Changed every time>
        }
        set v(modif$w) $setclr		;#record new state
    }
    return $v(modif$w)			;#otherwise, this is a query of the state
}

# Generate a Changed event in window w
#------------------------------------------
proc ww::chagen {w} {
    if {[winfo exists $w]} {
#puts "Changed w:$w"
        event generate $w <<Changed>> -when mark
    }
}

# Generate a Modified event in window w (if not blocked)
#------------------------------------------
proc ww::modgen {w state} {
    if {!$ww::modblocked && [winfo exists $w]} {	;#if window is still around
#puts "Modified: $w $state"
        event generate $w <<Modified>> -state $state -when mark
    }
}

# Block/unblock Modified events
#------------------------------------------
proc ww::modblock {block} {
    set retval $ww::modblocked
    set ww::modblocked $block
    return $retval
}

# Set/clear the hook function for tracing calls to widgets
#------------------------------------------
proc ww::hook {args} {
    variable hkfunc
#puts ":args:$args: len:[llength $args]:"
    if {[llength $args] <= 0} {
        return $hkfunc
    } else {
        set hkfunc $args
    }
}

#ww::hook		;#return hook statusn
#ww::hook {}		;#clear hook handler
#ww::hook func		;#set my hook function
