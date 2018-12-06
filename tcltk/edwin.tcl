# Make a toplevel text window for editing or viewing the contents of an
# entry or a variable
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- make window fit natural size but also allow stretching
#- prompt user on close if changes made
#- save prefs (size,other?) on close
#- use standard definition of -init switch (if present init to its value)
#- should this share any logic with etext?
#- should this be implemented under top::top?
#- 

namespace eval edwin {
    namespace export edwin
    variable cfig		;#configuration values
    variable v
}

#option add *Edwin*Text.background {#eeeeee} widgetDefault
option add *Edwin*Text.wrap none widgetDefault
#option add *Edwin*Text.width 180 widgetDefault
#option add *Edwin*Text.height 80 widgetDefault
option add *Edwin.title {Editing: } widgetDefault
option add *Edwin.geometry 600x450 widgetDefault
option add *Edwin.trans 0 widgetDefault
option add *Edwin.insert 1.0 widgetDefault

# Save result of the session and close window
#----------------------------------------------------
proc edwin::commit {w} {
    variable cfig
    variable v
    set result [$w.text get 0.0 {end - 1 chars}]	;#get text
#puts "commit:$w"
    if {!$cfig(wait$w)} {				;#if not waiting
#puts "Dest:$cfig(dest$w)"
        if {[string range $cfig(dest$w) 0 0] != {.}} {	;#if writing to a variable (must be a global)
            upvar #0 $cfig(dest$w) var
            set var $result
        } else {
            $cfig(dest$w) delete 0 end
            $cfig(dest$w) insert 0 $result
        }
    }
    if {$cfig(proc$w) != {}} {eval $cfig(proc$w)}	;#execute this command on commit
    destroy $w
    set v(status$w) {OK}
    set v(result$w) $result
}

# Make a toplevel window for editing or viewing an event text
#----------------------------------------------------
proc edwin::edwin {w args} {
    variable cfig
    variable v

#    argform {} args
    if {[winfo exists $w]} {destroy $w}
    argnorm {{initialize 3 init} {abort 2} {commit 2} {title 2} {readdonly 2} {see 2} {quit 2} {wait 2} {insert 3} {geometry 2} {destination 2 dest} {procedure 2 proc}} args
    array set cfig "init$w yes abort$w {Abort Edit} commit$w Commit dest$w {} readonly$w 0 see$w {} quit$w 1 wait$w 0 proc$w {} print$w 1"
    foreach tag {init abort commit dest readonly see quit trans wait insert proc} {xswitchs $tag args cfig($tag$w)}

    toplevel $w -class Edwin
    swores $w args cfig(%s$w) {title geometry trans insert}
    
    wm title $w $cfig(title$w)
    if {$cfig(trans$w)} {wm transient $w [winfo parent $w]}
    if {$cfig(geometry$w) != {}} {wm geometry $w $cfig(geometry$w)}
    widginit $w edwin *$w

    mbar::mbar $w.m -mb {file File -under 0}
    pack $w.m -side top -fill x

    if {$cfig(commit$w) != {}} {
        $w.m file mi com $cfig(commit$w) "edwin::commit $w" "Apply the contents of this window (and any changes) to its intended destination\n(Shortcut: Alt-s)" -s "{$cfig(commit$w)}"
        if {$cfig(readonly$w)} {$w.m file com configure -state disabled}
    }

    $w.m file mi close $cfig(abort$w) "set edwin::v(status$w) ABORT; destroy $w" "Close this editing window without applying any changes\n(Shortcut: Alt-w)" -s "{$cfig(abort$w)}"

    eval stext::stext $w.text $args
    pack $w.text -side top -fill both -exp 1
#puts "bindtags:[bindtags $w.text]"
    set twid [$w.text text w]
    bindtags $twid "$twid Text $w"	;#hack to overcome tkTraverseInMenu bug

    set dest $cfig(dest$w)
    if {$cfig(init$w)} {
        if {[string range $dest 0 0] == {.}} {	;#if writing to an entry
            set v(result$w) [$dest get]
        } elseif {$dest != {}} {		;#if a variable
            upvar $dest lest
            if {![info exists lest]} {set lest {}}
            set v(result$w) $lest
        } else {
            set v(result$w) {}
        }
        $w.text delete 0.0 end
        $w.text insert 0.0 $v(result$w)		;#result holds original value
        if {$cfig(see$w) != {}} {$w.text see $cfig(see$w)}
    }
    if {$cfig(insert$w) != {}} {$w.text mark set insert $cfig(insert$w)}
    if {$cfig(readonly$w)} {$w.text configure -state disabled}
    
    $w.m s dew::dew pos ent Pos: -width 7 -gmc {-side right} -textv edwin::cfig(cpos$w) -help {Current cursor position within text window}
    bind $w.text <Key> "set edwin::cfig(cpos$w) \[$w.text index insert\]"
    bind $w.text <Any-Button> "set edwin::cfig(cpos$w) \[$w.text index insert\]"
    bindtags $w.text ". Text $w.text"
    set edwin::cfig(cpos$w) [$w.text index insert]

    focus $w.text
#puts "wait:$cfig(wait$w)"
    if {$cfig(wait$w)} {		;#if we waited for the answer
        set v(status$w) {}
        tkwait window $w
#puts "status:$v(status$w)"
        if {$v(status$w) != {OK}} {return 0}
#puts "dest:$dest"
        if {[string range $dest 0 0] != {.}} {	;#if writing to a variable
            upvar $dest var		;#write to a local in level above
            set var $v(result$w)
        } else {
            $dest delete 0 end
            $dest insert 0 $v(result$w)
        }
        return 1
    }
}

#The widget command for the preview box widget
#------------------------------------------
proc edwin::wcmd {w cmd args} {
    switch -exact -- [unabbrev {{frame 2} {text 2} {commit 2}} $cmd] {
        {w}		{return $w}
        {commit}	{return [commit $w]}
        {text}		{return [eval $w.text $args]}
        {frame}		{return [eval _$w $args]}
        {default}	{return [eval $w.text $cmd $args]}
    }
}
