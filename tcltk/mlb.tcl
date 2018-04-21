# Multiple pan-able listboxes arranged as columns
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- summary boxes don't calculate themselves on initial invocation
#X- bring up standard search window (Ctrl-F)
#- 
#- 
package require csv

namespace eval mlb {
    namespace export mlb
    variable cfig
    variable v

    image create bitmap but -data "#define dot_width 7\n#define dot_height 7\nstatic unsigned char dot_bits[] = {\n0x08, 0x14, 0x2a, 0x55, 0x2a, 0x14, 0x08};"
    image create bitmap asc -data "#define dn_width 12\n#define dn_height 6\nstatic unsigned char dn_bits[] = {\n0xff, 0x0f, 0x06, 0x06, 0x0c, 0x03, 0x98, 0x01, 0xf0, 0x00, 0x60, 0x00};"
    image create bitmap desc -data "#define up_width 12\n#define up_height 6\nstatic unsigned char up_bits[] = {\n0x60, 0x00, 0xf0, 0x00, 0x98, 0x01, 0x0c, 0x03, 0x06, 0x06, 0xff, 0x0f};"
    image create bitmap emp -data "#define emp_width 12\n#define emp_height 6\nstatic unsigned char emp_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};"

    set cfig(swar) {{highlight 4 highlt} {see 2} {field 1 f} {frame 2 fr} {titlemenu 2 tmenu} {columnmenu 2 cmenu} {summary 3 sum} {calculate 3 calc} {sort 2} {autosize 2 auto} {data 3} {initialize 2 init} {display 2 disp} {resort 3} {scrollbars 2 scroll} {minimumheight 3 minh} {maximumauto 3 maxa} {menu 2}}
    set cfig(sdef) {see 0 scroll 1 tmenu 1 sum 0 sort local highlt lightblue auto 0 resort 1 minh 40 maxa 300}
    set cfig(sblk) {data disp calc cmenu}
    foreach {sw} $cfig(swar) {
        if {[lindex $sw 0] == {field} || [lindex $sw 0] == {frame}} continue
        if {[llength $sw] > 2} {lappend cfig(star) [lindex $sw 2]} else {lappend cfig(star) [lindex $sw 0]}
    }

    set cfig(spread) {oocalc}

    set cfig(aggsum) {{_} None A Average S Summation X Maximum N Minimum C Count V Variance D Std_Dev}
    set cfig(colfmt) {
        _	{None}		{Display the data with no special formatting}
        cur	{Currency}	{Show numbers with comma separators and exactly two digits after the decimal (useful for most currency).}
        fl2	{Float 2}	{Show numbers with exactly two digits after the decimal.}
        fl4	{Float 4}	{Show numbers with exactly four digits after the decimal.}
        pe0	{Percentage 0}	{Multiply the number by 100, showing no digits after the decimal point}
        pe2	{Percentage 2}	{Multiply the number by 100 and then show 2 digits after the decimal point}
        int	{Integer}	{Round the number to the nearest integer}
        bol	{Boolean}	{Attempt to show data as a standard boolean (yes or no) value}
        dat	{ISO Date}	{Normalize dates to standard ISO date format (YYYY-Mmm-DD)}
        dao	{Date Offset}	{Show dates as an offset in days from the current date}
        arr	{Array}		{Strip the curly braces from an array to show only its elements separated by commas}
        bal	{Balance}	{Generate a running sum of this column}
    }
}

#option add *Mlb*Listbox.font fixed widgetDefault
option add *Mlb*Listbox.borderWidth 1 widgetDefault
option add *Mlb*Listbox.background grey94 widgetDefault
option add *Mlb*Listbox.font TkFixedFont widgetDefault
option add *Mlb.Scrollbar.width 8 widgetDefault
option add *Mlb*tf.so.foreground red widgetDefault
option add *Mlb.borderWidth 2 widgetDefault
option add *Mlb.relief raised widgetDefault
option add *Mlb.width 10 widgetDefault
option add *Mlb.height 60 widgetDefault

#Quick find text in any column (starts at selection and marks next found line)
#--------------------------------
proc mlb::qfind {w dir var} {
    variable cfig
    variable v
    set txt [expr \$$var]
    #puts "Looking $dir for $txt in $w"
    set tags $cfig(disp$w)
    #puts "Found tags: $tags"
    set lb $w.c.f.c$v(master$w).b
    set lines $v(marked$w)
    set line -1
    set last [$lb index end]
    if {$lines != {}} {
        set line [lindex $lines 0] 
    }
    #puts "On line $line from $lines"
    for {set i [expr $line + $dir]} {$i >= 0 && $i <= $last} {set i [expr $i + $dir]} {
        #puts "Looking at line $i with direction $dir"
        foreach t $tags {
            if {[regexp -nocase -- "^(.*)(${txt})(.*)$" [$w.c.f.c$t.b get $i] all pre match post]} {
                #puts "Found @ line $i with tag $t"
                mlb::mark $w $i
                return
            }
        }
    }
}

#Anytime the widget main frame is configured, reconfigure the inner component sizes
#--------------------------------
proc mlb::p_config {w {wid {}} {hei {}}} {
    variable cfig
    variable v

#puts "P Configure w:$w wid:$wid hei:$hei width:[winfo width $w] height:[winfo height $w]"
    if {$wid == {}} {set wid [winfo width $w]}
    if {$hei == {}} {set hei [winfo height $w]}
    set pw [expr $wid - [winfo width  $w.ys] - ([$w cget -borderwidth] * 2)]
    set ph [expr $hei - [winfo height $w.xs] - ([$w cget -borderwidth] * 2)]

    set fw 0    
    foreach tag $v(disp$w) {
        if {![lcontain $cfig(tags$w) $tag]} {		;#in case we have an obsolete field still in display list
            set v(disp$w) [lremove $v(disp$w) $tag]
            continue
        }
        incr fw [winfo reqwidth $w.c.f.c$tag]
        incr fw [winfo reqwidth $w.c.f.z$tag]
#puts "$tag:[winfo width $w.c.f.c$tag]:[winfo reqwidth $w.c.f.c$tag]:"
    }
#puts "pw:$pw ph:$ph fw:$fw"
    set mw [max $pw $fw]
    set mwp [expr $mw + 50]

    $w.c.f configure -height $ph -width $mw
    $w.c configure -width $pw -height $ph -scrollregion "0 0 $mw $ph"
    after idle "mlb::xs_check $w $ph"
}

