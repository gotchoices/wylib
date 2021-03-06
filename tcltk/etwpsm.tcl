#Embedded Text Widgets
#This widget is a summary of the current assembly part data
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

set modloaded(etwpsm)	1
namespace eval etwpsm {
    namespace export create lout
    variable tv
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwpsm::lout {w} {
    variable tv
    
    set ret {}
    if {$tv(text$w) != {}} {
        set base $tv(text$w)
    } elseif {$::cnf(base) != {}} {
        set base $::cnf(base)
    } else {
        dia::brief "No basename available for part summary"
        return {}
    }
    lassign [mpg::one "select units,descr,spec from prd_base_v where base = '$base'" "Part base: $base"] units descr spec
    set pnum $::cnf(pnum)
    set parm {}
    if {$pnum != {}} {
        lassign [mpg::one "select base,parm from prd_part_v where pnum = '$pnum'" "Part number: $pnum"] pbase parm
        if {$pbase != $base} {dia::error "Base $base not consistent with part number: $pnum"; return {}}
    }
    
    append ret "{14p} @Font @Tbl\naformat \{@Cell B | @Cell U | @Cell D\}\n{\n"
    append ret "@Rowa B \{Part: $pnum [lout::quote ${base}($parm)]\} U \{Units:[lout::quote $units]\} D \{Description: [lout::quote $descr]\}\n} @LLP\n"

    set qlist [mpg::qlist "select pos,var,ptyp,units,descr from prd_parm where base = '$base' order by pos"]
    if {[llength $qlist] > 0} {
        append ret "@Tbl\naformat \{@Cell S | @Cell N | @Cell V | @Cell U | @Cell T | @Cell D\}\n\{\n"
    }
    set i 0; foreach rec $qlist {
        lassign $rec pos var ptyp punits pdescr
        append ret "@Rowa N \{Parameter: $pos\} V \{$var : [lout::quote [lindex [split $parm ,] $i]]\} U \{[lout::quote $punits]\} T \{Type: $ptyp\} D \{Description: [lout::quote $pdescr]\}\n"
        incr i
    }
    if {[llength $qlist] > 0} {
        append ret "\} @LP\n"
    }
    append ret "Specifications: @LLP 0.25i @Wide {} || {Courier Base} @Font @Verbatim \{$spec\} @DP\n"
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwpsm::splist {w} {
    return {}
}

#Dump the widget contents as a list
#------------------------------------------
proc etwpsm::dump {w} {
    variable tv
    return [list $tv(text$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwpsm::load {w vals} {
    variable tv
    lassign $vals tv(text$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwpsm::clear {w} {
    variable tv
    set tv(text$w) {}
}

#Insert a figure
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget
#args:	other arguments
#------------------------------------------
proc etwpsm::create {t {tag {}} args} {
    variable tv

    eval $etw::v(itag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }
    label $w.l -text {Part Summary:} -bg {violet}
    sentry::entry $w.text -width 12 -textv etwpsm::tv(text$w) -mod $ca(mod) -help {An optional basename of the part family to include a part summary for}
    pack $w.l $w.text -side left
    if {$ca(focus)} {after idle "focus $w.text"}
    eval $etw::v(end)
}

#etw::widgcmd
