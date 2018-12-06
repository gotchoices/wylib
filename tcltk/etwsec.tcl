#Embedded Text Widgets
#This widget is a section header
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

set modloaded(etwsec)	1
namespace eval etwsec {
    namespace export create lout
    variable tv
    variable last_tagname {}
    variable insection 0
}

#Dump the widget contents in lout format
#w:	widget name - w={} means to output any post cleanup code
#------------------------------------------
proc etwsec::lout {w} {
    variable tv
    variable insection			;#the section we are in now

    set tp [lindex [split $w {.}] 1]	;#(pseudo)window name
    proc subs {level} {
        switch -- $level {
            1	{return {}}
            2	{return {Sub}}
            3	{return {SubSub}}
        }
    }    
    set ret {}				;#return value
    if {$w == {}} {			;#if doing post cleanup
        if {[string range $tp 0 2] == {sub}} {	;#if in a subfile
            set lev 1			;#popping to level 1
        } else {
            set lev 0			;#popping to level 0
        }
    } else {
        set lev $tv(level$w)		;#else go to desired level
    }
    if {$lev < $insection} {			;#if we must pop
#puts "$w: POP $lev"
        for {set in $insection} {$in > $lev} {incr in -1} {	;#pop each level
            append ret "@End @[subs $in]Section\n"
            append ret "@End[subs $in]Sections\n"
        }
        if {$lev > 0} {append ret "@End @[subs $lev]Section\n"}
    } elseif {$lev == $insection} {
#puts "$w: EQU $lev"
        if {$lev > 0} {append ret "@End @[subs $lev]Section\n"}

    } elseif {$lev == [expr $insection + 1]} {	;#if pushing
#puts "$w: PUSH $lev"
        append ret "@Begin[subs $lev]Sections\n"

    } else {
        dia::error "Section level: $lev found in section of level $insection"
        return {}
    }
    if {$lev > 0} {append ret "@[subs $lev]Section @Tag \{$tp.$tv(tag$w)\} @Title \{[lout::quote $tv(title$w)]\} @Begin @LLP\n"}
    set insection $lev
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwsec::splist {w} {
    return $w.tit
}

#Dump the widget contents as a list
#------------------------------------------
proc etwsec::dump {w} {
    variable tv
    return [list $tv(level$w) $tv(title$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwsec::load {w vals} {
    variable tv
    set tv(tag$w) [lrange [split $w {:}] end end]
#puts "tag:$tv(tag$w)"
    lassign $vals tv(level$w) tv(title$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwsec::clear {w} {
    variable tv
    set tv(level$w) 1
    set tv(title$w) {}
}

#Insert a section header
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget
#args:	other arguments
#------------------------------------------
proc etwsec::create {t {tag {}} args} {
    variable tv

#    set otag $tag
#    for {set x 1} {[winfo exists $t.sec:$tag]} {incr x} {set tag ${tag}$x}
#    while {[winfo exists $t.sec:$tag]} {
#        if {[dia::query "Tag name: $otag already exists in the document" tag 0 Cancel {Rename New Instance to Tag Shown}] <= 0} {return 0}
#    }
    eval $etw::v(atag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }
    label $w.sl -text {Section:} -bg red
    entry $w.tag -width 8 -textv etwsec::tv(tag$w) -state disabled
    help::init $w.tag {A unique tagname by which this section will be referred to}
    set etwsec::tv(tag$w) $tag
    menubutton $w.vb -text Level: -menu $w.vb.m -padx 1 -pady 1 -indic yes
    help::init $w.vb "Section level:\n  1 = section\n  2 = sub-section\n  3 = sub-sub-section"
    menu $w.vb.m
    foreach i {1 2 3} {$w.vb.m add command -label "Level $i" -command "set etwsec::tv(level$w) $i; $ca(mod)"}
    sentry::entry $w.lev -width 2 -textv etwsec::tv(level$w) -mod $ca(mod)
    label $w.tl -text {Title:}
    sentry::entry $w.tit -width 60 -textv etwsec::tv(title$w) -mod $ca(mod) -help {Title for this section}
    pack $w.sl $w.tag $w.vb $w.lev $w.tl $w.tit -side left
    if {$ca(focus)} {after idle "focus $w.tit"}
    eval $etw::v(end)
}

#etw::widgcmd
