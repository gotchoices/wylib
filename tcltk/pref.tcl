# Maintain application preferences in an rc file.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#------------------------------------------
#TODO:
#X- Special color and font types (implement in dew)
#X- new colors don't show up in global prefs after a restart
#X- reload prefs from rc file for each page in edit
#X- use multiple priority levels
#X- only apply appropriate settings (exclude inapplicable resolutions)
#- change def switch to init?
#- 
#- LATER:
#- allow for multiple pref modules in a single app (like: potool, purchase, apinv)
#- should we have a wyatt wrapper for the tabset (move BLT dependency behind a wyatt widget)
#- 

namespace eval pref {
    namespace export init auto restore clean external
    variable cfig
    variable v
    variable font

    #Global preference definitions
    set cfig(all.defs) {
	{g_efont	ent	{Entry Font:}		-res {Entry font}	-help {Default font for entry fields}	-spf fnt -state readonly}
	{g_lbfont	ent	{Listbox Font:}		-res {Listbox font}	-help {Default font for listboxes}	-spf fnt -state readonly}
	{g_tfont	ent	{Textbox Font:}		-res {Text font}	-help {Default font for textboxes}	-spf fnt -state readonly}
	{g_lfont	ent	{Label Font:}		-res {Label font}	-help {Default font for labels}		-spf fnt -state readonly}
	{g_bfont	ent	{Button Font:}		-res {Button font}	-help {Default font for buttons}	-spf fnt -state readonly}
	{g_mbfont	ent	{Menubutton Font:}	-res {Menubutton font}	-help {Default font for menu buttons}	-spf fnt -state readonly}
	{g_mufont	ent	{Menu Font:}		-res {Menu font}	-help {Default font for menu items}	-spf fnt -state readonly}
	{g_ckfont	ent	{Checkbutton Font:}	-res {Checkbutton font}	-help {Default font for check buttons}	-spf fnt -state readonly}
	{g_helpbs	chk	{Enable Help Balloons:}	-textv help::cfig(balloons) -def 1 -help {Pop up these little help messages when available}}
	{g_hbbgnd	ent	{Help Popup Background:} -res {Helpbal.l background Label} -help {Background color for help balloons}	-spf col -state readonly}
	{g_hbwid	ent	{Help Popup Width:}     -res {Helpbal.l wrapLength Label} -help {How wide (in pixels) to format help balloons}}
	{g_ebgnd	ent	{Entry Background:}	-res {Entry background}   -spf col -help {Default background color for entries}}
	{g_tbgnd	ent	{Textbox Background:}	-res {Text background}    -spf col -help {Default background color for textboxes}}
	{g_lbbgnd	ent	{Listbox Background:}	-res {Listbox background} -spf col -help {Default background color for listboxes}}
    }

    if {[info exists ::env(WYLIB_RESOLUTION)]} {	;# for testing at alternate resolutions
        set cfig(sres)	$::env(WYLIB_RESOLUTION)
    } else {
        set cfig(sres) "[winfo screenwidth .]x[winfo screenheight .]"	;#current screen resolution
    }
    set cfig(scct) {{all gbl startupFile} {%res gbl userDefault} {%mod gbl interactive} {%mod %mod interactive}}	;#standard preference page types
    set cfig(gbl.flds) {}

    set cfig(launchers) [list  \
        [list "Change Password" {xterm -fa "Liberation Mono:pixelsize=16" -e sh -c "/usr/bin/passwd; sleep 5"} "Launch to change login password"] \
        [list "Screensaver Settings" xscreensaver-demo "Launch to change screensaver timeout and lock settings"] \
    ]
}

