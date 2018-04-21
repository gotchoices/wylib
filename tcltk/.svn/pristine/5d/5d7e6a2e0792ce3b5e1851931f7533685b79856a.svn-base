# Wyattized listbox widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- add wlistbox::modified command
#X- Implement a -justify switch?
#X- Implement wlistbox::wreplace
#- Implement string match (not regex) in wfind
#- Implement "until" options in wfind?
#- Should we add a format switch (%X.Xs)?
#  if so, how can we extract the real (non-formatted) data
#- 

namespace eval wlistbox {
    namespace export listbox
    variable cfig
    set cfig(swar) {{help 3} {writeable 2 write}}
    set cfig(sblk) {help write}

    #See if tk supports -justify:
    if {![catch {listbox ._l_b_ -just right}]} {
        destroy ._l_b_
        set cfig(just) 1	;#tcl supports justify
    } else {
        set cfig(just) 0	;#older version
        lappend cfig(swar) {justify 2 just}
        lappend cfig(sblk) {just}
    }
}

option add *Listbox.background {#eeeeee} widgetDefault

# Called when listbox changes size
#------------------------------------------
proc wlistbox::config {w} {
    variable cfig
#puts "config:$w:[$w xview]:"
    if {!$cfig(just) && $cfig(just$w) == {right}} {	;#maintain right pan value
        if {![info exists cfig(lastmax$w)]} {set cfig(lastmax$w) 1}
        lassign [_$w xview] min max
#puts " lastmax:$cfig(lastmax$w) min:$min max:$max moveto:[expr $min + ($cfig(lastmax$w) - $max)]"
        _$w xview moveto [expr $min + ($cfig(lastmax$w) - $max)]
    }
}

# Remove any current selection
#------------------------------------------
proc wlistbox::unselect {w args} {$w selection clear 0 end}

# Search/replace strings interactively
#------------------------------------------
proc wlistbox::find {w args} {
    variable cfig
    eval search::search ${w}_srch -par $w -write $cfig(write$w) $args -place 0
}

# Listbox-specific find routine
#------------------------------------------
proc wlistbox::wfind {w find args} {
    if {$find == {}} {return {}}
#puts "wfind:$w $find $args"
    foreach s {back case wrap regx until} {set ca($s) [xswitchs $s args]}

    if {[set sels [$w curselection]] != {}} {	;#use currently selected line
        set line [lindex $sels 0]
#puts "sel:$line"
    } else {
        set line [$w index active]		;#or active line
#puts "active:$line"
    }
    if {$ca(case)} {set c {}} else {set c -nocase}
    set end [$w index end]
    if {$ca(back)} {
        set inc -1
        if {$ca(wrap)} {set until $line} else {set until 0}
    } else {
        set inc 1
        if {$ca(wrap)} {set until $line} else {set until $end}
    }
#puts "end:$end"
    set count 0
    for {set i [expr $line + $inc]} {1} {set i [expr ($i + $inc) % $end]; incr count} {
        set i [expr $i % $end]
#puts "i:$i cline:[$w get $i]"
        if {[regexp $c -- "^(.*)(${find})(.*)$" [$w get $i] all pre match post]} {
            $w selection clear 0 end; $w selection set $i
            $w activate $i
#puts "Found $find on line:$i all:$all pre:$pre match:$match post:$post"
            $w see $i
            set beg [string length $pre]
            set end [expr $beg + [string length $match] - 1]
#puts "beg:$beg end:$end"
            return "$i.$beg $i.$end"
        }
        if {$count && $i == $until} break
    }
    $w see $line
#puts "String $find not found"
    return 0
}

# Listbox-specific replace routine
#------------------------------------------
proc wlistbox::wreplace {w beg end repl} {
    lassign [split $beg .] bline bcol
    lassign [split $end .] eline ecol
#puts "bline:$bline bcol:$bcol eline:$eline ecol:$ecol"
    if {$bcol == {} || $ecol == {} || $bline == {} || $eline == {} || $bline != $eline} {error "Illegal listbox replacement specification: $beg $end"}
    set str [string replace [$w get $bline] $bcol $ecol $repl]
    $w insert [expr $bline + 1] $str
    $w delete $bline $bline
}

# Set/query x view
#------------------------------------------
proc wlistbox::xview {w args} {
    variable cfig
#puts "xview:$args:"
    set res [eval _$w xview $args]
    set cfig(lastmax$w) [lindex [_$w xview] 1]
    return $res
}

# Insert records
#------------------------------------------
proc wlistbox::insert {w args} {
    variable cfig
    set res [eval _$w insert $args]

    if {!$cfig(just) && $cfig(just$w) == {right}} {		;#if doing right justify
#puts "pre:$w"
        set max 0
        set just 0				;#do we need to justify
        set data [_$w get 0 end]		;#get current data
        foreach ln $data {			;#find the longest record
            set ln [string trim $ln]
#puts "  ln:$ln max:$max"
            if {[set len [string length $ln]] > $max} {
                if {$max != 0} {set just 1}	;#if any lines differ in length
                set max $len
            }
#puts "         max:$max just:$just"
        }
        if {$just} {
            set fdata {}			;#create a new, formatted list
            foreach ln $data {			;#format each record
                lappend fdata [format {%*s} $max $ln]
            }
            _$w delete 0 end
            eval _$w insert 0 $fdata
        }
        after idle "$w xview moveto 1"		;#force to show right side if too wide for view
    }
    return $res
}

# Get entries from a listbox
#------------------------------------------
proc wlistbox::get {w first {last {}}} {
    variable cfig
    set res [eval _$w get $first $last]
    if {!$cfig(just) && $cfig(just$w) != {right}} {return $res}
    if {$last == {}} {return [string trimleft $res]}
    set res1 {}
    foreach rec $res {
        lappend res1 [string trimleft $rec]
    }
    return $res1
}

# Set contents to a default value
#------------------------------------------
proc wlistbox::initialize {w} {
    set b [ww::modblock 1]
    $w delete 0 end
    ww::modblock $b
    modified $w 0
}

# Keep track of whether contents have been modified
#------------------------------------------
proc wlistbox::modified {w {setclr {}} {gen 1}} $ww::modified

# Get configuration for an listbox
#------------------------------------------
proc wlistbox::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {[lcontain $cfig(sblk) $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing button
#------------------------------------------
proc wlistbox::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(sblk) {xswitchs $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    return {}
}

#Create a listbox widget
#------------------------------------------
proc wlistbox::listbox {w args} {
    variable cfig
    variable v

    argform {width height} args
    argnorm $cfig(swar) args
    array set cfig "write$w 0"
    foreach tag {mod help} {set cfig($tag$w) [xswitchs $tag args]}
    foreach tag {write} {xswitchs $tag args cfig($tag$w)}

    if {!$cfig(just)} {
        set cfig(just$w) [xswitchs just args]
        if {[string range $cfig(just$w) 0 0] == {r}} {set cfig(just$w) {right}} else {set cfig(just$w) {left}}
    }
    eval _listbox $w $args
    widginit $w wlistbox *$w wcmd
    bind $w <Configure> {wlistbox::config %W}
    
    set v(modif$w) 1
    initialize $w
    return $w
}

# Widget command
#------------------------------------------
proc wlistbox::wcmd {w cmd args} {
    variable cfig
    set cmd [unabbrev {{get 1} {insert 3} {xview 2} {cget 2} {configure 4} {find 2} {wfind 2} {wreplace 2} {unselect 3} {initialize 3}} $cmd]
    if {[lcontain {delete insert} $cmd]} {modified $w 1}
    if {[lcontain {get insert initialize configure cget modified xview find wfind wreplace unselect} $cmd]} {
        return [eval $cmd $w $args]
    } elseif {$cmd == {w}} {
        return $w
    } 
    return [eval _$w $cmd $args]
}

rename ::listbox ::wlistbox::_listbox	;#replace standard widget with wrapper
namespace import wlistbox::listbox
