# Wyattized text widget
#This is an original work, but thanks goes to Bryan Oakley (oakley@channelpoint.com) who showed the way with his supertext.tcl
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- Implement custom keymap in customization script
#X- Builtin search/replace
#X- Jump to line,byte,column location
#X- Handle slave widgets in widgetcmd
#X- text slaves break if you delete the selection in the master
#X- default on cut to cut line
#X- append subsequent deletes to kill-buffer
#X- W-B pastes from yank buffer
#- when printing, can we output text with the same wrapping as generated in the widget?
#- search/replace breaks when replacing with the same value as searched for
#- 
#- Carry data with embedded windows (invisible?)
#- 
#- Support for restoring tags on undo
#- Can we cut/paste tags, sub-windows, etc.
#- 

#option add *Text.width 400 widgetDefault
#option add *Text.height 400 widgetDefault
option add *Text.background {#f0f0f0} widgetDefault
option add *Text.wrap none widgetDefault

namespace eval wtext {
    namespace export text movers
    variable cfig
    variable v
    set cfig(swar) {{help 3} {textvariable 5 textv} {initialize 2 init} {wincreate 4 winc} {slaves 3} {print 1}}
}

#Clear the current selection
#------------------------------------------
proc wtext::unselect {w} {
    $w tag remove sel 1.0 end
}

# Handle the destination address of a kill command
#------------------------------------------
proc wtext::killterm {w after symb} {
    set orgind [$w index insert]
    focus $w
    event generate $w $symb
    set newind [$w index insert]
#puts "  newind:$newind"
    $w mark set insert $orgind
    if {[$w compare $newind < $orgind]} {$w delete $newind $orgind} else {$w delete $orgind $newind}
    after idle "focus $w; $after"
}

#Interactive kill text
#------------------------------------------
proc wtext::kill {w args} {
    wkeys::destquery .kill_dest -win $w -title {Delete text up to destination:} -command "wtext::killterm $w {}"
}

#Cut the current line
#------------------------------------------
proc wtext::killline {w {up 0}} {
    set cur [$w index insert]
    set beg [$w index "insert linestart"]
    set nxt [$w index "insert +1l linestart"]
    set end [$w index end]
#puts "beg:$beg cur:$cur nxt:$nxt end:[$w index end]"
    if {$up} {
#        if {$cur == 1.0} return
    } else {
        if {$beg == $cur && $nxt == $end} return
    }
    $w delete $beg $nxt
    if {$up} {up $w; $w yview scroll -1 units}
}

#Move cursor up one line
#------------------------------------------
proc wtext::up {w {n 1}} {
    tk::TextSetCursor $w [tk::TextUpDownLine $w -$n]
}

#Move cursor down one line
#------------------------------------------
proc wtext::down {w {n 1}} {
    tk::TextSetCursor $w [tk::TextUpDownLine $w $n]
}

#Move to the end of the current/next word
#------------------------------------------
proc wtext::eow {w} {
    tk::TextSetCursor $w {insert wordend}
#puts "NEXT:[$w get {insert wordstart} {insert wordend}]:"
    if {![string is space -strict [$w get {insert wordstart} {insert wordend}]]} {
        tk::TextSetCursor $w {insert wordend}
    }
}

#Move to the beginning of the current/prev word
#------------------------------------------
proc wtext::bow {w} {
    tk::TextSetCursor $w {insert-1c wordstart}
#puts "PREV:[$w get {insert wordstart} {insert wordend}]:"
    if {[string is space -strict [$w get {insert wordstart} {insert wordend}]]} {
        tk::TextSetCursor $w {insert-1c wordstart}
    }
}

#Move to the end of the current/next line
#------------------------------------------
proc wtext::eol {w} {
    tk::TextSetCursor $w {insert+1c lineend}
}

#Move to the beginning of the current/prev line
#------------------------------------------
proc wtext::bol {w} {
    tk::TextSetCursor $w {insert-1c linestart}
}

#Move to the end of the current/next page
#------------------------------------------
proc wtext::eop {w} {
    lassign [$w yview] bopl eopl
    lassign [split [$w index {end - 1 l}] .] lines
    set dlines [expr int(1.0 * ($eopl - $bopl) * ($lines + 1))]
    set lline [expr int(1.0 * $bopl * $lines + $dlines)]
#puts "eop bopl:$bopl eopl:$eopl lines:$lines lline:$lline dlines:$dlines"
    if {[$w compare insert < ${lline}.end]} {
        tk::TextSetCursor $w ${lline}.end
    } else {
#puts "dlines:$dlines"
        loop i 0 $dlines {tk::TextSetCursor $w {insert+1c lineend}}
    }
}

#Move to the beginning of the current/prev page
#------------------------------------------
proc wtext::bop {w} {
    lassign [$w yview] bopl eopl
    lassign [split [$w index {end - 1 l}] .] lines
    set dlines [expr int(1.0 * ($eopl - $bopl) * ($lines + 1))]
    set lline [expr round(1.0 * $bopl * $lines + 1)]
#puts "bop bopl:$bopl eopl:$eopl lines:$lines lline:$lline dlines:$dlines"
    if {[$w compare insert > ${lline}.0]} {
        tk::TextSetCursor $w ${lline}.0
    } else {
#puts "dlines:$dlines"
        loop i 0 $dlines {tk::TextSetCursor $w {insert-1c linestart}}
    }
}

#Move to the end of file
#------------------------------------------
proc wtext::eof {w} {
    tk::TextSetCursor $w end-1c
}

#Move to the beginning of the file
#------------------------------------------
proc wtext::bof {w} {
    tk::TextSetCursor $w 1.0
}

# Add/delete entries in the list of slave window(s) for the current widget
#------------------------------------------
proc wtext::slave {w args} {
    variable cfig
#puts "slave:$args:"
    if {$args == {}} {
        return $cfig(slaves$w)
    } elseif {[string range [lindex $args 0] 0 0] == {.}} {
        set slaves [lrmdups [concat $cfig(slaves$w) $args]]
    } else {
        set args [lassign $args cmd]
        if {$cmd == {set}} {
            set slaves [lrmdups $args]
        } elseif {[regexp -- "^[swexp {rem%ove}]$" $cmd]} {
            foreach x $args {
                if {[set idx [lsearch -exact $cfig(slaves$w) $x]]} {set cfig(slaves$w) [lreplace $cfig(slaves$w) $idx $idx]}
            }
            return
        } else {
            error "Illegal slave command: $cmd"
            return
        }
    }
    foreach x $slaves {				;#for each of my slaves
#puts "x:$x"
#        if {[lcontain [wtext::slave $x] $w]} {	;#if I am his slave
#            wtext::slave remove $w
#        }
        if {![lcontain $cfig(slaves$w) $x]} {	;#for each new slave
            wtext::_$x delete 0.0 end
            set taglist {}
            set curins [$w index insert]
            foreach {k v i} [$w dump -all 0.0 end] {
#puts "k:$k v:$v i:$i"
                if {$k == {text}} {		;#insert regular text
                    $x insert insert $v $taglist	;#(with any tags)
                } elseif {$k == {tagon}} {	;#add this tag in
                    if {[lsearch $taglist $v] < 0} {set taglist "$taglist $v"}
                } elseif {$k == {tagoff}} {	;#or remove it
                    if {[set idx [lsearch $taglist $v]]  >= 0} {lvarpop taglist $idx}
                } elseif {$k == {mark}} {
                    if {$v == {insert}} {set curins $i}
                } elseif {$k == {window}} {
#puts "Not yet implemented"
                }
            }
        $x mark set insert [$w index insert]
        }
    }
    set cfig(slaves$w) $slaves
#puts "slaves:$slaves"
}

# Return a normalized index (ie: line.column), with special handling for "end"
#------------------------------------------
proc wtext::norm_index {w i} {
    if {$i == {end}} {return [$w index {end-1c}]} else {return [$w index $i]}
}

# Search/replace strings interactively
#------------------------------------------
proc wtext::find {w args} {eval search::search ${w}_srch -par $w $args}

#Text-specific find routine
#------------------------------------------
proc wtext::wfind {w find args} {
    if {$find == {}} {return {}}
    foreach s {back case wrap regx until} {set ca($s) [xswitchs $s args]}
    set index [lindex [$w tag ranges sel] 0]
    if {$index == {}} {set index insert}
    if {$ca(case)} {set c {}} else {set c -nocase}
    if {$ca(regx)} {set r {-regexp}} else {set r {}}
    if {$ca(back)} {
        set d -backw; set i "$index - 1 char"
        if {$ca(wrap)} {set si {}} else {set si {0.0}}
    } else {
        set d -forwa; set i "$index + 1 char"
        if {$ca(wrap)} {set si {}} else {set si {end}}
    }
    if {$ca(until) != {}} {set si $ca(until)}
    set oldstate [$w cget -state]
    $w configure -state normal
    if {[set beg [eval $w search $d $c $r -- \$find \$i $si]] == {}} {
        if {$ca(until) != {}} {$w mark set insert $ca(until); $w see insert}
        set retval 0
    } else {
        set end [$w index "$beg + [string length $find] char"]
#puts "oldstate:$oldstate new:[$w cget -state]"
        $w tag remove sel 1.0 end
        $w tag add sel $beg $end
        $w mark set insert $end
        $w see insert
        set retval "$beg $end"
    }
    after 500 "$w configure -state $oldstate"
    return $retval
}

#Text-specific replace routine
#------------------------------------------
proc wtext::wreplace {w beg end repl} {
    $w delete $beg $end
    $w insert $beg $repl
}

# Dialog for jumping to a location
#------------------------------------------
proc wtext::jump {w args} {
    variable cfig
    variable v

    argform {dest} args
    argnorm {{destination 1 dest} {byte 1}} args
    argproc ca(\$s) $args {{dest {}} {byte 0}}

    if {$ca(dest) == {}} {
        if {$ca(byte)} {set to {byte}} else {set to {location}}
        if {[dia::query "Jump to $to:" v(jump$w) 0 OK Cancel] > 0} {return}
        if {$ca(byte)} {
            set ca(dest) [$w index "0.0 + $v(jump$w) chars"]
        } else {
            lassign [split $v(jump$w) .] line col
            if {$line == {}} {set line [lindex [split [$w index insert] .] 0]}
            if {$col == {}} {set col 0}
            set ca(dest) $line.$col
        }
    }
    $w mark set insert $ca(dest)
    $w see insert
}

# Receive a literal character
#------------------------------------------
proc wtext::literal {w t key} {
    variable cfig
    if {$key == {}} return
#puts "w:$w t:$t key:$key:"
    $t insert insert "$key"
    after idle "destroy $w"
}

# Allow for literal character insertion
#------------------------------------------
proc wtext::littop {w args} {
    variable cfig
    variable v

    argform {parent} args
    argnorm {{parent 1 par} {title 1}} args
    argproc ca(\$s) $args {{par .} {title {Enter literal character}}}

    if {[winfo exists $w]} {raise $w; focus $w; return}
    eval toplevel $w
    wm transient $w $ca(par)
    wm iconname $w Literal
    wm title $w $ca(title)
    wm protocol $w WM_DELETE_WINDOW {}
    dia::place $w -xo -40 -yo -15
    
    label $w.t -text $ca(title)
    pack $w.t -side top

    bind $w <Key> "wtext::literal %W $ca(par) %A"
}

# Clear the undo, redo stacks
#------------------------------------------
proc wtext::clearundo {w} {
    set wtext::v(undo$w) {}
    set wtext::v(redo$w) {}
}

# undo/redo stack data is a list of records:
# (token: i=insert, d=delete) and parameters related to that token
# {i idx type text}
# {i idx type1 text1 type2 text2 ...}
# {d idx1 idx2}
# {d idx1 idx2a idx2b idx2c ...}
    
proc wtext::redo {w} {undo $w redo}

# Insert the last deletion block at the current insertion point
#------------------------------------------
proc wtext::yank {w} {
    variable cfig
    variable v

    for {set i [expr [llength $v(undo$w)] -1 ]} {$i >= 0} {incr i -1} {
        set rec [lindex $v(undo$w) $i]
        if {[lvarpop rec 0] == {i}} {
            lvarpop rec 0			;#insertion point
            set ins [$w index insert]
            foreach {typ data} $rec {
                if {$typ == {t}} {
                    insert $w $ins $data
                } elseif {$typ == {w} && {$cfig(winc$w) != {}}} {
                    eval $cfig(winc$w) $ins $data	;#normally recursive call
                }
                $w see $ins			;#see what we just restored
            }
            $w mark set insert $ins		;#put cursor back
            $w see insert
            return
        }
    }
    dia::brief Empty 200
}

# Undo the last change
#------------------------------------------
proc wtext::undo {w {utag undo}} {
    variable cfig
    variable v
    if {[llength $v($utag$w)] == 0} {dia::brief Empty 200; return 0}

    set rec [lvarpop v($utag$w) end]
    set cmd [lvarpop rec 0]
#puts "+Undo w:$w redo:$redo cmd:$cmd"
    set v(in$w) $utag
    if {$cmd == {d}} {
        set idx1 [lindex $rec 0]
        for {set i [expr [llength $rec] - 1]} {$i > 0} {incr i -1} {
            delete $w $idx1 [lindex $rec $i] -noapp 1
        }
    } elseif {$cmd == {i}} {
        set ins [lvarpop rec 0]		;#insertion point
        foreach {typ data} $rec {
            if {$typ == {t}} {
                insert $w $ins $data
            } elseif {$typ == {w} && {$cfig(winc$w) != {}}} {
                eval $cfig(winc$w) $ins $data	;#normally recursive call
            }
            $w see $ins			;#see what we just restored
        }
        $w mark set insert $ins		;#put cursor back
        $w see insert
    }
    set v(in$w) {}
    if {$utag == {undo} && [llength $v(undo$w)] <= 0} {modified $w 0}
#puts "-URDO $utag:[llength $v($utag$w)]:$v($utag$w):"
    return 1
}

# This window call could be recursive or under an undo
#------------------------------------------
proc wtext::window {w cmd args} {
    variable cfig
    variable v
#puts "+Window :$w cmd:$cmd: args$args"

    if {$cmd == {create} && [lcontain $args {-window}]} {	;#if recursive
        set index [norm_index $w [lindex $args 0]]	;#where to insert
        lassign [split $index .] l c			;#line and column
        set index2 "$l.[expr $c + 1]"			;#make index+1
        if {$v(in$w) == {undo}} {set utag redo} else {set utag undo}
        lappend v($utag$w) [list d $index $index2]	;#add a delete command on the undo stack
        if {$v(in$w) == {}} {set v(redo$w) {}}
        modified $w 1
    }
    eval _$w window $cmd $args
#puts "-Window $utag:[llength $v($utag$w)]:$v($utag$w):"
}

# Insert into text widget
#------------------------------------------
proc wtext::insert {w index args} {
    variable cfig
    variable v
#puts "+Insert w:$w: args:$args in:$v(in$w)"

    catch {set index [norm_index $w $index]}

    set length 0
    foreach {c t} $args {incr length [string length $c]}	;#length of all inserted pieces
#puts "length:$length"
    eval _$w insert $index $args

    set index2 [norm_index $w "$index + $length chars"]	;#end of insert

#Add this command on the undo or redo stack
    if {$v(in$w) != {undo}} {set utag undo} else {set utag redo}
    if {[llength $v($utag$w)] <= 0} {
        lappend v($utag$w) [list d $index $index2]	;#first record
    } else {
        lassign [set lrec [lvarpop v($utag$w) end]] typ i	;#grab last record
        set ie [lindex $lrec end]
#puts "lrec:$lrec index:$index index2:$index2"
        if {$typ == {d} && $ie == $index} {			;#append to regular insert
            lappend v($utag$w) [lreplace $lrec end end $index2]
        } elseif {$typ == {d} && $i == $index} {		;#append to forward insert
            lappend v($utag$w) [lappend lrec $index2]
        } else {
            lappend v($utag$w) $lrec [list d $index $index2]	;#make new record
        }
    }
    if {$v(in$w) == {}} {set v(redo$w) {}}
    modified $w 1
#puts "-Insert $utag:[llength $v($utag$w)]:$v($utag$w):"
}

# Delete from text widget
#------------------------------------------
proc wtext::delete {w args} {
    variable cfig
    variable v

    set noapp [xswitchs noapp args]
    regsub -all {end} $args {end-1c} args
    if {$v(in$w) == {undo}} {set utag redo} else {set utag undo}
    if {$noapp == {} && [lindex [lindex $v($utag$w) end] 0] == {i} && [$w compare [lindex [lindex $v($utag$w) end] 1] == insert]} {
        set rec [lvarpop v($utag$w) end]	;#append to last record
    } else {
        set rec {i}
    }
    foreach {typ data tidx} [eval $w dump -text -window $args] {
        if {[llength $rec] == 1} {lappend rec $tidx}
#puts "rec:$rec:[llength $rec]:"
        set rec [linsert $rec 2 [string range $typ 0 0] $data]
    }
    if {[llength $rec] > 2} {lappend v($utag$w) $rec}

    if {$v(in$w) == {}} {
        set v(redo$w) {}
    } else {
        set index [norm_index $w [lindex $args 0]]
        $w see $index
        $w mark set insert $index
    }

    eval _$w delete $args
    modified $w 1
#puts "-Delete $utag:[llength $v($utag$w)]:$v($utag$w):"
}

# Get configuration
#------------------------------------------
proc wtext::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain {help winc textv} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure the text widget
#------------------------------------------
proc wtext::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag {help winc textv} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Implement -textvariable switch for text type (handle call to traced variable)
#------------------------------------------
proc wtext::trhand {t n1 n2 op} {
#puts "t:$t n1:$n1 n2:$n2 op:$op"
    if {$n2 == {}} {upvar ${n1} var} else {upvar ${n1}($n2) var}
    if {$op == {r}} {
        set var [$t get 0.0 {end - 1 char}]
    } elseif {$op == {w}} {
        set state [$t cget -state]
        $t configure -state normal
        $t delete 0.0 end
        $t insert end $var
        $t configure -state $state
    }
}

# Paste from the X buffer if it exists or else local buffer
#------------------------------------------
proc wtext::paste {w} {
    if {[catch {set s [selection get]}]} {
        tk_textPaste %W
    } else {
        $w insert insert $s
    }
}

# Initialize the widget to a default value
#------------------------------------------
proc wtext::initialize {w} {
    variable cfig
    variable v
    set b [ww::modblock 1]
    $w delete 0.0 end
    $w insert 0.0 $cfig(init$w)
    set v(hist$w) {}
    set v(hidx$w) 0
    clearundo $w
    ww::modblock $b
    modified $w 0
}

# Keep track of whether contents have been modified
#------------------------------------------
proc wtext::modified {w {setclr {}} {gen 1}} $ww::modified

# Create a text widget
#------------------------------------------
proc wtext::text {w args} {
    variable cfig
    variable v

    argform {width height} args
    argnorm $cfig(swar) args
    array set cfig "print$w 1"
    foreach tag {help winc textv slaves} {set cfig($tag$w) [xswitchs $tag args]}
    foreach tag {init print} {xswitchs $tag args cfig($tag$w)}
    eval _text $w $args
    if {$cfig(textv$w) != {}} {
        upvar #0 $cfig(textv$w) var
        uplevel #0 "trace variable $cfig(textv$w) rw {wtext::trhand $w}"
        if {![info exists var]} {
            set var {}
        } else {
            $w delete 0.0 end; $w insert end $var
        }
    }
    widginit $w wtext *$w
    bind $w <Button-3> "eval tk_popup $w.cmenu \[winfo pointerxy .\]"
    menu [set m $w.cmenu]
    $m add command aa -label {Spell Check} -command "spell::spell $w" -help {Check the spelling of the text}
    $m add command aa -label {Search/replace} -command "$w find" -help {Search for text and optionally replace it with something else}
    if {$cfig(print$w)} {
        $m add command pr -label {Print Text} -command "$w print" -help "Print the contents of this text editing window"
    }
    
    clearundo $w
    set v(in$w)		{}
    set v(modif$w)	1
    if {[info exists cfig(init$w)]} {initialize $w} else {set cfig(init$w) {}}
    modified $w 0		;#initially unmodified
    return $w
}

# Widget command
#------------------------------------------
proc wtext::wcmd {w cmd args} {
    variable cfig
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{cget 2} {paste 2} {configure 4} {compare 4} {print 2} {index 3} {delete 3} {insert 3} {undo 2} {redo 2} {window 3} {clearundo 5} {find 2} {wfind 2} {wreplace 2} {slave 2} {unselect 3} {modified 3} {initialize 2} {menu 2}} $cmd]
    if {$ww::hkfunc != {} && ![lcontain {cget compare index bbox} $cmd]} {eval $ww::hkfunc $w $cmd $args}
    if {$cmd == {delete} && [llength $args] > 0} {	;#resolve indexes in case they contain sel.xxx
        set args [lreplace $args 0 0 [_$w index [lindex $args 0]]]
        if {[llength $args] > 1} {set args [lreplace $args 1 1 [_$w index [lindex $args 1]]]}
    }
    foreach x $cfig(slaves$w) {
        if {![lcontain {see xview yview} $cmd]} {eval wtext::_$x $cmd $args}
    }
    if {[lcontain {delete insert paste undo redo window clearundo configure cget find wfind wreplace slave unselect modified initialize} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {w}} {
        return $w
    } elseif {$cmd == {menu}} {
        return [eval $w.cmenu $args]
    } elseif {$cmd == {print}} {
        print::print wtext_print -command "$w get 0.0 {end - 1 chars}"
    } else {
        return [eval _$w $cmd $args]
    }
}

rename ::text ::wtext::_text		;#replace standard widget with wrapper
namespace import wtext::text

wkeys::wtext
