#A compound data entry widget
#This allows you to put multiple dews in a frame.  It is intended for data
#that really belongs in one field but is best edited as separate fields
#(like a date, a time or a font).  For editing multiple dews that simply
#are related to each other, use dbe
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- Should this be part of dew?
#- can we put a cdew inside a dew?
#- 

namespace eval cdew {
    namespace export cdew
    variable cfig
    set cfig(swar) {{help 3} {repeat 3 rep} {textvariable 5 textv} {initialize 2 init} {delimiter 3 delim} {frame 2 fr}}
}

# Initialize the widget
#------------------------------------------
proc cdew::initialize {w} {
    variable cfig
    set b [ww::modblock 1]
    if {[info exists cfig(init$w)]} {		;#if upper level initial value given
#puts "w:$w init:$cfig(init$w)"
        uplevel #0 [list set $cfig(textv$w) $cfig(init$w)]	;#use it
    } else {
        foreach tag $cfig(tags$w) {$w.$tag initialize}	;#else init each child
    }
    ww::modblock $b
    modified $w 0
}

# Set/clear/query modified status
#------------------------------------------
proc cdew::modified {w {setclr {}} {gen 1}} {
    variable cfig
#puts "cdew::mod w:$w setclr:$setclr"
    if {$setclr != {}} {		;#set or clear 'modified' state
        foreach tag $cfig(tags$w) {$w.$tag modified $setclr $gen}	;#send to each child
        return $setclr
    }
    foreach tag $cfig(tags$w) {if {[$w.$tag modified]} {return 1}}	;#if any child is modified then we are
    return 0				;#otherwise, we are clean
}

# Get configuration for a font widget
#------------------------------------------
proc cdew::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain {help rep textv init delim} $opt]} {return $cfig($opt$w)}
    return [eval $w.[lindex $cfig(tags$w) 0] cget $option]	;#field 0
}

# Configure an existing widget
#------------------------------------------
proc cdew::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w.[lindex $cfig(tags$w) 0] configure]}
    argnorm $cfig(swar) args
    foreach tag {help rep textv init delim} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {
        foreach tag $cfig(tags$w) {set retval [eval _$w.$tag configure $args]}
        return $retval
    }
    return {}
}

# Catch references to textvariable and substitute current values
#------------------------------------------
proc cdew::trhand {w n1 n2 op} {
    variable cfig
#puts "w:$w n1:$n1 n2:$n2 op:$op"
    if {$n2 == {}} {upvar ${n1} var} else {upvar ${n1}($n2) var}
    if {$op == {r}} {
        set v {}
        foreach tag $cfig(tags$w) {lappend v [$w.$tag get]
#puts "v:$v:[$w.$tag get]:"
        }
        if {$cfig(delim$w) == {}} {set var $v} else {set var [join $v $cfig(delim$w)]}
    } elseif {$op == {w}} {
        set i 0
        if {$cfig(delim$w) == {}} {set v $var} else {set v [split $var $cfig(delim$w)]}
        foreach tag $cfig(tags$w) {$w.$tag set [lindex $v $i]; incr i}
#puts "$w.$tag set [lindex $var $i]"
    }
}

#Create a compound data entry widget
#------------------------------------------
proc cdew::cdew {w args} {
    variable cfig
    variable v

#    argform {} args
    argnorm $cfig(swar) args
    array unset cfig *$w
    array set cfig "tags$w {}"
    set fargslist {}
    while {[set x [xswitch f args]] != {}} {lappend fargslist $x}
    set fr {}
    while {[set x [xswitch fr args]] != {}} {append fr { } $x}

    eval wframe::_frame $w -class Cdew $fr
    widginit $w cdew *$w

    foreach s {init textv} {xswitchs $s args cfig($s$w)}
    foreach s {delim} {set cfig($s$w) [xswitchs $s args]}
    if {![info exists cfig(textv$w)]} {set cfig(textv$w) cdew::v(val$w)}
    if {![info exists $cfig(textv$w)]} {uplevel [list set $cfig(textv$w) {}]}

    set fn 0
    set flds {}
    foreach fargs $fargslist {
        argform {style title tag} fargs
        argnorm {{textvariable 5 textv} {tag 2}} fargs
#puts " fargs:$fargs:"
        foreach s {tag textv} {set $s [xswitchs $s fargs]}
        if {$tag == {}} {set tag $fn}
        lappend cfig(tags$w) $tag
        lappend flds [set f $w.$tag]
        if {$textv == {}} {set textv dew::v(val$f)}
#puts "Dew::dew $w.$tag $args $fargs -textv $textv"
        eval dew::dew $w.$tag $args $fargs -textv $textv"
        bind $w.$tag <<Modified>> "ww::modgen $w %s"	;#pass up to this widget
        bind $w.$tag <<Changed>> "ww::chagen $w"
        incr fn
    }
    if {[llength $flds] > 0} {eval pack $flds -side left -fill x -exp 1}
    uplevel #0 "trace variable $cfig(textv$w) rw {cdew::trhand $w}"

    if {[info exists cfig(init$w)]} {initialize $w}
    return $w
}

# Widget command
#------------------------------------------
proc cdew::wcmd {w cmd args} {
    variable cfig
    variable v
    set cmd [unabbrev {{frame 2} {get 1} {set 1} {cget 2} {configure 2} {modified 2} {initialize 2}} $cmd]
    if {[lcontain {initialize cget configure modified} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact -- $cmd {
        {w}		{return $w}
        {get}		{return $v(val$w)}
        {set}		{uplevel #0 [list set $cfig(textv$w) [lindex $args 0]]}
        {frame}		{return [eval _$w $args]}
        {default}	{
            if {[string is digit -strict $cmd] && $cmd >= 0 && $cmd < [llength $cfig(tags$w)]} {set cmd [lindex $cfig(tags$w) $cmd]}
            if {[lcontain $cfig(tags$w) $cmd]} {return [eval $w.$tag $args]}
            return [eval $w.[lindex $cfig(tags$w) 0] $cmd $args]
        }
    }
}
