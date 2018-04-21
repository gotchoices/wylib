# Debugging routines
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

namespace eval debug {
    namespace export interpret command
}

# Output certain variables to stdout for debugging (global)
#------------------------------------------
proc ::debug {args} {
    foreach var $args {
        upvar $var lv
        if {[info exists lv]} {
            puts -nonewline "$var:$lv "
        } else {
            puts -nonewline $var
        }
    }
    puts {}
}

# Interpret a debugging command
#------------------------------------------
proc debug::interpret {w} {
    set cmd [$w.e get]
#debug cmd
    eval $cmd
}

# Create a command interpretor window
#------------------------------------------
proc debug::command {} {
    variable cfig
    
    set w .debug
    toplevel $w -class Debug
#    wm transient $w .
    wm iconname $w Debug
    wm title $w {Debugging Command Interpretor}
    label $w.t {Input Debugging Command:}
    entry $w.e -width 40
    pack $w.t $w.e -side left
    bind $w.e <Return> "debug::interpret $w"
    return $w
}
