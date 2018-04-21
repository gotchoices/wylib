#Routine for filling out forms
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval form {
    namespace export form
    variable v
}

# Edit the template placement values for a form
#------------------------------------------
proc form::edit {w descs} {
    variable v

    set uw ".dia[translit . _ $w]"
    set vals [$w get]
#debug w uw descs
    set parr {}
    set i 0
    foreach desc $descs {
        lassign [lindex $vals $i] x y
        lappend parr -f [list x$i ent 4 "1 $i" "$desc X:" -ini $x -just r -spin {int {0 100}} -help {How many columns in from the left side of the form to start writing this parameter}]
        lappend parr -f [list y$i ent 4 "2 $i" "Y:" -ini $y -just r -spin {int {0 100}} -help {How many rows down from the top of the form to start writing this parameter}]
        incr i
    }
#debug parr

    if {[eval dia::dia $uw -but \{OK Cancel\} -def 0 -message \{Edit positioning parameters:\} -entry mdew::mdew -dest res -pre 0 $parr] < 0} return
#debug res
    set vals {}
    foreach {j x k y} $res {lappend vals [list $x $y]}
    $w set $vals
}

# Place text into a form according to a template
# Template, fmt: {{x1 y1 len1} {x2 y2 len2} {x3 y3 len3}}
# Args: val1 val2 val3
#------------------------------------------
proc form::layout {xsize ysize fmt args} {
    for {set i 1} {$i <= $ysize} {incr i} {		;#lines are 1-based to user
        set lines($i) [string repeat { } $xsize]
    }
    for {set i 0} {$i < [llength $fmt]} {incr i} {
        lassign [lindex $fmt $i] x y max
        foreach val [split [lindex $args $i] "\n"] {
            if {$max != {}} {set val [string replace $val $max end {}]}	;#trim to max size
            set lines($y) [string replace $lines($y) $x [expr $x + [string length $val]] $val]
            incr y
        }
    }
    for {set i 1} {$i <= $ysize} {incr i} {append ret "$lines($i)\n"}
    return $ret
}
