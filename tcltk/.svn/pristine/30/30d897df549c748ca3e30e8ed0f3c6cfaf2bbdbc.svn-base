# Manage one or more toplevel main windows.  A main window typically has a
# menu bar and remembers its geometry from one invocation to the next.  Its
# parent is typically the '.' window (which is hidden).  When the last such
# main window is closed, it will exit the application.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- close window calls
#X-   on last window closed, kill app
#X- include default menus, shortcuts
#X- allow/disallow multiple windows
#X-   show active-window radio when multiple windows enabled
#X-   fetch current active window from dot command
#- can we avoid building the toplevel window if the build command is going to fail (like on a permission error)
#- how to default a toplevel to its prefs defaults (delete its prefs file)
#- 
#- LATER:
#- Clear scratchpad is Unix dependent
#- If you create a toplevel with top::top and destory it with destroy (instead of top::closewin) it gets left in v(mains) (there is a current workaround for this in top::closewin)
#- 

namespace eval top {
    namespace export top dbep dbp closewin closeall menu
    variable cfig
    variable v
    set v(mains)	{}		;#list of current main windows
}

# don't have tearoff menus. the preference is an external preference because it needs to load very early
if {[pref::external tearOff] != "true"} { ;# default = don't tear off
    option add *Menu.tearOff 0
}

# Get configuration for an entry
#------------------------------------------
#proc top::cget {w option} {
#    variable cfig
#    argnorm $cfig(swar) option
#    set opt [string trimleft $option -]
#    if {[lcontain {highlt sum} $opt]} {return $cfig($opt$w)}
#    return [eval _$w cget $option]
#}

# Configure an existing widget
#------------------------------------------
#proc top::configure {w args} {
#    variable cfig
#    if {$args == {}} {return [_$w configure]}
#    argnorm $cfig(swar) args
#    foreach tag {highlt sum} {xswitchs $tag args cfig($tag$w)}
#    if {$args != {}} {return [eval _$w configure $args]}
#    return {}
#}

# Add a new pane for management by this toplevel
# Pass in the full path of a child window of a toplevel
#------------------------------------------
proc top::add {z args} {
    variable cfig
#puts "top::add z:$z"
    if {$z == {}} {return {}}				;#ignore if not a valid window name
    set path [join [lassign [split $z .] emp top] .]	;#path for the child window
    set w .$top						;#w is the toplevel parent

    argform {tag} args
    argnorm {{tag 2} {alias 2}} args
    if {[set tag [xswitchs tag args]] == {}} {set tag $path}	;#if no tag given, use the path as the tag
    set cfig(path.$tag$w) $path
#puts "  cfig(path.$tag$w):$cfig(path.$tag$w)"

    if {[set alias [xswitchs alias args]] != {}} {	;#this isn't a real pane--just an alias to a procedure
        proc ::$z {args} "eval $alias \$args"		;#point it to the user's procedure
    }

#puts "add w:$w tag:$tag path:$path"
    if {[lcontain $cfig(tags$w) $tag]} {error "Child: $tag already exists in window $w"; return}
    lappend cfig(tags$w) $tag
    return $z
}

# Yield/restore preferences
#------------------------------------------
proc top::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    foreach tag $cfig(tags$w) {	;#save sizes of individual panes
        set p $cfig(path.$tag$w)
#puts "top::pref tag:$tag"
        if {![winfo exists $w.$p]} continue		;#skip pseudo children

#Should we really be saving internal pane sizing?
#        lappend parr [list pane $tag configure -width [winfo width $w.$p] -height [winfo height $w.$p]]

        catch {lappend parr [eval list pane $tag pref [$w.$p pref]]}	;#if it has a prefs call...
#              lappend parr [eval list pane $tag pref [$w.$p pref]]		;#don't catch if debugging module's pref call
    }
    if {$cfig(geom$w)} {set geom [lindex [split [wm geometry $w] +] 0]}	;#if we should save this toplevel's geometry
    lappend parr [list geom $geom]		;#save toplevel geometry

