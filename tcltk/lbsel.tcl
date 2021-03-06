# Bring up a listbox which displays a set of entries.  Allow the user to 
# add, modify, delete entries before allowing the entries to be processed
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- Save data in a list in addition to the listbox
#- All args valid from scmenu
#- 

#option add *Lbsel*Label.font {Helvetica 12 bold} widgetDefault
#option add *Lbsel*Listbox.font {Courier 12} widgetDefault
option add *Lbsel*Listbox.width 200 widgetDefault
option add *Lbsel*Listbox.height 100 widgetDefault

namespace eval lbsel {
    namespace export lbsel
    variable cfig		;#configuration options
    variable v			;#variable values
}

# Delete all records in the listbox
#------------------------------------------
proc lbsel::clear {w} {set lbsel::v(dat$w) {}; display $w}

# Display the current data set in the listbox
#------------------------------------------
proc lbsel::display {w} {
    variable cfig
    variable v
    if {$cfig(header$w) != {}} {$w.h insert end [eval "format \{$cfig(format$w)\} $cfig(header$w)"]}
    $w.lb delete 0 end
    foreach rec $v(dat$w) {
        if {$cfig(format$w) != {}} {	;#if a format string given
#puts "Drec:$rec"
            $w.lb insert end [eval "format \{$cfig(format$w)\} $rec"]	;#format it
        } else {
            $w.lb insert end $rec		;#else insert it as is
        }
    }
}

# Load the listbox with its values
#------------------------------------------
proc lbsel::load {w {list {}}} {
    variable cfig
    variable v
    if {$list != {}} {
    } elseif {$cfig(expr$w) != {}} {	;#get list from an expression
        set list [expr $cfig(expr$w)]
    } elseif {$cfig(eval$w) != {}} {	;#get list from a eval
        set list [eval $cfig(eval$w)]
    } else {
        set list $cfig(list$w)
    }
    set v(dat$w) $list
    display $w
}

# Return the selected items in the list
#------------------------------------------
proc lbsel::selected {w} {
    variable cfig
    variable v
    set ret {}
    if {[set idx [$w.lb curselection]] == {}} {set idx [$w.lb index active]}
    foreach i [lsort -integer -increasing $idx] {lappend ret [lindex $v(dat$w) $i]}
    return $ret
}

# Delete the current line(s)
#------------------------------------------
proc lbsel::delete {w} {
    variable cfig
    variable v
    if {[set idx [$w.lb curselection]] == {}} {set idx [$w.lb index active]}
#puts "idx:$idx line:$line\ndat:[lindex $v(dat$w) $idx]"
#    set line [lindex $v(dat$w) $idx]
    if {[dia::ask "Delete [llength $idx] items?" 0 OK Cancel] > 0} return
    foreach i [lsort -integer -decreasing $idx] {set v(dat$w) [lreplace $v(dat$w) $i $i]}
    display $w
    if {$cfig(modcmd$w) != {}} {eval $cfig(modcmd$w)}
}

# Edit the current line in the list
#------------------------------------------
proc lbsel::edit {w} {
    variable cfig
    variable v
    
    set idx [$w.lb index active]
    set line [lindex $v(dat$w) $idx]

    if {[set cmd $cfig(editcmd$w)] != {}} {
        if {[regexp {%l} $cmd]} {regsub {%l} $cmd $line cmd} else {append cmd " {$line}"}
        set rec [eval $cmd]
    } else {
        set vars {}
        for {set i 0} {$i < $cfig(fields$w)} {incr i} {
            set fv$i [lindex $line $i]
            lappend vars "fv$i"
        }
#puts "vars:$vars"
        set rec {}
        if {[dia::query $cfig(header$w) $vars 0 OK Cancel] > 0} {return 0}
        for {set i 0} {$i < $cfig(fields$w)} {incr i} {lappend rec [subst \$fv$i]}
    }
#puts "idx:$idx rec:$rec"
    if {$rec == {}} {return 0}
    set v(dat$w) [lreplace $v(dat$w) $idx $idx $rec]
    display $w
    if {$cfig(modcmd$w) != {}} {eval $cfig(modcmd$w)}
    return 1
}

# Add a new line into the list
#------------------------------------------
proc lbsel::add {w} {
    variable cfig
    variable v
    set idx [$w.lb index active]
    set olddat $v(dat$w)
    set v(dat$w) [linsert $v(dat$w) $idx $cfig(newtpt$w)]
    if {![edit $w]} {set v(dat$w) $olddat}
    display $w
}

# Cleanup after the OK or Cancel button is pushed
#------------------------------------------
proc lbsel::cleanup {w isok} {
    variable cfig
    variable v

    if {!$cfig(wait$w) && $isok && $cfig(dest$w) != {}} {	;#if not waiting (asynchronous) can only write to global variables
        if {[string range $cfig(dest$w) 0 0] == {.}} {		;#if writing to a widget (Entry)
            $cfig(dest$w) delete 0 end; $cfig(dest$w) insert 0 $v(dat$w)
        } else {
            upvar #0 $cfig(dest$w) var	;#write to a global in level above
            set var $v(dat$w)
        }
    }
    set v(status$w) $isok
    if {$cfig(okcmd$w) != {}} {
        if {![eval $cfig(okcmd$w)]} return
    }
    after idle "destroy $w; catch {focus -force $cfig(oldfocus$w)}"
}

