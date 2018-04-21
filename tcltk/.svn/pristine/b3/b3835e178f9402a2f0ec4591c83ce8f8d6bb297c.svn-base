#Embedded Text Widgets
#This widget is a quality control check
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

set modloaded(etwqcc)	1
namespace eval etwqcc {
    namespace export create lout
    variable tv
    variable insection 0		;#are we in a qcc section now?
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwqcc::lout {w} {
    variable tv
    variable insection
    
    set ret {}
    if {$w == {}} {		;#if this is a cleanup call
        if {$insection} {set ret "\} @DP\n"}
        set insection 0
    } else {
        if {!$insection} {set ret "@LLP @CNP @Tbl\naformat {@Cell @CheckLine | @Cell S} \{\n"}
        append ret "@Rowa S \{[lout::quote $tv(text$w)]\}\n"
        set insection 1
    }
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwqcc::splist {w} {
    return $w.e
}

#Dump the widget contents as a list
#------------------------------------------
proc etwqcc::dump {w} {
    variable tv
    return [list $tv(text$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwqcc::load {w vals} {
    variable tv
    lassign $vals tv(text$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwqcc::clear {w} {
    variable tv
    set tv(text$w) {}
}

#Insert a QC check
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget (an integer)
#args:	other arguments
#------------------------------------------
proc etwqcc::create {t {tag {}} args} {
    variable tv

    eval $etw::v(itag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }
    button $w.b -text {QC Check:} -command "edwin::edwin .edit_${_prefix}_$tag -entry $w.e -mod set_modif" -padx 1 -pady 1 -bg {light green}
    help::init $w.b {View the text in an editing window}
    sentry::entry $w.e -width 60 -textv etwqcc::tv(text$w) -mod $ca(mod) -help {The text of the Quality Control criterion}
    bind $w.e <Button-3> "$w.b invoke"
    pack $w.b $w.e -side left
    if {$ca(focus)} {after idle "focus $w.e"}
    eval $etw::v(end)
}

#etw::widgcmd