# Check to see whether to map x scrollbar
#------------------------------------------
proc mlb::xs_check {w ph} {

    lassign [$w.c xview] x y
#puts "view x:$x y:$y"
    if {$x <= 0.02 && $y > 0.98} {		;#should we unmap the scroll bar?
        grid forget $w.xs $w.b
        set ph [expr $ph + [winfo height $w.xs]]
        $w.c.f configure -height $ph
        $w.c configure -height $ph
    } else {
        grid $w.xs $w.b -row 1 -sticky news
    }
}

#When the column is grabbed
#------------------------------------------
proc mlb::tpress {w tag} {
    variable v
#puts "tpress:$w:$tag:"
    set v(drag$w) $tag
    $w.c.f.c$tag.tf.t configure -cursor left_side
}

#When the column is dropped
#------------------------------------------
proc mlb::trelease {w tag x y} {
    variable cfig
    variable v
    set t $w.c.f.c$tag.tf.t
    $w.c.f.c$tag.tf.t configure -cursor hand1
    if {[set dw [winfo containing $x $y]] == "$w.c.f"} {
        set idx [lsearch -exact $v(disp$w) $v(drag$w)]
        set tags [lreplace $v(disp$w) $idx $idx]
        lappend tags $v(drag$w)
    } else {
        if {![regexp [cconcat "^$w" {\.c\.f\.c([^.]*)\..*}] $dw junk dt]} return
#puts "drag $v(drag$w) to $dt"
        if {![lcontain $v(disp$w) $v(drag$w)] || ![lcontain $v(disp$w) $dt] || $v(drag$w) == $dt} return
        set tags {}
        foreach t $v(disp$w) {
            if {$t == $v(drag$w)} continue
            if {$t == $dt} {lappend tags $v(drag$w)}
            lappend tags $t
        }
    }
    repack $w $tags
}

#Set/get the given column as the master
#------------------------------------------
proc mlb::master {w {tag {}}} {
    variable v
    if {$tag == {}} {return $v(master$w)}
    set mlb::v(master$w) $tag
#puts "master:$v(master$w)"
}

#Mark (highlight) selected lines
#------------------------------------------
proc mlb::mark {w {lines {}}} {
    variable cfig
    variable v
    set lb $w.c.f.c$v(master$w).b
    if {$lines == {?}} {return $v(marked$w)}
    if {$lines == {}} {			;#if no lines given
        set lines [$lb curselection]	;#make it match the master
#    } elseif {[$lb curselection] != {}} {
#        $lb selection clear 0 end	;#else make master match lines
#        $lb selection set $lines
    }
#puts "master:$v(master$w) lines:$lines"
    foreach tag $v(disp$w) {
        foreach i $v(marked$w) {catch {$w.c.f.c$tag.b itemconfigure $i -bg $cfig(bgnd$w)}}
        foreach i $lines {catch {$w.c.f.c$tag.b itemconfigure $i -bg $cfig(highlt$w)}}
    }
#    set v(marked$w) [$lb curselection]
    set v(marked$w) $lines
    if {[llength $lines] > 0} {$lb see [lindex $lines 0]}
}

#Get or set the display order
#--------------------------------
proc mlb::display {w {new {?}}} {
    variable cfig
    variable v
#puts "display w:$w new:$new:"
    if {$new == {?}} {return $v(disp$w)}
    if {$new != $v(disp$w)} {repack $w $new}
}

#Repack in the current (or given) display order
#--------------------------------
proc mlb::repack {w {disp {}}} {
    variable cfig
    variable v
    if {$disp != {}} {set v(disp$w) $disp}
#puts "repack disp:$v(disp$w) children:[winfo children $w.c.f]"
    foreach c [winfo children $w.c.f] {pack forget $c}
    foreach t $cfig(tags$w) {set cfig(hide:$t$w) 1}
    foreach t $v(disp$w) {
        if {![winfo exists $w.c.f.c$t]} continue
        set cfig(hide:$t$w) 0
        pack $w.c.f.c$t -side left -fill both -exp 0
        pack $w.c.f.z$t -side left -fill y
        pack propagate $w.c.f.c$t no
    }
    master $w [lindex $v(disp$w) 0]	;#default master to first display column
    p_config $w
}

#When the scroll bar is operated, trigger all the listboxes
#--------------------------------
proc mlb::yview {w args} {
    variable v
#puts "yview w:$w args:$args"
    eval $w.c.f.c$v(master$w).b yview $args
}

#When one of the listboxes is moved by hand, adjust the others and the scroll bar
#--------------------------------
proc mlb::yscroll {w lb j x1 x2} {
    variable cfig
    variable v
#puts "yscroll w:$w lb:$lb j:$j master:$v(master$w) x1:$x1 x2:$x2"
    if {$lb != "$w.c.f.c$v(master$w).b"} return
    $w.ys set $x1 $x2

    foreach tag $v(disp$w) {
        if {"$tag" != "$v(master$w)"} {$w.c.f.c$tag.b yview moveto $x1}
    }
}