#Remember that other toplevels are open and open them again next time
#puts "mains:$v(mains)"
    if {[llength $v(mains)] == 1 && [lcontain $v(mains) $w]} {	;#if this is the last main open
        set garr {}					;#geometry array
        foreach {sw va} [array get cfig reopen.*] {	;#find any other toplevels that are still open and have the -reopen flag specified
            regexp {reopen(\..*)} $sw junk wn
#puts "wn:$wn: va:$va: w:$w:"
            if {$wn == $w} continue			;#skip this main window
            set tag $cfig(tag$wn)
#puts "  still open:$wn tag:$tag oargs:$cfig(oargs.$tag)"
            if {[catch {expr $cfig(reopen$wn)}]} {		;# if its not a boolean value
                lappend parr "eval $cfig(reopen$wn)"		;# it is an explicit reopen command
            } elseif {$cfig(reopen$wn)} {
                lappend parr "eval top::top $cfig(oargs.$tag)"	;# else use the command we think was originally used
            } else {
                continue
            }

#And remember where they are on the screen
#puts "  $wn geom:[wm geometry $wn]"
            if {[regexp {([0-9])*x([0-9])*([+-][0-9]*)([+-][0-9]*)} [wm geometry $wn] junk xs ys xl yl]} {
                if {$xl != {+0} || $yl != {+0}} {	;#this has a bug: you can't specify -geometry +0+0
                    lappend garr "eval wm geometry $wn $xl$yl"
                }
            }
        }
        if {[llength $garr] > 0} {eval lappend parr $garr}
    }

#puts "Dump $w pref:$parr"
    return $parr
}

