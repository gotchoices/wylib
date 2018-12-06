#Improved dialog utilities
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- redo all shortcut procs to use new ::dia syntax
#X- try test/dia
#- try calc::dia
#- 
#- add gmc-b and gmc to allow modifying the pack methods
#- 

if {[info commands tk] != {}} {
#    option add *Dia*Entry.wrapLength 6i widgetDefault
    option add *Dia.Label.wrapLength 6i widgetDefault
    option add *Dia.Label.font {Times 14} widgetDefault
    option add *Dia.wintitle {User dialog} widgetDefault
    option add *Dia.grab {} widgetDefault
    option add *Dia.place button widgetDefault
    option add *Dia.wmclose 1 widgetDefault
    option add *Dia.but {OK Cancel} widgetDefault
    option add *Dia.def 0 widgetDefault
    option add *Dia.can {end} widgetDefault
    option add *Dia.padx 4 widgetDefault
    option add *Dia.pady 2 widgetDefault
    option add *Dia.b.borderWidth 1 widgetDefault
    option add *Dia.b.relief raised widgetDefault
    option add *Dia.e.borderWidth 1 widgetDefault
    option add *Dia.e.relief raised widgetDefault
#    option add *Dia.e.relief flat 30	;#more than widgetDefault
}

namespace eval dia {
    namespace export ask err warn brief query pquery dia unget
    variable v
    set v(unget) {}
}

# Can push back a single character and then read it again in an upcoming dialog
#------------------------------------------
proc dia::unget {key} {
    variable v
    set v(unget) $key
}

# Regular dialog call but with less arguments
#------------------------------------------
proc dia::ask {text {default 0} args} {
    if {$args == {}} {set args OK}
    return [uplevel [list dia::dia [uwin .dia_ask] -mess $text -default $default -buttons $args]]
}

# Dialog call structured as an error
#------------------------------------------
proc dia::err {text args} {
    if {[info commands tk] == {}} {puts "Error: $text"; return}
    if {$args == {}} {set buts OK} else {set buts [concat OK $args]}
    return [dia [uwin .dia_err] -mess "Error:\n$text" -buttons $buts]
}

# Dialog call structured as a warning
#------------------------------------------
proc dia::warn {text args} {
    if {$args == {}} {set buts OK} else {set buts [concat OK $args]}
    return [dia [uwin .dia_warn] -mess "Warning:\n$text" -buttons $buts]
}

# Update the timer on a message with a timeout
#------------------------------------------
proc dia::timeout {w {int 100}} {
    variable cfig
    variable v
    if {![winfo exists $w]} return
    set v(atim$w) [expr $v(atim$w) - $int]
#puts "def:$cfig(def$w) msg:$v(dmsg$w)"
    if {$v(atim$w) > 0} {
        $w b $cfig(def$w) config -text [format "$v(dmsg$w) (%2.2f sec)" [expr $v(atim$w) / 1000.0]]
        set v(aid$w) [after $int "dia::timeout $w $int"]
    } else {
        set v(result$w) $cfig(def$w)
    }
}

# Pop up a message and then kill it after a time
#------------------------------------------
proc dia::brief {text {time 1500} {int 100}} {
    variable v
    set w [uwin .dia_brief]
    dia $w -wintitle Brief -mess $text -buttons OK -timeout "$time $int"
}

# Query for a single value
#------------------------------------------
proc dia::query {text varname {default 0} args} {
    if {[info commands tk] == {}} {		;#support for tcl only
        upvar $varname retval
        puts -nonewline "$text "; flush stdout
        set retval [gets stdin]
        if {$retval == {}} {return 0}
        return 1
    }
    if {$args == {}} {set args {OK Cancel}}
    return [uplevel [list dia::dia [uwin .dia_qry] -entry dew::dew -style ent -title $text -pre 1 -dest $varname -default $default -buttons $args]]
}

# Query for a value without echoing characters, return the value input
#------------------------------------------
proc dia::pquery {{text {Password:}}} {
    after idle "set dia::v(pquery_value) {}; .dia_pquery.e entry configure -show *"
    dia::dia .dia_pquery -entry dew::dew -title $text -dest dia::v(pquery_value) -buttons OK
    return $dia::v(pquery_value)
}

