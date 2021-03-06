# A data entry widget consisting of a frame containing a label and one of:
# entry, text, checkbutton, radiobutton, etc.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- get pdm's to toggle to a value by typing the first character or two of the option
#X- Move font/color to different module?
#- test fsm spf type (forced)
#- allow to supply replacement gmc or just add to existing gmc?
#- separate gmc commands for title, entry, button?
#- get widget defaults from resources  (gmc, etc.)
#- how to handle spinner switches?
#- 

namespace eval dew {
    namespace export dew align scm edarr
    variable cfig
    set cfig(swar) {{special 3 spf} {style 2} {title 2} {textvariable 5 textv} {data 3} {frame 2 fr} {spinner 2 spin} {auto 2} {entry 2} {hint 2} {focus 2}}
#Bitmap for pull-down button
    image create bitmap pull.dn -data "#define down_width 14\n#define down_height 8\nstatic unsigned char down_bits[] = {\n0xff, 0x3f, 0x03, 0x30, 0x06, 0x18, 0x0c, 0x0c, 0x18, 0x06, 0x30, 0x03, 0xe0, 0x01, 0xc0, 0x00};"

    variable scm	;#default values for scmenu widgets
    set scm(state) {-f code -f name -token code -force 1 -data {{{} Blank} {AK Alaska} {AL Alabama} {AR Arkansas} {AZ Arizona} {CA California} {CO Colorado} {CT Connecticut} {DC {Washington DC}} {DE Delaware} {FL Florida} {GA Georgia} {HI Hawaii} {IA Iowa} {ID Idaho} {IL Illinois} {IN Indiana} {KS Kansas} {KY Kentucky} {LA Louisiana} {MA Massachussetts} {MD Maryland} {ME Maine} {MI Michigan} {MN Minnesota} {MO Missouri} {MS Mississippi} {MT Montana} {NC {North Carolina}} {ND {North Dakota}} {NE {}} {NH {New Hamshire}} {NJ {New Jersey}} {NM {New Mexico}} {NV Nevada} {NY {New York}} {OH Ohio} {OK Oklahoma} {OR Oregon} {PA Pennsylvania} {PR {Puerto Rico}} {RI {Rhode Island}} {SC {South Carolina}} {SD {South Dakota}} {TN Tennesse} {TX Texas} {UT Utah} {VA Virgina} {VI {Virgin Islands}} {VT Vermont} {WA {Washington State}} {WI Wisconson} {WV {West Virginia}} {WY Wyoming}}}
    set scm(country) {-f code -f name -token code -force 1 -data {{{} Blank} {A Austria} {AFG Afghanistan} {AG Antigua and Barbuda} {AL Albania} {AND Andorra} {ANG Angola} {ARM Armenia} {AUS Australia} {AZ Azerbaijan} {B Belgium} {BD Bangladesh} {BDS Barbados} {BF Burkina Faso} {BG Bulgaria} {BH Belize} {BHT Bhutan} {BIH Bosnia-Herzegovina} {BM Bermudas} {BOL Bolivia} {BR Brazil} {BRN Bahrain} {BRU Brunei} {BS Bahamas} {BU Burundi} {BY Belarus} {C Cuba} {CAM Cameroon} {CDN Canada} {CH Switzerland} {CI Ivory Coast} {CL Sri Lanka} {CN China} {CO Columbia} {CR Costa Rica} {CV Cape Verde} {CY Cyprus} {CZ Czech Republic} {D Germany} {DJI Djibouti} {DK Denmark} {DOM Dominican Republic} {DZ Algeria} {E Spain} {EAK Kenya} {EAT Tanzania} {EAU Uganda} {EC Ecuador} {EQ Equatorial Guinea} {ER Eritrea} {ES El Salvador} {EST Estonia} {ET Egypt} {ETH Ethiopia} {F France} {FJI Fiji} {FL Lichtenstein} {FR Faroer} {G Gabon} {GB Great Britain} {GBZ Gibraltar} {GCA Guatemala} {GE Georgia} {GH Ghana} {GNB Guinea-Bissau} {GR Greece} {GUY Guyana} {H Hungary} {HA Haiti} {HK Hongkong} {HN Honduras} {HR Croatia} {I Italy} {IL Israel} {IND India} {IR Iran} {IRL Ireland (Republic)} {IRQ Iraq} {IS Iceland} {J Japan} {JA Jamaica} {JOR Jordan} {K Cambodia} {KIR Kiribati} {KO North Korea} {KS Kyrgyzstan} {KWT Kuwait} {KZ Kazakhstan} {L Luxembourg} {LAO Laos} {LAR Libya} {LB Liberia} {LS Lesotho} {LT Lithuania} {LV Lativa} {M Malta} {MA Morocco} {MAL Malaysia} {MC Monaco} {MD Moldova} {MEX Mexico} {MK Macedonia} {MNG Mongolia} {MOC Mozambique} {MS Mauritius} {MW Malawi} {MYA Myanmar} {N Norway} {NA Netherlands Antilles} {NAM Namibia} {NEP Nepal} {NIC Nicaragua} {NL Netherlands} {NZ New Zealand} {OM Oman} {P Portugal} {PA Panama} {PE Peru} {PK Pakistan} {PL Poland} {PNG Papua New Guinea} {PR Puerto Rico} {PY Paraguay} {Q Qatar} {RA Argentina} {RB Botswana} {RC Taiwan} {RCA Central African Republic} {RCB Congo} {RCH Chile} {RG Guinea} {RI Indonesia} {RIM Mauretania} {RL Lebanon} {RM Madagascar} {RMM Mali} {RN Niger} {RO Romania} {ROK South Korea} {ROU Uruguay} {RP Philippines} {RPB Benin} {RSA Republis of South Africa} {RSM San Marino} {RT Togo} {RUS Russia} {RWA Rwanda} {S Sweden} {SA Saudi Arabia} {SD Swaziland} {SF Finland} {SGP Singapore} {SK Slovakia} {SLO Slovenia} {SME Suriname} {SN Senegal} {SP Somalia} {SUD Sudan} {SY Seychelles} {SYR Syria} {THA Thailand} {TJ Tajikistan} {TM Turkmenistan} {TN Tunesia} {TR Turkey} {TT Trinidad & Tobago} {UA Ukraine} {UAE United Arab Emirates} {USA USA} {UZB Uzbekistan} {V Vatican City} {VN Vietnam} {WAG The Gambia} {WAL Sierra Leone} {WAN Nigeria} {WD Dominica} {WG Grenada} {WL St. Lucia} {WS Western Samoa} {WV St. Vincent} {YE Yemen} {YMN Northern Yemen} {YU Yugoslavia (Serbia & Montenegro)} {YV Venezuela} {Z Sambia} {ZA South Africa} {ZRE Zaire} {ZW Zimbabwe}}}
}

