# This will run a spell checker on any text window
# A separate instance can run if different text windows are specified.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35
package require Expect

#TODO:
#X- Spell-all broken?
#- words like dlx90 have numbers so ispell won't process the @ command on them
#- adapt to osdep.tcl, port to windows
#- 

namespace eval spell {
    namespace export spell
    
    variable cfig
    variable v
    set cfig(subwcmd) {etw::splist}
}

# Spell check an Entry window
#------------------------------------------
proc spell::spentry {w e level} {
    variable cfig
    variable v

    set t $v(t$w)		;#remember what window were we working on
    set ew ".spell[translit {.:} {__} $e]"
    edwin::edwin $ew -dest $e -wrap word -commit {}
    wm withdraw $ew
    set v(hide$w) $ew
    wincheck $w [$ew text w] [expr $level + 1]
    $ew commit
    set v(hide$w) {}
    set v(t$w) $t		;#restore t
}

# Spell check a text window
#------------------------------------------
proc spell::wincheck {w t {level 0}} {
    variable cfig
    variable v

#    lib::cwatch $t
    set v(t$w) $t
#puts "spell:$w type:[winfo class $t]"
    if {[winfo class $t] == {Entry}} {return [spentry $w $t $level]}
    set tdata [$t dump -text -window 0.0 {end - 1 chars}]
    set tlen [llength $tdata]
    for {set d 0} {$d < $tlen} {} {
#        catch {lib::cwatch $w}
        lassign [lrange $tdata $d [incr d 3]] typ dat idx
        $t see $idx
        if {$typ == {window}} {
#puts "Window $dat:"
            if {!$cfig(etw$w)} continue
            $dat configure -bd 8
            foreach sw [$cfig(subwcmd) $dat] {
#puts "sw:$sw"            
                $sw configure -bd 4
                if {[set cl [winfo class $sw]] == {Entry}} {
                    spentry $w $sw $level
#                    set ew .spell[translit {.:} {__} $sw]
#                    edwin::edwin $ew -dest $sw -wrap word -commit {}
#                    wm withdraw $ew
#                    set v(hide$w) $ew
#                    wincheck $w [$ew text w] [expr $level + 1]
#                    $ew commit
#                    set v(hide$w) {}
#                    set v(t$w) $t		;#restore t
                } elseif {[lcontain {Text Stext} [winfo class $sw]]} {
                    wincheck $w $sw [expr $level + 1]
                    set v(t$w) $t		;#restore t
                } else {
                    error "Sub-widget type not supported in spell-check: $cl"
                }
                $sw configure -bd 2	;#etw-dependent
            }
            $dat configure -bd 1	;#etw-dependent
        } elseif {$typ == {text}} {
            while {$d < $tlen && [lindex $tdata $d] == $typ} {append dat [lindex [lrange $tdata $d [incr d 3]] 1]}	;#concat text segments
            set len [string length $dat]
            $t mark set spell_blken "$idx + $len chars"
#puts "Text:$len:$dat"
            for {} {[$t compare $idx < spell_blken]} {set idx [$t index spell_blkst]} {
                while {[$t compare $idx < spell_blken] && [string is space -strict [$t get $idx "$idx + 1 chars"]]} {
                    set idx [$t index "$idx + 1 chars"] ;#skip spaces
                }
                set jdx $idx
                while {[$t compare $jdx < spell_blken] && ([string is alnum -strict [set c [$t get $jdx "$jdx + 1 chars"]]] || $c == {'})} {
                    set jdx [$t index "$jdx + 1 chars"] ;#skip alpha chars
                }
                set v(wordst$w) $idx
                set v(worden$w) $jdx
                set v(word$w) [string trim [$t get $idx $jdx] { '}]
#puts "  t:$t word:$v(word$w): wordst:$v(wordst$w) worden:$v(worden$w)"
                $t mark set spell_blkst "$jdx + 1 chars"
                if {[string is digit -strict $v(word$w)]} {
                    if {[string is alpha -strict $v(word$w)]} {dia::warn "Can't check words with mixed alpha and digits ($v(word$w))"}
                    continue
                }
                if {$v(word$w) == {} || $v(word$w) == "\n" || [string is digit -strict $v(word$w)] || [string is punct -strict $v(word$w)]} continue
#puts "send:$v(word$w):"
                set spawn_id $v(sid$w)
                exp_send "$v(word$w)\n"
                set v(status$w) -1		;#default before any action
                set timeout 5
                expect {
                    -re {\*.*}	{
#puts OK
                    }
                    -re {[&#].*}	{
#puts MIS
#                        catch {lib::cnorm $w}
                        mispel $w $expect_out(0,string)
                        tkwait variable spell::v(status$w)
                        if {!$v(status$w)} {quit $w}
                        if {$v(status$w) == 2} {change $w}
#                        catch {lib::cwatch $w}
#puts "status:$v(status$w) word:$v(word$w) val:$v(val$w)"
                    }
                    default	{
                        if {[dia::ask "Background spell-checker error or timeout" 0 {Cancel Spell-check} {Keep Trying}] <= 0} {quit $w}
                    }
                }
            }
        } else {error "Unrecognized dump type: $typ"; return}
    }
    if {$level <= 0} {dia::brief {Spell check done}; quit $w}	;#else {puts "POP: $level"}
}

# Request the window close
#------------------------------------------
proc spell::close {w} {
    variable v
    set v(status$w) 0
}

# Cleanup and quit spell check
#------------------------------------------
proc spell::quit {w} {
    variable v
#puts "quitting $w"
    $v(t$w) tag remove sel 0.0 end		;#leave no selection
    exp_send -i $v(sid$w) "#\n"			;#save dictionary
    catch {destroy $w}
    close $v(sid$w)				;#kill aspell
#    lib::cnorm $v(t$w)
    unset v
    return -code return
}

# Change the highlighted word to v(word$w)
#------------------------------------------
proc spell::change {w} {
    variable cfig
    variable v
    
    set chngto $v(val$w)
    [set t $v(t$w)] tag remove sel 0.0 end
    set tags [$t tag names $v(wordst$w)]
#puts "del $v(wordst$w)-$v(worden$w) ins:$chngto: tags:$tags:"
    $t delete $v(wordst$w) $v(worden$w)
    $t insert $v(wordst$w) $chngto
    foreach i $tags {			;#restore any tags
        $t tag add $i $v(wordst$w) "$v(wordst$w) wordend"
    }
}

# Handle a mis-spelled word
#------------------------------------------
proc spell::mispel {w {reply {}}} {
    variable v
#puts "Bad word:$v(word$w): reply:$reply:"
    lassign [split $reply :] stat guess
    set guesarr [translit , { } $guess]
    lassign $stat c1 word count offset
#puts "c1:$c1 word:$word count:$count guesarr:$guesarr:"
    if {$word != $v(word$w)} {dia::err "Aspell sync error ($word != $v(word$w))"; set v(status$w) 0}
    raise $w
    if {$v(hide$w) != {}} {wm deiconify $v(hide$w); set v(hide$w) {}}

    [set t $v(t$w)] see $v(worden$w)
    set v(val$w) $v(word$w)		;#show the word
    $w.e.sel.lb delete 0 end		;#delete any old guess list
    foreach g $guesarr {$w.e.sel.lb insert end $g}
    $t tag remove sel 0.0 end
    $t tag add sel $v(wordst$w) $v(worden$w)	;#highlight it
    focus $w.e.w.e
}

# Pick a word from the guess list
#------------------------------------------
proc spell::pick {w idx} {
    variable v
    set word [$w.e.sel.lb get $idx]
    set v(val$w) $word
    $v(t$w) tag add sel $v(wordst$w) $v(worden$w)	;#reselect word
}

# Send a response back to aspell
#------------------------------------------
proc spell::respond {w cmd} {
    variable v
#puts "respond:$cmd$v(word$w)"
    set spawn_id $v(sid$w)
    exp_send "$cmd$v(word$w)\n"
}

# Create spell check window
#------------------------------------------
proc spell::build {w t} {
    variable cfig
    variable v

    frame [set s $w.b] -borderwidth 2 -relief raised	;#buttons
    pack $s -side right -fill both -expand yes
    button $s.chg -text {Change To}	-command "set spell::v(status$w) 2" -help {Change the word to what is showing in the Word: entry}
    button $s.skp -text {Skip Once}	-command "set spell::v(status$w) 1" -help {Skip over the highlighted word, but still ask about this same word in the future}
    button $s.ska -text {Skip Always}	-command "spell::respond $w @; set spell::v(status$w) 1" -help {Skip the highlighted word throughout the spell check}
    button $s.add -text {Remember}	-command "spell::respond $w *; set spell::v(status$w) 1" -help {Add the word to my private dictionary for use in future spell checks}
    button $s.qui -text {Quit}		-command "spell::close $w" -help {Close the spell check window}
    pack $s.skp $s.ska $s.chg $s.add $s.qui -side top -fill x

    frame [set s $w.e] -borderwidth 2 -relief raised	;#entries
    pack $s -side left -fill both -expand yes
	
    frame $s.w ; pack $s.w -side top -fill x	;#word we're checking
    label $s.w.l -text Word:
    entry $s.w.e -textvariable spell::v(val$w) -help "Shows the word being scrutinized.\nType changes here if desired."
    pack $s.w.l $s.w.e -side left
	
    frame $s.sel ; pack $s.sel -side top -fill both -exp 1	;#selection box
    listbox $s.sel.lb -yscrollcommand "$s.sel.ys set"
    scrollbar $s.sel.ys -command "$s.sel.lb yview" -relief sunken
    pack $s.sel.ys -side left -fill y
    pack $s.sel.lb -side left -fill both -expand 1
    bind $s.sel.lb <ButtonRelease-1> "spell::pick $w \[%W index @%x,%y\]"
    bind $s.sel.lb <Double-1> "set spell::v(status$w) 2"
    bind $w <Return> "set spell::v(status$w) 2"
    bind $w <KP_Enter> "set spell::v(status$w) 2"
#    dia::place $w -xo -200 -yo -200
    return 1
}

# Start a spell check
#------------------------------------------
#t:	the name of a text window to check spelling in
proc spell::spell {t args} {
    variable cfig
    variable v
    
    regsub -all -- {[\.:]} spell$t {_} tag
    set w [top::top $tag -title {Spell Check} -multi 0 -build "spell::build %w $t" -par $t -close spell::close]
    argproc cfig(\$s$w) $args {{dict {}} {etw 0}}
    if {$cfig(dict$w) == {}} {set dc {}} else {set dc "-p $cfig(dict$w)"}

    if {![spawn -noecho aspell -a $dc]} {dia::err "Can't start spell checker:\n$aspell -a $dc"}
#puts "aspell -a $dc"
    log_user 0
    set v(sid$w) $spawn_id
    expect {@(#)*}	;#{puts STARTUP:$expect_out(0,string):;}
    
    set v(hide$w) {}
    spell::wincheck $w $t		;#start checking
}
