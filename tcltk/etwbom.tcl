# Embedded Text Widgets
# This widget is a Bill of Materials for the specified part number/name
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

set modloaded(etwbom)	1
namespace eval etwbom {
    namespace export create lout
    variable tv
    variable last_tagname {bom}
}

#Dump the widget contents in lout format
#------------------------------------------
proc etwbom::lout {w} {
    variable tv
    global cnf

    if {$cnf(pnum) != {}} {
        lassign [mpg::one "select base,parm from prd_part_v where pnum = '$cnf(pnum)'"] base parm
        set pname "${base}($parm)"
    } elseif {[regexp -- {^[0-9]+} $tv(pnm$w)]} {
        lassign [mpg::one "select base,parm from prd_part_v where pnum = '$tv(pnm$w)'"] base parm
        set pname "${base}($parm)"
    } elseif {$cnf(base) != {}} {
        lassign [mpg::one "select base,parm from prd_part_v where base = '$cnf(base)' order by base,parm limit 1"] base parm
        set pname "${base}($parm)"
    } elseif {[regexp -- {^[a-zA-Z@]:.+} $tv(pnm$w)]} {
        set pname $tv(pnm$w)
    } else {
        dia::brief "No part name available for Bill of Materials"
        return {}
    }
    set tp [lindex [split $w {.}] 1]
    set ret "@Table @Tag \{$tp.$tv(tag$w)\} "
    if {$tv(title$w) != {}} {append ret "@Caption \{[lout::quote $tv(title$w)]\}\n"}
    append ret "@Location {TryAfterLine} @OnePage {no}\n"
    set plist [spread::run .etwbom -prices $tv(prc$w) -tolevel $tv(typ$w) -partname $pname]
#puts "plist:$plist"    
    append ret "{Courier bold -3p} @Font @Tbl rulehorizontal {yes} rulevertical {yes}\n"
    append ret "aformat \{@Cell indent {right} Q | @Cell indent {right} P | @Cell N | @Cell D | @Cell ruleright {yes} C\}\n"
    append ret "\{ "
    append ret "@Rowa paint {lightgrey} ruleabove {yes} font {Helvetica Bold} Q \{Qnt\} P \{Part\} N \{Part Name\} D \{Description\} C \{Comment\}\n"
    foreach rec $plist {
        lassign $rec qnt num nam des cmt
        set qnt [string trimright [string trimright [format {%#.4f} $qnt] 0] .]
        append ret "@Rowa Q \{$qnt\} P \{$num\} N \{[lout::quote $nam]\} D \{[lout::quote $des]\} C \{[lout::quote $cmt]\}\n"
    }
    append ret "\} @LP\n"
    return $ret
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwbom::splist {w} {
    return {}
}

#Dump the widget contents as a list
#------------------------------------------
proc etwbom::dump {w} {
    variable tv
    return [list $tv(tag$w) $tv(typ$w) $tv(prc$w) $tv(pnm$w) $tv(title$w)]
}

#Load the widget contents from a list
#------------------------------------------
proc etwbom::load {w vals} {
    variable tv
    lassign $vals tv(tag$w) tv(typ$w) tv(prc$w) tv(pnm$w) tv(title$w)
}

#Initialize values in the widget
#------------------------------------------
proc etwbom::clear {w} {
    variable tv
    lassign {{One Level} none {} {}} tv(typ$w) tv(prc$w) tv(pnm$w) tv(title$w)
}

#Insert a figure
#t:	name of the text widget we're inserting into
#tag:	tag name for this instance of this embedded widget
#args:	other arguments
#------------------------------------------
proc etwbom::create {t {tag {}} args} {
    variable tv

    eval $etw::v(atag)
    eval $etw::v(begin)
    if {$ca(init)} {
        clear $w
        $t insert $ca(index) "\n"
    }
    button $w.sv -text BOM: -command "etwbom::spread $w" -padx 1 -pady 1 -bg {orange}
    help::init $w.sv {View a Bill of Materials}
    pack $w.sv -side left -expand yes -fill y

    frame $w.1; pack $w.1 -side top -fill x
    label $w.1.gt -text Tag: -width 5 -anchor e
    entry $w.1.tag -width 9 -textv etwbom::tv(tag$w) -state disabled
    help::init $w.1.tag {A unique tag name by which this table will be referred to}
    set etwbom::tv(tag$w) $tag

    label $w.1.tt -text Type:
    menubutton $w.1.typ -menu $w.1.typ.m -padx 1 -pady 1 -textv etwbom::tv(typ$w) -indic yes
    help::init $w.1.typ {Choose type type of BOM to display}
    menu $w.1.typ.m
    foreach i {{Full Depth} {1st Part} {One Level}} {
        $w.1.typ.m add command -label $i -command "set etwbom::tv(typ$w) \{$i\}; $ca(mod)"
    }
#Will force none on pricing for now
#    label $w.1.pt -text Pricing:
#    menubutton $w.1.prc -menu $w.1.prc.m -padx 1 -pady 1 -textv etwbom::tv(prc$w) -indic yes
#    help::init $w.1.prc {Choose how/whether pricing should be shown}
#    menu $w.1.prc.m
#    foreach i {none hist best worst} {
#        $w.1.prc.m add command -label $i -command "set etwbom::tv(prc$w) \{$i\}; $ca(mod)"
#    }
    
    label $w.1.nt -text Part:
    sentry::entry $w.1.pnm -width 16 -textv etwbom::tv(pnm$w) -mod $ca(mod) -help {An optional part number, basename, or partname to show the BOM for}
    pack $w.1.gt $w.1.tag $w.1.tt $w.1.typ $w.1.nt $w.1.pnm -side left

    frame $w.2; pack $w.2 -side top -fill x
    label $w.2.tl -text {Title:} -width 5 -anchor e
    sentry::entry $w.2.tit -width 60 -textv etwbom::tv(title$w) -mod $ca(mod) -help {Specify a title to be displayed with the BOM}
    pack $w.2.tl $w.2.tit -side left

    if {$ca(focus)} {after idle "focus $w.1.pnm"}
    eval $etw::v(end)
}

#etw::widgcmd