#Scroll the header to match the scroll in the listbox
#------------------------------------------
proc lbsel::scroll_hdr {h x1 x2} {$h xview moveto $x1}

# Make multiple choice select box for choosing from a list of values
#------------------------------------------
proc lbsel::lbsel {w args} {
    variable cfig
    variable v
    
    argproc cfig(\$s$w) $args {{editcmd {}} {newtpt {}} {add Add} {edit Edit} {del Delete} {top 0} {setgrid 0} {list {}} {expr {}} {eval {}} {dest {}} {init 1} {format {%s}} {header {}} {width {}} {height {}} {title {Item List:}} {modcmd {}} {okcmd {}} {close Close} {ok OK} {okhelp {Process the list and close this window}} {wait 0} {fields {}} {geom {250x300}} {selectmode single} {xoff -40} {yoff -20}}
#puts "lbsel w:$w edit:$cfig(edit$w) close:$cfig(close$w) dest:$cfig(dest$w)"
    if {$cfig(fields$w) == {}} {
        if {$cfig(header$w) != {}} {
            set cfig(fields$w) [llength $cfig(header$w)]
        } elseif {$cfig(format$w) != {}} {
            set cfig(fields$w) [llength $cfig(format$w)]
        } else {
            set cfig(fields$w) 1
        }
    }
    if {$cfig(top$w)} {
        catch {destroy $w}
        toplevel $w -class Lbsel
        wm title $w {List Editor}
        if {$cfig(geom$w) != {}} {wm geometry $w $cfig(geom$w)}
        
        frame $w.tb; pack $w.tb -side bottom -fill x
        button $w.tb.can -text $cfig(close$w) -command "lbsel::cleanup $w 0" -help {Close this window without further action}
        if {$cfig(close$w) != {}} {pack $w.tb.can -side left -fill x -exp 1}
        button $w.tb.ok -text $cfig(ok$w) -command "lbsel::cleanup $w 1" -bd 4 -pady 1 -help $cfig(okhelp$w)
        if {$cfig(ok$w) != {}} {pack $w.tb.ok -side left -fill x -exp 1}
        
        set cfig(oldfocus$w) [focus]
    } else {
        wframe::_frame $w -class Lbsel
        set cfig(oldfocus$w) {}
    }

    if {$cfig(title$w) != {}} {
        frame $w.t -bd 2 -relief raised; pack $w.t -side top -fill x
        label $w.t.l -text $cfig(title$w) -just l; pack $w.t.l -side left
    }
    frame $w.b; pack $w.b -side bottom -fill x
    if {$cfig(add$w) != {}} {
        button $w.b.add -text $cfig(add$w) -command "lbsel::add $w" -help "Add a new item into the list"
        pack $w.b.add -side left -fill x -exp 1
    }
    if {$cfig(edit$w) != {}} {
        button $w.b.edit -text $cfig(edit$w) -command "lbsel::edit $w"  -help "Modify the selected item in the list"
        pack $w.b.edit -side left -fill x -exp 1
        after idle "bind $w.lb <Double-1> \"$w.b.edit invoke\""
    }
    if {$cfig(del$w) != {}} {
        button $w.b.del -text $cfig(del$w) -command "lbsel::delete $w" -help "Delete the selected item from the list"
        pack $w.b.del -side left -fill x -exp 1
    }
    
    scrollbar $w.ys -command "$w.lb yview"
    pack $w.ys -side right -fill y
    set other {}
    if {$cfig(height$w) != {}} {append other " -height $cfig(height$w)"}
    if {$cfig(width$w) != {}} {append other " -width $cfig(width$w)"}
    listbox $w.h -relief flat -height 1 	;#-xscroll "dbp::scroll_hdr $w.lb"
    if {$cfig(header$w) != {}} {pack $w.h -side top}
    eval listbox $w.lb -xscroll \{lbsel::scroll_hdr $w.h\} -yscroll \{$w.ys set\} -relief sunken -setgrid $cfig(setgrid$w) -selectmode $cfig(selectmode$w) $other
    pack $w.lb -side left -fill both -expand yes

    if {$cfig(init$w)} {load $w}
    widginit $w lbsel *$w
    
#    if {$cfig(top$w)} {dia::place $w -xo $cfig(xoff$w) -yo $cfig(yoff$w)}
    if {$cfig(wait$w)} {
        set v(status$w) {}
        tkwait variable lbsel::v(status$w)
        if {$v(status$w) && $cfig(dest$w) != {}} {
            if {[string range $cfig(dest$w) 0 0] == {.}} {	;#if writing to a widget (Entry)
                $cfig(dest$w) delete 0 end; $cfig(dest$w) insert 0 $v(dat$w)
            } else {						;#if waiting, dest can be a local variable in the calling context
                upvar $cfig(dest$w) var				;#write to variable level above
                set var $v(dat$w)
            }
        }
        return $v(status$w)
    }
}

#The widget command
#------------------------------------------
proc lbsel::wcmd {w cmd args} {
    switch -exact $cmd {
        {load}		{eval load $w $args}
        {clear}		{eval clear $w $args}
        {delete}	{eval delete $w $args}
        {add}		{eval add $w $args}
        {edit}		{eval edit $w $args}
        {get}		{return $lbsel::v(dat$w)}
        {selected}	{return [lbsel::selected $w]}
        {fget}		{return [$w.lb get 0 end]}
        {f}		{eval _$w $args}
        {default}	{return [eval $w.lb $cmd $args]}
    }
}