#Make a default Menu Bar
#------------------------------------------
proc top::menubar {w args} {
    variable cfig
    mbar::mbar $w
    help::help $w.help
    set top [winfo toplevel $w]
    $w mb file File -under 0 -help {A menu of common functions for this window}\
        -mi [list close {Close Window} "top::closewin $top" -hot C-w -under 0 -help {Exit this window, but not the whole program unless this is the last window open in the program}]\
        -mi sep\
        -mi {exit Exit top::closeall -hot C-q -under 1 -help {Quit and close all windows of this program}}
    $w mb edit Edit -under 0 -help {A menu of common text editing functions}\
        -mi {undo  -command {event generate [focus] <<Undo>>}  -acc C-z -under 0 -help {Try to undo the last modification}}\
        -mi {copy  -command {event generate [focus] <<Copy>>}  -acc C-c -under 0 -help {Make a copy the characters that are currently highlighted in a temporary location}}\
        -mi {cut   -command {event generate [focus] <<Cut>>}   -acc C-x -under 1 -help {Delete the characters that are currently highlighted, saving them in a temporary location}}\
        -mi {paste -command {event generate [focus] <<Paste>>} -acc C-v -under 1 -help {Recall characters saved by a cut or copy by typing them at the current cursor position}}\
        -mi sep\
        -mi {sela  {Select All} -command {event generate [focus] <<SelAll>>} -hot C-a -under 0 -help {Attempt to highlight all characters in the area where the cursor}}\
        -mi sep\
        -mi {scrat {Clear My Scratchpad Area} {if {[regexp {^/tmp/.*} $lib::cfig(workdir)]} {system /bin/rm $lib::cfig(workdir)/*}} -help {Delete temporary files on the hard disk that are used for for formatting, viewing documents, etc.}}
    return $w
}

# Close an existing window
#------------------------------------------
proc top::closewin {w} {
    variable cfig
    variable v

#puts "closing:$w tag:$cfig(tag$w) active:$v(act.$cfig(tag$w))"
    set tag $cfig(tag$w)
    if {$v(act.$tag) == $w} {			;#if this is the active window for its tag
#puts " tags:[array get cfig tag.*]"
         set sibs 0
         foreach {ix tg} [array get cfig tag.*] {;#find another one with the same tag
             lassign [split $ix .] junk wi
             if {".$wi" != $w && $tg == $tag} {
                 set v(act.$tag) .$wi		;#and mark it as the new active one
#puts "  activating: set v(act.$tag) .$wi"
                 incr sibs
             }
        }
#puts " sibs:$sibs acts:[array get v act.*]"
        if {$sibs <= 0 || ![winfo exists $v(act.$tag)]} {
#puts "last window of my kind: $w tag:$tag"
            rename ::$tag {}			;#kill the widget proc for this type
        }
    }
    if {$cfig(close$w) != {}} {eval $cfig(close$w) $w}	;#user-defined close code
    if {$cfig(restore$w)} {
        eval pref::auto $cfig(tag$w) [$w pref]	;#save preferences
    }
    set v(mains) [lremove $v(mains) $w]		;#remove me from list of mains
    foreach {sw va} [array get cfig par.*] {	;#close any child toplevels first
        regexp {par(\..*)} $sw junk ch
#puts " ch:$ch: va:$va: w:$w:"
        if {$va == $w && [winfo exists $ch]} {	;#if a windows says I am his parent
            $ch close				;#close it
        }
    }
    set exitproc $cfig(exit$w)			;#grab any user-defined exit procedure (before it is destroyed)
    destroy $w					;#then close me
#puts " mains:$v(mains)"
    foreach m $v(mains) {	;#in case any mains got destroyed without us knowing about them
        if {[winfo exists $m]} return
    }

    foreach win [winfo children .] {		;#now close any other peer windows before exiting
#puts "Found toplevel $win still open"
        catch {$win close}			;#if they don't have a close handler defined, just ignore them
    }
    if {$exitproc != {}} {eval $exitproc}	;#user-defined exit code
#puts "exitproc:$exitproc"
    exit
}

# Close all main windows (exit)
#------------------------------------------
proc top::closeall {} {
    variable cfig
    variable v
#puts "closeall mains:$v(mains)"
    foreach m $v(mains) {closewin $m}
}

# Constructor - create a new toplevel container
#------------------------------------------
proc top::top {args} {
    variable cfig
    variable v

#puts "top::top args:$args"
    set oargs $args			;#save original arguments for future window building
    argform {tag build title} args
    argnorm {{tag 2} {title 2} {parent 2 par} {multiple 2 multi} {build 2} {module 3 mod} {close 2} {menu 2} {restore 3} {main 2} {geometry 2 geom} {exit 2} {reopen 3}} args
    if {[set tag [xswitchs tag args]] == {}} {set tag {m}}	;#default window type
    set cfig(oargs.$tag) $oargs
    set w [uwin .$tag]				;#create window name
    
    array set cfig "par$w . tag$w $tag multi$w 1 main$w 0 tags$w {} mod$w [lib::cfig appname] menu$w 1 restore$w 1 geom$w 1 reopen$w 0"
    foreach s {title build close exit} {set cfig($s$w) [xswitchs $s args]}
    foreach s {par multi mod menu main reopen restore geom} {xswitchs $s args cfig($s$w)}
#puts "w:$w mod:$cfig(mod$w) close:$cfig(close$w) exit:$cfig(exit$w) title:$cfig(title$w) restore:$cfig(restore$w)"
#puts "w:$w tags:$cfig(tags$w)"
    lassign {} fr
    while {[set x [xswitch fr args]] != {}} {append fr { } $x}	;#get frame arguments

    eval toplevel $w -class Top $args
    widginit $w top *$w
    wm iconname $w $cfig(mod$w)
    wm title $w "$cfig(title$w)/$cfig(mod$w) ($w)"

    if {$cfig(build$w) == {}} {set cfig(multi$w) 0}	;#Can't have multiple windows unless there is a build function
    set cfig(par$w) [winfo toplevel $cfig(par$w)]	;#make sure parent refers to a toplevel
#    if {$cfig(par$w) != {.}} {
#        if {[winfo exists $cfig(par$w)]} {wm transient $w $cfig(par$w)}
#    }
    if {$cfig(menu$w)} {
        top::menubar $w.m
        pack $w.m -side top -exp 0 -fill x
        if {$cfig(multi$w)} {
            $w.m file mi open {New Window} "top::top $oargs" -hot C-o -under 0 -help {Open a new window just like this one} -before close
            label $w.m.al -text Act: -help {Only one of a set of similar windows can be active at one time}
            radiobutton $w.m.act -variable top::v(act.$tag) -value $w -padx 0 -help {This shows which one of a set of similar windows is active (the one to be used by default)}
            pack $w.m.act $w.m.al -side right -padx 0
        }
        $w.m edit mi prefs {Preferences} "pref::edit $cfig(mod$w)" -under 3 -help {Set preferences for this program and others in the same suite} -before scrat -hot C-semicolon
    }

    set v(act.$tag) $w			;#latest window is active one
    proc ::$tag {command args} "eval top::wcmd \$top::v(act.$tag) \$command \$args"

    if {$cfig(build$w) != {}} {			;#user function to build the frame
        if {[regexp {%w} $cfig(build$w)]} {regsub -all %w $cfig(build$w) $w cmd} else {set cmd "$cfig(build$w) $w"}
        if {![eval $cmd]} {destroy $w; return 0}
    }
#puts "build:$cfig(build$w) $w"

    wm protocol $w WM_DELETE_WINDOW "top::closewin $w"		;#save prefs on close
    if {$cfig(restore$w)} {
        eval pref $w [pref::auto $tag]				;#restore prefs now
    }
    if {$v(mains) == {} && [info commands ::__.] == {}} {	;#make '.' window invisible on first call
#puts "geom:[wm geometry .] children:[winfo children .]"
        wm withdraw .

#puts ".:[winfo width .]:[winfo height .]:[winfo reqwidth .]:[winfo reqheight .]:"
        rename ::. ::__.
        proc ::. {command args} "eval top::dot \$command \$args"	;#custom widget command for .

        if {[regexp {([0-9])*x([0-9])*([+-][0-9]*)([+-][0-9]*)} [wm geometry .] junk xs ys xl yl]} {
#puts "xs:$xs ys:$ys xl:$xl yl:$yl"
            if {$xl != {+0} || $yl != {+0}} {	;#this has a bug: you can't specify -geometry +0+0
                wm geometry $w $xl$yl		;#open first window over '.' (to respect -geometry switch location)
            }
        }

    }
    if {$cfig(main$w)} {lappend v(mains) $w}
#bind $w <Configure> "puts {config $w}"
    return $w				;#return main frame
}

# Widget command
#------------------------------------------
proc top::wcmd {w cmd args} {
    variable cfig
    variable v
#puts "top::wcmd $w $cmd $args"
    if {![winfo exists $w]} {error "Executed widget command for non-existent window: $w"}
    set cmd [unabbrev {{pane 2} {menu 2} {geometry 2 geom} {preferences 2 pref} {closewin 2} {tag 2} {configure 2}} $cmd]
    if {[lcontain {pref closewin} $cmd]} {return [top::$cmd $w {*}$args]}
    switch -exact -- $cmd {
        {w}		{return $w}
        {tag}		{return $cfig(tag$w)}
        {menu}		{return [$w.m {*}$args]}
        {geom}		{wm geometry $w {*}$args}
        {eval}		{after idle $args}
        {pane}		{
            set args [lassign $args tag]
#puts "tag:$tag $w.$cfig(path.$tag$w) $args"; flush stdout
            return [eval $w.$cfig(path.$tag$w) $args]
        }
        {default}	{
#puts "w:$w cmd:$cmd tags:$cfig(tags$w) args:$args"; flush stdout
            if {[lcontain $cfig(tags$w) $cmd]} {
                return [eval $w.$cfig(path.$cmd$w) $args]
            }
            return [eval _$w $cmd $args]
        }
    }
}

# Build a toplevel window containing a dbe and a related dbp
#------------------------------------------
proc top::dbep {z eargs pargs} {
    top::add [eval dbe::dbe $z.e -pwidget $z.p $eargs] e
    pack $z.e -side top -fill both
    top::add [eval dbp::dbp $z.p -ewidget $z.e -min 250 $pargs] p
    pack $z.p -side top -fill both -expand yes
    return 1
}

# Build a toplevel window containing a dbp
#------------------------------------------
proc top::dbp {z args} {
#puts "top::dbp z:$z args:$args"
    top::add [dbp::dbp $z.p -min 250 {*}$args] p
    pack $z.p -side top -fill both -expand yes
    return 1
}

# Build a toplevel window containing any one specified widget and its command line
#------------------------------------------
proc top::build {z args} {
#puts "top::build z:$z args:$args"
    argform {con tag} args
    argnorm {{tag 2} {constructor 2 con}} args
    foreach s {con tag} {set $s [xswitchs $s args]}
    if {$tag == {}} {set tag {widget}}
    if {$con == {}} {error "No constructor specified"}
    if {[top::add [$con $z.wid {*}$args] $tag] == {}} {return 0}
    pack $z.wid -side top -fill both -expand yes
    return 1
}

# A widget command for the main application ('.')
#--------------------------------
proc top::dot {cmd args} {
    variable cfig
    variable v
#    set cmd [unabbrev {{title 2} {sort 2} {listbox 2} {summary 2} {frame 2}} $cmd]
    switch -exact -- $cmd {
        {exit}    {top::closeall}
        {default} {return [eval __. $cmd $args]}
    }
}

# Build a procedure (named "$namespace::$tag_menu) to construct a menu item which will launch a toplevel window
# A builder routine called "$namespace::$tag_build" must exist to build the contents of the toplevel
# ns: namespace to build the command in
# tag: the command name of the builder
#--------------------------------
proc top::menu {ns tag short title help args} {
    uplevel proc [list ${ns}::${tag}_menu {m menu args} "
        argform {short title help reopen} args
        argnorm {{shortcut 2 short} {title 2} {help 2} {reopen 2}} args
        set short	{$short}
        set title	{$title}
        set help	{$help}
        set reopen	1
        foreach s {short title help} {xswitchs \$s args \$s}

        \$m \$menu mi $tag \$title -s \$short -command \"top::top $tag -title {\$title} -build {${ns}::${tag}_build %w $args} -reopen \$reopen\" -help \$help
    "]
}
