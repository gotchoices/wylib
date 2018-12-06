# Wyattized menu widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- add tag to each menu item
#X- track tags correctly even if item deleted or inserted
#X- allow index to refer to a tag if it exists
#- 

option add *Menu.background {#e8e8e8} widgetDefault
#option add *Menu.font {Helvetica -10 bold} widgetDefault

namespace eval wmenu {
    namespace export menu
    variable cfig
    set cfig(swar) {{help 3}}
    set cfig(swam) {{tag 1} {label 2} {help 3}}
}

# Check for valid tag syntax, link tag to index if OK
#------------------------------------------
proc wmenu::tagcheck {w idx tag} {
    variable cfig
    if {$tag != {}} {
        if {![string is alpha -strict [string range $tag 0 0]] || [lcontain {active end last none} $tag]} {error "Illegal tag value: $tag"}
        set cfig(idx:$tag$w) $idx
    }
}

# Add an item to a menu
#------------------------------------------
proc wmenu::add {w type args} {
    variable cfig
    argform {tag label command help} args
    argnorm $cfig(swam) args
    if {[set idx [_$w index end]] == {none}} {set idx 0} else {incr idx}
    tagcheck $w $idx [set cfig(tag:$idx$w) [set tag [xswitchs tag args]]]
#puts "A idx:$idx tag:$tag args:$args"
    foreach sw {help sb} {xswitch $sw args cfig($sw:$idx$w)}
    return [eval _$w add $type $args]
}

# Insert an item into a menu
#------------------------------------------
proc wmenu::insert {w idx type args} {
    variable cfig
    argform {tag label command} args
    argnorm $cfig(swam) args
    set tag [xswitch tag args]
    set idx [index $w $idx]
#puts "I idx:$idx tag:$tag args:$args"
    array set hfig [array get cfig help:*$w]	;#save help values
    foreach {s v} [array get cfig idx:*$w] {
        if {$v >= $idx} {
            incr cfig($s)		;#renumber
#puts " s:$s v:$v --> $cfig($s)"
            set cfig(help:$cfig($s)$w) $hfig(help:$v$w)	;#reassign helps
        }
    }
    foreach sw {help sb} {xswitch $sw args cfig($sw:$idx$w)}
    tagcheck $w $idx [set cfig(tag:$idx$w) $tag]
    return [eval _$w insert $idx $type $args]
}

# Delete an item from a menu
#------------------------------------------
proc wmenu::delete {w idx {idx2 {}}} {
    variable cfig
    set idx [index $w $idx]
    if {$idx2 == {}} {set idx2 $idx}
    set idx2 [index $w $idx2]
    if {$idx == {none} || $idx2 == {none}} {return {}}	;#do nothing?
    if {$idx2 < $idx} {set idx2 $idx}
#puts "D idx:$idx idx2:$idx2"
    set span [expr $idx - $idx2 - 1]
#puts "  span:$span"
    foreach {s v} [array get cfig idx:*$w] {
        set tag [lindex [split $s {:.}] 1]
        if {$v > $idx2} {
            incr cfig($s) $span
#puts "s:$s v:$v --> $cfig($s)"
        } elseif {$v >= $idx && $v <= $idx2} {
            if {[info exists cfig(sb:$tag$w)] && [winfo exists $cfig(sb:$tag$w)]} {destroy $cfig(sb:$tag$w)}
            unset cfig(idx:$tag$w)
            array unset cfig *:$idx$w
        }
    }
#puts "cfig:[array get cfig idx:*$w]"
    return [eval _$w delete $idx $idx2]
}

# Return the proper index of a menu item
#------------------------------------------
proc wmenu::index {w idx} {
    variable cfig
    if {[info exists cfig(idx:$idx$w)]} {set idx $cfig(idx:$idx$w)}
    return [_$w index $idx]
}

# Create a clone of a menu
#------------------------------------------
proc wmenu::clone {w nw {clonetype {}}} {
    variable cfig
#puts "Clone:$w $nw $clonetype"
    foreach sw {idx help} {		;#copy configs for new menu
        foreach {s v} [array get cfig $sw:*$w] {
            set cfig($sw:[lindex [split $s {:.}] 1]$nw) $v
        }
    }
    set retval [eval _$w clone $nw $clonetype]
    bind $w <Destroy> "+array unset wmenu::cfig *$w"
    return $retval
}

# Get configuration for a menu item
#------------------------------------------
proc wmenu::entrycget {w idx option} {
    variable cfig
    set idx [index $w $idx]
#puts "Cget:$w $idx $option"
    argnorm $cfig(swar) option
    if {$option == {-help}} {
        if {[info exists cfig(help:$idx$w)]} {return $cfig(help:$idx$w)} else {return {}}
    }
    return [eval _$w entrycget $idx $option]
}

# Configure an existing menu entry
#------------------------------------------
proc wmenu::entryconfigure {w idx args} {
    variable cfig
    set idx [index $w $idx]
    if {$args == {}} {return [_$w entryconfigure $idx]}
    argnorm $cfig(swar) args
    xswitch help args cfig(help:$idx$w)
#puts "entryconfigure $w $idx $args"
    if {[info exists cfig(sb:$idx$w)] && [winfo exists $cfig(sb:$idx$w)]} {
        if {[set state [xswitch state args]] != {}} {
            lappend args -state $state
            $cfig(sb:$idx$w) configure -state $state
        }
    }
    if {$args != {}} {return [eval _$w entryconfigure $idx $args]}
    return {}
}

# Get configuration for a menu
#------------------------------------------
proc wmenu::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    if {$option == {-help}} {return $cfig(help$w)}
    return [eval _$w cget $option]
}

# Configure an existing menu
#------------------------------------------
proc wmenu::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    xswitchs help args cfig(help$w)
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Create a menu
#------------------------------------------
proc wmenu::menu {w args} {
    variable cfig
    argnorm $cfig(swar) args
    set cfig(help$w) [xswitchs help args]
    eval _menu $w $args
    widginit $w wmenu *$w
#puts "wmenu w:$w length:[llength [array get cfig]]"
    return $w
}

# Widget command
#------------------------------------------
proc wmenu::wcmd {w cmd args} {
    variable cfig
#puts "wcmd:$w $cmd $args"
    switch -exact -- [unabbrev {{cget 2} {configure 4} {insert 3} {delete 3} {index 3} {clone 2} {entrycget 7} {entryconfigure 7}} $cmd] {
        {w}		{return $w}
        {add}		{return [eval add $w $args]}
        {insert}	{return [eval insert $w $args]}
        {delete}	{return [eval delete $w $args]}
        {tag}		{return $cfig(tag:[index $w $args]$w)}
        {index}		{return [eval index $w $args]}
        {clone}		{return [eval clone $w $args]}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {entrycget}	{return [eval entrycget $w $args]}
        {entryconfigure} {return [eval entryconfigure $w $args]}
        {default}	{
            if {[lcontain {activate invoke postcascade type yposition} $cmd]} {
                return [_$w $cmd [index $w [lindex $args 0]]]
            } elseif {[info exists cfig(idx:$cmd$w)] && [lcontain {configure cget} [lindex $args 0]]} {
                set args [lassign $args arg0]
                return [eval entry$arg0 $w $cmd $args]
            } else {
                return [eval _$w $cmd $args]
            }
        }
    }
}

rename ::menu ::wmenu::_menu		;#replace standard widget with wrapper
namespace import wmenu::menu
