# Establish key mappings for various widget components
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

option add *Destquery*Button.borderWidth 1 widgetDefault

namespace eval wkeys {
    namespace export movers wtext wentry
    variable cfig
    foreach {t k} {
        bc J
        ec F
        bw N
        ew V
        bl U
        el R
        bs Y
        es T
        bf O
        ef W
    } {
        set cfig(map.$t) "<Control-Alt-$k>"
        lappend cfig(keys) "<Control-Alt-$k>"
    }
}

#Keys that move the cursor in a way useful for terminating a search or spell command (eop, eot, eol, etc.)
#------------------------------------------
proc wkeys::k_move {} {return $wkeys::cfig(keys)}

#Misc key groups
#------------------------------------------
proc wkeys::k_close {}	{return {<Control-w> <Control-Alt-C>}}		;#close dialog
proc wkeys::k_escape {}	{return {<Escape> <Control-bracketleft>}}	;#escapes
#proc wkeys::k_menu {}	{return {<Control-Alt-M> <Button-3>}}		;#special function menu
proc wkeys::k_menu {}	{return {<Control-m> <Button-3>}}		;#special function menu

#Text key definitions
#------------------------------------------
proc wkeys::wtext {} {

    bind Text <<SelAll>>	{%W tag add sel 0.0 end}
    bind Text <<Undo>>	{wtext::undo %W}
    bind Text <<Redo>> 	{wtext::undo %W redo}
#    bind Text <<Cut>>	{wtext::cut %W}
    bind Text <<Paste>>	{tk_textPaste %W}

    foreach {k c} {
        {c} {tk_textCopy %W}
        {f} {wtext::find %W}
        {j} {tk::TextSetCursor %W insert-1c; %W xview scroll -1 units}
        {k} {wtext::up %W; %W yview scroll -1 units}
        {o} {}
        {p} {%W print}
        {v} {wtext::paste %W}
        {x} {tk_textCut %W}
        {z} {wtext::undo %W}
        {asciicircum}	{}
        {ampersand}	{}
        {slash}		{}
        {backslash}	{}
    } {bind Text <Control-$k> $c}

    foreach {k c} {
        {A} {}
        {B} {wtext::yank %W}
        {C} {}
        {D} {wtext::down %W}
        {E} {wtext::killline %W}
        {F} {tk::TextSetCursor %W insert+1c}
        {G} {event generate %W <Delete>}
        {H} {event generate %W <BackSpace>}
        {I} {wtext::killline %W 1}
        {J} {tk::TextSetCursor %W insert-1c}
        {K} {wtext::up %W}
        {L} {wtext::kill %W}
        {M} {}
        {N} {wtext::bow %W}
        {O} {wtext::bof %W}
        {P} {}
        {Q} {}
        {R} {wtext::eol %W}
        {S} {wtext::find %W}
        {T} {wtext::eop %W}
        {U} {wtext::bol %W}
        {V} {wtext::eow %W}
        {W} {wtext::eof %W}
        {X} {}
        {Y} {wtext::bop %W}
        {Z} {wtext::undo %W}
        {at} {wtext::littop .lit[translit . _ %W] -par %W}
        {asciicircum}	{wtext::jump %W}
        {ampersand}	{wtext::jump %W -byte 1}
        {question}	{wtext::redo %W}
        {bar}		{puts unbound-1}
        {asciitilde}	{puts unbound-2}
        {exclam}	{puts unbound-3}
        {numbersign}	{puts unbound-4}
        {asterisk}	{puts unbound-5}
        {parenleft}	{puts unbound-6}
        {parenright}	{puts unbound-7}
        {underscore}	{puts unbound-8}
        {plus}		{puts unbound-9}
        {bracketleft}	{puts unbound-10}
        {bracketright}	{puts unbound-11}
        {semicolon}	{puts unbound-12}
        {quoteright}	{puts unbound-13}
        {less}		{puts unbound-14}
        {greater}	{puts unbound-15}
        {space}		{puts unbound-16}
    } {bind Text <Control-Alt-$k> $c}
}

