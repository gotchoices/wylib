# Display multiple editable data entry fields in a single widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- strip out of dbe the parts we need for the view part
#X- Better scroll bars in mle
#X- change array subscripting to tag$w (from $w:tag)
#X- How to align columns in mdew?
#X- set method
#X- get method
#X- implement modified support
#- remove "entry" widget command?
#- see FIXME below
#- should we use the -format switch for something?

option add *Mdew.relief raised widgetDefault
option add *Mdew.borderWidth 1 widgetDefault
option add *Mdew.Button.background CadetBlue widgetDefault
option add *Mdew.Button.height 1 widgetDefault
option add *Mdew.Button.borderWidth 1 widgetDefault

namespace eval mdew {
    namespace export mdew
    variable cfig		;#config values for each widget
    variable v

    image create bitmap emp -data "#define emp_width 12\n#define emp_height 6\nstatic unsigned char emp_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};"

    set cfig(gman) grid		;#default geometry manager
    set cfig(gmc.pack)		{pack %w -side left}		;#pack command
    set cfig(sargs.pack)	{{-in [s_add %p %a]}}		;#and its arguments
#    set cfig(gmc.grid) 		{grid %w -sticky w -in [s_add %p f]}
    set cfig(gmc.grid) 		{grid %w -sticky w}
#    set cfig(sargs.grid)	{{-column %a} {-row %a} {-columnspan %a} {-rowspan %a} {-in %p.%a}}
    set cfig(sargs.grid)	{{-column %a} {-row %a} {-columnspan %a} {-rowspan %a}}
    set cfig(gmc.place)		{place %w} 
    set cfig(sargs.place)	{{-x %a} {-y %a} {-relx %a} {-rely %a} {-in %p.%a}}

    set cfig(swar) {{field 1 f} {focus 2} {subframe 1 s} {initialize 2 init} {bind 2}}
    set cfig(args) {focus init bind}
    set cfig(fshort) {style size sub title help}	;#must agree with dbe.tcl

