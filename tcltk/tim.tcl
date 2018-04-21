# A time-of-day setting and display widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- layout shows 1,5,15,30,60 divisions
#X- bindings when clicking on different times
#X- Button 1 srolling (like scroll bar)
#X- Button 2 srolling (grab hand)
#X- Wheel srolling (trigger scroll bar)
#X- finish/cleanup widget command
#X- what functions in menu?  (clear?)
#X- default to 8:00 am at top of window?
#X- test tim::dia
#- 
#- LATER:
#- should prefs do something?
#- menu options to change layout size?
#- 

namespace eval tim {
    namespace export tim dia
    variable cfig
    variable v				;#holds dynamic values

    set cfig(swar) {{menu 2} {time 2} {now 2} {current 2 cur} {highlight 2 high} {command 2} {size 2} {seconds 2 sec} {divisions 2 div}}
    set cfig(sdef) {now no high {#80a0ff} cur {Cur:} menu {Time:} size 20 sec 0 div 5}
    set cfig(sblk) {time command}
    foreach {sw} $cfig(swar) {lappend cfig(star) [lindex $sw 0]}

}

option add *Tim.Canvas.width			40		widgetDefault
option add *Tim.Canvas.height			400		widgetDefault
option add *Tim.Canvas.borderWidth		2		widgetDefault
option add *Tim.Canvas.relief			sunken		widgetDefault

# Make sure the specified time is visible
#------------------------------------------
proc tim::see {w {time {}}} {
    variable cfig
    variable v
    if {$time == {}} {			;#default to 8am
        set time {8:00}
    } else {
        lassign [split $time :] hour min
        if {[set min [string trimleft $min 0]] == {}} {set min 0}
        if {[set hour [string trimleft $hour 0]] == {}} {set hour 0}
        set min [expr $min - ($min % 5)]
#puts "see:$time hour:$hour min:$min"
        set time [format {%02d:%02d} $hour $min]
    }
#puts "coords:[$w.c coords T$time] maxy:$v(maxy$w)"
#puts "yview:[$w.c yview]"
    lassign [$w.c coords T$time] x1 y1 x2 y2

#puts "rat:[expr $y2 / $v(maxy$w)] yview:[$w.c yview]"
    $w.c yview moveto [expr $y2 / $v(maxy$w) - 0.1]
}

#Set a time as the currently selected date
#------------------------------------------
proc tim::settime {w {time {}} {adjust 1}} {
    variable cfig
    variable v
#puts "settime w:$w time:$time"
    if {$time == {}} {			;#default to now
        if {$cfig(sec$w)} {
            set time [clock format [clock seconds] -format {%H:%M:%S}]
        } else {
            set time [clock format [clock seconds] -format {%H:%M}]
        }
    }
    set v(curtime$w)	$time
    if {$adjust} {after idle "tim::see $w $time"}
}

# Yield/restore preferences
#------------------------------------------
proc tim::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
#    lappend parr [eval list listbox pref [$w.l pref]]
#    lappend parr [list configure -reexec $cfig(reexec$w)]
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

#Lay out the hours of the day on the canvas
#------------------------------------------
proc tim::layout {w args} {
    variable cfig
    variable v

    proc bgnd {eo} {
        if {[expr $eo % 2]} {return #d0d0d0} else {set return #f0f0f0}
    }

#puts "layout w:$w args:$args"
#    argform {start} args
#    argnorm {{start 1} {preview 1 prev}} args
#    foreach {s va} "prev $cfig(prev$w)" {set ca($s) $va; xswitchs $s args ca($s)}
#    foreach s {start} {set ca($s) [xswitchs $s args]}

    $w.c delete items

    set id [$w.c create text 0 0 -text {XXX} -anchor nw]	;#see how wide text is
    lassign [$w.c bbox $id] x0 y0 cwid y1
    $w.c delete $id
#puts "cwid:$cwid"

    set five 5				;#how high is a 5-minute box
    set quar [expr 3 * $five]		;#15 minutes
    set half [expr 6 * $five]		;#30 minutes
    set hour [expr 12 * $five]		;#60 minutes
    set hwid [expr $cwid / 6]		;#half a character width

    $w.c create rectangle 0 0 $cwid [expr $hour * 12] -fill [bgnd 0] -tags items
    $w.c create rectangle 0 [expr $hour * 12] $cwid [expr $hour * 24] -fill [bgnd 1] -tags items
    
    for {set h 0} {$h < 24} {incr h} {				;#for each hour
        set yh [expr $h * $hour]
        if {[set h12 [expr $h % 12]] == 0} {set h12 {12}}	;#12 hour format
        set h24 [format {%02d} $h]				;#24 hour format
        $w.c create rectangle $cwid $yh [expr $cwid * 2] [expr $yh + $hour] -fill [bgnd $h] -tags "items T$h24:00"
        $w.c create text [expr $cwid + $hwid] [expr $yh + 2] -text ${h24}: -anchor nw -tags "items T$h24:00"
        $w.c create text [expr $cwid + $hwid] [expr $yh + $hour] -text [format {%2d:} $h12] -anchor sw -tags "items T$h24:00"
#        $w.c bind T$h24:00 <ButtonRelease-1> "tim::settime $w $h24:00"

        if {$h > 11} {set apm {PM}} else {set apm {AM}}
        $w.c create text $hwid [expr $yh + $hour] -text $apm -anchor sw -tags items
        
        for {set q 0} {$q < 4} {incr q} {		;#for each quarter hour
            set yq [expr $q * $quar + $yh]
            set min [format {%02d} [expr $q * 15]]
            $w.c create rectangle [expr $cwid * 2] $yq [expr $cwid * 3] [expr $yq + $quar] -fill [bgnd $q] -tags "items T$h24:$min"
            $w.c create text [expr $cwid * 2 + $hwid] [expr $yq + 2] -text $min -anchor nw -tags "items T$h24:$min"
#            $w.c bind T$h24:$min <1> "tim::settime $w $h24:$min"
        }
        for {set f 0} {$f < 12} {incr f} {		;#for each quarter hour
            set yf [expr $f * $five + $yh]
            set min [format {%02d} [expr $f * 5]]
            $w.c create rectangle [expr $cwid * 3] $yf [expr $cwid * 3.5] [expr $yf + $five] -fill [bgnd $f] -tags "items T$h24:$min"

            $w.c bind T$h24:$min <1> "tim::settime $w $h24:$min 0"
        }
    }

    set v(maxy$w) [expr $h * $hour + 1]
    $w.c configure -scrollregion [list 0 0 100 $v(maxy$w)]
}

# Get widget configuration
#------------------------------------------
proc tim::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget w:$w option:$option opt:$opt"
    if {[lcontain $cfig(star) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing widget
#------------------------------------------
proc tim::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(star) {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {eval _$w configure $args}
    return {}
}

#Create the window and initialize it
#------------------------------------------
proc tim::tim {w args} {
    variable cfig
    variable v
     
    argform {menu} args
    argnorm $cfig(swar) args
    foreach {s va} $cfig(sdef) {set cfig($s$w) $va; xswitchs $s args cfig($s$w)}
    foreach s $cfig(sblk) {set cfig($s$w) [xswitchs $s args]}

    eval wframe::_frame $w -class Tim $args
    widginit $w tim *$w

    if {$cfig(menu$w) != {}} {
        mbar::mbar $w.m -mb [list menu $cfig(menu$w)] -gmc.bf {-fill x -exp 1}
        pack $w.m -side top -fill x
        if {$cfig(cur$w) != {}} {		;#show current record count
            eval dew::dew $w.m.cur ent -textv tim::v(curtime$w) -width 5 -help \{The currently selected time\} $cfig(cur$w)
            pack $w.m.cur -side right
        }
    }

    $w.m menu mi ct {Select Current Time}	"tim::settime $w"		{Select now as the current time}
    $w.m menu mi cl {Clear Time}		"set tim::v(curtime$w) {}"	{Clear the current time entry}

    canvas $w.c -bg white -yscrollc "$w.ys set"		;#-scrollregion {0 0 100 100}
    scrollbar $w.ys -orient v -command "$w.c yview"
    pack $w.ys -side right -fill y
    pack $w.c -side right -fill both -exp 1
    
    bind $w.c <1> {%W scan mark 0 %y}
    bind $w.c <B1-Motion> {%W scan dragto 0 %y -10}
    bind $w.c <2> {%W scan mark 0 %y}
    bind $w.c <B2-Motion> {%W scan dragto 0 %y 1}
    bind $w.c <4> "$w.c yview scroll -1 units"
    bind $w.c <5> "$w.c yview scroll  1 units"
    bind $w.c <Double-1> "event generate $w <<Ok>>"	;#the user says OK

    layout $w

    if {$cfig(now$w)} {settime $w}
    return $w
}

#The widget command
#------------------------------------------
proc tim::wcmd {w cmd args} {
    variable v
#puts "wcmd:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{get 2} {canvas 2} {scroll 2} {set 3} {see 3} {layout 2} {preferences 4 pref} {cget 2} {configure 2}} $cmd]
    if {[lcontain {layout pref cget configure see} $cmd]} {return [eval $cmd $w $args]}
    switch $cmd {
        set	{return [eval settime $w $args]}
        get	{return $v(curtime$w)}
        canvas	{return [eval $w.c $args]}
        scroll	{return [eval $w.ys $args]}
        default	{return [eval _$w $cmd $args]}
    }
}

# Popup asking for a time
#------------------------------------------
proc tim::dia {args} {

    argform {dest menu} args
    argnorm {{destination 3 dest}} args

    return [eval dia::dia .timc_dia -ent tim::tim -place p $args -uplevel 2]
}