# Recalculate a summary field
#--------------------------------
proc mlb::summary_calc {w tag} {
    variable cfig
    variable v
    
    set f :$tag$w
#puts "calc:$w $tag f:$f ($cfig(sum$f))"
    set total 0
    set cnt 0
    set max {}
    set min {}
    set lb $w.c.f.c$tag.b
    set v(sum$f) {}
    if {![lcontain {C A S X N} $cfig(sum$f)]} {return {}}
    if {$cfig(sum$f) == {C}} {set v(sum$f) [$lb size]; return}
    foreach ln [$lb get 0 end] {
        catch {
            set total [expr $total + $ln]
            if {$max == {} || $ln > $max} {set max $ln}
            if {$min == {} || $ln < $min} {set min $ln}
            incr cnt
        }
#puts "ln:$ln total:$total"
    }
    switch $cfig(sum$f) {
        A {if {$cnt > 0} {set v(sum$f) [expr $total / $cnt]}}
        S {set v(sum$f) $total}
        X {set v(sum$f) $max}
        N {set v(sum$f) $min}
    }
}

# Control the summary fields
#--------------------------------
proc mlb::summary {w {cmd {}} args} {
    variable cfig
    variable v
    set wc $w.c.f.c
#puts "summary cmd:$cmd args:$args"
    if {$cmd == {}} {set cmd {get}}
    set cmd [unabbrev {{show 2} {set 2} {get 2} {function 2 func}} $cmd]

    if {$cmd == {show}} {		;#toggle show/hide of summary fields
        if {[set val [lindex $args 0]] == {}} {set val $cfig(sum$w)}
        foreach tag $cfig(tags$w) {
            if {![lcontain {C A S X N} $cfig(sum:$tag$w)]} {set cfig(sum:$tag$w) {_}}	;#map any invalid functions to 'disabled'
            if {$val} {
                pack $wc$tag.s -side bottom -fill x -after $wc$tag.xs
            } else {
                foreach tag $cfig(tags$w) {pack forget $wc$tag.s}
            }
        }
    } elseif {$cmd == {update}} {	;#recalculate field values
        if {!$cfig(sum$w)} return	;#skip if summary fields turned off
        if {$args == {}} {set args $v(disp$w)}
        if {$cfig(calc$w) == {}} {	;#if no callback function given
#puts "  update built-in"
            foreach tag $args {summary_calc $w $tag}	;#use our builtin one
        } else {
#puts "  update user: $cfig(calc$w)"
            foreach {tg va} [eval $cfig(calc$w) $args] {	;#user func returns name/value pairs
                set v(sum:$tg$w) $va
            }
        }
    } elseif {$cmd == {get}} {		;#get values of summary fields
        set vals {}
        foreach tg $args {
            lappend vals $v(sum:$tg$w)
        }
        return $vals
    } elseif {$cmd == {set}} {		;#set function types
        foreach {tg fn} $args {		;#if valid column tag
            if {[lcontain $cfig(tags$w) $tg]} {set cfig(sum:$tg$w) $fn}	;#set function type
        }
    } elseif {$cmd == {func}} {		;#get the type of one or more summary fields
        if {[llength $args] <= 0} {set args $v(disp$w)}
        set funcs {}
        foreach tag $args {
            lappend funcs $tag $cfig(sum:$tag$w)
        }
        return $funcs
    }
}

# Control the aggregate settings
#--------------------------------
proc mlb::aggregate {w {cmd {func}} args} {
    variable cfig
    variable v
    set wc $w.c.f.c
#puts "aggregate cmd:$cmd args:$args"
    set cmd [unabbrev {{set 2} {function 2 func}} $cmd]

    if {$cmd == {set}} {		;#set function types
        foreach {tg fn} $args {		;#if valid column tag
            if {[lcontain $cfig(tags$w) $tg]} {set cfig(agg:$tg$w) $fn}	;#set function type
        }
    } elseif {$cmd == {func}} {		;#get the type of one or more aggregate fields
        if {[llength $args] <= 0} {set args $v(disp$w)}
        set funcs {}
        foreach tag $args {
            lappend funcs $tag $cfig(agg:$tag$w)
        }
        return $funcs
    }
}

# Control column formatting settings
#--------------------------------
proc mlb::fmt {w {cmd {func}} args} {
    variable cfig
    variable v
    set wc $w.c.f.c
#puts "format cmd:$cmd args:$args"
    set cmd [unabbrev {{set 2} {function 2 func}} $cmd]

    if {$cmd == {set}} {		;#set formatting options
        foreach {tg fn} $args {		;#if valid column tag
            if {[lcontain $cfig(tags$w) $tg]} {set cfig(fmt:$tg$w) $fn}	;#set format type
        }
    } elseif {$cmd == {func}} {		;#get the type of one or more aggregate fields
        if {[llength $args] <= 0} {set args $v(disp$w)}
        set funcs {}
        foreach tag $args {
            lappend funcs $tag $cfig(fmt:$tag$w)
        }
        return $funcs
    }
}

# Return or set the current sort order
#--------------------------------
proc mlb::order {w {flist ?}} {
    variable cfig
#puts "order:$w $flist"
    if {$flist == {?}} {			;#return current sort order
        set ordlist {}
        loop n 1 [llength $cfig(tags$w)] {	;#loop tag times
            foreach t $cfig(tags$w) {		;#for each tag
                if {$cfig(ord:$t$w) == $n} {lappend ordlist [list $t $cfig(arrow:$t$w)]}
            }
        }
#puts " ordlist:$ordlist"
        return $ordlist
    } else {
        foreach t $cfig(tags$w) {		;#reset sort data
            $w.c.f.c$t.tf.sb configure -image emp
            set cfig(ord:$t$w) {}		;#sort order of this field
        }
        if {$cfig(sort$w) == {local}} {set dosort 1} else {set dosort 0}
        for {set n [expr [llength $flist] - 1]} {$n >= 0} {incr n -1} {
            set frec [lindex $flist $n]		;#grab each field in reverse order
            lassign $frec tag ad		;#get field name and direction
            if {$ad == {}} {set ad {asc}}	;#default to increasing
            sort $w -tag $tag -ord $ad -resort $dosort	;#sort by this field
        }
#puts "sort:$cfig(sort$w)"

#This causes dbs to load twice.  Seems like actually resorting should happen independent of setting the sort order
#        if {![lcontain {local none {}} $cfig(sort$w)]} {eval $cfig(sort$w)}	;#call external sort routine
    }
}

