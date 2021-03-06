#Two buttons to increment/decrement a value in an associated entry
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval spin {
    namespace export spin
    variable cfig	;#config values for each widget
    variable v		;#values of each spinner item
    set cfig(swar)	{{type 2} {valid 2} {delay 2} {increment 3 inc} {command 3 cmd} {entry 3}}
    
#Bitmaps for up/down buttons
    image create bitmap spin.dn -data "#define dn_width 12\n#define dn_height 6\nstatic unsigned char dn_bits[] = {\n0xff, 0x0f, 0x06, 0x06, 0x0c, 0x03, 0x98, 0x01, 0xf0, 0x00, 0x60, 0x00};"
    image create bitmap spin.up -data "#define up_width 12\n#define up_height 6\nstatic unsigned char up_bits[] = {\n0x60, 0x00, 0xf0, 0x00, 0x98, 0x01, 0x0c, 0x03, 0x06, 0x06, 0xff, 0x0f};"
}

option add *Spin.type int widgetDefault
option add *Spin.delay 180 widgetDefault
option add *Spin.inc 1 widgetDefault
option add *Spin.takeFocus 0 widgetDefault
option add *Spin.Button.borderWidth 1 widgetDefault
option add *Spin.Button.height 4 widgetDefault
option add *Spin.Button.width 14 widgetDefault
option add *Spin.Button.highlightThickness 0 widgetDefault
option add *Spin.Button.takeFocus 0 widgetDefault

# Handle a press on an arrow button
#------------------------------------------
proc spin::inc {w {inc 1}} {
    variable cfig
    set tvar [$cfig(entry$w) get]
#puts "w:$w inc:$inc type:$cfig(type$w)"
    switch -exact $cfig(type$w) {
        {int} {					;#if an integer
            if {$cfig(valid$w) != {}} {lassign $cfig(valid$w) min max} else {set min 0}
            if {[string is digit -strict [string trimleft $tvar -]]} {
                incr tvar $inc
            } else {
                set tvar $min
            }
            if {$cfig(valid$w) != {}} {
                if {$tvar > $max} {set tvar $min}
                if {$tvar < $min} {set tvar $max}
            }
        }
        {float} {					;#if a floating point
            if {$cfig(valid$w) != {}} {lassign $cfig(valid$w) min max fmt} else {set min 0; set fmt {}}
            if {$fmt == {}} {set fmt {%.2f}}
            if {[string is digit -strict [translit -. 00 $tvar]]} {
                set tvar [expr $tvar + $inc]
            } else {
                set tvar $min
            }
            if {$cfig(valid$w) != {}} {
                if {$tvar > $max} {set tvar $min}
                if {$tvar < $min} {set tvar $max}
            }
            set tvar [format $fmt $tvar]
        }
        {enum} {					;#if enumerated list
            set len [llength $cfig(valid$w)]
            set idx [lsearch $cfig(valid$w) "$tvar*"]
            incr idx $inc
            if {$idx >= $len} {set idx 0}
            if {$idx < 0} {set idx [expr $len - 1]}
            set tvar [lindex $cfig(valid$w) $idx]
        }
        default {error "Unknown type: $cfig(type$w)"}
    }
    $cfig(entry$w) set $tvar
    eval $cfig(cmd$w)			;#execute user command
}

# Make an entry with spinner buttons that will increment through a range
#------------------------------------------
proc spin::spin {w args} {
    variable cfig
    variable v

    array unset cfig *$w
    argform {type valid} args
    argnorm $cfig(swar) args
    frame $w -class Spin
    widginit $w spin *$w

    swores $w args cfig(%s$w) {type valid delay inc}
#    foreach s {} {xswitchs $s args cfig($s$w)}
    foreach s {cmd entry} {set cfig($s$w) [xswitchs $s args]}
    if {$cfig(entry$w) == {}} {
        entry $w.e
        pack $w.e -side left -fill x
    }
#puts "entry:$cfig(entry$w) w:$w"
    set cfig(type$w) [unabbrev {{integer 1 int} {floating 1 float} {enumerated 1 enum}} $cfig(type$w)]

    button $w.up -image spin.up -rep $cfig(delay$w) -command "spin::inc $w  \$spin::cfig(inc$w)" -help {Increase}
    button $w.dn -image spin.dn -rep $cfig(delay$w) -command "spin::inc $w -\$spin::cfig(inc$w)" -help {Decrease}
    bind $cfig(entry$w) <4> "spin::inc $w  \$spin::cfig(inc$w)"
    bind $cfig(entry$w) <5> "spin::inc $w -\$spin::cfig(inc$w)"
    pack $w.up $w.dn -side top -fill y -exp 1
}

# Widget command
#------------------------------------------
proc spin::wcmd {w cmd args} {
    variable cfig
    set cmd [unabbrev {{frame 1} {up 1} {down 2} {increment 1} {decrement 2}} $cmd]
    switch -exact -- $cmd {
        {w}		{return $w}
        {up}		{return [eval $w.up $args]}
        {dn}		{return [eval $w.dn $args]}
        {increment}	{return [eval inc $w]}
        {decrement}	{return [eval inc $w -1]}
        {default}	{return [eval _$w $args]}
    }
}