# Return of list of children of the given widget
#------------------------------------------
proc dia::children {w} {
    set clist {}
    if {[set cwins [winfo children $w]] == {}} {return $w}
    foreach c $cwins {
        eval lappend clist [children $c]
    }
    return $clist
}

# Yield/restore preferences
#------------------------------------------
proc dia::pref {w args} {
    variable cfig
    variable v

    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    if {![catch {set res [$w.e pref]}]} {	;#if the widget has a pref method
        if {$res != {}} {lappend parr [eval list entry pref $res]}
        set geom [lindex [split [wm geometry $w] +] 0]
        lappend parr [list geom $geom]	;#save toplevel geometry too
    }
#puts "dia dump $w pref:[join $parr "\n"]:"
    return $parr
}

# Open a generalized dialog window, setting variables based on user input
#------------------------------------------
proc dia::dia {w args} {
    variable cfig
    variable v

    argform {buttons message dest entry} args
    argnorm {{buttons 3 but} {default 3 def} {cancel 3 can} {destination 4 dest} {entry 2 ent} {parent 3 par} {bitmap 3} {wintitle 3} {grab 1} {place 2} {wmclose 3} {topargs 2 top} {message 4 mess} {preserve 2 pre} {uplevel 2} {timeout 2} {bhelp 3} {bcmds 3} {vert 1} {restore 2}} args
#puts "dia::dia $w $args"
    array unset cfig *$w
    array set cfig "pre$w 0 uplevel$w 1 restore$w 1"
    foreach s {pre uplevel restore} {xswitchs $s args cfig($s$w)}
    foreach s {mess par bitmap top dest ent timeout bhelp bcmds vert} {set cfig($s$w) [xswitchs $s args]}

    if {[catch {set oldfocus [focus]}]} {return -1}	;#if focus errs, . probably gone
    if {$cfig(par$w) == {}} {
        if {$oldfocus != {}} {set cfig(par$w) [winfo toplevel $oldfocus]} else {set cfig(par$w) .}
    }

    if {[winfo exists $w]} {destroy $w}
    eval toplevel $w -class Dia $cfig(top$w)
    swores $w args cfig(%s$w) {wintitle grab place wmclose but can def padx pady}
    
    wm title $w $cfig(wintitle$w)
    wm iconname $w $cfig(wintitle$w)
    if {!$cfig(wmclose$w)} {wm protocol $w WM_DELETE_WINDOW "dia::close $w"}
    if {[winfo exists $cfig(par$w)]} {wm transient $w $cfig(par$w)}

    widginit $w dia *$w
    frame $w.b			;#for buttons
    pack $w.b -side bottom -exp 0 -fill x -padx $cfig(padx$w) -pady $cfig(pady$w)

    if {$cfig(bitmap$w) != {}} {			;#place bitmap
        label $w.bmap -bitmap $cfig(bitmap$w); pack $w.bmap -side left
    }
    
    if {$cfig(mess$w) != {}} {		;#dialog message
        if {[set len [string length $cfig(mess$w)]] > 1100} {
            set cfig(mess$w) "[string range $cfig(mess$w) 0 500] ... [string range $cfig(mess$w) [expr $len - 500] $len]"
        }
        label $w.msg -justify left -anchor w -text [string range $cfig(mess$w) 0 1000] -padx 10 -pady 10
        pack $w.msg -side top -fill x
    }
    if {$cfig(dest$w) != {}} {
        upvar $cfig(uplevel$w) $cfig(dest$w) destvar
#puts "dest:$cfig(dest$w) uplevel:$cfig(uplevel$w)"
    }
    if {![info exists destvar]} {set destvar {}}	;#if user hasn't initialized destination yet, init it

    set preftag [string range $w 1 end]
    if {$cfig(ent$w) != {}} {
        eval $cfig(ent$w) $w.e $args	;#make user-defined data-entry widget
        pack $w.e -side top -exp 1 -fill both -padx $cfig(padx$w) -pady $cfig(pady$w)
#        bind $w.e <<Ok>> "if \[winfo exists $w\] {event generate $w <Return>}"	;#However user might select in widget, that's like Return
        if {$cfig(restore$w)} {
            catch {eval pref $w [pref::auto $preftag -app dia]}	;#restore any preferences
        }

        if {$cfig(pre$w) || [catch {$w.e init}]} {	;#if preserving existing value,
            if {$cfig(dest$w) != {}} {			;#or widget doesn't know how to init
#puts "dest:$cfig(dest$w)"
                $w.e set $destvar		;#try to use old data in destination (should work for scalar or array value in destvar)
#puts "$w.e set $destvar"
            }
        }
    }

    set i 0; foreach but $cfig(but$w) {
        set cmd "set dia::v(result$w) $i"
        if {[lindex $cfig(bcmds$w) $i] != {}} { set cmd [lindex $cfig(bcmds$w) $i] }
        set help [lindex $cfig(bhelp$w) $i]
  	button $w.but$i -text $but -command $cmd -help $help
#puts " $i bindtags:[bindtags $w.but$i]:"
	bindtags $w.but$i "$w.but$i Button all"	;#don't do Dia Return binding
        if {$cfig(vert$w) == 1} {
	    grid $w.but$i -in $w.b -column 0 -row $i -sticky ew -pady 4
        } else {
	    grid $w.but$i -in $w.b -column $i -row 0 -sticky ew -padx 10
        }
	if {$i == $cfig(def$w)} {
	    $w.but$i configure -def active
            grid columnconfigure $w.b $i -weight 3	;#default button bigger
	} else {
	    $w.but$i configure -def normal
            grid columnconfigure $w.b $i -weight 1
	}
	incr i
    }

    if {$cfig(def$w) >= 0} {
#        foreach ev {<<Ok>> <Return>} {
#            bind $w $ev "$w.but$cfig(def$w) configure -state active -relief sunken; update idletasks; after 100; set dia::v(result$w) $cfig(def$w)"
#        }
        bind $w <<Ok>> "$w.but$cfig(def$w) configure -state active -relief sunken; update idletasks; after 100; set dia::v(result$w) $cfig(def$w)"
    }

    bind $w <Destroy> "if {{$w} == {%W}} {set dia::v(result$w) -1}"	;#destruction of a subwindow of $w may call this binding

    set place [unabbrev {{button 1} {center 1} {prompt 1} {none 1}} $cfig(place$w)]
    switch -- $place {
        button	{place $w -sub $w.but$cfig(def$w)}
        center	{place $w -center 1}
        prompt	{place $w}
        none	{}
        default	{eval place $w $cfig(place$w)}
    }

    catch {
        if {$cfig(grab$w) == {}} {
            set oldgrab {}
        } else {
            if {[set gc [grab current $w]] != {}} {	;#make cmd to restore grab
                if {[grab status $oldgrab] == {global}} {set oldgrab "grab -global $gc"} else {set oldgrab "grab $gc"}
            }
            if {$cfig(grab$w) == {global}} {grab -global $w} else {grab $w}
        }
    }

    set c $w
    if {$cfig(ent$w) == {}} {		;#if no entry widget
	focus $w.but$cfig(def$w)	;#focus on default button
    } elseif {![catch {set c [$w.e entry w]}]} {	;#does the widget know what its main entry name is
#puts "Focus: $w.e"
    } else {			;#else focus on the first entry or text widget found
        foreach c [children $w.e] {
            if {[lcontain {Entry Text} [winfo class $c]]} break
#puts "child:$c:[winfo class $c]"
        }
    }
    if {[winfo class $c] == {Entry}} {
        $c selection range 0 end
    } elseif {[winfo class $c] == {Text}} {
        $c tag add sel 1.0 end
    }
    focus $c

    set dia::v(result$w) {}		;#init to some known value
    if {$cfig(timeout$w) != {}} {
        lassign $cfig(timeout$w) v(atim$w) int
        if {$int == {}} {set int 100}
        set v(dmsg$w) [$w b $cfig(def$w) cget -text]
        catch {after cancel $v(aid$w)}
        set v(aid$w) [after $int "dia::timeout $w $int"]
    }
    if {$v(unget) != {}} {		;#do we haved a cached character?
        after idle "update; event generate $c <Key> -keycode $v(unget)"
        set v(unget) {}
    }
    tkwait variable dia::v(result$w)	;#and wait for it to change

    if {$cfig(can$w) == {end} && [set len [llength $cfig(but$w)]] > 1} {set cfig(can$w) [expr $len - 1]}	;#index of Cancel
#puts "can:$cfig(can$w) result:$v(result$w)"
    if {$v(result$w) == $cfig(can$w)} {		;#this was a Cancel
        set v(result$w) -1
    } elseif {$v(result$w) >= 0 && $cfig(ent$w) != {}} {	;#this was OK
        set destvar [$w.e get]		;#return value(s) to caller
#puts "setting destvar to $destvar ($w.e)"
        eval pref::auto $preftag -app dia [pref $w]	;#save any preferences
    }
    
    catch {focus $oldfocus}	;#catch in case already deleted
    catch {bind $w <Destroy> {}}
    catch {destroy $w}
    catch {$oldgrab}		;#restore any previous grab

#puts "return $dia::v(result$w)"
    return $dia::v(result$w)
}

