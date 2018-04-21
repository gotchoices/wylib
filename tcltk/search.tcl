# Open a toplevel widget to allow searching for text in another window
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- implement replace function and bindings
#X- add bindings for cursor motion terminators (how far to search)
#X- allow to work with entries
#- crashes if I open two finds on the same listbox
#- always wraps in a listbox regardless of wrap setting
#- is ::unselect now obsolete? (see wtext, wlistbox, wentry)
#- allow to work with listboxes (a dbp?)
#- save previous searches in a history
#- select from history with up/down keys
#- 

namespace eval search {
    namespace export search
    variable cfig
    variable v
    set cfig(swar) {{top 1} {title 2} {parent 2 par} {back 1} {case 1} {wrap 1} {regularexpression 2 regx} {writeable 3 write}}
}

# Terminate a search/replace with a motion command (search to a location)
#------------------------------------------
proc search::moveterm {w after symb} {
    variable cfig
    variable v
    set orgind [[set t $cfig(par$w)] index insert]
#puts "symb:$symb: t:$t orgind:$orgind"
    focus $t
    event generate $t $symb
    set newind [$t index insert]
#puts "  newind:$newind"
    $t mark set insert $orgind
    set cfig(until$w) $newind
    if {[$t compare $newind < $orgind]} {set cfig(back$w) 1} else {set cfig(back$w) 0}
    after idle "focus $w; $after"
}

# Search for the next occurance of text
#------------------------------------------
proc search::find {w args} {
    variable cfig
    variable v
    set t $cfig(par$w)
    set v(status$w) {Searching...}
    $w.e fnd e push
    array set cfig "replace$w 0 done$w {Not found}"
    argnorm {{back 1} {case 1} {wrap 1} {regx 2} {until 2} {replace 2} {done 2} {auto 2}} args
    foreach s {back case wrap regx until replace done} {xswitchs $s args cfig($s$w)}
    set auto [xswitchs auto args]
    set res [$t wfind $v(find$w) -back $cfig(back$w) -case $cfig(case$w) -wrap $cfig(wrap$w) -regx $cfig(regx$w) -until $cfig(until$w)]
    
    if {[llength $res] >= 2} {
        lassign $res v(beg$w) v(end$w)
        set v(status$w) {Found}
        if {$cfig(replace$w) != {} && $cfig(replace$w)} {after idle "search::replace $w -next 1 -all 1"}
    } elseif {[llength $res] == 1} {
        set v(status$w) $cfig(done$w)
        if {$auto != {}} {after idle "focus $t; after $auto {destroy $w}"}
    }
}

# Change the selected text to the replacement string
#------------------------------------------
proc search::replace {w args} {
    variable cfig
    variable v
    set t $cfig(par$w)
    if {$v(beg$w) == {}} {find $w}		;#must find first
    lassign {1 0} next all
    argnorm {{next 1} {all 1}} args
    foreach s {next all} {xswitchs $s args $s}
    $t wreplace $v(beg$w) $v(end$w) $v(replace$w)
    if {$next} {after idle "search::find $w -replace $all -done Done -auto 500 $args"}
    set v(status$w) {Replaced}
    $w.e rep e push
    return 1
}

#Make a particular button the default
#------------------------------------------
proc search::butdef {w but} {
    variable cfig
    set lst {fnd rep all}
    if {$cfig(top$w)} {lappend lst cls}
    foreach b $lst {$w.b $b configure -default normal}
    $w.b $but configure -def active
}

