#This will display a calendar widget.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- Use stretchable frame for each day
#X- Put a day button/label on each day
#X- Show year-week for each week
#X- Show month clearly for each week/month
#X- Include menu bar, shortcuts
#X- Handle mouse scrolls to scroll through weeks
#X- Allow area to place appointments on each day
#X- shade odd months different than even
#- better key value for keying back into an individual day
#- 
#- 
#- LATER:
#- Allow to add / delete weeks interactively
#- make config work?
#- mouse wheel scrolling is platform dependent (<4> <5>)
#- 

namespace eval cal {
    namespace export cal dia months
    variable cfig
    variable v				;#holds dynamic values

    set cfig(days) {Xxx Sun Mon Tue Wed Thu Fri Sat}
    set cfig(months) {Xxx Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec}

    set cfig(ebgnd) #f8f8f8		;#even month background
    set cfig(obgnd) #e8e8e8		;#odd
    set cfig(nbgnd) #b0b0b0		;#day numbers
    
    set cfig(swar) {{preview 2 prev} {weeks 2} {menu 2} {load 2} {date 2} {today 2} {current 2 cur} {highlight 2 high} {command 2}}
    set cfig(sdef) {prev 2 weeks 7 load yes today no high {#80a0ff} cur {Selected:} menu {Date: -under 0}}
    set cfig(sblk) {date command}
    foreach {sw} $cfig(swar) {lappend cfig(star) [lindex $sw 0]}

    if {[info commands tk] != {}} {
        image create bitmap b-dn -data "#define dn_width 14\n#define dn_height  7\nstatic unsigned char dn_bits[] = {\n0xff, 0x3f, 0xfe, 0x1f, 0xfc, 0x0f, 0xf8, 0x07, 0xf0, 0x03, 0xe0, 0x01, 0xc0, 0x00};"
        image create bitmap b-up -data "#define up_width 14\n#define up_height  7\nstatic unsigned char up_bits[] = {\n0xc0, 0x00, 0xe0, 0x01, 0xf0, 0x03, 0xf8, 0x07, 0xfc, 0x0f, 0xfe, 0x1f, 0xff, 0x3f};"
        image create bitmap b-lf -data "#define lf_width  7\n#define lf_height 14\nstatic unsigned char lf_bits[] = {\n0x40, 0x60, 0x70, 0x78, 0x7c, 0x7e, 0x7f, 0x7f, 0x7e, 0x7c, 0x78, 0x70, 0x60, 0x40};"
        image create bitmap b-rt -data "#define rt_width  7\n#define rt_height 14\nstatic unsigned char rt_bits[] = {\n0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f, 0x7f, 0x3f, 0x1f, 0x0f, 0x07, 0x03, 0x01};"

        option add *Cal.gr.Label.borderWidth		1		widgetDefault
        option add *Cal.gr.Frame.borderWidth		1		widgetDefault
        option add *Cal.gr.Frame.relief			sunken		widgetDefault
    }
}

#Anytime the widget main frame is configured, reconfigure the weeks to fill the frame
#--------------------------------
proc cal::fconfig {w g} {
    variable cfig
#puts "fconfig:$w $g"

    set wid [winfo width $g]			;#new height for enclosing frame
    set col0 [winfo reqwidth $g.w1]
    set wwid [expr $wid - $col0 - (2 * [$g cget -bd])]
    set ewid [expr $wwid / 7]
#puts "wid:$wid col0:$col0 ewid:$ewid"
    loop dy 1 8 {						;#size each day in first week
        $g.$dy-1 configure -width $ewid
    }
#    $g.1-7 configure -width [expr $ewid + [expr $wwid % 7]]	;#use up leftovers on last column

    set hei [winfo height $g]
    set row0 [winfo reqheight $g.d1]
    set whei [expr $hei - $row0 - (2 * [$g cget -bd])]
    set ehei [expr $whei / $cfig(weeks$w)]
#puts "hei:$hei row0:$row0 ewid:$ewid"
    for {set wk 1} {$wk <= $cfig(weeks$w)} {incr wk} {		;#display weeks
        $g.1-$wk configure -height $ehei
    }
}

#Increment the display week
#------------------------------------------
proc cal::incdisp {w {inc 1}} {
    variable v
    
    set sec [expr $v(starts$w) + (604800 * $inc)]		;#increment
    layout $w -start [date::date $sec]
}

#Increment the selected year
#------------------------------------------
proc cal::incyear {w {inc 1}} {
    variable cfig
    variable v
    lassign [clock format [date::seconds $v(curdate$w)] -format "%Y %m %d"] year month day
    if {$inc == {+}} {
        if {$month == 12 && $day == 31} {incr year} else {lassign {12 31} month day}
    } elseif {$inc == {-}} {
        if {$month == 1 && $day == 1} {incr year -1} else {lassign {1 1} month day}
    } else {
        incr year $inc
    }
    setdate $w "${year}-[lindex $cfig(months) $month]-${day}"
}

#Increment the selected month
#------------------------------------------
proc cal::incmonth {w {inc 1}} {
    variable cfig
    variable v
    
    set cursec [date::seconds $v(curdate$w)]
    lassign [clock format $cursec -format "%Y %m %d"] year month day
    set month [string trimleft $month 0]
    if {$inc == {+}} {
        set tomonth [string trimleft [clock format [expr $cursec + 86400] -format %m] 0]
#puts "month:$month tomonth:$tomonth"
        if {$tomonth != $month} {incr month}
        set day 31
    } elseif {$inc == {-}} {
        if {$day == 1} {incr month -1} else {set day 1}
    } else {
        incr month $inc
    }
    set yinc 0
    while {$month > 12} {incr month -12; incr yinc  1}
    while {$month <  1} {incr month  12; incr yinc -1}
#puts "day:$day"
    while {$day > 28 && [catch {clock scan "$month/$day/$year"}]} {incr day -1}	;#illegal day for month
    incr year $yinc
    setdate $w "${year}-[lindex $cfig(months) $month]-${day}"
}

#Increment the current day
#------------------------------------------
proc cal::incday {w {inc 1}} {
    variable v
    set sec [expr [date::seconds $v(curdate$w)] + 43200]	;#convert to seconds (at noon)
    incr sec [expr 86400 * $inc]		;#increment
    setdate $w [date::date $sec]
}

#Mark update the current date field and focus calendar around today
#------------------------------------------
proc cal::today {w} {
    setdate $w [date::date]
}

# Set a date as the currently selected date
#------------------------------------------
proc cal::setdate {w date {adjust 1}} {
    variable cfig
    variable v
#debug w date adjust
    if {$date == {}} {set date [date::date]}
    set dsec [date::seconds $date]				;#convert date to seconds
    if {$dsec < $v(mins$w) || $dsec > $v(maxs$w)} {		;#is it within visible range
        if {$adjust} {layout $w -start $date}
    }
    day $w $date highlight
    set v(curdate$w)	$date
}

#Return the earliest date showing on the calendar
#------------------------------------------
proc cal::min {w} {
    variable v
    return [date::date $v(mins$w)]
}

#Return the latest date showing on the calendar
#------------------------------------------
proc cal::max {w} {
    variable v
    return [date::date $v(maxs$w)]
}

# Erase all appointments from the calendar
#------------------------------------------
proc cal::clear {w args} {
    variable cfig
    for {set wk 1} {$wk <= $cfig(weeks$w)} {incr wk} {	;#for each display week
        loop day 1 8 {					;#for each day
            day $w $day-$wk clear			;#clear its appointments
        }
    }
}

#Lay out the days of the month onto the grid
#------------------------------------------
proc cal::layout {w args} {
    variable cfig
    variable v

#puts "layout w:$w args:$args"
    argform {start} args
    argnorm {{start 1} {preview 1 prev}} args
    foreach {s va} "prev $cfig(prev$w)" {set ca($s) $va; xswitchs $s args ca($s)}
    foreach s {start} {set ca($s) [xswitchs $s args]}

    if {$ca(start) == {}} {set ca(start) [date::date]}		;#if no start specified
    if {[catch {
        set ssec [expr [eval date::seconds $ca(start)] + 43200]	;#force start date to 12:00 noon to avoid DST problems
    } err]} then {
        dia::err "Error in date: $ca(start)"
        set ssec [expr [date::seconds] + 43200]
    }

    incr ssec [expr [clock format $ssec -format %w] * -86400]	;#backup to Monday
    set v(starts$w) $ssec
#    lassign [clock format $ssec -format "%Y %B %b %U"] v(year$w) v(month$w) v(mon$w) v(week$w)

    array unset v f.*$w					;#forget old frame dates
    set s [expr $ssec - (604800 * $ca(prev))]		;#start numbering N weeks earlier
    set v(mins$w) $s					;#seconds of first display day
    set today [date::date]
#puts "s:[date::date_tim $s] today:$today"
    for {set wk 1} {$wk <= $cfig(weeks$w)} {incr wk} {	;#for each display week
        lassign [clock format $s -format "%y %Y %W %b %B"] yr year week mon month
        set week [format "%02i" [expr [string trimleft $week 0] + 1]] ;# for display purposes, week is week+1
        $w.gr.w$wk configure -text "$mon\n$year-$week" -help "$month\nWeek $week of $year"
        loop day 1 8 {
            set d $w.gr.$day-$wk			;#name of the day's frame
            lassign [clock format $s -format "%d %j %m %Y-%b-%d"] dom doy mon date

            $d.n configure -text [string trimleft $dom 0] -help "$date Day:$doy" -bg $cfig(nbgnd$w)
            if {$date == $today} {$d.n configure -bg $cfig(high$w)}		;#highlight date number for current day
            
            if {[expr [string trimleft $mon 0] % 2]} {set b $cfig(obgnd)} else {set b $cfig(ebgnd)}	;#color even months different than odd
            $d configure -bg $b

            bind $d   <1> "cal::setdate $w $date"
            bind $d.n <1> "cal::setdate $w $date"
            set dsec [date::seconds $date]
            set v(f.$date$w) $d				;#index to day widget for this date
#puts "set v(f.$date$w) $d"
            day $w $date clear				;#remove any old appointments
            incr s 86400				;#advance to next day
        }
    }
    set v(maxs$w) [expr $s - 86400]			;#seconds of first display day
    setdate $w $v(curdate$w) 0

    if {$cfig(command$w) != {}} {				;#if there's a user defined binding
        regsub -all -- %d $cfig(command$w) $v(curdate$w) cmd	;#substitute date for 'd'
        eval $cmd						;#and execute the command
    }
}

# Build the frames for the right number of weeks
#------------------------------------------
proc cal::build {w args} {
    variable cfig
    variable v

    set g $w.gr
    loop day 1 8 {						;#Day of week titles
        grid columnconfigure $g $day -minsize 30
        set d $g.d$day
        set dn [lindex $cfig(days) $day]
        label $d -text $dn
        grid $d -row 0 -column $day -sticky ew
    }

    grid columnconfigure $g 0 -minsize 20			;#week titles
    for {set wk 1} {$wk <= $cfig(weeks$w)} {incr wk} {		;#for each display week
        message $g.w$wk -text Week -just r
        grid $g.w$wk -row $wk -column 0 -sticky nw
    }
    
    for {set wk 1} {$wk <= $cfig(weeks$w)} {incr wk} {		;#for each display week
        grid rowconfigure $g $wk -minsize 20
        loop day 1 8 {
            set d $g.$day-$wk
            frame $d
            bindtags $d "$d Frame $g . all"
#puts "bindtags $d:[bindtags $d]"
            grid $d -row $wk -column $day -sticky nesw

            bind $d   <Double-1> "event generate $w <<Ok>>"	;#bind specifically to day so we can discriminate between clicks on an event and just the day backdrop

            label $d.n -help {The numeric day of the month} -bg $cfig(nbgnd) -width 2 -anchor e
            bindtags $d.n "$d.n Label $d $g . all"		;#include $d to get <<Ok>>
#puts "bindtags $d.n:[bindtags $d.n]"
            pack propagate $d 0
            pack $d.n -side top -anchor e
        }
#        label $g.1-$wk.m -help {The month this week starts on}
#        pack $g.1-$wk.m -side right -anchor n
    }

    bind $g <4> "cal::incdisp $w -1"
    bind $g <5> "cal::incdisp $w 1"
#    bind $g <Double-1> "puts Ok; event generate $w <<Ok>>"	;#the user says OK
}
     
# Yield/restore preferences
#------------------------------------------
proc cal::pref {w args} {
    variable cfig
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
#    lappend parr [eval list listbox pref [$w.l pref]]
#    lappend parr [list configure -reexec $cfig(reexec$w)]
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

# Get widget configuration
#------------------------------------------
proc cal::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget w:$w option:$option opt:$opt"
    if {[lcontain $cfig(star) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing widget
#------------------------------------------
proc cal::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(star) {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {eval _$w configure $args}
    return {}
}

#Create the calendar window and initialize it
#------------------------------------------
proc cal::cal {w args} {
    variable cfig
    variable v
     
    argform {menu} args
    argnorm $cfig(swar) args
    foreach {s va} $cfig(sdef) {set cfig($s$w) $va; xswitchs $s args cfig($s$w)}
    foreach s $cfig(sblk) {set cfig($s$w) [xswitchs $s args]}

    eval wframe::_frame $w -class Cal $args
    widginit $w cal *$w

    if {$cfig(menu$w) != {}} {
        mbar::mbar $w.m -mb "menu $cfig(menu$w)" -gmc.bf {-fill x -exp 1}
        pack $w.m -side top -fill x
        if {$cfig(cur$w) != {}} {		;#show current record count
            eval dew::dew $w.m.cur ent -textv cal::v(curdate$w) -width 12 -help \{The currently selected date\} $cfig(cur$w)
            pack $w.m.cur -side right
        }
    }

    $w.m menu mi ys {Start of Year} 	"cal::incyear $w -"	-u 4 -s {|< -rep 1 -bg #ff40a0}	{Move to the first day of the current year, or if already there, the previous year}
    $w.m menu mi yp {Previous Year} 	"cal::incyear $w -1"	-u 4 -s {<  -rep 1 -bg #ff40a0}	{Move backward in time one year}
    $w.m menu mi ms {Start of Month} 	"cal::incmonth $w -"	-u 3 -s {|< -rep 1 -bg #ff80a0}	{Move to the first day of the current month, or if already there, the previous month}
    $w.m menu mi mp {Previous Month} 	"cal::incmonth $w -1"	-u 3 -s {<  -rep 1 -bg #ff80a0}	{Move backward in time one month}
    $w.m menu mi wp {Previous Week} 	"cal::incday $w -7"	-u 1 -s {<  -rep 1 -bg #ffc0a0}	{Move backward in time one week}
    $w.m menu mi dp {Previous Day} 	"cal::incday $w -1"	-u 0 -s {<  -rep 1 -bg #ffffa0}	{Move backward in time one day}
    $w.m menu mi sep
    $w.m menu mi dc {Go to Today}	"cal::today $w"		-u 6 -s {Today -bg lightblue}		{Select today as the current date}
    $w.m menu mi sep
    $w.m menu mi dn {Next Day} 		"cal::incday $w +1"	-u 5 -s {>  -rep 1 -bg #ffffa0}	{Move forward in time one day}
    $w.m menu mi wn {Next Week} 	"cal::incday $w 7"	-u 5 -s {>  -rep 1 -bg #ffc0a0}	{Move forward in time one week}
    $w.m menu mi mn {Next Month}	"cal::incmonth $w"	-u 5 -s {>  -rep 1 -bg #ff80a0}	{Move forward in time one month}
    $w.m menu mi me {End of Month} 	"cal::incmonth $w +"	-u 3 -s {>| -rep 1 -bg #ff80a0}	{Move to the last day of the current month, or if already there, the next month}
    $w.m menu mi yn {Next Year}		"cal::incyear $w"	-u 5 -s {>  -rep 1 -bg #ff40a0}	{Move forward in time one year}
    $w.m menu mi ye {End of Year}	"cal::incyear $w +"	-u 5 -s {>| -rep 1 -bg #ff40a0}	{Move to the last day of the current year, or if already there, the next year}
    $w.m menu mi sep
    $w.m menu mi pr {Print Calendar}	"print::grab $w"	-u 0			{View a printable rendering of the calendar view}
    
    frame $w.gr 	;#-bg lightgreen				;#will hold calendar grid
    pack $w.gr -side top -fill both -exp 1
    build $w				;#build the right number of weeks

    bind $w.gr <Configure> "cal::fconfig $w $w.gr"		;#automatically grow to fill frame

    set cfig(nbgnd$w) [$w.gr.1-1.n cget -background]		;#standard number background
    
    frame [set b $w.gr.0-0] -bd 1
    grid $b -row 0 -column 0 -sticky nesw
    button $b.up -image b-up -pady 0 -bd 1 -rep 1 -command "cal::incdisp $w  1" -help {Move the display one week later}
    button $b.dn -image b-dn -pady 0 -bd 1 -rep 1 -command "cal::incdisp $w -1" -help {Move the display one week earlier}
    pack $b.up $b.dn -side left -fill both -exp 1

    set v(lsel$w) {}			;#track last frame selected
    if {$cfig(load$w)} {
        layout $w -start $cfig(date$w)
        if {$cfig(today$w)} {setdate $w [date::date]}
    }
    return $w
}

# A pseudo-widget command for each day on the calendar
# day can be specified as seconds, or an ISO date form (YYYY-MM-DD), or a day-week grid coord on the current display
#------------------------------------------
proc cal::day {w day cmd args} {
    variable cfig
    variable v
#puts " $w day:$day cmd:$cmd args:$args"
    if {[llength [set daylist [split $day -]]] == 1} {		;#seconds form
        set td [date::date $day]
        if {![info exists v(f.$td$w)] || ![winfo exists $v(f.$td$w)]} {
#            error "Day: $day not on calendar";
            return
        }
        set d $v(f.$td$w)
    } elseif {[llength $daylist] == 3} {			;#ISO form
        set td [date::norm $day]
        if {![info exists v(f.$td$w)] || ![winfo exists $v(f.$td$w)]} {
#            error "Day: $day not on calendar"
            return
        }
        set d $v(f.$td$w)
    } elseif {[llength $daylist] == 2 && [winfo exists $w.gr.$day]} {
        set d $w.gr.$day
    } else {
        error "Unrecognized day format: $day"
        return
    }

    set cmd [unabbrev {{frame 2} {appointment 2 appt} {highlight 2} {clear 2}} $cmd]
#puts "  td:$td cmd:$cmd args:$args"
    switch -- $cmd {
        appt	{				;#insert an appointment on day
            set args [lassign $args id]
            if {[winfo exists $d.$id]} {destroy $d.$id}			;#delete any old one
#puts "label $d.$id $args"
            eval label $d.$id -anchor w $args -bd 1 -relief sunken
            bindtags $d.$id "$d.$id Label $w.gr . all"			;#so you can scroll when sitting on the label
#puts " bindtags:[bindtags $d.$id]"
 
            pack $d.$id -side top -anchor w -fill x
            return $d.$id
        }

        highlight {				;#color day as the "selected day"
            if {[set ls $v(lsel$w)] != {} && [winfo exists $ls]} {	;#if some other day presently highlighted
                $ls config -bg $v(lbgnd$w)				;#restore its background
            }
            set v(lbgnd$w) [$v(f.$td$w) cget -bg]			;#remember day's background
            [set v(lsel$w) $v(f.$td$w)] config -bg $cfig(high$w)	;#highlight it
        }

        clear {					;#remove any appointments from day
            foreach c [winfo children $d] {
                if {[lindex [split $c .] end] != {n}} {destroy $c}
            }
        }

        default {				;#default to a frame command
            return [eval $d $cmd $args]
        }
    }
}

#The widget command
#------------------------------------------
proc cal::wcmd {w cmd args} {
    variable v
#puts "wcmd:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{get 2} {set 2} {day 1} {clear 2} {layout 2} {preferences 4 pref} {initialize 2 init} {cget 2} {configure 2} {minimum 3 min} {maximum 3 max}} $cmd]
    if {[lcontain {incday layout pref min max day clear cget configure} $cmd]} {return [eval $cmd $w $args]}
    if {$cmd == {set}} {
        return [eval setdate $w $args]
    } elseif {$cmd == {get}} {
        return $v(curdate$w)
    } elseif {$cmd == {w}} {
        return $w
    } else {
        return [eval _$w $cmd $args]			;#default to frame
    }
}

#Allow user to edit a value using the calendar
#------------------------------------------
proc cal::dia {args} {
    variable defca

    argform {dest menu} args
    argnorm {{destination 3 dest}} args
    return [eval dia::dia .cal_dia -ent cal::cal -place p $args -uplevel 2]
}

#Create a text preview of n months of calendar dates (like unix cal cmd)
#------------------------------------------
proc cal::months {args} {

    argform {start months} args
    argnorm {{start 1} {months 1}} args
    set months 3			;#default to 3 months
    set start [date::date]		;#and start on today
    foreach s {start months} {xswitchs $s args $s}

    lassign [clock format [date::seconds $start] -format "%Y %b %d"] year month day

    foreach row {0 1 2 3 4 5} {set dystrg($row) {                                                                           }}
    set moff 0				;#month offset
    set row 0				;#row offset
    set last_dow -1
    set secs [clock scan "$month 1, $year"]
    set hdr "$month S  M  T  W  T  F  S"
    while 1 {
        lassign [clock format $secs -format {%b %d %w}] mn dy dow
        set dy [string trimleft $dy 0]
        if {$dy < 10} {set dy " $dy"}
        if {$dow < $last_dow} {incr row}
        if {$mn != $month} {
            set month $mn
            set row 0
            incr moff
            if {$moff >= $months} break			;#only do 3 months
            append hdr "   $month S  M  T  W  T  F  S"
        }
        set idx [expr ($dow * 3) + ($moff * 26) + 3]
#puts "$mn $dy dow:$dow row:$row idx:$idx"
        set dystrg($row) [string replace $dystrg($row) $idx [expr $idx + 1] $dy]
        incr secs [expr 60 * 60 * 24]		;#move ahead 1 day
        set last_dow $dow
    }
    return "$hdr\n$dystrg(0)\n$dystrg(1)\n$dystrg(2)\n$dystrg(3)\n$dystrg(4)\n$dystrg(5)"
}
