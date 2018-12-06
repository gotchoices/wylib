#Manage the help menu for applications
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- where to store help files for wyatt release?
#- get rid of search commands (use the ones in wtext)
#- 
#- 

namespace eval help {
    namespace export help
    variable cfig
    variable v
    set bal(lastw)	{}
    set cfig(balloons)	1
    set cfig(once)	1
    set cfig(pause)	600
    set cfig(browser)	{firefox -remote "openURL(%s, new-window)"}
    set cfig(local)	{/usr/local/share/html}
}

option add *Help.hf.txt.height 45 widgetDefault
option add *Help.hf.txt.width 80 widgetDefault
option add *Helpbal*background orchid2 widgetDefault
option add *Helpbal*wrapLength 450 widgetDefault

#------------------------------------------------------------------------------
# Display a file in a top-level text window.
proc help::display {args} {
    variable cfig

    argform {file} args
    argnorm {{file 1} {data 1}} args
    foreach s {file data} {set $s [xswitchs $s args]}
    
    if {$file != {} && [file exists $file]} {
        set data [read_file $file]
    }
    edwin::edwin [uwin .help] -dest data -readonly 1 -abort Close -commit {} -init 1 -wrap word -title {Wylib help window:}
}

# Find a standard help topic and display it
#------------------------------------------
proc help::locate {subject pick} {
    variable cfig
#debug ::wylib_library 
#debug subject
#debug pick
    set man_path {/ati}
#puts "file:[file join $man_path man html SystemManuals $subject].html"
	 if {![catch {set data [helptext::$subject]}]} {
        display -data $data
    } elseif {[file exists [file join $man_path man html SystemManuals $subject].html]} {
        eval exec [format $cfig(browser) [file join $man_path man html SystemManuals $subject].html]
    } elseif {[file exists [file join $cfig(local) $subject].html]} {
        eval exec [format $cfig(browser) [file join $cfig(local) $subject].html]
    } elseif {[regexp {^http:} $subject]} {
        eval exec [format $cfig(browser) $subject]
    } elseif {[info commands locate.local] != {}} {
        locate.local $subject $pick
    } else {
        dia::err "No help found on subject: $subject"
    }
}

#Make a default Help menu
#------------------------------------------
proc help::help {w args} {
    variable cfig
    argproc cfig(\$s) $args {{appname {This Program}} {version {}} } 
    menubutton $w -text Help -menu $w.m -under 0 -help {Find help or instructions about this program and operating environment}
    pack $w -side right -padx 10

#Make standard entries
    set m [menu $w.m]
    if {[set app [lib::cfig appname]] != {}} {
        $m add command -tag app   -label "This Application ($app)" -command "help::locate $app 0" -under 0 -help "Help instructions on how to use this program ($app)"
        $m add command -tag app   -label "All ERP Modules" -command "help::locate http://intranet.actarg.com/Documentation/SystemManuals/SystemManuals.html 0" -under 0 -help "Help instructions on all ERP Modules/Applications"
        $m add separator
        $m add command -tag about -label "About Wylib" -command "help::locate http://www.wyatt-erp.com 0" -under 0 -help {What is Wylib}
        $m add command -tag std   -label "Wylib Standard Features" -command "help::locate wylib 0" -under 0 -help {This tells how to use the various functions common to all wylib programs (programs similar to this one)}
        $m add separator
    }
#Include any site-specific help items
    if {[info commands menu.local] != {}} {menu.local $m}

    $m add checkbutton -label "Enable Help Balloons" -variable help::cfig(balloons) -help {Pop up little helps (like this one) to show how various features are used}
    $m add checkbutton -label "Show Balloon Only Once Per Entry" -variable help::cfig(once) -help "If not checked, help balloons will be more persistent (always showing somewhere)\nOtherwise, they will go away after moving the mouse slightly"
}

#Create a help balloon toplevel
#------------------------------------------
proc help::balloon {w} {
    variable cfig
    variable v
    variable bal
    set b .balloon
#puts w:$w
    if {![winfo exists $w]} return
    set txt {}
    catch {set txt [$w cget -help]}		;#if help text stored in widget
    if {[info exists v($w)]} {set txt $v($w)}	;#if help text stored in this module
#puts "txt:$txt"
    
    set mw $w
    if {[winfo class $w] == {Menu}} {
        if {[set idx [$w index active]] == {none}} {
        } elseif {[$w type $idx] == {tearoff}} {
            set txt {Tear menu off to become an independent window}
        } else {
            set mw $w:$idx
            set txt [$w entrycget $idx -help]
#puts "Menu help:$w:$idx:$txt:[$w type $idx]:"
#puts "Label:[$w entrycget $idx -label]"
        }
    } else {
        set mw $w
#puts "Help:mw:$w:"
    }
    if {$cfig(once) && $bal(lastw) == $mw} return
    set bal(lastw) $mw
    if {$txt == {}} return
    
    catch {destroy $b}
    toplevel $b -class Helpbal
    wm transient $b .
    wm overrideredirect $b 1
    label $b.l -text $txt -justify left
    pack $b.l -side top
    catch {dia::place $b -yo 20}	;#sometimes the window has disappeared before we get to it
    if {![regexp help::leave [bind $w <Destroy>]]} {bind $w <Destroy> "+help::leave $w"}
}

#We're in the widget so get ready to display a baloon
#------------------------------------------
proc help::motion {w} {
    variable bal
    variable cfig
#puts "help::motion $w"		;#class:[winfo class $w]
    if {!$cfig(balloons)} return
    catch {destroy .balloon}
    catch {after cancel $bal(aid)}
    set bal(aid) [after $cfig(pause) "help::balloon $w"]
#puts "aid:$bal(aid)"
}

#Cancel any balloons
#------------------------------------------
proc help::leave {w} {
    variable bal
    catch {
        destroy .balloon
        after cancel $bal(aid)
    }
}

#Store help text for a widget in this module (force non-wylib megawidgets to handle help balloons)
#------------------------------------------
proc help::init {w txt} {
    set help::v($w) $txt
}

if {[info commands locawyze] != {}} {locawyze help}
