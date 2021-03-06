#This widget is a cross-reference
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval etwref {
    namespace export create lout get
    variable tv
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwref::lout {w} {
    variable tv
    
    set tp [lindex [split $w {.}] 1]
    return "{@NumberOf $tp.$tv(ptr$w)}"
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwref::splist {w} {
    return {}
}

#Dump the widget contents as a list
#------------------------------------------
proc etwref::get {w} {
    variable tv
    return [list $tv(ptr$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwref::load {w vals} {
    variable tv
    lassign $vals tv(ptr$w)
}

#Find the widget this reference points to
#------------------------------------------
proc etwref::seek {w} {
    variable tv

    set t [join [lreplace [split [lindex [split $w :] 0] .] end end] .]
#puts "w:$w t:$t"
    set children [$t window names]
    foreach ch $children {
        if {[regexp ":$tv(ptr$w)\$" $ch]} {
#puts "found:$ch index:[$t index $ch]"
            set idx [$t index $ch]
            $t see $idx
            $t mark set insert $idx
            $ch configure -bd 10
            update
            after 1000 "$ch configure -bd 1"
        }
    }
}

#Initialize values in the widget
#------------------------------------------
proc etwref::clear {w} {
    variable tv
    set tv(ptr$w) {}
}

#Insert a reference
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget
#args:	other arguments
#------------------------------------------
proc etwref::create {t {tag {}} args} {
    variable tv

    etw::create_itag
    etw::create_begin

    $w configure -bg yellow
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg yellow \
        -mb {menu Ref {Common functions operating on this reference}}

    $w.m menu mi seek {Locate Reference} -command "etwref::seek $w" -help {Locate the item this reference refers to}
    $w.m menu mi help {Widget Help} -command {help::locate etwref} -help {Instructions on using the reference widget}

    entry $w.ptr -width 12 -textv etwref::tv(ptr$w) -help {The tag name of the item this reference refers to}
    pack $w.m $w.ptr -side left

    if {$ca(init)} {clear $w}
    if {$ca(focus)} {after idle "focus $w.ptr"}
    etw::create_end
}

#etw::widgcmd