# Helper function to fix poorly parsed files (reconnects lines with newline characters in them)
#------------------------------------------
proc pref::clean {l} {
    set i 0
    while {$i < [expr [llength $l] - 1]} {
        set n 0
        set skip 0

        # recreate the list manually using '{' and '}' characters
        # current depth in tree is n
        foreach c [split [lindex $l $i] {}] {
            if {$skip == 1} {
                set skip 0
            } else {
                switch -- $c {
                    \\   { set skip 1 }
                    \{   { set n [expr $n + 1] }
                    \}   { set n [expr $n - 1] }
                }
            }
        }

        # tree broken?
        if {$n != 0} {
            # tree borked, combine with next in list
            set l [lreplace $l $i [expr $i + 1] "[lindex $l $i]\n[lindex $l [expr $i + 1]]"]
        } else {
            # tree clean, move on
            incr i
        }
    }
    return $l
}

# Save/restore automatic preferences for a widget in the current app
#------------------------------------------
proc pref::auto {wtag args} {
    variable cfig

    argnorm {{application 3 app}} args
    if {[set app [xswitchs app args]] == {}} {set app [lib::cfig appname]}
    
    set rcfile [file join [lib::cfig appdir] "$app.$wtag.rc"]
    if {$args == {}} {
#puts "Fetching prefs from: $rcfile"
        if {[file exists $rcfile]} {return [clean [split [read_file $rcfile] "\n"]]}
    } else {
#puts "Saving prefs to: $rcfile\n[join $args "\n"]"
        write_file $rcfile [join $args "\n"]
    }
}

# Apply saved module settings with error handling for use by modules' prefs functions
#------------------------------------------
proc pref::restore {args} {
    uplevel {
        foreach cmd $args {
            if {$cmd == {}} continue
#puts "Apply $w pref: $cmd"
#            eval $w $cmd		;#for debugging
            catch {eval $w $cmd} msg
#            if {[catch {eval $w $cmd} msg]} {
#                dia::err "While restoring module settings in module [namespace current].\nSome settings may have been lost.\nMessage: $msg"
#            }
        }
    }
}

# Set all default values for a given scope (gbl or <module_name>)
#------------------------------------------
proc pref::defaults {scop} {
    variable cfig
    foreach tag $cfig($scop.flds) {
        if {$cfig($scop.$tag.textv) != {}} {
            if {[info exists cfig($scop.$tag.def)]} {
                uplevel #0 set $cfig($scop.$tag.textv) [list $cfig($scop.$tag.def)]
            } else {
                uplevel #0 set $cfig($scop.$tag.textv) \{\}
                set cfig($scop.$tag.def) {}
            }
        } elseif {$cfig($scop.$tag.res) != {}} {
            set cfig($scop.$tag.def) [widget_default $cfig($scop.$tag.res)]
        } else {
            puts "not creating default for $scop $tag"
        }
    }
}

# Record a field (settable item) for later use in prefs screen
#------------------------------------------
proc pref::f_add {args} {
    variable cfig
    argform {tag type title textv} args
    argnorm {{scope 2 scop} {type 2} {default 2 def} {title 2} {textvariable 5 textv} {resource 2 res} {geometry 2 geom}} args
    if {[set scop [xswitchs scop args]] == {}} {set scop [lib::cfig appname]}
    set tag [xswitchs tag args]
    lappend cfig($scop.flds) $tag

    foreach {s} {def type geom} {xswitchs $s args cfig($scop.$tag.$s)}
    foreach {s} {res textv} {set cfig($scop.$tag.$s) [xswitchs $s args]}
    set cfig($scop.$tag.args) $args
#puts "f_add:$scop tag:$tag res:$cfig($scop.$tag.res):"
}

