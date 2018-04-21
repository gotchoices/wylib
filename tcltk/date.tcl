#Date spinners
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval date {
    namespace export seconds date date_tim tim norm dia diamd range compare

    variable months	{Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec}
    variable monlens	{31 28 31 30 31 30 31 31 30 31 30 31}
    variable de_day	{Day: d int {1 31}}
    variable de_month	[list Month: m enum $months]
    variable de_year	{Year: y int {}}
    variable de_hour	{Hour: h int {0 23}}
    variable de_min	{Min: m int {0 59}}

    variable defca	;#default control arrays
    set defca(day)	[list $de_day]
    set defca(month)	[list $de_month]
    set defca(year)	[list $de_year]
    set defca(date)	[list $de_year $de_month $de_day]
    set defca(time)	[list $de_hour $de_min]
    set defca(bday)	[list $de_month $de_day]
}

#Generate a list of all dates between two dates (inclusive)
#------------------------------------------
proc date::range {date1 date2} {
    set dlist {}
    set s1 [date:::seconds $date1]
    set s2 [date:::seconds $date2]
    for {set s $s1} {$s <= $s2} {incr s 86400} {
        lappend dlist [date::date $s]
    }
    return $dlist
}

#Generate seconds from an ISO date/time (YYYY-Mmm-dd <time>) or today
#------------------------------------------
proc date::seconds {{dat {}}} {
#debug dat
    if {$dat == {}} {return [clock seconds]}
    set rest [lassign [split $dat {-/ _,}] year month day]
#debug year month day rest
    set time [lindex [split $rest .] 0]    ;#lose any fractional seconds
    if {![catch {clock scan "$month $day, $year $time"} res]} {return $res}	;#Alpha month
    if {![catch {clock scan "$month/$day/$year $time"}  res]} {return $res}	;#numeric month
    if {![catch {clock scan "$year $month, $day $time"} res]} {return $res}	;#try to deal with "Mon Dd, YYYY (non-ISO) format
    return [clock scan $dat]
}

# Compare two dates
#------------------------------------------
proc date::compare {d1 d2} {
    return [expr [seconds $d1] - [seconds $d2]]
}

# Format seconds (or now) into a date
#------------------------------------------
proc date::date {{seconds {}} {format {}}} {
#debug seconds
    if {$seconds == {}} {
        set seconds [clock seconds]
    } elseif {[regexp / $seconds]} {
        set seconds [date::seconds $seconds]
    } elseif {[lcontain {+ -} [string range $seconds 0 0]]} {
        set seconds [expr [clock seconds] $seconds]
    }
    if {$format == {}} {
        set format "%Y-%b-%d"
    } 
    if {! [string is digit -strict $seconds]} {set seconds [date::seconds $seconds]}
    return [clock format $seconds -format $format]
}

# Format seconds into a date and time
#------------------------------------------
proc date::date_tim {{seconds {}} {sep { }}} {
    if {$seconds == {}} {
        set seconds [clock seconds]
    } elseif {[lcontain {+ -} [string range $seconds 0 0]]} {
        set seconds [expr [clock seconds] $seconds]
    }
    return [clock format $seconds -format "%Y-%b-%d${sep}%H:%M:%S"]
}

# Format seconds into a time
#------------------------------------------
proc date::tim {{seconds {}}} {
    if {$seconds == {}} {
        set seconds [clock seconds]
    } elseif {[lcontain {+ -} [string range $seconds 0 0]]} {
        set seconds [expr [clock seconds] $seconds]
    }
    return [clock format $seconds -format "%H:%M:%S"]
}

#Translate a date with a possibly numeric month to standard Month format
#------------------------------------------
proc date::norm {dat {sep -}} {
    if {$dat == {}} {return {}}
    lassign [split $dat {-.,}] year month day
    regsub -all -- {^0+([1-9])$} $month {\1} month        ;#08, 09 look like octal!
    if {[string is digit -strict $month]} {set month [lindex {xxx Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec} $month]}
    return [join [list $year $month $day] $sep]
}

#Check a list {year month day} to see if they form a valid date
#------------------------------------------
proc date::checkdate {dlist} {
    variable months
    variable monlens

    lassign $dlist year month day
#puts "year:$year month:$month day:$day"
    if {$day <= 0} {return "Illegal day: $day"}
    if {$year <= 0} {return "Illegal year: $year"}
    set month [csubstr $month 0 3]	;#force month to 3 chars
    if {[string is digit -strict $month]} {
        set midx $month
    } else {
        set midx [lsearch $months $month]
    }
#puts "midx:$midx"
    if {[expr $year % 4]} {			;#if non-leap year
        set mlen $monlens			;#Feb has 28 days
    } elseif {![expr $year % 100] && [expr int($year / 100) % 4]} {	;#if non-leap century
        set mlen $monlens			;#Feb has 28 days
    } else {
        set mlen [lreplace $monlens 1 1 29]	;#special case, Feb has 29 days
    }
#puts "mlen:$mlen"
    if {$midx < 0 || $midx > 12} {return "month: $month not understood"}
    if {$day > [lindex $mlen $midx]} {return "Too many days ($day) for month: $month"}
    return {}
}

#Allow user to edit a date of the form: {Year Month Day} (or {YYYY-Mon-DD})
#------------------------------------------
proc date::dia {args} {
    argform {message} args
    argnorm {{message 4 mess}} args
    set mess [xswitchs mess args]
    lassign [split [date] -] year month day
    return [eval "dia::dia .date_dia -dest retval -delim {-} -ent cdew::cdew -title \$mess \
        -f {ent	-title {}  -width 4 -init $year  -spin {i {0 4999}}}\
        -f {ent	-title {-} -width 3 -init $month -spin {e {Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec}}}\
        -f {ent	-title {-} -width 2 -init $day   -spin {i {1 31}}}\
        " $args -uplevel 2]
}
#        -f {pdm	-title {-} -width 3 -init $month -data {Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec}}

#Allow user to edit a date of the form {Month day} (or Mon-DD)
#------------------------------------------
proc date::diamd {args} {
    argform {message} args
    argnorm {{message 4 mess}} args
    set mess [xswitchs mess args]
    lassign [split [date] -] year month day
    return [eval "dia::dia .date_diamd -dest retval -delim {-} -ent cdew::cdew -title \$mess \
        -f {ent	-title {-} -width 3 -init $month -spin {e {Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec}}}\
        -f {ent	-title {-} -width 2 -init $day   -spin {i {1 31}}}\
        " $args -uplevel 2]
}