#Sort on a field (subordinate other enabled sort fields)
#--------------------------------
proc mlb::sort {w args} {
    variable cfig
    argform {tag order} args
    argnorm {{tag 1} {order 3 ord} {resort 3}} args

#puts "sorting:$args"
    if {[set tag [xswitchs tag args]] == {}} return
    if {[set index [lsearch -exact $cfig(tags$w) $tag]] < 0} return
    set ord [unabbrev {{ascending 1 asc} {descending 1 desc} {toggle 1 tog} {none 3 non}} [xswitchs ord args]]
    set resort 1; xswitchs resort args resort

    set f :$tag$w
    if {$ord == {}} {
        set ord {asc}			;#default to ascending
    } elseif {$ord == {tog}} {		;#or toggle arrow
        if {$cfig(arrow$f) == {asc}} {set ord {desc}} else {set ord {asc}}
    }

    set sflds {}			;#get list of fields currently included in sort
    foreach t $cfig(tags$w) {
        if {$cfig(ord:$t$w) != {}} {lappend sflds $t}
    }
#puts " sflds:$sflds ord:$ord"
    if {$ord == {non}} {		;#if disabling this field
        foreach t $sflds {
            if {$cfig(ord:$t$w) > $cfig(ord$f)} {incr cfig(ord:$t$w) -1}	;#decrement larger fields
        }
        set cfig(ord$f) {}			;#this field no longer part of sort
    } elseif {[lcontain $sflds $tag]} {	;#if this field was already part of the last sort,
        foreach t $sflds {
            if {$cfig(ord:$t$w) < $cfig(ord$f)} {incr cfig(ord:$t$w)}	;#increment smaller fields
        }
        set cfig(ord$f) {1}			;#this field becomes number 1
    } else {
        foreach t $sflds {incr cfig(ord:$t$w)}	;#increment all sort fields
        set cfig(ord$f) {1}			;#this field becomes number 1
    }

    switch $ord {
        {asc} {
            set sord {inc}
            set cfig(arrow$f) {asc}
        }
        {desc} {
            set cfig(arrow$f) {desc}
            set sord {dec}
        }
        {non} {
            set cfig(arrow$f) {emp}
        }
    }
    $w.c.f.c$tag.tf.sb configure -image $cfig(arrow$f)

    if {!$resort || $ord == {non}} return		;#don't actually sort if disabling field
#puts " type:$cfig(sort$w):"
    if {$cfig(sort$w) == {local}} {	;#if doing our own sorts
        lib::cwatch $w
        set data [$w get 0 end]
        if {$cfig(sort:$tag$w) == {date}} {
            set sorttype "-command date::compare"
        } else {
            set sorttype "-$cfig(sort:$tag$w)"
        }
#puts " lsort -$sord -index $index $sorttype"
        set data [eval lsort -$sord $sorttype -index $index \$data]

        $w delete 0 end
#        set rs $cfig(resort$w); set cfig(resort$w) 0	;#Hack: prevent insert from sorting again
        eval $w insert end $data
#        set cfig(resort$w) $rs
        lib::cnorm $w
    
    } elseif {$cfig(sort$w) != {none}} {;#if custom sort routine given, do it
#puts " sort:$w:$cfig(sort$w) $index"
        eval $cfig(sort$w) $index
    }
}

# Delete contents and reset sort arrows
#--------------------------------
proc mlb::reset {w} {
    variable cfig
    variable v
    $w delete 0 end
    foreach t $v(disp$w) {$w.c.f.c$t.tf.sb configure -image emp}
}

#Automatically resize a pane
#--------------------------------
proc mlb::resize {w {tag {}} {newwidth {}}} {
    variable cfig
    variable v
    if {$tag == {}} {
        foreach t $v(disp$w) {if {$t != {}} {resize $w $t}}
        return
    }
    lassign [$w.c.f.c$tag.b xview] low high
    set width [winfo reqwidth $w.c.f.c$tag]
#puts "tag:$tag low:$low high:$high width:$width :[winfo width $w.c.f.c$tag]:"
    if {$low <= 0 && $high >= 1} return
    if {$newwidth == {}} {
        set newwidth [expr int($width / ($high - $low))]
        if {$newwidth > $cfig(maxw:$tag$w)} {set newwidth $cfig(maxw:$tag$w)}
    }
    $w.c.f.c$tag configure -width $newwidth
    p_config $w
}