# Load applicable rc file(s) and prepare for future calls to set prefs
#------------------------------------------
proc pref::init {args} {
    variable cfig

#    argform {} args
    argnorm {{module 2 mod} {apply 2} {field 1 f}} args
    if {[set m [xswitchs mod args]] == {}} {set m [lib::cfig appname]}
    array set cfig "$m.flds {}"
#puts "pref::init m:$m args:$args"
    foreach s {apply} {set cfig($m.$s) [xswitchs $s args]}
    
    if {$cfig(gbl.flds) == {}} {	;#init global options if not yet done
        foreach rec $cfig(all.defs) {eval f_add $rec -scope gbl}
    }

    while {[xswitch f args va] != {}} {eval f_add $va -scope $m}	;#init module options
    defaults gbl			;#set all options to their defaults
    defaults $m

#Form list of pref files and restore them if files exist
    set cfig($m.sccu) {}
    set foundres 0			;#note when we find the current resolution
    foreach rec $cfig(scct) {		;#for each possible type of pref file
        lassign $rec vari scop prio	;#get variety and scope of option page
        if {$vari == {%res}} {		;#grab any already existing resolution files
            foreach f [glob -nocomplain "[lib::cfig appdir]/\[0-9\]*x\[0-9\]*.$scop.rc"] {
                regexp -- ".*/(\[0-9\]*x\[0-9\]*)\.${scop}\.rc" $f junk res
                lappend cfig($m.sccu) [list $res $scop $prio]
                if {$res == $cfig(sres)} {
                    load_cfg $res $scop $prio
                    incr foundres
                }
            }
            if {!$foundres} {lappend cfig($m.sccu) [list $cfig(sres) $scop $prio]}
        } else {
            if {$vari == {%mod}} {set vari $m}
            if {$scop == {%mod}} {set scop $m}
            load_cfg $vari $scop $prio
            lappend cfig($m.sccu) [list $vari $scop $prio]
        }
    }
#puts "sccu:$cfig($m.sccu)"
}

# Close preference window nicely
#------------------------------------------
proc pref::close {w} {
    variable cfig
    trace remove variable ::cfig($w.fontframe) write pref::fontchange
    destroy $w
}

# Save all preferences to their respective files
#------------------------------------------
proc pref::save {mod} {
    variable cfig
    variable v
#puts "save mod:$mod"
    foreach rec $cfig($mod.sccu) {		;#for each page of preferences
        lassign $rec vari scop prio
        set ptag ${scop}_${vari}	;#tag for this page
        set fname [file join [lib::cfig appdir] $vari.$scop.rc]
#puts " file: $fname"
        set olines {}
        foreach fld $cfig($scop.flds) {		;#for each field
            if {$v($ptag.$fld) == $cfig($scop.$fld.def)} continue ;# skip if value is the default
#puts "  fld:$fld"
            lappend olines [list $fld $v($ptag.$fld)]
        }
        write_file $fname [join $olines "\n"]
    }
}

# Load a configuration file
#------------------------------------------
proc pref::load_cfg {vari scop prio} {
    variable cfig
    variable v
    set fname [file join [lib::cfig appdir] $vari.$scop.rc]
#puts "load_cfg:$fname"
    if {![file exists $fname]} {return 0}
    set ptag ${scop}_${vari}				;#tag for this page
    set plist {}
    foreach ln [split [read_file $fname] "\n"] {	;#for each file line
        lassign $ln ftag fval			;#get tag/value pair
        if {$ftag == {}} continue
#puts " ftag:$ftag fval:$fval"
        if {![lcontain $cfig($scop.flds) $ftag]} {	;#if not a field we recognize
            dia::warn "Illegal preference field: $ftag in file: $fname\n\nYou should re-save your preferences to fix this."
            continue
        }
        if {$prio != {0}} {
#puts "  apply_opt $scop $ftag $fval $prio"
            apply_opt $scop $ftag $fval $prio
        }
        lappend plist $ftag $fval
    }
    return $plist
}

# Apply a single option to the local environment
#------------------------------------------
proc pref::apply_opt {scop ftag fval {prio interactive}} {
    variable cfig
    variable v
    if {$cfig($scop.$ftag.res) != {}} {		;#if this is a resource
        lassign $cfig($scop.$ftag.res) rclass ropt rforce

        set ospec "*$rclass.$ropt"
        option add $ospec $fval $prio
#puts "option add $ospec {$fval} $prio"
        config_tree . $fval $rclass $ropt
    } elseif {[set vname $cfig($scop.$ftag.textv)] != {}} {	;#if a text variable given

#why did we do this after-idle thing:?
#        if {[info exists $vname]} {
#            set $vname $fval
#        } else {
#           after idle "set $vname $fval"
#        }
        uplevel #0 [list set $vname $fval]
    }
}

