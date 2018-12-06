# This widget controls the style of paragraphs
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval etwpar {
    namespace export create lout get
    variable tv
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwpar::lout {w} {
    variable tv
    if {$tv(txt$w) == {*}} {set txt @Bullet} else {set txt $tv(txt$w)}
    if {$txt != {} && $tv(lev$w) == 0} {
        dia::warn {You should not specify paragraph header text if the level is 0}
        set txt {}
    }
    return [list $tv(lev$w) $txt]
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwpar::splist {w} {
    return $w.txt
}

#Dump the widget contents as a list
#------------------------------------------
proc etwpar::get {w} {
    variable tv
    return [list $tv(lev$w) $tv(txt$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwpar::load {w vals} {
    variable tv
    lassign $vals tv(lev$w) tv(txt$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwpar::clear {w} {
    variable tv
    set tv(lev$w) 0
    set tv(txt$w) {}
}

#Insert a paragraph control widget
#------------------------------------------
proc etwpar::create {t {tag {}} args} {
    variable tv

    etw::create_itag
    etw::create_begin

    $w configure -bg violet
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg violet \
        -mb {menu P {Common functions operating on this paragraph marker}}

    $w.m menu mi help {Widget Help} -command {help::locate etwpar} -help {Instructions on using the paragraph widget}

    entry $w.lev -textv etwpar::tv(lev$w) -just r -width 1 -help {Choose a paragraph indentation level (0=normal)}
    spin::spin $w.sp -entry $w.lev -spin {int {0 3}}
    entry $w.txt -width 6 -textv etwpar::tv(txt$w) -just r -help {An optional outdented number or string to title the paragraph}
    pack $w.m $w.lev $w.sp $w.txt -side left

    if {$ca(init)} {clear $w}
    if {$ca(focus)} {after idle "focus $w.txt"}
    etw::create_end
}

#etw::widgcmd
