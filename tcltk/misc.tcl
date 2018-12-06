# Misc functions that don't really have a good home and are not in a namespace
#------------------------------------------
#Copyright WyattERP, all other rights reserved
#provides: nop cap_first uwin round_dollar norm_dollar comma_dollar labtpt margins wrap uproc dowhile lremove widgclose widginit shq debug mytop mypar plural def
package provide wylib 0.35

# Do nothing
#------------------------------------------
proc nop {args} {}

#Capitalize the first letter of a word
#------------------------------------------
proc cap_first {s} {
    return [string toupper [string range $s 0 0]][string range $s 1 end]
}

#Create a unique window name by appending an integer onto a base string
#----------------------------------------------------
proc uwin {base} {
    for {set i 0} {[winfo exists $base$i]} {incr i} {}
    return $base$i  
}

#Round to even cents
#------------------------------------------
proc round_dollar {val} {return [expr floor(($val) * 100.00 + 0.5) / 100.00]}

#Return a dollar value in standard form
#------------------------------------------
proc norm_dollar {val} {
    if {$val == {}} {return 0.00}
    return [format {%#.2f} [round_dollar $val]]
}

#Format for dollars, including commas
#------------------------------------------
proc comma_dollar {ex} {
    if {$ex == {}} {
        return {}
    } else {
        return [money [expr $ex]]
    }
}

# Make a label from a template
#------------------------------------------
proc labtpt {args} {
    argform {template widget} args
    argnorm {{template 1} {strip 1} {widget 1}} args
    set strip 0
    foreach s {template widget} {set $s [xswitchs $s args]}
    foreach s {c a o} {set t($s) [xswitchs $s args]}
    foreach s {strip} {xswitchs $s args s}

    set lasttarg {}
    set label {}
    foreach tptln $template {
        set ln {}
        foreach fld $tptln {				;#for field in the line
            lassign $fld tag pre post targ
            if {$targ == {}} {set targ $lasttarg}	;#first target must be specified
#puts "tag:$tag: pre:$pre: post:$post: widget:$widget targ:$targ:"
            if {$widget == {}} {
                upvar $tag v
                set data $v				;#fetch the data from a variable
            } else {
                set data [eval $widget $t($targ) get $tag]	;#fetch the data from the appropriate target
            }
            if {$ln == {}} {set pre {}}		;#if nothing accumulated yet, don't force any prefix in
            if {$data != {}} {
                append ln "$pre$data$post"	;#add on each field
            }
            set lasttarg $targ			;#keep using this target
        }
        if {$strip} {regsub -- {^[, ]+} $ln {} ln}
        if {$ln != {} || $tptln == {}} {append label "$ln\n"}	;#accumulate line
    }
    return $label
}

# Insert top and left margins on a block of text
# ----------------------------------------------------------------
proc margins {text {top 4} {left 4}} {
    set linelist {}
    for {set i 0} {$i < $top} {incr i} {lappend linelist {}}
    foreach ln [split $text "\n"] {
        set line {}
        if {$ln != {}} {
            for {set i 0} {$i < $left} {incr i} {append line { }}
        }
        append line $ln
        lappend linelist $line
    }
    return [join $linelist "\n"]
}

# Wrap lines of text at a word boundary if they exceed a width.
# Retain existing newlines
# ----------------------------------------------------------------
proc wrap {text {width 80}} {
    set tl {}		;#list of lines we will send back
    set nln {}		;#current line accumulator
#puts "wrap width:$width"
    if {$width <= 0} {return $text}
    foreach ln [split $text "\n"] {	;#for each line of original text
        while {[string length $ln] > $width} {	;#while line is too long
            set idx [string wordstart $ln $width]	;#where to break line
            if {$idx == 0} break
            set chunk [string range $ln 0 [expr $idx - 1]]
            lappend tl $chunk
            set ln [string range $ln $idx end]
        }
        lappend tl $ln
    }
    return [join $tl "\n"]
}

# Define a procedure which will be executed at the specified stack level
# ----------------------------------
proc uproc {pname p1 {p2 {}}} {
    if {[string is digit -strict $p1]} {
        set level $p1
        set code $p2
    } else {
        set level 1
        set code $p1
    }
    uplevel proc $pname \{\} "{uplevel $level {$code}}"
}

# Traditional "do while" loop
#------------------------------------------
proc dowhile {body condition} {
    uplevel "$body; while {$condition} {$body}"
}

# Remove a named element from a list
#------------------------------------------
proc lremove {list args} {
    foreach element $args {
        if {[set idx [lsearch -exact $list $element]] >= 0} {
            set list [lreplace $list $idx $idx]
        }
    }
    return $list
}

# Do things common to destroying a compound widget
#----------------------------------------------------
proc widgclose {w ns idx} {
#if {$ns == {wmenu}} {
#    puts "w:$w; array unset ${ns}::cfig $idx len:[llength [array get ${ns}::cfig]]"
#    puts "arr:[array get ${ns}::cfig $idx]"
#}
    array unset ${ns}::cfig $idx	;#this can be pretty slow
    catch {rename ::$w {}}
    if {[info commands ::${ns}::_$w] != {}} {
        rename ::${ns}::_$w {}	;#should be deleted automatically (but sometimes isn't)
    }
}

# Do things common to initializing a compound widget
#----------------------------------------------------
proc widginit {w ns idx {wcmd wcmd}} {
    rename ::$w ::${ns}::_$w
    proc ::$w {cmd args} "eval ${ns}::$wcmd $w \$cmd \$args"
#    bind $w <Destroy> "+widgclose $w $ns $idx"
    bind $w <Destroy> "+if {{%W} == {$w}} {widgclose $w $ns $idx}"	;#sometimes the binding can be executed by a parent window
}

# Quote spaces and other strange characters that would be a problem for the shell
#------------------------------------------
proc ::shq {args} {

    set nargs {}
    foreach arg $args {
        if {$arg == {}} {
            set narg {""}
        } else {
            set narg $arg
            regsub -all {[ #$~`()]} $narg "\\\\&" narg
        }
        lappend nargs $narg
    }
#puts "nargs:$nargs:"
    if {[llength $nargs] <= 1} {return [lindex $nargs 0]} else {return $nargs}
}

# Output certain variables to stdout for debugging
#------------------------------------------
proc ::debug {args} {
    foreach var $args {
        upvar $var lv
        if {[info exists lv]} {
            puts -nonewline "$var:$lv "
        } else {
            puts -nonewline "$var "
        }
    }
    puts {}
}

# Return the name of my toplevel window
#------------------------------------------
proc ::mytop {w} {
    return ".[lindex [split $w .] 1]"
}

# Return the name of the nearest ancestor window above me of the given class
#------------------------------------------
proc ::mypar {w {class Top}} {
    set path [split $w .]
    while {[llength $path] > 0} {
#puts "path:$path"
        if {[winfo class [join $path .]] == $class} {return [join $path .]}
        set path [lrange $path 0 end-1]
    }
    return {}
}

# Return a word in singular or plural form based on a number
#------------------------------------------
proc ::plural {c s} {
    if {$c == 1} {
        return "$c $s"
    } elseif {[string range $s end end] == {y}} {
        return "$c [string range $s 0 end-1]ies"
    } else {
        return "$c ${s}s"
    }
}

# Set a variable if it has not been set already
# ----------------------------------
proc def {obj args} {
    upvar $obj o
    if {[info exists o]} return		;#if already defined
    if {[llength $args] >= 1} {set o {*}$args}
    return $o
}