# Configure all currently open widgets under and including this one
#------------------------------------------
proc pref::config_tree {w fval rclass ropt} {
    set class [winfo class $w]
#puts "\nw:$w class:$class rclass:$rclass"

    set mlist [split $rclass .]		;#in case class has multiple path members
    set m0 [lindex $mlist 0]		;#toplevel class
    if {$class == $m0} {
        if {[llength $mlist] > 1} {
            set subwin [join [lreplace $mlist 0 0 $w] .]
#puts "  subwin:$subwin"
            if {[winfo exists $subwin]} {
#puts "  $subwin configure -$ropt $fval"
                $subwin configure -$ropt $fval
            }
        } else {
#puts "  $w configure -$ropt $fval"
            $w configure -$ropt $fval
        }
    }
    foreach child [winfo children $w] {config_tree $child $fval $rclass $ropt}
}

# Assert all selected values into their target variables and/or widgets
#------------------------------------------
proc pref::apply {mod} {
    variable cfig
    variable v

    set arglist {}
    foreach rec $cfig($mod.sccu) {		;#for each page of preferences
        lassign $rec vari scop prio
        if {$scop == {gbl} && ![lcontain "all $cfig(sres) $mod" $vari]} continue	;#skip resolutions we're not running at
        set ptag ${scop}_${vari}	;#tag for this page
#puts "scop:$scop vari:$vari"
        foreach fld $cfig($scop.flds) {		;#for each field
            if {$v($ptag.$fld) == $cfig($scop.$fld.def)} continue ;# skip if value is the default
#puts " fld:$fld"
            apply_opt $scop $fld $v($ptag.$fld) $prio
        }
    }

    eval $cfig($mod.apply)			;#execute the user script
}

# Create a sample widget that fits a given option specification and extract 
# a default setting from it to see what it draws from the option database
#------------------------------------------
proc pref::widget_default {res} {
    lassign $res rclass ropt rforce	;#get parts of resource
#puts "res:$res"
    set mlist [split $rclass .]		;#in case class has multiple path members
    set m0 {}
    set path {}
    set i 1
    foreach pm $mlist {			;#for each element of path
        set p [string tolower $pm]	;#lower case version of element
        if {$i == [llength $mlist] && $rforce != {}} {set class $rforce} else {set class {Frame}}	;#if last element, use forced class if present
        if {$p == $pm} {		;#if not capitalized, create a named element
            append path .$pm		;#use literal name
            frame $path -class $class	;#and model it as a frame
#puts " frame $path -class $class"
        } else {			;#else make it a class element
            append path .__$pm
            if {[lcontain {button canvas checkbutton entry frame label listbox menubutton menu message radiobutton scale scrollbar text} $p]} {
                $p $path
#puts " $p $path"
            } else {
                frame $path -class $pm
#puts " frame $path -class $pm"
            }
            set class $pm
        }
        if {$m0 == {}} {set m0 $path}	;#remember base level widget
        incr i
    }
    if {[set opt [option get $path $ropt $class]] == {}} {	;#first try to fetch default from option database
        catch {set opt [$path cget -$ropt]}		;#next try from the sample widget itself
    }
#puts "  option get $path $ropt $class:$opt"
    destroy $m0				;#kill the sample widget when finished
    return $opt
}