#Entry key definitions
#------------------------------------------
proc wkeys::wentry {} {

#    bind Entry <Shift-Tab> {tk_focusPrev %W}	;#doesn't work
    bind Entry <<SelAll>>	{%W selection range 0 end}
#    bind Entry <<Undo>>	{wentry::undo %W}
#    bind Entry <<Redo>> 	{wentry::undo %W redo}

    foreach {k c} {
        {f} {wentry::find %W}
        {p} {%W print}
        {s} {spell::spell %W}
    } {bind Entry <Control-$k> $c}
    
    foreach {k c} {
        {A} {}
        {B} {puts [selection get -displayof %W -selection CLIPBOARD]}
        {C} {}
        {D} {wentry::next %W}
        {E} {%W tag add sel "insert linestart" "insert lineend + 1c"; event generate %W <<Cut>>}
        {F} {tkEntrySetCursor %W [expr {[%W index insert] + 1}]}
        {G} {event generate %W <Delete>}
        {H} {event generate %W <BackSpace>}
        {I} {}
        {J} {tkEntrySetCursor %W [expr {[%W index insert] - 1}]}
        {K} {wentry::prev %W}
        {L} {wentry::kill %W}
        {M} {}
        {N} {wentry::bow %W}
        {O} {wentry::first %W}
        {P} {}
        {Q} {}
        {R} {tkEntrySetCursor %W end}
        {S} {wentry::find %W}
        {T} {wentry::eop %W}
        {U} {tkEntrySetCursor %W 0}
        {V} {wentry::eow %W}
        {W} {wentry::last %W}
        {X} {}
        {Y} {wentry::bop %W}
        {Z} {wentry::undo %W}
        {at} {wentry::littop .lit[translit . _ %W] -par %W}
        {asciicircum} {wentry::jump %W}
        {ampersand} {wentry::jump %W -byte 1}
        {slash}	{}
        {backslash}	{}
    } {bind Entry <Control-Alt-$k> $c}
}

#Create a toplevel window to ask about a move destination
#------------------------------------------
proc wkeys::destquery {w args} {
    variable cfig
    variable v

    argform {win par} args
    argnorm {{top 1} {title 2} {parent 2 par} {window 2 win} {command 3 cmd}} args
    array set cfig "top$w 1 par$w {} title$w {Destination:} place$w 1 win$w . cmd$w {}"
    foreach s {title top par place win cmd} {xswitchs $s args cfig($s$w)}
    if {$cfig(par$w) == {}} {set cfig(par$w) $cfig(win$w)}

    if {![lcontain {Text Etext Entry} [set v(c$w) [winfo class $cfig(win$w)]]]} {dia::err "Destination query not supported on widget type: $v(c$w)"; return}
    array set v "beg$w {} end$w {}"
    $cfig(win$w) unselect
    if {$cfig(top$w)} {
        if {[winfo exists $w]} {raise $w; return}
        eval toplevel $w -class Destquery $args
        wm transient $w $cfig(par$w)
        wm iconname $w Destination
        wm title $w $cfig(title$w)
    } else {
        eval wframe::_frame $w -class Destquery $args
    }
    
    widginit $w destination ____
    
    label $w.t -text $cfig(title$w)
    grid $w.t -columnspan 3 -sticky w
    
    foreach {title tag} {Character c Word w Line l Screen s File f} {
        label $w.${tag}t -text $title:
        button $w.${tag}b -text Beginning	-command "$cfig(cmd$w) $cfig(map.b$tag); after idle {destroy $w}" -help {Move to the beginning of the current(or previous) $title}
        button $w.${tag}e -text End		-command "$cfig(cmd$w) $cfig(map.e$tag); after idle {destroy $w}" -help {Move to the end of the current (or next) $title}
        grid $w.${tag}t $w.${tag}b $w.${tag}e
    }
    button $w.cls {Cancel} "destroy $w"	{Close this window} -def active
    grid $w.cls -columnspan 3 -sticky ew

    foreach i [wkeys::k_move] {
        bind $w $i "$cfig(cmd$w) $i; after idle {destroy $w}"
    }
    
    bind $w <Return> "after idle <destroy $w>"
    bind $w <KP_Enter> "after idle <destroy $w>"
    if {$cfig(place$w)} {dia::place $w -xo -40 -yo -20}
    focus $w
}
