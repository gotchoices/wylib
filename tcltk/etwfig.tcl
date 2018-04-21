# Embedded Text Widgets
# This widget is a figure
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- build postscript version of figures on the fly (build)
#- 

set modloaded(etwfig)	1
namespace eval etwfig {
    namespace export create lout
    variable tv
    variable last_tagname {}
#    variable postprint	{}		;#list of figures to print after
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwfig::lout {w} {
    variable tv

    set ret {}    
    if {$tv(bname$w) == {}} {return $ret}

#Old style burnout references (can we remove these lines yet?)
    if {$tv(type$w) == {cam} && [string is integer -strict $tv(bname$w)]} {
        return "@DP Insert figure here for burnout: $tv(bname$w) @LLP\n"
    }
    
    set fname [pdoc::build_ps [list $tv(bname$w) $tv(type$w) $tv(class$w) $tv(annot$w)]]
#Old support for figs to print at end of document
#    if {$tv(ori$w) == {PostPrint}} {
#        set fp [open $fname a]; puts $fp {showpage}; close $fp
#        lappend etwfig::postprint $fname; 
#        return $ret
#    }
    if {$tv(ori$w) == {Native}} {append ret "@NP\n"}
    append ret "@Figure "
    if {$tv(tag$w) != {}} {
        set tp [lindex [split $w {.}] 1]
        append ret "@Tag \{$tp.$tv(tag$w)\}\n"
    }
    if {$tv(ori$w) == {Native}} {
        append ret "@Location {Raw}\n"
        append ret "@FullFigure @Tag {$tp.$tv(tag$w)} {\"$fname\"}\n@NP\n"
        return $ret
    }
    if {$tv(title$w) != {}} {
        append ret "@Caption \{[lout::quote $tv(title$w)]\}\n"
    }
    append ret "@Location {TryAfterLine}\n\{ "
    if {$tv(szl$w) == {Width:} && $tv(size$w) != {}} {
        if {![regexp -- {^[0-9.]+[icp]$} $tv(size$w)]} {dia::error "Illegal size in figure: $tv(tag$w)"}
        append ret "$tv(size$w) @Wide @Scale "
    } elseif {$tv(size$w) != {}} {
        if {![regexp -- {^[0-9.]+$} $tv(size$w)]} {dia::error "Illegal scale in figure: $tv(tag$w)"}
        append ret "$tv(size$w) @Scale "
    }
    if {$tv(ori$w) == {Landscape}} {
        append ret "-90d @Rotate "
    } elseif {$tv(ori$w) == {Seascape}} {
        append ret "90d @Rotate "
    }
    append ret "@IncludeGraphic \{ \"$fname\" \} \}\n@LLP\n"
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwfig::splist {w} {
    return $w.3.tit
}

#Dump the widget contents as a list
#------------------------------------------
proc etwfig::dump {w} {
    variable tv
    return [list $tv(bname$w) $tv(szl$w) $tv(size$w) $tv(ori$w) $tv(title$w) $tv(class$w) $tv(annot$w) $tv(type$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwfig::load {w vals} {
    variable tv

    set tv(tag$w) [lrange [split $w {:}] end end]
    lassign $vals tv(bname$w) tv(szl$w) tv(size$w) tv(ori$w) tv(title$w) tv(class$w) tv(annot$w) tv(type$w)
#special handler for old files
    if {$tv(type$w) == {}} {
        if {$tv(class$w) == {burn}} {
            set tv(type$w) {cam}
            set tv(class$w) $::cnf(ntype)
        } else {
            set tv(type$w) {fig}
        }
    } elseif {$tv(type$w) == {burn}} {
        set tv(type$w) {cam}
    }
}

#View a figure
#------------------------------------------
proc etwfig::view {w} {
    variable tv
    pdoc::edit [list $tv(bname$w) $tv(type$w) $tv(class$w) $tv(annot$w)] -ro 1
}

#Initialize values in the widget
#------------------------------------------
proc etwfig::clear {w} {
    variable tv
    set tv(bname$w)	{}
    set tv(class$w)	{assy}
    set tv(type$w)	{fig}
    set tv(annot$w)	{}
    set tv(szl$w)	{Width:}
    set tv(title$w)	{}
}

#Insert a figure
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget
#args:	other arguments
#------------------------------------------
proc etwfig::create {t {tag {}} args} {
    variable tv

    eval $etw::v(atag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }

    button $w.fv -text Figure: -command "etwfig::view $w" -padx 1 -pady 1 -bg {light blue}
    help::init $w.fv {View the figure}
    pack $w.fv -side left -expand yes -fill y
    
    frame $w.1; pack $w.1 -side top -fill x
    label $w.1.bt -text Base: -width 5 -anchor e
    sentry::entry $w.1.bname -width 12 -textv etwfig::tv(bname$w) -mod $ca(mod) -help {The basename this figure is associated with}
    label $w.1.tt -text Type:
    menubutton $w.1.type -menu $w.1.type.m -padx 1 -pady 1 -textv etwfig::tv(type$w) -indic yes
    help::init $w.1.type {Choose regular figure or CAM drawing}
    menu $w.1.type.m
    foreach i {fig cam} {
        $w.1.type.m add command -label $i -command "set etwfig::tv(type$w) $i; $ca(mod)"
    }
    label $w.1.ct -text Class:
    menubutton $w.1.class -menu $w.1.class.m -padx 1 -pady 1 -textv etwfig::tv(class$w) -indic yes
    help::init $w.1.class {The class this figure belongs to}
    menu $w.1.class.m
    foreach i {assy inst oper rang sale ship revi} {
        $w.1.class.m add command -label $i -command "set etwfig::tv(class$w) $i; $ca(mod)"
    }
    label $w.1.at -text View:
    sentry::entry $w.1.annot -width 20 -textv etwfig::tv(annot$w) -mod $ca(mod) -help {The view or annotation of the figure}
    pack $w.1.bt $w.1.bname $w.1.tt $w.1.type $w.1.ct $w.1.class $w.1.at $w.1.annot -side left
    
    frame $w.2; pack $w.2 -side top -fill x
    label $w.2.tt -text Tag: -width 5 -anchor e
    sentry::entry $w.2.tag -width 12 -textv etwfig::tv(tag$w) -state disabled -mod $ca(mod) -help {The unique tag this figure will be referenced by}
    set etwfig::tv(tag$w) $tag
    
    menubutton $w.2.szl -menu $w.2.szl.m -padx 1 -pady 1 -textv etwfig::tv(szl$w) -indic yes
    help::init $w.2.szl {Choose whether size will be specified by an explicit width or by scaling of the original}
    menu $w.2.szl.m
    $w.2.szl.m add command -label {Width} -command "set etwfig::tv(szl$w) Width:; $ca(mod)"
    $w.2.szl.m add command -label {Scale} -command "set etwfig::tv(szl$w) Scale:; $ca(mod)"
    sentry::entry $w.2.size -width 6 -textv etwfig::tv(size$w) -mod $ca(mod) -help "Specify a width (5i means five inches) or a scale (0-100)"
    menubutton $w.2.ori -text {Portrait} -menu $w.2.ori.m -padx 1 -pady 1 -textv etwfig::tv(ori$w) -indic yes
    help::init $w.2.ori {Specify the figure orientation}
    menu $w.2.ori.m
    $w.2.ori.m add command -label {Portrait}  -command "set etwfig::tv(ori$w) Portrait; $ca(mod)"
    $w.2.ori.m add command -label {Landscape} -command "set etwfig::tv(ori$w) Landscape; $ca(mod)"
    $w.2.ori.m add command -label {Seascape}  -command "set etwfig::tv(ori$w) Seascape; $ca(mod)"
    $w.2.ori.m add separator
    $w.2.ori.m add command -label {Native} -command "set etwfig::tv(ori$w) Native; $ca(mod)"
    pack $w.2.tt $w.2.tag $w.2.szl $w.2.size $w.2.ori -side left

    frame $w.3; pack $w.3 -side top -fill x
    label $w.3.tl -text {Title:} -width 5 -anchor e
    sentry::entry $w.3.tit -width 60 -textv etwfig::tv(title$w) -mod $ca(mod) -help {Specify a title to be posted with the figure}
    pack $w.3.tl $w.3.tit -side left
    if {$ca(focus)} {after idle "focus $w.3.tit"}
    eval $etw::v(end)
}

#etw::widgcmd