    variable tpt	    ;#Default field templates
    set tpt(zip) {{{} {[0-9][0-9][0-9][0-9][0-9]} {[0-9][0-9][0-9][0-9][0-9][- ][0-9][0-9][0-9][0-9]}} {##### or #####-####} {{country USA} {country {}}}}
    set tpt(phone) {{{} {[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]} {[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]x[0-9]+}} {###-###-#### or ###-###-####x###} {{country USA} {country {}}}}
    set tpt(state) {{{} {[A-Z][A-Z]}} {XX (2 Capital Letters)} {{country USA} {country {}}}}
    set tpt(email) {{{} {[0-9a-zA-Z._~-]+@[0-9a-zA-z._-]+}} name@domain}
    set tpt(date) {{{} {([12][0-9][0-9][0-9])[- ]([Jj]an|[Ff]eb|[Mm]ar|[Aa]pr|[Mm]ay|[Jj]un|[Jj]ul|[Aa]ug|[Ss]ep|[Oo]ct|[Nn]ov|[Dd]ec|[0-9][0-9]|[0-9])[- ]([0-9][0-9]|[0-9])}} YYYY-Mmm-dd}
    set tpt(dollar) {{^[-]*[0-9]+\\.[0-9][0-9]$} ####.##}
}

#Anytime the widget main frame is configured, reconfigure the inner component sizes (only for gridded mdew's)
#--------------------------------
proc mdew::fconfig {w} {
    variable cfig
#puts "Configure: $w gmc:$cfig(gman$w)"

    proc children {f} {
        set clist {}
        foreach c [winfo children $f] {
            if {[lcontain {Dew Cdew} [winfo class $c]]} {
                lappend clist $c
            } elseif {[winfo class $c] == {Frame}} {
                eval lappend clist [children $c]
            }
        }
        return $clist
    }

    foreach f [children $w] {
        set targs [::grid info $f]
#puts "f:$f targs:$targs"
        if {[set column [xswitchs column targs]] == {}} continue
        set len [string length [$f cget -title]]
#puts " col:$column len:$len"
	lappend wnames($column) $f
        if {![info exists max($column)] || $len > $max($column)} {
            set max($column) $len
        }
    }
    foreach {col width} [array get max] {
#puts "  col:$col width:$width"
        foreach f $wnames($col) {$f title configure -width $width}
    }
}

#Reset all fields to their default values
#------------------------------------------
proc mdew::initialize {w} {
    variable cfig
    variable v
    set b [ww::modblock 1]
    if {[info exists cfig(init$w)]} {		;#if upper level initial value given
#puts "mdew Init w:$w $cfig(init$w)"
        eval setvals $w $cfig(init$w)		;#write it in
    } else {
#puts "mdew Init w:$w each $cfig(tags$w)"
        foreach tag $cfig(tags$w) {$w field $tag initialize}	;#else ask each cell to init
    }
    if {$cfig(focus$w) != {}} {after idle "catch {focus [$w field $cfig(focus$w) w]}"}
#puts "blocked:$ww::modblocked"
    modified $w 0
    ww::modblock $b
    ww::modgen $w 0		;#force a clean event
}

# Set/clear/query modified status
#------------------------------------------
proc mdew::modified {w {setclr {}} {gen 1}} {
    variable cfig
    variable v

    if {$setclr != {}} {		;#set or clear 'modified' state
        foreach tag $cfig(tags$w) {$w field $tag modified $setclr $gen}	;#send to each child
        return $setclr
    }
    foreach tag $cfig(tags$w) {if {[$w field $tag modified]} {return 1}}	;#if any child is modified then we are
    return 0				;#otherwise, we are clean
}

# Check all (or some) fields against their validity templates
#------------------------------------------
proc mdew::check {w args} {
    variable cfig

    argform {fields} args
    argnorm {{report 1} {fields 1}} args
    set fields [xswitchs fields args]
    set report 0
    xswitchs report args report
    if {$fields == {}} {set fields $cfig(tags$w)}
    foreach tag $fields {
        if {[fcheck $w $tag example]} continue
        if {$report} {
            if {$example != {}} {set example "\nValue should be like: $example"}
            dia::err "Illegal value in field: [$w field $tag cget -title]=[$w field $tag get] $example"
        }
        return 0
    }
    return 1
}

# Check a field against a validity template
#------------------------------------------
# Return 1 if the value fits its template
proc mdew::fcheck {w tag {helpvnam {}}} {
    variable cfig; variable tpt
    if {$helpvnam != {}} {upvar $helpvnam example}

    proc deps_met {w fnam dep} {	;#need to check templates on this field?
        if {$dep == {}} {return 1}
        foreach k $dep {		;#for each dependency
            lassign $k tag val
            if {![winfo exists $w.nd.$tag] && ![winfo exists $w.od.$tag]} continue	;#if dep field doesn't exist, keep trying
            if {[$w field $tag get] == $val} {return 1}		;#if the value matches, OK
        }
        return 0
    }
    set fn $w.$tag
    if {[set tem $cfig(tem$fn)] == {}} {return 1}
    if {[llength $tem] == 1 && [info exists tpt($tem)]} {set tem $tpt($tem)}
#puts "tptcheck-- $fn:[$w field $tag get] tem:$tem"
    lassign $tem matches example depends
    if {![deps_met $w $tag $depends]} {return 1}	;#should we run the template check
    set val [$w field $tag get]		;#get field value
    foreach j $matches {		;#compare each match expression
#puts "  cmp :$j:$val:"			;# if any match found, OK
        if {($j == {} && $val == {}) || ([regexp $j $val len] && $len == $val)} {
            return 1
        }
    }
    return 0
}

# Yield/restore preferences
#------------------------------------------
proc mdew::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    if {$v(haveopt$w)} {lappend parr [list optional [optional $w ?]]}
    lappend parr [list set [getvals $w]]	;#dbe may discard these
#puts "Dump $w pref:[join $parr "\n"]"
    return $parr
}

# Get data from one or more fields
# If no fields specified, return a all fields in a name,value pair list
#------------------------------------------
proc mdew::getvals {w {fields {}}} {
    variable cfig
#puts "getvals w:$w fields:$fields"
    set ret {}
    if {$fields == {}} {
        foreach tag $cfig(tags$w) {lappend ret $tag [$w field $tag get]}
    } elseif {[llength $fields] == 1} {
        return [$w field [lindex $fields 0] get]
    } else {
        foreach tag $fields {lappend ret [$w field $tag get]}
    }
    return $ret
}

# Set data into one or more fields
# Provide a list of name value pairs
#------------------------------------------
proc mdew::setvals {w args} {
    variable cfig
    if {[llength $args] == 1} {		;#can pass in a list as args[0] or as all args
        set fvpairs [lindex $args 0]
    } else {
        set fvpairs $args
    }
#puts "setval: args:$args fvpairs:$fvpairs"
    foreach {tag val} $fvpairs {
#puts "setval: tag:$tag val:$val"
        if {[winfo exists $w.nd.$tag]} {$w.nd.$tag set $val} elseif {[winfo exists $w.od.$tag]} {$w.od.$tag set $val}
    }
}

# Create a subframe in the widget, return the full name (really only needed with the pack geometry manager)
#------------------------------------------
proc mdew::s_add {w tag args} {
    set mis "-side top -fill both -exp 1"
    if {![winfo exists [set in $w.nd.$tag]]} {
        foreach s {side fill expand in before after} {if {[xswitch $s args va sw] != {}} {lappend mis $sw $va}}
        eval frame $in $args
        eval pack $in $mis
        lower $in		;#make sure it is under slaves
    }
#puts "Subframe:$in"
    return $in
}

# Add a data field into an mdew widget
#------------------------------------------
proc mdew::f_add {w tag args} {
    variable cfig
    variable v

#puts "F_add w:$w tag:$tag args:$args"
    set fx $w.$tag				;#field index
    argnorm {{style 2} {hide 2} {subframe 2 sub} {size 2} {template 3 tem} {optional 2 opt} {format 2} {special 3 spf} {inside 2 in}} args
    argform $cfig(fshort) args
    array set cfig [list hide$fx 0 opt$fx 0 gmc$fx $cfig(gmc$w) style$fx ent format$fx {_}]
    if {[xswitchs {in} args inside] != {}} {	;#convert -inside switch to an actual packing gmc command
      set cfig(gmc$fx) "pack %w -in %p.$inside"
    }
    foreach sw {style hide gmc opt} {xswitchs $sw args cfig($sw$fx)}	;#process switches
    foreach sw {sub size tem format spf} {set cfig($sw$fx) [xswitchs $sw args]}

    if {$cfig(opt$fx)} {
        set fn $w.od.$tag
        set fp $w.od
        if {!$v(haveopt$w)} {
            set v(haveopt$w) 1
            optional $w
        }
    } else {
        set fn $w.nd.$tag
        set fp $w.nd
    }

    lassign {} dsw osw				;#dew switches, override switches
    lassign $cfig(size$fx) fw fh
    if {$fw != {}} {lappend dsw -width $fw}
    if {$fh != {}} {lappend dsw -height $fh}
    if {[set tw [xswitch tw args]] != {}} {lappend dsw -t [list -width $tw]}	;#-tw alternate form for title width

    if {$cfig(spf$fx) == {mdew}} {		;#spf's handled at mdew level
        set data [xswitchs data args]
        regsub -all %w $data $w data		;#insert this widget's w
        lappend args -spf $data			;#and pass it down to the dew to handle
    } elseif {$cfig(spf$fx) == {zip}} {
        if {[set data [xswitchs data args]] == {}} {lassign {city state} ct st} else {lappend $data ct st}
        lappend args -spf [list web::zip_lookup $w %w $tag $ct $st]
        lappend args -b {-help {Allow the user to enter a zip code, then fill out the city and state fields automatically}}
    } else {
        lappend args -spf $cfig(spf$fx)		;#else just pass it as we received it
    }

    dew::dew $fn -style $cfig(style$fx) {*}$dsw {*}$args {*}$osw
    lappend cfig(tags$w) $tag
#bind $fn <<Modified>> "puts {Modified $fn}"
    bind $fn <<Modified>> "ww::modgen $w %s"	;#pass up to this widget
    bind $fn <<Changed>> "ww::chagen $w"
    set en [$fn e w]
    bindtags $en [linsert [bindtags $en] end-2 $cfig(bind$w)]	;# allow to bind events to parent class
#puts "Bindtags:[bindtags $en] en:$en"

#Sample of how to do auto checking:
    if {$cfig(tem$fx) != {}} {
        bind [$fn entry w] <FocusOut> "mdew::check $w $tag"
#        bind [$fn entry w] <FocusOut> "if {!\[mdew::check $w $tag -rep 0\]} {dia::brief {Warning, illegal field value: $tag}}"
    }

#puts "fn:$fn hide:$cfig(hide$fx)"
    if {!$cfig(hide$fx)} {		;#now make the field appear
#puts "fn:$fn sub:$cfig(sub$fx)\n  w:gmc:$cfig(gmc$w) fn:gmc:$cfig(gmc$fx)"
        if {[regexp -- {%w} $cfig(gmc$fx)]} {set gmc $cfig(gmc$fx)} else {set gmc "$cfig(gmc$w) $cfig(gmc$fx)"}	;#if substituting field name, use the geom mgr cmd wholesale, else just append it to the existing command
        set i 0; set sargs {}
        foreach sa $cfig(sub$fx) {	;#for each substitution item
            if {$sa != {}} {
                regsub -all %a [lindex $cfig(sargs$w) $i] $sa sarg
                append gmc { } $sarg
#puts "  i:$i sarg:$sarg"
            }
            incr i
        }
        regsub -all %w $gmc $fn gmc; regsub -all %p $gmc $fp gmc
#puts "w:$tag gmc:$gmc"
        eval $gmc
    }
    return $fn
}

# Show/hide optional fields
#------------------------------------------
proc mdew::optional {w {show {}}} {
    variable cfig
    variable v
    if {$show == {!}} {
        set show [set v(showopt$w) [expr !$v(showopt$w)]]
    } elseif {$show == {}} {
        set show $v(showopt$w)
    } elseif {$show == {?}} {
        return $v(showopt$w)
    } else {
        set v(showopt$w) $show
    }
    pack forget $w.od
    if {$show} {
        pack $w.od -side bottom -fill both
    }
    if {$v(haveopt$w)} {
        pack $w.ob -side top -fill x
    }
    return $v(showopt$w)
}

# Get configuration
#------------------------------------------
proc mdew::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    if {[lcontain $cfig(args) $option]} {return $cfig(option$w)}
    return [eval _$w cget $option]
}

# Configure the mdew
#------------------------------------------
proc mdew::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(args) {xswitch $tag args cfig($tag$w)}
    if {$args != {}} {return [eval _$w configure $args]}
    setup $w
    return {}
}

#Create the widget
#------------------------------------------
proc mdew::mdew {w args} {
    variable cfig
    variable v

#    argform {} args
    argnorm $cfig(swar) args
    array set cfig [list gman$w $cfig(gman) tags$w {} focus$w {} gmc$w {} sargs$w {} bind$w Mdew]	;#initial values
    xswitchs gman args cfig(gman$w)
    if {[lcontain {grid pack place} $cfig(gman$w)]} {
        array set cfig [list gmc$w $cfig(gmc.$cfig(gman$w)) sargs$w $cfig(sargs.$cfig(gman$w))]
    }
    for {set fields {}} {[xswitch f args va sw] != {}} {} {lappend fields $sw $va}
    for {set subfms {}} {[xswitch s args va sw] != {}} {} {lappend subfms $sw $va}
    foreach sw {focus gmc sargs init bind} {xswitch $sw args cfig($sw$w)}		;#grab other arguments not native to frame
    if {[winfo exists $w]} {eval $w configure -class Mdew $args} else {eval wframe::_frame $w -class Mdew $args}
    widginit $w mdew *$w
    if {$cfig(gman$w) == {grid}} {
        bind $w <Configure> "mdew::fconfig $w"		;#automatically align titles
    }

    set v(haveopt$w) 0
    set v(showopt$w) 0
    frame  $w.nd				;#frame for normal data fields	
    pack $w.nd -side top -fill both
    button $w.ob -image emp -command "mdew::optional $w !" -help {Press this button to expose/hide additional fields that are not normally shown} -takefocus 0
    frame  $w.od			;#frame for optional data fields

    foreach {sw va} $subfms {eval s_add $w $va}		;#subframes
    foreach {sw va} $fields {eval f_add $w $va}		;#data fields

    set v(modif$w) 1
    if {[info exists cfig(init$w)]} {initialize $w}
    return $w
}

#The widget command
#------------------------------------------
proc mdew::wcmd {w cmd args} {
    variable cfig
#puts "mdew::wcmd w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{get 1} {set 1} {frame 2} {field 2} {initialize 2} {preferences 2 pref} {entry 1} {cget 2} {configure 2} {tags 2} {modified 3} {optional 2}} $cmd]
    if {[lcontain {initialize cget configure modified check fcheck pref optional} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact -- $cmd {
        {get}		{return [eval getvals $w $args]}
        {set}		{return [eval setvals $w $args]}
        {w}		{return $w}
        {frame}		{return [eval _$w $args]}
        {field}		{
            set args [lassign $args tag]
            if {![lcontain $cfig(tags$w) $tag]} {error "Field: $tag not found in widget: $w"}
            if {$cfig(opt$w.$tag)} {return [eval $w.od.$tag $args]} else {return [eval $w.nd.$tag $args]}
        }
        {tags}		{return $cfig(tags$w)}
        {default}	{
            if {[lcontain $cfig(tags$w) $cmd]} {	;#if command is a field name
                if {$cfig(opt$w.$cmd)} {return [eval $w.od.$cmd $args]} else {return [eval $w.nd.$cmd $args]}
            } else {
                return [eval _$w $cmd $args]
            }
        }
    }
}

if {[info commands locawyze] != {}} {locawyze mdew}
