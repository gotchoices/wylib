# Embedded Text Widgets
# A comment that does not affect the formatted text in any way
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval etwcmt {
    namespace export create lout get
    variable v
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwcmt::lout {w} {
    return {}		    ;#Comment - do nothing
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwcmt::splist {w} {
    return $w.e
}

#Dump the widget contents as a list
#------------------------------------------
proc etwcmt::get {w} {
    variable v
    return [list $v(text$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwcmt::load {w vals} {
    variable v
    lassign $vals v(text$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwcmt::clear {w} {
    variable v
}

#Edit the comment value in a full window
#------------------------------------------
proc etwcmt::edit {w} {
    variable v
    edwin::edwin .edit_etwcmt -dest $w.e -wrap word
}

#Insert a comment
#------------------------------------------
proc etwcmt::create {t {tag {}} args} {
    variable v

    etw::create_itag
    etw::create_begin

    $w configure -bg brown
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg brown \
        -mb {menu Comment {Common functions operating on this comment widget}}

    $w.m menu mi edit {Edit Window} -command "etwcmt::edit $w" -help {View and/or edit the comments in a larger window}
    $w.m menu mi help {Widget Help} -command {help::locate etwcmt} -help {Instructions on using the comment widget}

    entry $w.e -width 60 -textv etwcmt::v(text$w) -help {Enter a comment which can be viewed in this editor but will not show up in the printed document}
    bind $w.e <Button-3> "etwcmt::edit $w"
    pack $w.m $w.e -side left

    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }
    if {$ca(focus)} {after idle "focus $w.e"}
    etw::create_end
}

#etw::widgcmd
#puts "cmt:[info body etwcmt::widgcmd]"