#Add a new field description
#--------------------------------
proc mlb::add {w args} {
    variable cfig
    variable v

    argform {tag title width} args
    argnorm {{width 2} {title 2} {short 2} {invisible 3 inv} {hide 2} {maxwidth 3 maxw} {sort 2} {format 2 fmt}} args
    if {[set tag [xswitchs tag args]] == {}} return
    set f :$tag$w
    array set cfig "fmt$f _ width$f 60 inv$f 0 hide$f 0 arrow$f emp maxw$f $cfig(maxa$w) sort$f dictionary"
    foreach s {title short ord} {set cfig($s$f) [xswitchs $s args]}
    foreach s {width inv hide maxw sort fmt} {xswitchs $s args cfig($s$f)}

    lappend cfig(tags$w) $tag
    if {$cfig(inv$f)} {set cfig(hide$f) 1}
    if {!$cfig(hide$f)} {lappend v(disp$w) $tag}	;#displayed panes

    if {$cfig(title$f) == {}} {set cfig(title$f) [cap_first $tag]}
    if {$v(master$w) == {}} {set v(master$w) $tag}	;#first field is master
    
    frame [set c $w.c.f.c$tag] -width $cfig(width$f)
#puts "frame [set c $w.c.f.c$tag] -width $cfig(width$f)"
    sizer::sizer [set z $w.c.f.z$tag] $c -o v
    eval listbox $c.b -highlightth 0 -xscrollc \"$c.xs set\" -yscrollc \"mlb::yscroll $w $c.b $tag\" $cfig(lbargs$w) $args
    scrollbar $c.xs -orient h -width 5 -bd 1 -command "$c.b xview"

    frame $c.s				;#to hold summary data
    lassign {_ _} cfig(sum$f) cfig(agg$f)
    menubutton $c.s.b -textv mlb::cfig(sum$f) -anchor w -bd 1 -padx 1 -relief raised -menu $c.s.b.m -help {Select the way this summary field is computed}
    entry $c.s.e -bd 1 -just r -textv mlb::v(sum$f) -help {An aggregate value that summaries this column}
    menu $c.s.b.m
    foreach {tg ti} $cfig(aggsum) {
        $c.s.b.m add radiobutton -label "$tg - $ti" -variable mlb::cfig(sum$f) -value $tg -command "if {$mlb::cfig(asm$w)} {mlb::summary $w update $tag}"
    }

    set m [menu $cfig(menu$w).$tag]	;#Make a context menu specific to this column
    menu $m.cf
    $m add cascade -label {Column Formatting} -menu $m.cf -help {Controls how the data in the column is displayed (format, precision, etc).  Even though the data shows up in the cells according to the specified format, you should still specify data in its native format when using database search tools.}
    foreach {tg ti he} $cfig(colfmt) {$m.cf add radiobutton -label "$tg - $ti" -variable mlb::cfig(fmt$f) -value $tg -help $he}

    menu $m.ag
    $m add cascade -label {Aggregate Function} -menu $m.ag -help {If any columns have an aggregate function enabled, all records which are the identical in every other (non-aggregated) column will be grouped together (shown only once) and their values will be combined according to the aggregate function specified.}
    foreach {tg ti} $cfig(aggsum) {$m.ag add radiobutton -label "$tg - $ti" -variable mlb::cfig(agg$f) -value $tg 	;#-command "mlb::?reload? $w update $tag"}

    menu $m.sf
    $m add cascade -label {Summary Function} -menu $m.sf -help {Controls how the summary cell at the bottom of the column is computed (if showing).  To show summary cells, use the right-click menu in any column (Show Summaries option).}
    foreach {tg ti} $cfig(aggsum) {$m.sf add radiobutton -label "$tg - $ti" -variable mlb::cfig(sum$f) -value $tg -command "if {$mlb::cfig(asm$w)} {mlb::summary $w update $tag}"}

    frame $c.tf -bd 0
    label $c.tf.t -text "$cfig(title$f)" -anchor w -bd 0 -relief raised -cursor hand1 -help {The title of this column.  Double click to automatically size the column width for the data it contains.  Press and drag to move this column to a different location relative to other columns.}
    bind $c.tf.t <Double-1>		"mlb::resize $w $tag"
    bind $c.tf.t <Button-1>		"mlb::tpress $w $tag"
    bind $c.tf.t <ButtonRelease-1>	"mlb::trelease $w $tag %X %Y"

    label $c.tf.so -textv "mlb::cfig(ord$f)" -bd 0 -relief sunken
    button $c.tf.sb -image emp -bd 1 -anchor e -command "mlb::sort $w $tag toggle" -help "Sort list by this field\nRight-click to disable"
    bind $c.tf.sb <Button-3>		"mlb::sort $w $tag none"

    bind $c.b <ButtonRelease-1>		"mlb::mark $w"
    bind $c.b <4>			"mlb::master $w $tag"	;#wheel selects master
    bind $c.b <5>			"mlb::master $w $tag"
    bind $c.b <Button-1>		"mlb::master $w $tag"	;#click selects master
    bind $c.b <Button-2>		"mlb::master $w $tag"	;#so scrolls move all columns
    bind $c.b <Button-3>		"mlb::master $w $tag; mlb::cmenu $w $tag"
    bind $c.b <Double-1>		"event generate $w <<Execute>>"

    set cfig(bgnd$w) [$c.b cget -background]

    if {$cfig(scroll$w)} {
        pack $c.xs -side bottom -fill x
    }
    if {[$w.c.f.c$tag.b cget -just] == {left}} {pack $c.s.b -side right} else {pack $c.s.b -side left}
    pack $c.s.e -side left -fill x -exp 1
    if {$cfig(sum$w)} {pack $c.s -side bottom -fill x}
    pack $c.tf -side top -fill x
    pack $c.b -side bottom -exp 1 -fill both
    if {$cfig(sort$w) != {none}} {
        pack $c.tf.sb -side right -fill x -ipady 2 -pady 0
        pack $c.tf.so -side right
    }
    pack $c.tf.t -side left -fill x -exp 1
    if {!$cfig(hide$f)} {
        pack $c -side left -fill both -exp 0
        pack $z -side left -fill y
    }
    pack propagate $c no
    
    if {!$cfig(inv$f)} {
        $cfig(menu$w).a add checkbutton $tag -label $cfig(title$f) -variable mlb::cfig(hide:$tag$w) -onvalue 0 -offvalue 1 -command "mlb::show $w $tag ?" -help "Show column in the display:\n[$c.b cget -help]"
    }
}

#Get one or more entries
#--------------------------------
proc mlb::get {w args} {
    variable cfig
    variable v
    argform {first last} args
    argnorm {{first 1} {last 1} {display 2 disp} {tags 2} {names 2} {strict 2}} args
    lassign {0 0} names strict
    foreach s {first last disp tags} {set $s [xswitchs $s args]}
    foreach s {names strict} {xswitchs $s args $s}
    set len 0
#puts "get:$first:$last: strict:$strict"
    if {$first == {}} {
        if {[set sels [$w.c.f.c$v(master$w).b curselection]] == {}} {return {}}
    }
    if {$disp != {} && $disp} {set tags $v(disp$w)} elseif {$tags == {}} {set tags $cfig(tags$w)}
    foreach tag $tags {
        set lb $w.c.f.c$tag.b
        if {$first == {}} {
            foreach idx $sels {lappend col($tag) [$lb get $idx]}
        } elseif {$last == {}} {
            set col($tag) "{[eval $lb get $first]}"
        } else {
            set col($tag) [eval $lb get $first $last]
        }
#puts "col:$col($tag)"
        if {[llength $col($tag)] > $len} {set len [llength $col($tag)]}
    }
    if {[llength $tags] == 1 && !$names && !$strict} {	;#if returning only a single column
        set data $col($tag)			;#return a simple list
    } else {					;#else a list of lists
        set data {}
        for {set i 0} {$i < $len} {incr i} {
            set line {}
            foreach tag $tags {
                if {$names} {lappend line $tag}
                lappend line [lvarpop col($tag) 0]
            }
            lappend data $line
        }
    }
#puts "data:$data"
    if {$first != {} && $last == {}} {return [lindex $data 0]} else {return $data}
}

#Delete entries from the list
#--------------------------------
proc mlb::delete {w idx1 idx2} {
    variable cfig
    foreach tag $cfig(tags$w) {
        $w.c.f.c$tag.b delete $idx1 $idx2
    }
}

#Insert a row into the list (args is a list of names and values)
#--------------------------------
proc mlb::put {w index args} {
    variable cfig
    foreach {nam val} $args {
        if {![lcontain $cfig(tags$w) $nam]} {error "Name: $nam not a recognized column name"}
        set arr($nam) $val
    }
    set line {}
    foreach tag $cfig(tags$w) {
        if {[info exists arr($tag)]} {lappend line $arr($tag)} else {lappend line {}}
    }
    insert $w $index $line
}

#Insert rows into the list (args is a list of rows with columns in the order of cfig(tags$w))
#--------------------------------
proc mlb::insert {w index args} {
    variable cfig

    set tags [xswitch tags args]		;#xswitch faster than xswitchs for long list of args
    set btags {}
    if {$tags == {}} {				;#default to all tags
        set tags $cfig(tags$w)
    } else {
        foreach tag $cfig(tags$w) {		;#remember columns to insert blanks into
            if {![lcontain $tags $tag]} {lappend btags $tag}
        }
    }
#puts "insert w:$w tags:$tags btags:$btags args:$args"
    foreach tag $cfig(tags$w) {set col($tag) {}}	;#blank all possible columns
    foreach line $args {			;#make a list for each column
        foreach tag $tags  {lappend col($tag) [lvarpop line 0]}
        foreach tag $btags {lappend col($tag) {}}
    }
    foreach tag $cfig(tags$w) {
        eval $w.c.f.c$tag.b insert $index $col($tag)
    }
    if {$cfig(resort$w) == {clear}} {		;#Do we need to resort the data now?
        order $w {}				;#clear sorting
    } elseif {$cfig(resort$w)} {		;#else expect boolean
        set cfig(resort$w) 0			;#if true, disable auto resort (to prevent infinite loop)
        order $w [order $w ?]			;#and then resort
        set cfig(resort$w) 1
    }
    if {$cfig(see$w) != {}} {			;#Do we need to re-adjust the view
        $w see $cfig(see$w)
    }
}

#Hide the specified column
#--------------------------------
proc mlb::hide {w tag} {show $w $tag 1}

#Show the specified column
#--------------------------------
proc mlb::show {w tag {newhide 0}} {
    variable cfig
    variable v
    if {$newhide != {?}} {set cfig(hide:$tag$w) $newhide}
    if {$cfig(hide:$tag$w)} {
        if {[set idx [lsearch $v(disp$w) $tag]] < 0} return
        set v(disp$w) [lreplace $v(disp$w) $idx $idx]
    } else {
        if {[set idx [lsearch $v(disp$w) $tag]] >= 0} return
        if {[set idx [lsearch $cfig(tags$w) $tag]] < 0} return
        lappend v(disp$w) $tag
    }
    repack $w
}

# Context menu
#------------------------------------------
proc mlb::cmenu {w {tag {}}} {
    variable v
    variable cfig
#puts "tag:$tag"
    lassign [winfo pointerxy .] x y
    tk_popup $cfig(menu$w) $x $y
}

# Get configuration for an entry
#------------------------------------------
proc mlb::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain $cfig(star) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing widget
#------------------------------------------
proc mlb::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
#puts "NORM:$args"
    foreach tag $cfig(star) {
        if {[xswitchs $tag args cfig($tag$w)] == {}} continue
        if {$tag == {sum}} {summary $w show $cfig(sum$w)}
        if {$tag == {data}} {init $w}
    }
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Yield/restore preferences
#------------------------------------------
proc mlb::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {
        eval pref::restore $args
#puts "pref\n cols:$cfig(tags$w)\n disp:$v(disp$w)"
        return
    }
    
    set parr "{display {$v(disp$w)}}"	;#what fields are showing
    foreach tag $cfig(tags$w) {		;#column display widths
        lappend parr [list column $tag frame configure -width [$w.c.f.c$tag cget -width]]
    }
    lappend parr [list order [order $w]]						;#sort order
    lappend parr [list configure -summary $cfig(sum$w) -see $cfig(see$w)]		;#save certain config
    lappend parr [eval list summary set [eval summary $w func $cfig(tags$w)]]		;#summary functions
    lappend parr [eval list aggregate set [eval aggregate $w func $cfig(tags$w)]]	;#aggregate functions
    lappend parr [eval list format set [eval fmt $w func $cfig(tags$w)]]		;#formatting functions
#puts "mlb dump pref:[join $parr "\n"]:"
    return $parr
}

