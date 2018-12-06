#Special formatting command
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval etwfmt {
    namespace export create lout
    variable v
    variable last_fmtname {}
}

#Dump the widget contents in lout format
#w:	widget name
#------------------------------------------
proc etwfmt::lout {w} {
    variable v
    switch -glob $v(cmd$w) {
        {New*} {return "\n@NP\n"}
        {Cop*} {return {{}@CopyRight{}}}
        {Tra*} {return {{}@TradeMark{}}}
        {Deg*} {return {{}@Degree{}}}
        {Min*} {return {{}@Minute{}}}
        {Sec*} {return {{}@Second{}}}
        default {return {}}
    }
}

#Return the command (used because New Page 
#------------------------------------------
proc etwfmt::getcmd {w} {
   variable v
   return $v(cmd$w)
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwfmt::splist {w} {
    return {}
}

#Dump the widget contents as a list
#w:	widget name
#------------------------------------------
proc etwfmt::get {w} {
    variable v
    return [list $v(cmd$w)]
}

#Load the widget contents from a list
#w:	widget name
#------------------------------------------
proc etwfmt::load {w vals} {
    variable v
    lassign $vals v(cmd$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwfmt::clear {w} {
    variable v
    set v(cmd$w) {New Page}
}

#Insert a figure
#------------------------------------------
proc etwfmt::create {t {tag {}} args} {
    variable v

    etw::create_itag
    etw::create_begin

    menubutton $w.cmd -menu $w.cmd.m -padx 1 -pady 1 -textv etwfmt::v(cmd$w) -indic yes -bg {Forest Green} -help {Choose a special formatting command}
    menu $w.cmd.m
    foreach i {{New Page} {Copyright} {Trademark} {Degree} {Minute} {Second}} {
        $w.cmd.m add command -label $i -command "set etwfmt::v(cmd$w) {$i}"
    }
    pack $w.cmd -side left

    if {$ca(init)} {clear $w}
    etw::create_end
}

#etw::widgcmd
