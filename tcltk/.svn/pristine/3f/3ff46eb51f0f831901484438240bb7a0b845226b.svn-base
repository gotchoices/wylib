#Record and play back native widget commands
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- This is not finished or working at all
#- 
#- Make a toplevel with record/play buttons
#- link into ww::hook function
#- Save macro in a text window
#- Save to file
#- 
#- SPECS:
#- Quickly define/execute a working macro on the fly (memorize)
#- Save the macro for later load/invocation
#- Should we display the text of the macro? (perhaps optionally)
#- Allow for a macro menu item to be easily added into any menu where wanted
#- Is it forbidden to record/play macro events in the macro toplevel?
#- Show in toplevel:
#-   Record / play buttons
#-   Options for load/save
#-   Expandable window to show text of macro
#- 

namespace eval macro {
    namespace export macro
    variable cfig
    variable v
    set cfig(swar) {{top 1} {title 2} {parent 2 par}}
}

#Create the toplevel macro window and initialize it
#------------------------------------------
proc macro::show {w} {
    variable v
#puts "w:$w sho:$v(sho$w)"
    if {$v(sho$w)} {
        pack $w.t -side bottom
    } else {
        pack forget $w.t
    }
}

#Create the toplevel macro window and initialize it
#------------------------------------------
proc macro::macro {w args} {
    variable cfig
    variable v

    argform {parent} args
    argnorm $cfig(swar) args
    array set cfig "top$w 1 par$w . title$w {Macro Manager:}"
    foreach s {title top par} {xswitchs $s args cfig($s$w)}

    if {$cfig(top$w)} {
        if {[winfo exists $w]} {raise $w; focus [$w.sr fnd e w]; return}
        eval toplevel $w -class Macro $args
#        wm transient $w $cfig(par$w)
        wm iconname $w Search
        wm title $w $cfig(title$w)
#FIXME: we should fetch last geometry from prefs module
#        if {$cfig($w:geom) != {}} {wm geometry $w $cfig($w:geom)}
    } else {
        eval wframe::_frame $w -class Macro $args
    }
    mbar::mbar $w.m -relief raised -help {Menu functions for creating, storing and executing pre-defined macro sequences}
    $w.m mb file -under 0 -help {Functions for storing and recalling macros}\
        -mi "save {Save Macro} {macro::save $w} {Write the current macro to a file} -hot C-s"\
        -mi "save {Save Macro As} {macro::saveas $w} {Write the current macro as a new file} -hot C-S"\
        -mi "load {Load Macro} {macro::load} {Fetch a macro from a file into the macro workspace} -hot C-o"\
        -mi "clr  {Clear} {macro::clear} {Delete the current working macro (workspace)}"
    $w.m mb macro -under 0 -help {Functions for creating and executing macros}\
        -mi "rec {Record Macro} {macro::rec $w} {Start memorizing user actions to form a new macro} -s {Record -bg pink}"\
        -mi "run {Run Macro} {macro::run} {Run (execute) the currently defined macro sequence} -s {Run -bg lightblue}"\
        -mi "checkbutton sho {Show Codes} {macro::show $w} {Show/hide the codes that make up the macro} -variable macro::v(sho$w)"
    $w.m mb help -help {View help information} -gmc {-side right}\
        -mi {mac {Macros} {help::XXX macros} {View macro help information about macros}}
    if {$cfig(top$w)} {
        $w.m file mi cls {Close} "destroy $w" {Close this window} -hot C-w
        bind $w <Control-w> "destroy $w"
    }
    dew::dew $w.e ent {Current:} -textv macro::v(cur$w)
    text $w.t
    pack $w.m $w.e -side top -fill x -exp 1

#    bind [set se [$w.sr fnd e w]] <Return> "macro::find $w"
#    bind $se <Shift-Return> "macro::find $w"
#    bind $se <Control-Return> "set macro::cfig(until$w) {}; macro::find $w -back \[expr !\$macro::cfig(back$w)\]"
#    bind $se <FocusIn> "set macro::cfig(fbd$w) \[$w.b fnd cget -def\]; $w.b fnd configure -def active"
#    bind $se <FocusOut> "$w.b fnd configure -def \$macro::cfig(fbd$w)"
#    focus $se

#    bind [set re [$w.sr rep e w]] <Return> "macro::rep $w"
#    bind $re <Shift-Return> "macro::rep $w -all 1"
#    bind $re <FocusIn> "set macro::cfig(rbd$w) \[$w.b rep cget -def\]; $w.b rep configure -def active"
#    bind $re <FocusOut> "$w.b rep configure -def \$macro::cfig(rbd$w)"

#    foreach i [wtext::movers] {bind $w $i "macro::moveterm $w $i %A %W"}
#    foreach i {<Escape> <Control-bracketleft>} {bind $w $i "focus $cfig(par$w)"}

#    if {$cfig(place$w)} {dia::place $w -xo -40 -yo 20}
}

#The widget command
#w:		widget name
#command:	the basic command
#args:		the rest of the arguments
#------------------------------------------
proc macro::wcmd {w cmd args} {
#puts "wcmd:$w cmd:$cmd args:$args"
    switch -exact $cmd {
        {replace}	{return [eval __$w rep $args]}
        {find}		{return [eval __$w find $args]}
        {configure}	{return [eval __$w configure $args]}
        {cget}		{return [eval __$w cget $args]}
        {default}	{error "$w: Unknown command: $cmd"}
    }
}