# Edit Application Preferences
#------------------------------------------
proc pref::edit {{mod {}}} {
    variable cfig
    variable v
    if {$mod == {}} {set mod [lib::cfig appname]}
#puts "pref::edit mod:$mod"
    if {$cfig($mod.sccu) == {}} {dia::err "No preferences defined"; return}
    set w .pref_$mod
    if {[catch {toplevel $w -class Pref}]} {raise $w; return}
    wm title $w {Edit User Preferences}

    frame $w.mu
    button $w.mu.ok -text OK -command "pref::apply $mod ; pref::save $mod ; pref::close $w" -help {Apply changes, save them, close the window}
    button $w.mu.cl -text Cancel -command "pref::close $w" -help {Close the preferences window without saving}
    button $w.mu.def -text Defaults -command "pref::resetdefaults $w" -help {Apply default preferences to this pane}
    pack $w.mu.def -side left -fill y
    pack $w.mu.ok $w.mu.cl -side right -fill y

    tabs::tabs $w.t -relief flat -samewidth 1 -bd 0 -highlightthickness 0
    pack $w.t -side top -exp 1 -fill both
    pack $w.mu -side top -exp 1 -fill both

    # general tab is filled with settings on a per-application basis
    frame [set f $w.t.f_general]
    $w.t insert end general -text "General" -window $f -anchor n -help "Settings applicable to how [cap_first $mod] functions"
    set cfig(generalframe) $f
    set cfig(findex[$w.t index end]) general

    # fonts and colors tab is filled with a standard preference set, but has multiple options for global/app-specific/different resolutions
    frame [set f $w.t.f_fonts]
    $w.t insert end fonts -text "Fonts & Colors" -window $f -anchor n -help "Settings for fonts and font colors in [cap_first $mod] and other applications"
    frame $f.top
    set fontdata {} ;# list of global/this-app/resolutions to show
    pack $f.top -side top -exp 0 -fill x
    set cfig(fontframe) $f
    set cfig(findex[$w.t index end]) font
    set defindex 0

    # external tab is filled with buttons to launch external preference programs
    frame [set f $w.t.f_external]
    $w.t insert end external -text "External" -window $f -anchor n -help "Settings set from external applications"
    set cfig(externalframe) $f
    set cfig(findex[$w.t index end]) external
    foreach launcher $cfig(launchers) {
        lassign $launcher title command help
        set tag [regsub -all { } $title _]
        label $f.l$tag -text "$title: " -help $help
        button $f.b$tag -text "Launch" -command "exec $command &" -help $help
        grid $f.l$tag $f.b$tag -sticky e
    }

    # fill in the various panes
    set sindex -1
    foreach rec $cfig($mod.sccu) {		;#for each page of preferences
        lassign $rec vari scop prio     ;#priority is not used as of yet
        set ptag ${scop}_${vari}		;#tag for this pane
        # choose title
        if {$scop == {gbl}} {
            set sh {These options are common to all applications}
        } else {
            set sh {These settings are specific to this application or module only}
        }
        set ct {}
        if {$vari == {all}} {
            set st "All Apps"
            append sh { and when set here will affect all applications and modules}
        } elseif {$vari == [lib::cfig appname]} {
            set st "This App"
            append sh { and when set here will only take effect when running this application}
        } else {
            if {$cfig(sres) == $vari} {
                set ct "current resolution"
            }
            set st "All Apps @ $vari resolution"
            append sh { but the settings selected here will only take effect when running at a screen resolution of } $vari
        }
#puts "scop:$scop vari:$vari"
        if {$cfig($scop.flds) == {}} continue		;#if no application prefs

        # select/build frame
        if {$scop == [lib::cfig appname]} {
            set f $cfig(generalframe)
        } else {
            frame [set f $cfig(fontframe).$ptag]
            set ::cfig($w.fontframe.$st) $f ;# correlate the tag with the frame
            set cfig(font.$st) $ptag
            if {$vari == [lib::cfig appname]} {
                # the default should be one for this app
                set defindex [llength $fontdata]
            }
            #lappend fontdata [list $ptag $ct $sh]
            lappend fontdata [list $st $ct $sh]
        }

        foreach fld $cfig($scop.flds) {		;#for each field in this scope
#puts " scop:$scop fld:$fld"
            set args {}
            if {[info exists cfig($scop.$fld.def)]} {	;#if default given
#puts " def: $cfig($scop.$fld.def)"
                set v($ptag.$fld) $cfig($scop.$fld.def)
            } elseif {$cfig($scop.$fld.res) != {}} {	;#else if resource given
#puts " res:$cfig($scop.$fld.res)"
                puts "BUG: we're getting the default in the wrong place for $scop $fld"
                set v($ptag.$fld) [widget_default $cfig($scop.$fld.res)]	;#create a widget and use its default
                set cfig($scop.$fld.def) $v($ptag.$fld) ;# remember the default
            } elseif {$cfig($scop.$fld.textv) != {}} {			;#else use current textvariable value
#puts " textv: $cfig($scop.$fld.textv)"
                set v($ptag.$fld) [subst \$$cfig($scop.$fld.textv)]
                set cfig($scop.$fld.def) $v($ptag.$fld) ;# remember the default
            }
            
#puts "dew::dew $f.$fld -style $cfig($scop.$fld.type) -textv pref::v($ptag.$fld) $args $cfig($scop.$fld.args)"
            eval dew::dew $f.$fld -style $cfig($scop.$fld.type) -textv pref::v($ptag.$fld) $args $cfig($scop.$fld.args)
            grid $f.$fld -sticky e
        }
        foreach {fld val} [load_cfg $vari $scop 0] {	;#now overlay current rc file settings
#puts "set v($ptag.$fld) $val"
            set v($ptag.$fld) $val
        }
    }

    # create font preference drop-down menu
    set f [set f $w.t.f_fonts]
    dew::dew $f.top.m pdm {Preferences for } this -textv ::cfig($w.fontframe) -data $fontdata -help "The selection changes which application family the preferences below apply to"
    pack $f.top.m -side left

    # setup the drop-down menu so that changing the selection changes the visible frame
    set ::cfig($w.fontframe) {}
    set ::cfig($w.fontframe.prior) {} ;# no prior frame
    trace add variable ::cfig($w.fontframe) write pref::fontchange

    # select the first frame
    set ::cfig($w.fontframe) [lindex [lindex $fontdata $defindex] 0] ;# first half of correct item in list
}