# Print listbox contents
#------------------------------------------
proc mlb::print {w args} {
    variable cfig
    variable v
    set font [$w.c.f.c$v(master$w).b cget -font]
    set pix [font measure $font X]	;#pixels/char
    set fmt {}
    foreach tag $v(disp$w) {
#puts "tag:$tag"
        set width [expr [$w.c.f.c$tag cget -width] / $pix]	;#how wide to make column
        if {[$w.c.f.c$tag.b cget -just] == {left}} {set j {-}} else {set j {}}
        lappend fmt "%$j${width}.${width}s"
    }
    set outlst {}
    foreach rec [get $w 0 end -disp 1] {lappend outlst [eval format \{$fmt\} $rec]}

    if {$cfig(sum$w)} {
        set slist [eval summary $w get $v(disp$w)]
        lappend outlst {} [eval format \{$fmt\} $slist]
    }
        
#puts [join $outlst "\n"]
    print::print mlb_pr -data "[join $outlst "\n"]\n"
}

# Export listbox contents to a file
#------------------------------------------
proc mlb::export {w {spread 0}} {
    variable cfig
    variable v
    if {$spread} {
        set fname [lib::cfig workdir]/mlb_export.csv
    } else {
        if {[sfile::dia {Select a filename to export to} -dest fname -op {Export to} -mask {*.csv} -wait 1] != 0} return
    }
    set fp [open $fname w]
    set rec {}; foreach tag $v(disp$w) {
        lappend rec $cfig(title:$tag$w)
    }
    puts $fp [csv::join $rec]
    foreach rec [get $w 0 end -disp 1] {
        regsub -all "\[\n]" $rec { } rec
        puts $fp [csv::join $rec]
    }
    if {$cfig(sum$w)} {
        puts $fp [csv::join [eval summary $w get $v(disp$w)]]
    }
    close $fp
    if {$spread} {system $cfig(spread) $fname &}
}

