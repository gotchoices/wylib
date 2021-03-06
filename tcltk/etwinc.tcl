#Embedded Text Widgets
#This widget is an included file
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

set modloaded(etwinc)	1
namespace eval etwinc {
    namespace export create lout
    variable tv
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwinc::splist {w} {
    return {}
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwinc::lout {w} {
    variable tv

    set fmt [pdoc::fetch [list $tv(bname$w) $tv(type$w) $tv(class$w) $tv(annot$w)] inc fname]
    if {$fmt == {noedit}} {
        return [translate $fname -file yes]
    } elseif {$fmt == {txt}} {
        return [read_file $fname]
    }
    return {}
}

#Dump the widget contents as a list
#w:	widget name
#------------------------------------------
proc etwinc::dump {w} {
    variable tv
    return [list $tv(bname$w) $tv(type$w) $tv(class$w) $tv(annot$w) $tv(fmt$w)]
}

#Load the widget contents from a list
#w:	widget name
#------------------------------------------
proc etwinc::load {w vals} {
    variable tv

    lassign $vals tv(bname$w) tv(type$w) tv(class$w) tv(annot$w) tv(fmt$w)
    if {$tv(class$w) == {}} {	;#special handling for old format 1 files
        set tv(annot$w) $tv(bname$w)
        set tv(bname$w) {generic}
        set tv(type$w) {notes}
        set tv(class$w) $::cnf(ntype)
        set tv(fmt$w) {noedit}
    }
}

#View a file
#------------------------------------------
proc etwinc::view {w} {
    variable tv
    set fmt [pdoc::fetch [list $tv(bname$w) $tv(type$w) $tv(class$w) $tv(annot$w)] view fname]
    if {$fmt == {}} {return {}}
#puts "exec /ati/bin/noedit $fname &"
    exec /ati/bin/noedit $fname &
}

#Initialize values in the widget
#------------------------------------------
proc etwinc::clear {w} {
    variable tv
    set tv(bname$w)	{generic}
    set tv(type$w)	{notes}
    set tv(class$w)	$::cnf(ntype)
    set tv(fmt$w)	{noedit}
    set tv(annot$w)	{}
}

#Insert a file inclusion
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget (an integer)
#args:	other arguments
#------------------------------------------
proc etwinc::create {t {tag {}} args} {
    variable tv

    eval $etw::v(itag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }
    button $w.b -text {Include:} -command "etwinc::view $w" -bg brown -pady 1
    help::init $w.b {View the notes specified for inclusion}
    label $w.bl -text {Base:}
    sentry::entry $w.be -width 12 -textv etwinc::tv(bname$w) -mod $ca(mod) -help {The basename the file is associated with}
    label $w.cl -text {Class:}
    menubutton $w.cb -menu $w.cb.m -padx 1 -pady 1 -textv etwinc::tv(class$w) -indic yes
    help::init $w.cb {The class the file is associated with}
    menu $w.cb.m
    foreach i {assy inst oper rang sale ship revi} {
        $w.cb.m add command -label $i -command "set etwinc::tv(class$w) $i; $ca(mod)"
    }
    label $w.fl -text {Format:}
    menubutton $w.fb -menu $w.fb.m -padx 1 -pady 1 -textv etwinc::tv(fmt$w) -indic yes
    help::init $w.fb {The format of the file}
    menu $w.fb.m
    foreach i {noedit txt} {
        $w.fb.m add command -label $i -command "set etwinc::tv(fmt$w) $i; $ca(mod)"
    }
    sentry::entry $w.ae -width 20 -textv etwinc::tv(annot$w) -mod $ca(mod) -help {The annotation of the file}
    pack $w.b $w.bl $w.be $w.cl $w.cb $w.fl $w.fb $w.ae -side left -anchor s
    if {$ca(focus)} {after idle "focus $w.ae"}
    eval $etw::v(end)
}

#etw::widgcmd