# Set the values in the current pane to their defaults
#------------------------------------------
proc pref::resetdefaults {w} {
    variable cfig
    set tab $cfig(findex[$w.t index select])
    set mod [lib::cfig appname]
    switch $tab {
        general {
            set ptag ${mod}_${mod}
            pref::resetptag $ptag
        }
        font {
            set ptag $cfig(font.$::cfig($w.fontframe))
            pref::resetptag $ptag
        }
        external { puts "nothing to default in external tab" }
    }
}

# Set the values for the given ptag to their defaults
#------------------------------------------
proc pref::resetptag {ptag} {
    variable cfig
    variable v
    lassign [split $ptag _] scop vari
    foreach fld $cfig($scop.flds) {		;#for each field in this scope
        set v($ptag.$fld) $cfig($scop.$fld.def)
    }
}

# Swap frames in the "Fonts and Colors" preference tab
#------------------------------------------
proc pref::fontchange {name1 name2 op} {
    variable cfig
    if {$::cfig($name2.prior) == $::cfig($name2)} { return } ;# no change
    if {$::cfig($name2.prior) != {}} {
        pack forget $::cfig($name2.$::cfig($name2.prior))
    }
    pack $::cfig($name2.$::cfig($name2)) -side top -expand 1 -fill both
    set ::cfig($name2.prior) $::cfig($name2)
}

# Get an external preference (one from the user preference file)
#------------------------------------------
# this will also return an environment variable, but shouldn't be used for that as it is much slower than just looking up the variable
# only use for environment variables that may be overwritten by the preference file
#------------------------------------------
proc pref::external {pname} {
    variable cfig
    set pfile [lib::cfig userpref]
    if {![file exists $pfile]} { return {} }

    # have bash tell us what the value is; it is a bash file after all
    set p [open "|echo \"source ~/.myprefs ; echo -n \$$pname\" | bash" r]
    set value [read $p]
    return $value
}

if {[info commands locawyze] != {}} {locawyze pref}