#Create the search window and initialize it
#------------------------------------------
proc search::search {w args} {
    variable cfig
    variable v
    
    argform {parent} args
    argnorm $cfig(swar) args
#puts "search:$w $args"
    array set cfig "top$w 1 par$w . title$w {Text Search and Replacement:} back$w 0 case$w 0 wrap$w 1 regx$w 1 until$w {} place$w 1 write$w 1"
    foreach s {title top par back case wrap regx until place write} {xswitchs $s args cfig($s$w)}

    if {![lcontain {Text Etext Entry Listbox} [set cfig(pw$w) [winfo class $cfig(par$w)]]]} {dia::err "Searching not supported on widget type: $cfig(pw$w)"; return}
    array set v "beg$w {} end$w {}"
#    $cfig(par$w) unselect
    if {$cfig(top$w)} {
        if {[winfo exists $w]} {raise $w; after idle "focus [$w.e fnd e w]"; return}
        eval toplevel $w -class Search $args
        wm transient $w $cfig(par$w)
        wm iconname $w Search
        wm title $w $cfig(title$w)
#FIXME: we should fetch last geometry from prefs module
#        if {$cfig($w:geom) != {}} {wm geometry $w $cfig($w:geom)}
    } else {
        eval wframe::_frame $w -class Search $args
    }
    
    widginit $w search ____
    
    set dcmd "wkeys::destquery .srch_dest -win $cfig(par$w) -par $w -command {search::moveterm $w {$w.b all invoke}} -title {Replace up to destination:}"
    label $w.t -text $cfig(title$w)
    mbar::mbar $w.o -gmc {-fill x -exp 1}\
        -s "dew::dew reg chk RegX: -textv search::cfig(regx$w) -help {Use regular expression matching}"\
        -s "dew::dew wra chk Wrap: -textv search::cfig(wrap$w) -help {Return to the beginning after reaching the end}"\
        -s "dew::dew bak chk Back: -textv search::cfig(back$w) -help {Search backwards through the text}"\
        -s "dew::dew cas chk Case: -textv search::cfig(case$w) -help {Consider case distinct when searching}"
    mbar::mbar $w.e -gmc {-side top -pady 4 -anchor w -fill x -exp 1}\
        -s "dew::dew fnd ent {Find: } -textv search::v(find$w) -t {-width 10} -help {The text to search for}"\
        -s "dew::dew rep ent {Replace: } -textv search::v(replace$w) -t {-width 10} -help {The text to use as a replacement}"\
        -s "dew::dew unt ent {Until: } -textv search::cfig(until$w) -width 6 -just r -t {-width 10} -b {-width 120} -help {Stop replacing at this location} -width 6 -spf {$dcmd}"\
        -s "dew::dew sta ent {Status: } -textv search::v(status$w) -t {-width 10} -state readonly -bd 0 -bg #e8e8e8"
    mbar::mbar $w.b -gmc {-side top}\
        -b "fnd {Find Next}	{search::find $w}	{Locate the next occurance of the search text}"\
        -b "rep {Replace}	{search::replace $w}	{Change the currently found occurance to the replacement text}"\
        -b "all {Replace All}	{search::replace $w -all 1}	{Change all occurances to the replacement text}"
    if {$cfig(top$w)} {
        $w.b b cls {Close} "destroy $w"	{Close this window}
        foreach i [wkeys::k_close] {bind $w $i "after idle {$w.b cls invoke}"}
    }
    pack $w.t -side top -anchor w
    pack $w.b -side right -anchor n -fill y -exp 1
    pack $w.o -side top -fill x -exp 1
    pack $w.e -side top -fill x -exp 1

    if {!$cfig(write$w)} {
        foreach wid [list "$w.e rep title" "$w.e rep entry" "$w.e unt title" "$w.e unt entry" "$w.e unt button" "$w.b rep" "$w.b all"] {
            eval $wid configure -state disabled
        }
    }

    bind [set se [$w.e fnd e w]] <Return> "$w.e fnd push; search::find $w"
    bind [set se [$w.e fnd e w]] <KP_Enter> "$w.e fnd push; search::find $w"
    bind $se <FocusIn> "search::butdef $w fnd"

    bind [set re [$w.e rep e w]] <Return> "$w.e rep push; search::replace $w"
    bind [set re [$w.e rep e w]] <KP_Enter> "$w.e rep push; search::replace $w"
    bind $re <FocusIn> "search::butdef $w rep"

    foreach i [wkeys::k_menu] {bind $re $i $dcmd}
    foreach i [wkeys::k_escape] {bind $w $i "focus $cfig(par$w)"}

    if {$cfig(top$w) && $cfig(place$w)} {dia::place $w -xo -20 -yo -10}
    focus $se
}

#Widget command
#------------------------------------------
proc search::wcmd {w cmd args} {
    if {[lcontain {replace find cget configure} $cmd]} {
        return [eval __$w $cmd $args]
    }
    error "$w: Unknown command: $cmd"
}
