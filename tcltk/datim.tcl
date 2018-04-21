#A time-of-day setting and display widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval datim {
    namespace export datim dia
}

#Set a date/time as the currently selected date
#------------------------------------------
proc datim::setdatim {w {dt {}}} {
#puts "setdatim w:$w dt:$dt"
    lassign [split $dt {_ }] date time
    $w.c set $date
    $w.t set $time
}

#Get the currently selected date/time
#------------------------------------------
proc datim::getdatim {w} {
#puts "getdatim:[$w.c get]_[$w.t get]"
    return "[$w.c get]_[$w.t get]"
}

#Create a window with a date and a time widget in it
#------------------------------------------
proc datim::datim {w args} {
    set cargs {}
    set targs {}

    argnorm {{preview 2 prev} {weeks 2} {load 2} {date 2} {today 2} {menu 2} {time} {date 2} {now 2} {current 2 cur} {highlight 2 high} {command 2} {size 2} {seconds 2 sec} {divisions 2 div}} args
    foreach s {menu current highlight command}  {if {[set v [xswitchs $s args]] != {}} {lappend cargs -$s $v; lappend targs -$s $v}}
    foreach s {date preview weeks load today}   {if {[set v [xswitchs $s args]] != {}} {lappend cargs -$s $v}}
    foreach s {time now size seconds divisions} {if {[set v [xswitchs $s args]] != {}} {lappend targs -$s $v}}

    eval wframe::_frame $w -class Datim $args
    widginit $w datim *$w

    eval cal::cal $w.c $cargs
    eval tim::tim $w.t $targs
    pack $w.t -side right -fill y
    pack $w.c -side right -fill both -exp 1
    return $w
}

#The widget command
#------------------------------------------
proc datim::wcmd {w cmd args} {
    variable v
#puts "wcmd:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{get 2} {calendar 2 cal} {time 2 tim} {set 3} {see 3}} $cmd]
    switch $cmd {
        set	{return [eval setdatim $w $args]}
        get	{return [eval getdatim $w]}
        cal	{return [eval $w.c $args]}
        tim	{return [eval $w.t $args]}
        default	{return [eval _$w $cmd $args]}
    }
}

# Popup asking for a datime
#------------------------------------------
proc datim::dia {args} {

    argform {dest menu} args
    argnorm {{destination 3 dest}} args
    return [eval dia::dia .datim_dia -ent datim::datim -place p $args -uplevel 2]
}
