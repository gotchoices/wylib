# Wyattized entry widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- Support for undo/redo like wtext
#X- consolidate adjacent deletes
#X- three front deletes won't consolidate, three fronts do
#X- remember position for undoing a delete
#- make wentry::paste like in wtext?
#- if we configure in a -textv, the trace doesn't get set
#- 

namespace eval wentry {
    namespace export entry
    variable cfig
    variable v
    set cfig(swar) {{help 3} {modified 3 mod} {edwindow 3 edwin} {initialize 2 init}}
}

option add *Entry.background {#f0f0f0} widgetDefault

#Clear the current selection
#------------------------------------------
proc wentry::unselect {w} {
    $w selection clear
}

# Handle the destination address of a kill command
#------------------------------------------
proc wentry::killterm {w after symb} {
    set orgind [$w index insert]
    focus $w
    event generate $w $symb
    set newind [$w index insert]
#puts "  orgind:$orgind newind:$newind"
    $w icursor $orgind
    if {$newind < $orgind} {$w delete $newind $orgind} else {$w delete $orgind $newind}
    after idle "focus $w; $after"
}

#Interactive kill text
#------------------------------------------
proc wentry::kill {w args} {
    wkeys::destquery .kill_dest -win $w -title {Delete text up to destination:} -command "wentry::killterm $w {}"
}

# Search/replace strings
#------------------------------------------
proc wentry::find {w args} {eval search::search ${w}_srch -par $w $args}

#Entry-specific find routine
#------------------------------------------
proc wentry::wfind {w find args} {
    if {$find == {}} {return {}}
    foreach s {back case wrap regx until} {set ca($s) [xswitchs $s args]}
    set flen [string length $find]
    set str [$w get]
    set slen [string length $str]
    if {$ca(case)} {set cas {}} else {set cas {-nocase}}
    if {$ca(back)} {
        if {[catch {set index [$w index sel.first]}]} {set index insert}
        set idx [$w index $index]
    } else {
        set idx [$w index insert]
    }
#puts "idx:$idx flen:$flen"
    set i $idx
    set n 0
    while {1} {
        if {$ca(back)} {
            if {$i < 0} {		;#did we go past the beginning?
                if {!$ca(wrap)} {return 0}
                set i $slen
            }
            set end $i
            set beg [expr $end - $flen]
        } else {
            if {$i >= $slen} {		;#did we run off the end?
                if {!$ca(wrap)} {return 0}
                set i 0
            }
            set beg $i
            set end [expr $beg + $flen]
        }
#puts "i:$i idx:$idx"
        if {$n > 0 && $i == $idx} {return 0}		;#have checked whole string
        if {$ca(regx)} {
            set cmp [string range $str $beg end]
            set match [eval regexp $cas ^\$find \$cmp mstrg]
            if {$match} {
                set end [expr $beg + [string length $mstrg]]
#puts "mstrg:$mstrg beg:$beg end:$end"
            }
        } else {
            set cmp [string range $str $beg [expr $end - 1]]
            set match [expr [eval string compare $cas \$find \$cmp] == 0]
        }
#puts "find:$find cmp:$cmp: match:$match"
        if {$match} {
            $w selection range $beg $end
            $w icursor $end
            $w see $beg; $w see $end
            return "$beg $end"
        }
        if {$ca(back)} {incr i -1} else {incr i}
        incr n
    }
}

#Entry-specific find routine
#------------------------------------------
proc wentry::wreplace {w beg end repl} {
    $w delete $beg $end
    $w insert $beg $repl
}

#Make sure the specified index is visible in the entry
#------------------------------------------
proc wentry::see {w index} {
#puts "see $w $index"
    set idx [$w index $index]			;#the part we want to show
    set i [set len [string length [$w get]]]	;#length of entry contents
#puts "i:$i idx:$idx"
    while {$i > 0} {
        lassign [$w xview] x1 x2
#puts "i:$i x1:$x1 x2:$x2"
        if {$x1 == 0 && $x2 == 1} return	;#all contents showing
        set ipos [expr $idx.0 / $len.0]
#puts "ipos:$ipos"
        if {$ipos > $x1 && $ipos < $x2} return	;#index is showing

        if {$ipos >= $x2} {
            $w xview scroll 1 u
        } else {			;#$ ipos <= $x1
            $w xview scroll -1 u
        }
        incr i -1
    }
}

# Clear the undo, redo stacks
#------------------------------------------
proc wentry::clearundo {w} {
    set wentry::v(undo$w) {}
    set wentry::v(redo$w) {}
}

# undo/redo stack data is a list of records:
# (token: i=insert, d=delete) and parameters related to that token
# {i insert idx text}
# {i insert idx1 text1 idx2 text2 ...}
# {d idx1 idx2}
    
proc wentry::redo {w index} {undo $w 1}

#Undo last change
#------------------------------------------
proc wentry::undo {w {redo 0}} {
    variable cfig
    variable v
    if {$redo} {set utag redo} else {set utag undo}
    if {[llength $v($utag$w)] == 0} {dia::brief Empty 300; return 0}

    set rec [lvarpop v($utag$w) end]
    set cmd [lvarpop rec 0]
#puts "+Undo w:$w redo:$redo cmd:$cmd"
    set v(in$w) $utag
    if {$cmd == {d}} {
        eval delete $w $rec
    } elseif {$cmd == {i}} {
        set ins [lvarpop rec 0]		;#insertion point
        foreach {idx data} $rec {
            insert $w $idx $data
            $w see $idx			;#see what we just restored
        }
        $w icursor $ins			;#put cursor back
        $w see insert
    }
    set v(in$w) {}
    if {$utag == {undo} && [llength $v(undo$w)] <= 0} {modified $w 0}
#puts "-Undo undo:$v(undo$w):"
#puts "      redo:$v(redo$w):"
}

# Insert into widget
#------------------------------------------
proc wentry::insert {w index args} {
    variable cfig
    variable v
#puts "+Insert w:$w: args:$args in:$v(in$w)"
    set index [$w index $index]

    set length 0
    foreach {c t} $args {incr length [string length $c]}	;#length of all inserted pieces
#puts "length:$length"
    eval _$w insert $index $args

#    set index2 [norm_index $w "$index + $length chars"]	;#end of insert
    set index2 [expr [$w index $index] + $length]	;#end of insert

#Add this command on the undo or redo stack
    if {$v(in$w) != {undo}} {set utag undo} else {set utag redo}
    if {[llength $v($utag$w)] > 0} {
        set uidx [expr [llength $v($utag$w)] - 1]
        lassign [lindex $v($utag$w) $uidx] typ i i2	;#grab last undo cmd
#puts "i:$i i2:$i2 index:$index index2:$index2 uidx:$uidx"
        if {$typ == {d} && $i2 == $index} {
            set v($utag$w) [lreplace $v($utag$w) $uidx $uidx "d $i $index2"]
        } else {
            lappend v($utag$w) [list d $index $index2]
        }
    } else {
        lappend v($utag$w) [list d $index $index2]
    }
    if {$v(in$w) == {}} {set v(redo$w) {}}
    if {[_$w cget -textv] == {}} {modified $w 1}		;#trhand will give us an event if there is a textvariable
    $w see insert
#puts "-Insert undo:$v(undo$w):"
#puts "        redo:$v(redo$w):"
}

# Delete from widget
#------------------------------------------
proc wentry::delete {w first {last {}}} {
    variable cfig
    variable v

    set noapp {}
    set first [$w index $first]
    if {$last == {}} {set last [expr $first + 1]} else {set last [$w index $last]}
#puts "delete w:$w first:$first: last:$last"
    if {$v(in$w) == {undo}} {set utag redo} else {set utag undo}
    if {$noapp == {} && [lindex [lindex $v($utag$w) end] 0] == {i} && [$w index $v(lastins$w)] == [$w index insert]} {
        set rec [lvarpop v($utag$w) end]	;#append to last record
    } else {
        set rec [list i [set ins [$w index insert]]]
    }
    set data [string range [$w get] $first [expr $last - 1]]
    set rec [linsert $rec 2 $first $data]
#puts "rec:$rec:"
    lappend v($utag$w) $rec

    if {$v(in$w) == {}} {
        set v(redo$w) {}
    } else {
        $w see $first
        $w icursor $first
    }

    eval _$w delete $first $last
    if {[_$w cget -textv] == {}} {modified $w 1}		;#trhand will give us an event if there is a textvariable

    set v(lastins$w) [$w index insert]
#puts "-Delete undo:[llength $v(undo$w)]:$v(undo$w):"
#puts "        redo:[llength $v(redo$w)]:$v(redo$w):"
}

# Indicate if the given character is considered as part of a word
#------------------------------------------
proc wentry::isword {c} {
    if {[string is alnum -strict $c] || $c == {_}} {return 1} else {return 0}
}

# Increment/decrement the insert pointer
#------------------------------------------
proc wentry::incri {w {n 1}} {$w icursor [expr [$w index insert] + $n]}

#Move to the end of the current/next word
#------------------------------------------
proc wentry::eow {w} {
    proc nxt {w} {set i [$w index insert]; return [string range [$w get] $i $i]}
#puts "EOW:"
    while {[set c [nxt $w]] != {} && ![isword $c]} {incri $w}
    while {[set c [nxt $w]] != {} && [isword $c]} {incri $w}
}

#Move to the beginning of the current/prev word
#------------------------------------------
proc wentry::bow {w} {
    proc prv {w} {set i [$w index insert]; incr i -1; return [string range [$w get] $i $i]}
#puts "BOW:"
    while {[set c [prv $w]] != {} && ![isword $c]} {incri $w -1}
    while {[set c [prv $w]] != {} && [isword $c]} {incri $w -1}
}

# Alert the user to a history error by highlighting the entry
#------------------------------------------
proc wentry::attn {w {notify 0}} {
    variable v
    if {!$notify || [info exists v(bg$w)]} return
    set v(bg$w) [_$w cget -bg]
    after 200 "::wentry::_$w configure -bg $wentry::v(bg$w); unset wentry::v(bg$w)"
    _$w configure -bg grey80
}

# Save the current entry value on a stack
#------------------------------------------
proc wentry::push {w} {
    variable v
    set val [$w get]
#puts "push $w val:$val:"
    if {$val != [lindex $v(hist$w) end]} {lappend v(hist$w) $val}
#puts "  hist:$v(hist$w):"
    set v(hidx$w) [llength $v(hist$w)]
}

# Access previous history values
#------------------------------------------
proc wentry::prev {w args} {
    variable v

    argform not args
    argnorm {{search 1 srch} {notify 1 not}} args
    lassign {0 1} srch not
    foreach s {srch not} {xswitchs $s args $s}
    
#puts "prev hidx:$v(hidx$w)"
    if {[set len [llength $v(hist$w)]] <= 0 || $v(hidx$w) <= 0} {attn $w $not; return}
#puts " len:$len"
    if {$v(hidx$w) == $len} {set v(hbuf$w) [$w get]}	;#save current value
    set savidx $v(hidx$w)
    set val [lindex $v(hist$w) [incr v(hidx$w) -1]]
    while {$srch && $v(hidx$w) >= 0} {
        set val [lindex $v(hist$w) $v(hidx$w)]
#puts " compare:$v(hbuf$w):$val: (hidx:$v(hidx$w))"
        if {[regexp -- "^$v(hbuf$w)" $val]} {set srch 0} else {incr v(hidx$w) -1}
    }
    if {$srch} {set v(hidx$w) $savidx; attn $w $not; return}
    _$w delete 0 end
    _$w insert 0 $val
#puts " hidx:$v(hidx$w)"
}

# Access the next history value
#------------------------------------------
proc wentry::next {w args} {
    variable v

    argform not args
    argnorm {{search 1 srch} {notify 1 not}} args
    lassign {0 1} srch not
    foreach s {srch not} {xswitchs $s args $s}
    
#puts "next hidx:$v(hidx$w)"
    if {[set len [llength $v(hist$w)]] <= 0 || $v(hidx$w) >= $len} {attn $w $not; return}
#puts " len:$len"
    if {$v(hidx$w) == $len} {set v(hbuf$w) [$w get]}	;#save current value
    set savidx $v(hidx$w)
    set val [lindex $v(hist$w) [incr v(hidx$w) 1]]
    while {$srch && $v(hidx$w) < $len} {
        set val [lindex $v(hist$w) $v(hidx$w)]
#puts " compare:$v(hbuf$w):$val: (hidx:$v(hidx$w))"
        if {[regexp -- "^$v(hbuf$w)" $val]} {set srch 0} else {incr v(hidx$w)}
    }
    if {$srch} {set v(hidx$w) $savidx; attn $w $not; return}
    _$w delete 0 end
    if {$v(hidx$w) >= $len} {
        _$w insert 0 $v(hbuf$w)
    } else {
        _$w insert 0 [lindex $v(hist$w) $v(hidx$w)]
    }
#puts " hidx:$v(hidx$w)"
}

# Revert out of history, back to the working entry
#------------------------------------------
proc wentry::last {w args} {
    variable v
#puts "last hidx:$v(hidx$w)"

    argform not args
    argnorm {{notify 1 not}} args
    lassign {1} not
    foreach s {not} {xswitchs $s args $s}

    if {[set len [llength $v(hist$w)]] <= 0 || $v(hidx$w) >= $len} {attn $w $not; return}
    set v(hidx$w) $len
    _$w delete 0 end
    if {[info exists v(hbuf$w)]} {_$w insert 0 $v(hbuf$w)}
}

# Load the first history value
#------------------------------------------
proc wentry::first {w args} {
    variable v

    argform not args
    argnorm {{notify 1 not}} args
    lassign {1} not
    foreach s {not} {xswitchs $s args $s}

    if {[llength $v(hist$w)] <= 0 || $v(hidx$w) <= 0} {attn $w $not; return}
    set v(hbuf$w) [$w get]
    set v(hidx$w) 0
    _$w delete 0 end
    _$w insert 0 [lindex $v(hist$w) 0]
}

# Access the history stack
#------------------------------------------
proc wentry::history {w args} {
    variable cfig
    variable v
    if {[llength $args] == 0} {return $v(hist$w)}
    set v(hist$w) $args
    return [set v(hidx$w) [llength $args]]
}

# Get configuration for an entry
#------------------------------------------
proc wentry::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain {edwin help init} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing entry
#------------------------------------------
proc wentry::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag {edwin help init} {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

# Initialize the widget
#------------------------------------------
proc wentry::initialize {w} {
    variable cfig
    variable v
    set b [ww::modblock 1]
    set state [_$w cget -state]		;#in case it is disabled or readonly
    _$w configure -state normal
    $w delete 0 end
    if {[regexp {^\$} $cfig(init$w)] && [info exists [string range $cfig(init$w) 1 end]]} {	;#if accessing global variable for initial value
        $w insert 0 [subst -nobackslashes -nocommands $cfig(init$w)]
    } elseif {[regexp {\[.*\]} $cfig(init$w)]} {						;#if accessing procedure for initial value
        $w insert 0 [subst -nobackslashes -novariables $cfig(init$w)]
    } else {
        $w insert 0 $cfig(init$w)
    }
    _$w configure -state $state
    set v(hist$w) {}
    set v(hidx$w) 0
    clearundo $w
    ww::modblock $b
    modified $w 0
}

# Keep track of whether contents have been modified
#------------------------------------------
proc wentry::modified {w {setclr {}} {gen 1}} $ww::modified

# Handle Modified event in case of change via textvariable
#------------------------------------------
proc wentry::trhand {w n1 n2 op} {
#puts "w:$w n1:$n1 n2:$n2 op:$op"
    if {$op == {w}} {modified $w 1}
}

#Create an entry widget
#------------------------------------------
proc wentry::entry {w args} {
    variable cfig
    variable v

    argform {width} args
    argnorm $cfig(swar) args
    foreach tag {edwin help} {set cfig($tag$w) [xswitchs $tag args]}
    foreach tag {init} {xswitchs $tag args cfig($tag$w)}
    eval _entry $w $args
    if {[set tv [$w cget -textv]] != {}} {
        uplevel #0 "trace variable $tv w {wentry::trhand $w}"	;#to handle modifies through the textvariable
    }
    
    if {$cfig(edwin$w) != {} && $cfig(edwin$w)} {
        bind $w <Button-3> "focus $w; edwin::edwin .edwin[translit . _ $w] -dest [$w cget -textvariable] -wrap none"
    }
    bind $w <Return> "event generate $w <<Ok>>"		;#for use with dialogs
    bind $w <KP_Enter> "event generate $w <<Ok>>"		;#for use with dialogs
    bind $w <4> "$w prev"		;#value history
    bind $w <5> "$w next"
    widginit $w wentry *$w

    clearundo $w    
    set v(hist$w)	{}
    set v(in$w)		{}
    set v(hidx$w)	0
    set v(modif$w)	1
    if {[info exists cfig(init$w)]} {initialize $w} else {set cfig(init$w) {}}
    modified $w 0
    return $w
}

# Widget command
#------------------------------------------
proc wentry::wcmd {w cmd args} {
    variable cfig
#puts "w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{initialize 4} {delete 3} {insert 3} {undo 2} {redo 2} {push 2} {print 2} {history 4} {previous 2 prev} {next 2} {first 3} {last 2} {unselect 3} {wfind 2} {wreplace 2} {cget 2} {configure 4} {modified 3} {clearundo 6}} $cmd]
    if {[lcontain {delete insert initialize clearundo undo redo init push cget configure history first last prev next unselect wfind wreplace see modified} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {set}} {			;#opposite of get
        delete $w 0 end
        return [eval insert $w 0 $args]
    } elseif {$cmd == {w}} {
        return $w
    } elseif {$cmd == {print}} {
        print::print wentry_print -command "$w get"
    } else {
        return [eval _$w $cmd $args]
    }
}

rename ::entry ::wentry::_entry	;#replace standard widget with wrapper
namespace import wentry::entry

wkeys::wentry