# Load with default data
#------------------------------------------
proc mlb::init {w args} {
    variable cfig
    $w delete 0 end
    eval $w insert end $cfig(data$w)
}

# Constructor
#------------------------------------------
proc mlb::mlb {w args} {
    variable cfig
    variable v

    argnorm $cfig(swar) args
    array set cfig "menu$w $w.m tags$w {}"
    foreach s $cfig(sblk) {set cfig($s$w) [xswitchs $s args]}
    foreach {tag val} $cfig(sdef) {set cfig($tag$w) $val; xswitchs $tag args cfig($tag$w)}
    foreach tag $cfig(star) {xswitch $tag args cfig($tag$w)}

    lassign {} cols fr
    while {[xswitch f args va sw] != {}} {lappend cols $sw $va}	;#grab fields from cmdline
    while {[set x [xswitch fr args]] != {}} {append fr { } $x}

    set cfig(lbargs$w) $args
    array set v "master$w {} marked$w {}"

    if {[winfo exists $w]} {
        eval $w configure $fr
    } else {
        eval wframe::_frame $w -class Mlb $fr -height $cfig(minh$w)
        bind $w <Configure> {mlb::p_config %W %w %h}
        widginit $w mlb *$w
    }

    canvas $w.c -bg white -xscrollc "$w.xs set" -scrollregion {0 0 1000 300}
    scrollbar $w.xs -orient h -command "$w.c xview"
    scrollbar $w.ys -orient v -command "mlb::yview $w"
    button $w.b -image but -help {Autosize all columns} -command "$w resize"
    grid $w.c $w.ys -row 0 -sticky news
    grid $w.xs $w.b -row 1 -sticky news
    grid propagate $w no

    frame $w.c.f		;#-bg yellow
    pack propagate $w.c.f no
    bind $w.c.f <Button-3> "mlb::cmenu $w"
    
    $w.c create window 0 0 -window $w.c.f -anchor nw

#Build widget menus
    menu [set m $cfig(menu$w)] -postcommand "set mlb::v(column_menu) \[list $w \$mlb::v(master$w)\]"
    $m add command fn -label {Find in This Column}  -under 0 -command "$w column \$mlb::v(master$w) find" -help {Search (and possibly replace) items in only this column of the list}
    $m add command ac -label {Autosize This Column} -under 0 -command "mlb::resize $w \$mlb::v(master$w)" -help {Automatically adjust the width of this columns to fit all included text}
    $m add command sc -label {Shrink This Column} -under 5 -command "mlb::resize $w \$mlb::v(master$w) 30" -help {Shrink the width of this column down to a minimum}
    $m add cascade cf -label {Other Column Functions} -menu .mlb_generic_column_menu -help {Other column-specific functions}
    $m add separator
    $m add command aa -label {Autosize All Columns} -under 2 -command "mlb::resize $w" -help {Automatically adjust the width of all columns to fit all included text}
    $m add cascade    -label {Show/Hide Columns} -under 0 -menu $m.a -help {Specify which of the possible columns to display (or hide)}
    $m add command dd -label {Default Columns} -under 0 -command "mlb::repack $w \$mlb::cfig(disp$w)" -help {Revert back to showing (and hiding) the columns originally configured as the default for this program}
    $m add command sa -label {Select All Rows} -under 0 -command "$w allselect" -help {Highlight (select) all the rows in the list}
    $m add checkbu ss -label {See End} -variable mlb::cfig(see$w) -command "$w see \$mlb::cfig(see$w)" -onvalue end -offvalue 0 -help {Adjust the display to show the end of the list (rather than the top) after each data is loaded}
    $m add separator
    $m add command ex -label {Execute} -under 0 -command "event generate $w <<Execute>>" -help {Act upon the highlighted line(s) (like double-click)}
    $m add command pr -label {Print Text} -under 0 -command "mlb::print $w" -help {Format and print the contents of the list}
    $m add command ep -label {Export to File} -under 3 -command "mlb::export $w" -help {Export the list contents to a CSV file}
    $m add command es -label {Export to Spreadsheet} -under 0 -command "mlb::export $w 1" -help {Export the list contents to a CSV file and open it in a spreadsheet program}

    set optsum 1
    set cfig(sum$w) [unabbrev {{always 2} {never 2}} $cfig(sum$w)]
    if {[lcontain {always never} $cfig(sum$w)]} {
#puts "alnv: $cfig(sum$w)"
        if {$cfig(sum$w) == {always}} {set cfig(sum$w) 1} else {set cfig(sum$w) 0}
        set optsum 0
    }
    if {$optsum} {			;#allow user to enable/disable summaries
        $m add separator
        $m add checkbutton ss -label {Show Summaries} -variable mlb::cfig(sum$w) -command "mlb::summary $w show" -help {Display summary fields at the bottom of each column}
        $m add checkbutton as -label {Auto Summaries} -variable mlb::cfig(asm$w) -help {Automatically re-calculate summary fields when their functions are changed}
    }

    if {$cfig(sum$w)} {summary $w show; if {$cfig(asm$w)} {after idle "mlb::summary $w update"}}
    menu $m.a
    
    set v(disp$w) {}
    foreach {sw va} $cols {eval add \$w $va}	;#build columns

#puts "cols:$cfig(tags$w)\ndisp:$v(disp$w)"
    if {$cfig(disp$w) == {}} {			;#if no display list specified
        set cfig(disp$w) $v(disp$w)		;#display all fields
    } else {
        repack $w $cfig(disp$w)			;#else display specified columns
    }
    if {[info exists cfig(init$w)]} {
        if {$cfig(init$w)} {init $w}		;#insert initial data
    } elseif {$cfig(data$w) != {}} {
        init $w
    }
    if {$cfig(auto$w)} {after idle "mlb::resize $w"; update}	;#bug? doesn't work with "after idle"
    return $w
}

