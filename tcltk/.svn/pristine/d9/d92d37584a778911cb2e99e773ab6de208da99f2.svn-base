#Bring up a dialog box to allow the calculation of time worked
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- port to wylib
#X- make logtime::dia
#- test rapid key bindings
#- bind to enter key on keypad
#- make it work for dew-spf
#- 

namespace eval logtime {
    namespace export logtime dia
    variable cfig		;#configuration options
}

# Clear all entries in the widget
#------------------------------------------
proc logtime::initialize {w} {
    $w.s initialize
    $w.e initialize
}

# Compute hours:minutes to decimal hours
#------------------------------------------
proc logtime::convert {t} {
    if {![regexp -- {[0-9]+[:.0-9]*} $t]} {dia::err "Improper time format: $t"; return {}}
    set tl [split $t {:.}]
    if {[llength $tl] > 2 || [llength $tl] < 1} {dia::err "Improper time format: $t"; return {}}
    lassign $tl hour min
        
    if {[set hour [string trimleft $hour 0]] == {}} {set hour 0}
    if {[set min [string trimleft $min 0]] == {}} {set min 0}
    if {[expr $min >= 60] || [expr $min < 0]} {dia::err "Minutes must be between 00 and 59"; return {}}
    if {[expr $hour >= 24] || [expr $hour < 0]} {dia::err "Hours must be between 00 and 23"; return {}}
    set frc [expr 1.00 * $min / 60]
#debug hour min frc
    return [format {%.2f} $hour.[lindex [split $frc .] 1]]
}

# Compute the length of the current time segment and add to time list
#------------------------------------------
proc logtime::add {w} {
    set sta [$w.e get sta]
    set fin [$w.e get fin]
#debug w sta fin
    if {$sta == {} || $fin == {}} {dia::err "First enter a start and stop time"; return {}}

    set st [convert $sta]
    set fi [convert $fin]
    if {$fi < $st} {
        if {[dia::ask "May I convert the ending time: $fi to [expr $fi + 12.0]" 0 OK Cancel] > 0} return
        set fi [expr 12.0 + $fi]
    }
    set time [rpn fix2 $fi $st -]
    $w.p insert end [list $sta $fin $time]
    sum $w
    $w.e initialize
}

# Remove highlighted times
#------------------------------------------
proc logtime::remove {w} {
    if {[set marked [$w.p mark ?]] == {}} return
#debug marked
    $w.p delete $marked $marked
    sum $w
    $w e initialize
}

# Update the sum of the item times
#------------------------------------------
proc logtime::sum {w} {
    set total 0.0
    foreach time [$w.p column tim get 0 end] {
#debug total
        set total [expr $total + $time]
    }
    $w.s set [rpn fix2 $total]
}

# When enter hit on an empty start field
#------------------------------------------
proc logtime::ok {w} {
    after idle "catch {focus [$w.e field fin w]}"
    if {[$w.e get sta] == {}} {event generate $w <<Ok>>}
}

# Make the time entry widget
#------------------------------------------
proc logtime::logtime {w args} {
    variable cfig
    variable v
    
    argform {title} args
    argnorm {{frame 2 fr} {menu 2}} args
    array set cfig "fr$w {} menu$w {{Time Entry:}}"
    while {[set x [xswitch fr args]] != {}} {append cfig(fr$w) { } $x}
    foreach s {menu} {xswitchs $s args cfig($s$w)}
    
    eval wframe::_frame $w -class Logtime $cfig(fr$w)
    widginit $w logtime *$w
    swores $w args cfig(%s$w) {title}

    if {$cfig(menu$w) != {}} {
        mbar::mbar $w.t -mb "menu $cfig(menu$w)"
        pack $w.t -side top -fill x

        $w.t menu mi add {Add Time} -under 0 -s {Add -bg {#88ff88} -gmc {-exp 1}} -command "logtime::add $w" -help {Compute worked time from the current start and stop time and add it to the list}
        $w.t menu mi del {Remove Time} -under 0 -s {Rem -bg {#ff8888}} -command "logtime::remove $w" -help {Remove any highlighted work segments from the work list}
    }
    $w.t menu configure -under 0
    dew::dew $w.s ent {Total Time:} -just r -bg lightblue -width 9 -help {Total number of hours worked in all time segments entered into the preview list}
    mdew::mdew $w.e -focus sta \
      -f {sta		ent 6	{1 1}	{Start:}	-bg {#ccffcc} -spf tim -just r -help "Enter the time you clocked into work\n(24 hour time format, HH:MM or HH.MM)"} \
      -f {fin		ent 6	{2 1}	{Finish:}	-bg {#ffcccc} -spf tim -just r -help "Enter the time you clocked out of work\n(24 hour time format, HH:MM or HH.MM)"}
    mlb::mlb $w.p -min 140 \
      -f {sta Start} \
      -f {fin Finish} \
      -f {tim Time}
    
    pack $w.s -side bottom -fill both
    pack $w.e $w.p -side top -fill both
    $w.e initialize

    foreach e {<Return> <KP_Enter>} {
        bind [$w.e field sta entry w] $e "logtime::ok $w"
        bind [$w.e field fin entry w] $e "logtime::add $w"
    }
}

# Widget command
#------------------------------------------
proc logtime::wcmd {w cmd args} {
    variable cfig
    set cmd [unabbrev {{frame 2} {get 1} {set 1} {initialize 2 init} {edit 1} {preview 1} {total 1} {cget 2} {configure 2}} $cmd]
    switch -exact $cmd {
        {w}		{return $w}
        {get}		{return [$w.s get]}
        {set}		{eval $w.s set $args}
        {init}		{$w initialize}
        {frame}		{return [eval _$w $args]}
        {total}		{return [eval $w.s $args]}
        {edit}		{return [eval $w.e $args]}
        {preview}	{return [eval $w.p $args]}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {default}	{return [eval $w.d.d $cmd $args]}
    }
}

#Allow user to edit a value using the logged time calculator
#------------------------------------------
proc logtime::dia {args} {
    argform {dest title} args
    argnorm {{destination 3 dest}} args

    return [eval dia::dia .logtime_dia -ent logtime::logtime -place p $args -uplevel 2]
}