option add *Dew.Label.anchor			ne		widgetDefault
option add *Dew.Label.padX			1		widgetDefault
option add *Dew.Label.padY			0		widgetDefault
option add *Dew.t.anchor			ne		widgetDefault
#option add *Dew.t.padY				0		widgetDefault
#option add *Dew.t.background			{#c0c0c0}	widgetDefault
option add *Dew.t.padX				1		widgetDefault
option add *Dew.t.borderWidth			0		widgetDefault
option add *Dew.b.borderWidth			1		widgetDefault
option add *Dew.b.highlightThickness		0		widgetDefault
option add *Dew.b.takeFocus			0		widgetDefault
option add *Dew*Text.relief			sunken		widgetDefault
option add *Dew*Text.borderWidth		1		widgetDefault
option add *Dew.Text.background			{#f0f0f0}	widgetDefault
option add *Dew.Menubutton.takeFocus		1		widgetDefault
option add *Dew.Menubutton.highlightThickness	1		widgetDefault
option add *Dew.Menubutton.relief		raised		widgetDefault
option add *Dew.Menubutton.anchor		w		widgetDefault
option add *Dew.Menubutton.padX			3		widgetDefault
option add *Dew.Menubutton.padY			1		widgetDefault
option add *Dew.Menubutton.indicatorOn		1		widgetDefault
option add *Dew.Menubutton.borderWidth		1		widgetDefault
option add *Dew.Menubutton.background		{#e8e8e8}	widgetDefault
option add *Dew*Entry.width			20		widgetDefault
option add *Dew.Entry.borderWidth		1		widgetDefault
option add *Dew.Checkbutton.anchor		w		widgetDefault
option add *Dew.Checkbutton.padX		5		widgetDefault
option add *Dew.Checkbutton.padY		1		widgetDefault
#option add *Dew.Checkbutton.borderWidth	1		widgetDefault
#option add *Dew.Checkbutton.relief		sunken		widgetDefault
option add *Dew.Stext.xs.width			4		widgetDefault
option add *Dew.Stext.ys.width			4		widgetDefault
option add *Dew.Stext.xs.borderWidth		1		widgetDefault
option add *Dew.Stext.ys.borderWidth		1		widgetDefault

option add *Dew.gmc-t	{pack %t -side left -anchor w}		widgetDefault
option add *Dew.gmc-e	{pack %e -side left -anchor w -fill x -exp 1}	widgetDefault
option add *Dew.gmc-s	{pack %s -side left -anchor w -fill y}	widgetDefault
option add *Dew.gmc-b	{pack %b -side right -anchor s -fill y}	widgetDefault
option add *Dew.style	ent					widgetDefault
option add *Dew.auto	0					widgetDefault
option add *Dew.gmc	{%T; %E; %S; %B}			widgetDefault

#Create new binding class that doesn't allow direct modifications of an entry
foreach e [bind Entry] {
    if {![lcontain {<<Copy>> <Tab> <B2-Motion> <Button-2> <Control-Key-backslash> <Control-Key-slash> <Key-Right> <Key-Left> <ButtonRelease-2> <Control-Button-1> <ButtonRelease-1> <B1-Enter> <B1-Leave> <Triple-Shift-Button-1> <Double-Shift-Button-1> <Shift-Button-1> <Triple-Button-1> <Double-Button-1> <B1-Motion> <Button-1>} $e]} continue
#puts "bind Fentry $e [bind Entry $e]"
    bind Fentry $e [bind Entry $e]
} 

# Return standard scm (scrolled menu) command line parameters if they exist
#------------------------------------------
proc dew::scm {tag {new {}}} {
    variable scm
    if {$new != {}} {set scm($tag) $new}
    if {[info exists scm($tag)]} {return $scm($tag)}
    return $tag
}

# Register a frame to keep all its enclosed dew's titles equal
#------------------------------------------
proc dew::align {w} {
    bind $w <Configure> "+ dew::title_align $w %w %h"
}

# Adjust the titles of any dews inside this frame to of be equal length
#------------------------------------------
proc dew::title_align {w W H} {
    if {$W == 1 && $H == 1} return
#puts "frame_align w:$w W:$W H:$H"
    set dews {}
    set max 0
    foreach f [winfo children $w] {
        if {![lcontain {Dew Cdew} [winfo class $f]]} continue
        lappend dews $f
        set len [string length [$f cget -title]]
#puts "  child:$f t:[$f cget -title] len:$len wid:[$f t cget -width]"
        if {$len > $max} {set max $len}
    }
#puts "  max:$max"
    if {[llength $dews] <= 1} return
    foreach f $dews {$f t configure -width $max}
}

# Update the title font in the getfont widget
#------------------------------------------
proc dew::updfont {w} {
    variable font
#    set font(size) [expr abs($font(size))]	;#causes infinite Changed events
#puts "updfont:$font(size)"
    if {[catch {$w.test e configure -font [set f "$font(fam) $font(meas)$font(size) $font(style)"]}]} {
        error "Invalid font: $f"
        return 0
    }
    return 1
}

# Select a font (only one can exist at a time)
#------------------------------------------
proc dew::getfont {vname {p .}} {
    variable font
    upvar $vname v
    set w .fontsel
    if {[winfo exists $w]} {destroy $w}
    toplevel $w -class Fontsel
    wm transient $w [winfo parent $p]	;#make it a child window
    label $w.t -text {Font Selector} -bd 1 -relief raised -anchor w

    frame $w.buts
    button $w.buts.ok -text OK -command "set dew::font(ok) 1" -borderwidth 4 -pady 1
    button $w.buts.can -text Cancel -command "destroy $w"
    pack $w.buts.ok $w.buts.can -side left -exp 1 -fill x

    lassign $v font(fam) font(size) font(style)
    if {$font(size) == {}} {set font(size) 12}
    if {$font(size) < 0} {set font(size) [expr abs($font(size))]; set font(meas) {-}} else { set font(meas) {}}
    if {$font(style) == {}} {set font(style) {normal}}

    set b [frame $w.body]
    dew::dew $b.fam pdm Family: -textv dew::font(fam) -data {Default EuroStile Tahoma Helvetica Courier Fixed Times} -width 12
    dew::dew $b.meas pdm Measure: -textv dew::font(meas) -data {{- pixels} {{} points}}
    dew::dew $b.size ent Size: -textv dew::font(size) -width 4 -just r -spin {int {2 24}}
    dew::dew $b.style pdm Style: -textv dew::font(style) -data {normal bold italic {{bold italic}}} -width 10
    pack $b.fam $b.meas $b.size $b.style -side left
    bind [$b.size entry w] <Return> "dew::updfont $w"
    bind [$b.size entry w] <KP_Enter> "dew::updfont $w"
    foreach i {fam meas size style} {bind $b.$i <<Changed>> "dew::updfont $w"}

    dew::dew $w.test mle Sample: -width 44 -height 4 -wrap word -gmc {pack %t %e -side top -exp 1 -anchor w}
    $w.test entry insert 0.0 {The quick brown fox jumped over the lazy dog.}

    pack $w.t $b $w.buts -side top -fill x
    pack $w.test -side top -fill both -exp 1
    pack $w.buts -side bottom -fill x

    dia::place $w -xo -40 -yo 20
    set font(ok) 0
    updfont $w
    tkwait variable dew::font(ok)
    if {$font(style) == {normal}} {set font(style) {}}
    if {[updfont $w]} {set v "$font(fam) $font(meas)$font(size) $font(style)"}
    destroy $w
}

# Edit an array of values in an entry dew
#------------------------------------------
proc dew::edarr {w args} {
    variable v
#debug {edarr } w args
    argform {base force} args
    argnorm {{base 1} {delimiter 3 delim} {sql 1} {width 1} {force 1} {descriptions 3 descr} {message 1 msg}} args
    array set c "base 1 delim , sql 0 width 10 msg {Edit Array Values:}"
    foreach tag {force descr} {set c($tag) [xswitchs $tag args]}
    foreach tag {base delim sql width msg} {xswitchs $tag args c($tag)}
#puts "array:[array get c]"
    set uw ".dia[translit . _ $w]"
    set parr {}

    set vals [$w get]
    if {$c(sql)} {set c(delim) {,}; set vals [lindex $vals 0]}
    set vals [split $vals $c(delim)]
    
    if {$c(force) != {}} {
        set alen $c(force)
    } else {
        set alen [llength $vals]
    }
    for {set i 0} {$i < $alen} {incr i} {
        set des [lindex $c(descr) $i]
        set val [lindex $vals $i]
        argform {title help} des
        argnorm {{title 1} {help 1}} des
        set title "Element $c(base):"
        set help "Enter the value to insert into the array for: $title"
        foreach s {title help} {xswitchs $s des $s}
#debug title help
        lappend parr -f "[list el_$c(base) ent $c(width) "1 $i" $title -ini $val -help $help] $args $des"
        incr c(base)
    }
#debug parr

    if {[eval dia::dia $uw -but \{OK Cancel\} -def 0 -message \$c(msg) -entry mdew::mdew -dest res -pre 0 -restore 0 $parr] < 0} return
#debug res
    set vals {}
    foreach {t e} $res {lappend vals $e}
    set vals [join $vals $c(delim)]
    if {$c(sql)} {set vals "{$vals}"}
    $w set $vals
}

# When a key is pressed, search for matching entries in the list
#------------------------------------------
proc dew::key_proc {w {key {}}} {
    variable cfig
    variable v
    if {![info exists v(last$w)]} {set v(last$w) -1}		;#what index we will start with
#puts "w:$w key:$key: last:$v(last$w) data:$cfig(data$w)"
    set len [llength $cfig(data$w)]				;#how many values can this pull-down have?
    for {set x 0} {$x < $len} {incr x} {
        if {[incr v(last$w)] >= $len} {set v(last$w) 0}		;#advance and wrap around if necessary
        lassign [lindex $cfig(data$w) $v(last$w)] tag title
#puts "  checking: tag:$tag x:$x last:$v(last$w) title:$title"
        if {$key == [string range $tag 0 0]} {			;#if key = first character of this choice, use it
            $w set $tag
            return
        }
    }
    unset v(last$w)
}

# Perform the special function menu or operation
#------------------------------------------
proc dew::spf {w {key {}}} {
    variable cfig
    variable scm
    if {$cfig(spf$w) == {}} return
    if {[llength $cfig(data$w)] == 1 && [info exists scm($cfig(data$w))]} {set cfig(data$w) $scm($cfig(data$w))}	;#process shortcut for a standard scm type
    focus $w.e
    set textv [$w.e cget -textv]
    set title [$w.t cget -text]
    lib::cwatch $w.e
    set uw dew_spf[translit . _ $w]
#puts "SPF:$cfig(spf$w) tag:$uw data:$cfig(data$w) key:$key"
    if {$cfig(auto$w) && $key != {}} {
        dia::unget $key
    }
    switch $cfig(spf$w) {
        {scm}	{scm::dia $title $uw -dest $textv {*}$cfig(data$w)}
        {clc}	{calc::dia .$uw -dest $textv -parent $w -preserve 1}
        {edw}	{edwin::edwin .$uw -init 1 -dest $textv -wrap word -title "Editing $title"}
        {edi}	{exedit::exedit .$uw $textv -dest $textv {*}$cfig(data$w)}
        {tod}	{set $textv [date::date]}
        {cal}	{cal::dia .$uw -dest $textv -prev 3 -weeks 7 -menu {{Select Date:} -under 0}}
        {tim}	{tim::dia .$uw -dest $textv -menu {Select Time:}}
        {dat}	{date::dia .$uw -dest $textv -title {Select Date:}}
        {dtm}	{datim::dia .$uw -dest $textv}
        {fil}	{sfile::dia .$uw -dest $textv -title {Select File:}}
        {mdy}	{date::diamd .$uw -dest $textv -title {Select Day/month:}}
        {col}	{color::edit $textv; if {[set c [subst $$textv]] != {}} {$w.e configure -bg $c}}
        {fnt}	{getfont $textv $w}
        {default} {
            regsub -all -- %v $cfig(spf$w) $textv cmd
            regsub -all -- %u $cmd .$uw cmd
            regsub -all -- %w $cmd $w cmd
            regsub -all -- %d $cmd $cfig(data$w) cmd
#puts "spf_cmd:$cmd"
            eval $cmd
        }
    }
    lib::cnorm $w.e
}

# Get data from the entry widget
#------------------------------------------
proc dew::getval {w} {
    variable cfig
#puts "getval w:$w textv:cfig(textv$w)"
    if {$cfig(textv$w) != {}} {
        upvar #0 $cfig(textv$w) var
        return $var
    } else {
        error "getval: no textv for $w"
    }
}

# Set data into the entry widget
#------------------------------------------
proc dew::setval {w value} {
    variable cfig
    if {$cfig(textv$w) != {}} {
        upvar #0 $cfig(textv$w) var
        set var $value
    } else {
        error "setval: no textv for $w"
    }
}

# Get configuration for an entry
#------------------------------------------
proc dew::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget w:$w option:$option opt:$opt"
    set cfig(title$w) [$w.t cget -text]	;#in case it changed
    if {[lcontain {spf data gmc gmc-t gmc-e gmc-s gmc-b t f style title textv} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing entry
#------------------------------------------
proc dew::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm $cfig(swar) args
    foreach s {spf data title} {set cfig($s$w) [xswitch $s args]}
#    foreach s {} {xswitch $s args cfig($s$w)}
    $w.t configure -text $cfig(title$w)
    if {$args != {}} {eval _$w configure $args}
    set cfig(textv$w) [_$w cget -textv]		;#in case we changed it
    return {}
}

#Create an entry widget
#------------------------------------------
proc dew::dew {w args} {
    variable cfig
    variable scm
#puts "dew args: $args"
    argform {style title} args
    argnorm $cfig(swar) args
    array unset cfig *$w
    foreach s {t fr b} {
        set cfig($s$w) {}
        while {[set x [xswitch $s args]] != {}} {append cfig($s$w) { } $x}
    }
    eval wframe::_frame $w -class Dew $cfig(fr$w)
    widginit $w dew *$w

    swores $w args cfig(%s$w) {gmc gmc-t gmc-e gmc-s gmc-b spf style title auto}
    foreach s {textv} {xswitchs $s args cfig($s$w)}
    foreach s {data spin hint focus} {set cfig($s$w) [xswitchs $s args]}
    while {[set eargs [xswitch entry args]] != {}} {eval lappend args $eargs}
    if {![info exists cfig(textv$w)]} {set cfig(textv$w) ::dew::v(val$w)}

    lassign 1 showb sphlp
    set sphk "\n(Also: right-click or Ctrl-m)"
    switch $cfig(spf$w) {
        {fsm}	{set sphlp "-help {Bring up a selector for allowable values for this field $sphk}"}
        {scm}	{set sphlp "-help {Bring up a selector for suggested values for this field $sphk}"}
        {clc}	{set sphlp "-help {Bring up a calculator for computing values for this field $sphk}"}
        {edw}	{set sphlp "-help {Bring up a text editing box to view/modify the contents of this field $sphk}"}
        {edi}	{set sphlp "-help {Launch an external editor on the contents of this field $sphk}"}
        {tod}	{set sphlp "-help {Set the value of this field to today's date $sphk}"}
        {cal}	{set sphlp "-help {Bring up a calendar selector for setting the value of this field $sphk}"}
        {dat}	{set sphlp "-help {Bring up a date selector for selecting the value for this field $sphk}"}
        {mdy}	{set sphlp "-help {Bring up a month/day spinner for selecting the value for this field $sphk}"}
        {col}	{set sphlp "-help {Bring up a color selector for setting the value for this field $sphk}"}
        {fnt}	{set sphlp "-help {Bring up a font selector for setting the value for this field $sphk}"}
        {}	{set showb 0}
    }
#    if {[lcontain {scm fsm} $cfig(spf$w)] && [llength $cfig(data$w)] == 1 && [info exists scm($cfig(data$w))]} {set cfig(data$w) $scm($cfig(data$w))}

    if {$showb || $cfig(spf$w) == {}} {
        eval label $w.t -text \$cfig(title$w) $cfig(t$w)
        eval button $w.b -image pull.dn -command \{dew::spf $w\} $sphlp $cfig(b$w)
    } else {
        eval button $w.t -text \$cfig(title$w) -command \{dew::spf $w\} $sphlp $cfig(t$w)
    }
    set en $w.e
    if {$cfig(style$w) == {inf}} {set cfig(style$w) ent; lappend args -relief raised -bd 1}

    if {[lcontain {chk rad pho} $cfig(style$w)]} {	;#these use the -variable switch--not textvariable
        argnorm {{variable 2}} args
        xswitchs variable args cfig(textv$w)
    }
    
    switch $cfig(style$w) {			;#make actual field entry
        {ent} {
            entry $en -textv $cfig(textv$w) {*}$args
            if {$cfig(auto$w) && $cfig(spf$w) != {}} {
                bind $en <Key> "dew::spf $w %k"
                bindtags $en "$en Fentry Dew . all"
            }
        }
        {mle} {
            stext::stext $en -textv $cfig(textv$w) {*}$args
            bind [$en text w] <Tab> {tk::TabToWindow [tk_focusNext %W]; break}
        }
        {pdm} {
            menubutton $en -menu $en.m -textv $cfig(textv$w) {*}$args
#puts "pdm args: $args"
            bind $en <Key> "dew::key_proc $w %A"
            menu $en.m
            foreach mi $cfig(data$w) {
                lassign $mi mtag mtit mhlp
                if {$mtit == {}} {set mlab $mtag} else {set mlab "$mtag - $mtit"}
                $en.m add command -label $mlab -command [list set $cfig(textv$w) $mtag] -help $mhlp
            }
        }
        {pdc} {
            menubutton $en -menu $en.m -textv $cfig(textv$w) {*}$args
#puts "pdc args: $args"
            bind $en <Key> "dew::key_proc $w %A"
            menu $en.m
            foreach mi $cfig(data$w) {
                lassign $mi mtag mtit mhlp
                if {$mtit == {}} {set mlab $mtag} else {set mlab "$mtag - $mtit"}
		$en.m add check -label $mlab -variable ::cnf($mtag) -command [list set $cfig(textv$w) $mtag] -help $mhlp
            }
        }
        {chk} {
            checkbutton $en -variable $cfig(textv$w) {*}$args
        }
        {rad} {
            radiobutton $en -variable $cfig(textv$w) {*}$args
        }
        {pho} {
            photo::photo $en -variable $cfig(textv$w) {*}$args
        }
        {nul} {
            label $en -textv $cfig(textv$w) -text {} {*}$args
        }
        {default} {		;#any other kind of entry
            $cfig(style$w) $en -textv $cfig(textv$w) {*}$args
        }
    }
#puts "bindtags:[bindtags $en] en:$en"
    bindtags $en [linsert [bindtags $en] end-2 Dew]	;# allow to bind events to Dew class

    if {$cfig(spin$w) != {}} {
        if {$cfig(style$w) != {ent}} {error "Spinner feature only supported for entry type"}
        eval spin::spin $w.s -entry $w.e $cfig(spin$w)
    }
    
    if {$cfig(spf$w) == {col}} {
        set textv [$en cget -textv]
        if {[set c [subst $$textv]] != {}} {$en configure -bg $c}
        foreach i {<FocusOut> <Leave> <Return> <KP_Enter>} {bind $en $i "catch {$en configure -bg \[subst \$$textv\]}"}
    }

    foreach i [wkeys::k_menu] {bind $w.e $i "dew::spf $w"}
    bind $w <FocusIn> "focus $w.e"
    bind $w.e <<Modified>> "ww::modgen $w %s"	;#pass up to this widget
    bind $w.e <<Changed>> "ww::chagen $w"
    bind $w.e <<Ok>> "ww::chagen $w"

    set gmc $cfig(gmc$w)
#puts "w:$w title:[$w.t cget -text]"
    foreach {f r} [list %T $cfig(gmc-t$w) %E $cfig(gmc-e$w) %S $cfig(gmc-s$w) %B $cfig(gmc-b$w) %t $w.t %e $w.e %s $w.s %b $w.b] {
        if {$f == {%B} && !$showb} {set r {}}			;#don't pack button
        if {$f == {%S} && $cfig(spin$w) == {}} {set r {}}	;#don't pack spinner
        regsub -all -- $f $gmc $r gmc
    }
#puts "gmc:$gmc"
    eval $gmc				;#pack,place,grid, etc.
    return $w
}

# Widget command
#------------------------------------------
proc dew::wcmd {w cmd args} {
    variable cfig
    set cmd [unabbrev {{frame 2} {get 1} {set 1} {title 1} {special 3 spf} {entry 1} {cget 2} {configure 2}} $cmd]
    switch -exact -- $cmd {
        {w}		{return $w}
        {get}		{return [eval getval $w $args]}
        {set}		{return [eval setval $w $args]}
        {spf}		{spf $w}
        {title}		{return [eval $w.t $args]}
        {button}	{return [eval $w.b $args]}
        {frame}		{return [eval _$w $args]}
        {entry}		{return [eval $w.e $args]}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {default}	{return [eval $w.e $cmd $args]}
    }
}

if {[info commands locawyze] != {}} {locawyze dew}