# Widget command
#------------------------------------------
proc dia::wcmd {w cmd args} {
    variable cfig
    set cmd [unabbrev {{buttons 1 b} {entry 1 e} {frame 1 f} {preference 2 pref} {geometry 2}} $cmd]
    switch -exact $cmd {
        {w}		{return $w}
        {e}		{return [eval $w.e $args]}
        {b}		{set args [lassign $args i]; return [eval $w.but$i $args]}
        {f}		{set args [lassign $args i]; return [eval $w.f$i $args]}
        {pref}		{return [eval pref $w $args]}
        {geometry}	{eval wm geometry $w $args}
        {default}	{return [eval $w $cmd $args]}
    }
}

#Place a toplevel window somewhere near the cursor
#------------------------------------------
proc dia::place {w args} {
    argform {xo yo} args
    argnorm {{xoffset 2 xo} {yoffset 2 yo} {subwindow 2 sub} {center 2}} args
    argproc \$s $args {{xo {}} {yo {}} {sub {}} {center 0}}
    
    wm withdraw $w
#puts "w:$w rx:[winfo reqwidth $w] ry:[winfo reqheight $w]"
    update idletasks			;#must update before winfo works

    set rx [winfo reqwidth $w]; set ry [winfo reqheight $w]	;#requested size
    set wx [winfo width $w];    set wy [winfo height $w]	;#actual size
#puts " rx:$rx ry:$ry  wx:$wx wy:$wy"
    if {$wx == 1 && $wy == 1} {set wx $rx; set wy $ry}
    set sx [winfo screenwidth $w]; set sy [winfo screenheight $w]	;#screen edges

    if {$sub != {}} {		;#if subwindow specified to center on
#puts "w:$w sub:$sub"
        set swx [winfo x $sub];     set swy [winfo y $sub]
        set ssx [winfo reqwidth $sub]; set ssy [winfo reqheight $sub]
#puts " swx:$swx swy:$swy  ssx:$ssx ssy:$ssy"
        if {$xo == {}} {set xo  0}
        if {$yo == {}} {set yo 0}
        set xo [expr $xo - ($ssx / 2 + $swx)]
        set yo [expr $yo - ($wy - ($ssy / 2) - $swy + 10)]
    } else {
        if {$xo == {}} {set xo [expr -$wx / 2]}
        if {$yo == {}} {set yo [expr -$wy / 2]}
    }
#puts " xo:$xo yo:$yo"

    if {$center} {
        set px [expr $sx/2 - $wx/2 - [winfo vrootx [winfo parent $w]]]
        set py [expr $sy/2 - $wy/2 - [winfo vrooty [winfo parent $w]]]
    } else {
        lassign [winfo pointerxy .] px py	;#get pointer x and y
    }
    set cx [expr $px + $xo]	;#where we will put it
    set cy [expr $py + $yo]

#puts " px:$px py:$py cx:$cx cy:$cy wx:$wx wy:$wy sx:$sx sy:$sy"
    if {[expr $cx + $wx] > $sx} {set cx [expr $sx - $wx - 10]}	;#check for off screen
    if {[expr $cy + $wy] > $sy} {set cy [expr $sy - $wy - 10]}
    if {$cx < 0} {set cx 0}
    if {$cy < 0} {set cy 0}

#puts " cx:$cx cy:$cy"
    wm geometry $w "+${cx}+${cy}"
    wm deiconify $w
}