# Pass a command to a column (pseudo widget)
#--------------------------------
proc mlb::column {w tag args} {
    variable cfig
    set args [lassign $args cmd]
#puts "column:$w tag:$tag cmd:$cmd args:$args"
    set cmd [unabbrev {{title 2} {sort 2} {listbox 2} {summary 2} {frame 2}} $cmd]
    switch -exact -- $cmd {
        {title}		{return [eval $w.c.f.c$tag.tf.t $args]}
        {sort}		{return [eval sort $w $tag $args]}
        {listbox}	{return [eval $w.c.f.c$tag.b $args]}
        {summary}	{return [eval $w.c.f.c$tag.s $args]}
        {frame}		{return [eval $w.c.f.c$tag $args]}
        {default}	{return [eval $w.c.f.c$tag.b $cmd $args]}
    }
}

# Widget command
#------------------------------------------
proc mlb::wcmd {w cmd args} {
    variable cfig
    variable v
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{frame 1} {hide 2} {size 2} {show 2} {tags 2} {display 2} {aggregate 2} {format 2 fmt} {resize 3} {add 2} {get 2} {column 3} {insert 3} {delete 3} {initialize 2} {master 2} {display 2} {order 2} {summary 2} {allselect 4} {preference 2 pref} {configure 3} {cget 2}} $cmd]
    if {[lcontain {hide show resize add mark get put delete display aggregate fmt master insert reset order summary qfind pref configure cget} $cmd]} {return [eval $cmd $w $args]}
    switch -exact -- $cmd {
        {w}		{return $w}
        {menu}		{return [eval $cfig(menu$w) $args]}
        {tags}		{return $cfig(tags$w)}
        {initialize}	{return [eval init $w $args]}
        {size}		{return [eval column $w $v(master$w) $cmd $args]}
        {allselect}	{$w.c.f.c$v(master$w).b selection set 0 end; mark $w}
        {bind}		{
            set args [lassign $args seq]
            if {[llength $args] <= 0} {return bind $w.c.f.c$v(master$w).b $seq}
            foreach t $cfig(tags$w) {bind $w.c.f.c$t.b $seq [lindex $args 0]}
        }
        {column}	{
            set args [lassign $args tag]
            if {$tag == {%m}} {set tag $v(master$w)}
            if {[lcontain $cfig(tags$w) $tag]} {return [eval column $w $tag $args]}
            return [eval column $w $v(master$w) $tag $args]	;#if no valid tag given, assume master
        }
        {default}	{
            if {[lcontain $cfig(tags$w) $cmd]} {
                return [eval column $w $cmd $args]
            } elseif {[lcontain {cget configure} $cmd]} {
                return [eval _$w $cmd $args]
            } else {
                return [eval $w.c.f.c$v(master$w).b $cmd $args]
            }
        }
    }
}

# Make a single, global, generic column menu with no entries and don't pack it
# Use the widget command for this menu to actually launch the column menu we want
# This kludge is needed because the cascade needs a menu name that is both a widget command and a real window (that can be focused)
#--------------------------------
menu .mlb_generic_column_menu
#rename ::.mlb_generic_column_menu mlb::org_generic_column_menu	;#causes pkg_mkIndex to fail
proc ::.mlb_generic_column_menu {args} {
    if {![info exists mlb::v(column_menu)]} return
#debug mlb::v(column_menu) args
    lassign $mlb::v(column_menu) w master	;#hack to figure out which column menu to launch
    $mlb::cfig(menu$w).$master {*}$args		;#launch the menu for the current column
}
