# Create a frame (a megabar) containing menus, buttons or other widgets
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- how to have help for each menu item
#X- accumulate helps for menu entries (how to deal with tearoffs/separators)
#X- make wbutton
#X- make dew widget
#X- fix vertical packing of buttons
#X- try adding a dew into an mbar
#X- integrate shortcut buttons into mbar
#X- test hierarchical nature (nested widgets)
#- Should the mi,mb widget subcommands be replaced by -mi,-mb switches to
#  allow the processing of multiple item adds (and better syntax generally)?
#- write doc.mbar
#- what if shortcut defined for submenu item (launch tearoff?)
#- global characteristics for menu items, buttons, spent's
#- 

namespace eval mbar {
    namespace export mbar
    variable cfig
    variable v
}

option add *Mbar.relief raised widgetDefault
option add *Mbar.borderWidth 1 widgetDefault
option add *Mbar*Button.borderWidth 1 widgetDefault
option add *Mbar*Button.borderWidth 1 widgetDefault
option add *Mbar.Menubutton.padX 5 widgetDefault
option add *Mbar.Menubutton.padY 1 widgetDefault
option add *Mbar.Menubutton.background {#c0c0c0} widgetDefault

# Pack/place the component into the widget
#------------------------------------------
proc mbar::gmc {w def gmc} {
    if {![regexp -- {%w} $gmc]} {set gmc "$def $gmc"}
    regsub -all %w $gmc $w gmc
#puts "gmc:$gmc"
    eval $gmc
}

# Add and pack an arbitrary sub-widget into a menu bar
#------------------------------------------
proc mbar::s_add {w type tag args} {
    variable cfig
#puts "S_add w:$w tag:$tag args:$args"
    set s $w.$tag
#    set args [lassign $args type]
#do we want to limit types?
#    if {![lcontain {frame label canvas text listbox} $type]} {error "Invalid mbar sub-widget type: $type"}
    set gmc [xswitchs gmc args]
    eval $type $s $args
    gmc $s $cfig($w:gmc.s) $gmc
}

# Add a button into a menu bar
#------------------------------------------
proc mbar::b_add {w tag args} {
    variable cfig
#puts "B_add w:$w tag:$tag args:$args"
    argform {text command help} args
    set b $w.$tag
    set gmc [xswitchs gmc args]
    eval button $b $args
#puts "gmc $b $cfig($w:gmc.b) $gmc"
    gmc $b $cfig($w:gmc.b) $gmc
}

# Process before and after switches
#------------------------------------------
proc mbar::befaft {m anam} {
    upvar $anam args
    set cmd add
#puts "befaft m:$m args:$args"
    argnorm {{before 3 bef} {after 3 aft}} args
    if {[set bef [xswitchs bef args]] != {}} {
        set idx [$m index $bef]
        if {$idx == 0 && [$m cget -tearoff]} {incr idx}		;#-before can't result in 0 or item will be where tearoff is
        set cmd "insert $idx"
    }
    if {[set aft [xswitchs aft args]] != {}} {set cmd "insert [expr [$m index $aft] + 1]"}
#puts "cmd:$cmd"
    return $cmd
}

# Add an item into a menu
#------------------------------------------
proc mbar::mi_add {m tag args} {
    variable cfig
#puts "MI_add m:${m}([winfo class $m]) tag:$tag"
    if {[winfo class $m] == {Menubutton}} {set m $m.m}	;#if trying to add to the menubutton, move to the menu
    set type {command}
    if {$tag == {sep}} {		;#special tagname "sep" shortcut for -type separator
        lassign separator type tag
    }
    argform {text command help postcommand menu} args
    argnorm {{help 3} {hotkey 3 hot} {text 3} {command 3} {help 3} {type 2} {postcommand 4 post} {menu 4}} args
    if {$type != {separator} && ![lcontain $args -text]} {lappend args -text [cap_first $tag]}
    foreach i {help hot} {set $i [xswitchs $i args]}
    foreach i {type post} {xswitchs $i args $i}
    set cmd [befaft $m args]

#    regsub -all -- -text $args -label args	;#this breaks if -text is inside one of the args
    set label [xswitchs text args]		;#honor either -text or -label switch
    xswitchs label args label

    set w $m; while {[winfo class $w] != {Mbar} && $w != {.}} {set w [join [lreplace [split $w .] end end] .]}
    if {[set s [xswitchs s args]] != {} && $w != {.}} {		;#shortcut button
        set type [unabbrev {{checkbutton 3}} $type]
        argform {text command help} s		;#expand
        set text [xswitchs text s]
        if {$type == {checkbutton}} {
            argnorm {{variable 3} {command 3}} args
            set var [xswitchs variable args]	;#extract variable name
            if {$var != {}} {lappend args -variable $var; set var [list -variable $var]}
            set com [xswitchs command args]	;#extract command name
            if {$com != {}} {lappend args -command $com; set com [list -command $com]}
            eval s_add $w checkbutton $tag [list -padx 1 -gmc {-padx 0} -help $help -text $text] $var $com $s
            
        } elseif {$type == {cascade}} {
            set pstc {}
            if {$post != {}} {set pstc [list -postcommand $post]}
            eval mb_add $w $tag [list -padx 1 -gmc {-padx 0} -help $help -text $text] $pstc $s
        } else {
            eval b_add $w $tag [list -padx 1 -gmc {-padx 0} -help $help -command "$m invoke $tag" -text $text] $s
        }
        lappend args -sb $w.$tag
        append label " ($text)"		;#append shortcut button label
    }
    if {$hot != {}} {
        regsub -- {^C\-} $hot Control- h
        regsub -- {^A\-} $h Alt- h
        regsub -- {semicolon} $hot \; hot
        regsub -- {colon} $hot : hot
        set top [winfo toplevel .[lindex [split $m .] 1]]
#puts "bind $top <$h> \"$m invoke $tag\""
        bind $top <$h> "$m invoke $tag"
        set hot [list -accelerator $hot]
    }
    if {$type == {separator}} {
        eval $m $cmd $type $tag $hot $args
    } else {
        # fix all 'menu' entries
        set menc [xswitchs menu args]
        if {$menc != {}} {
            regsub -all %t $menc $m menc
            set menc [list -menu [eval $menc]]
        }
#puts "$m $cmd $type $tag $hot $menc $args [list -label $label -help $help]"
        eval $m $cmd $type $tag $hot $menc $args [list -label $label -help $help]
    }
}

# Process a list of sub-menus or menu-items
#------------------------------------------
proc mbar::smmi_lst {m mis} {
    menu $m
    foreach {s v} $mis {
        if {$s == {-mb}} {eval mb_add $m $v} else {eval mi_add $m $v}
    }
}

# Add a sub-menu into an existing menu
#------------------------------------------
proc mbar::sm_add {w tag args} {
    variable cfig
#puts "SM_add w:${w}([winfo class $w]) tag:$tag args:$args"
    argnorm {{menu 2}} args
    if {![lcontain $args -text]} {lappend args -text [cap_first $tag]}
    regsub -all -- -text $args -label args
    set mis {}; foreach s {mb mi} {
        while {[xswitch $s args v] != {}} {lappend mis -$s $v}
    }
    set m $w.$tag			;#default name for submenu
    xswitchs menu args m		;#if user specified a menu
    set cmd [befaft $w args]
    eval $w $cmd cascade $tag -menu $m $args
    smmi_lst $m $mis
}

# Add a menubutton (or a submenu) into a menu bar
#------------------------------------------
proc mbar::mb_add {w tag args} {
    variable cfig
#puts "MB_add w:${w}([winfo class $w]) tag:$tag args:$args"
    argform {text help postcommand} args
    argnorm {{text 3} {help 3} {postcommand 4}} args
#puts "args:$args:"
    if {![lcontain $args -text]} {lappend args -text [cap_first $tag]}
#puts "Args:$args:"
    if {[winfo class $w] == {Menu}} {return [eval sm_add $w $tag $args]}

    set mis {}
    while {[xswitch {mb|mi} args v s] != {}} {lappend mis $s $v}

    set m [set mb $w.$tag].m
    set gmc [xswitch gmc args]
    set post [xswitch postcommand args]
#puts "menubutton $mb -menu $m $args"
    eval menubutton $mb -menu \$m $args
#puts "gmc $mb $cfig($w:gmc.m) $gmc"
    gmc $mb $cfig($w:gmc.m) $gmc
    smmi_lst $m $mis
    if {$post != {}} {
        regsub -all %t $post $mb post
#puts "$m configure -postcommand $post"
        $m configure -postcommand $post
    }
}

# No runtime switches for mbar so local cget,configure not needed (yet)
#------------------------------------------
proc mbar::cget {w args} {}
proc mbar::configure {w args} {}

# Create a menu bar
#------------------------------------------
proc mbar::mbar {w args} {
    variable cfig
    variable v

    set mis {}
    while {[xswitch {b|mb|s} args v s] != {}} {lappend mis $s $v}	;#grab buttons from switches
    set cfig($w:gmc) {pack %w -side left}
    if {[regexp -- {%w} [set gmc [xswitch gmc args]]]} {set cfig($w:gmc) $gmc} else {append cfig($w:gmc) " $gmc"}
    array set cfig [list $w:gmc.s $cfig($w:gmc) $w:gmc.b "$cfig($w:gmc) -fill x -in $w._b" $w:gmc.m "$cfig($w:gmc) -padx 5 -before $w._b" $w:gmc.bf "$cfig($w:gmc) -fill both -exp 1"]
    foreach s {gmc.s gmc.b gmc.m gmc.bf} {
        if {[set gmc [xswitch $s args]] == {}} continue
        if {[regexp -- {%w} $gmc]} {set cfig($w:$s) $gmc} else {set cfig($w:$s) "$cfig($w:gmc) $gmc"}
    }
    if {[winfo exists $w]} {eval $w configure $args} else {eval frame $w -class Mbar $args}
    widginit $w mbar *$w
        
    frame $w._b		;#shortcut button frame
    gmc $w._b $cfig($w:gmc.bf) {}
    foreach {s v} $mis {
        if {[regexp -- {^-(b|mb|s)$} $s junk sw]} {eval ${sw}_add \$w $v} else {error "Invalid mbar component type: $s"}
    }
    return $w
}

# Widget command
#------------------------------------------
proc mbar::wcmd {w cmd args} {
    set cmd [unabbrev {{button 1 b} {subwidget 2 s} {menubutton 5 mb} {preferences 4 pref}} $cmd]
    switch -exact $cmd {
        {s}		{return [eval s_add $w $args]}
        {b}		{return [eval b_add $w $args]}
        {mb}		{return [eval mb_add $w $args]}
        {w}		{return $w}
        {pref}		{return {}}
        {default}	{
#puts "trying sub: $w.$cmd args:$args"
            if {![winfo exists $w.$cmd]} {return [eval _$w $cmd $args]}	;#give to frame handler
            while 1 {
                set w $w.$cmd			;#try subwidget
                set args [lassign $args cmd]	;#shift args
                if {[lcontain {sm mi} $cmd]} {return [eval ${cmd}_add $w $args]}
                if {![winfo exists $w.$cmd]} {return [eval $w $cmd $args]}	;#give to menu/menubutton/etc handler
            }
        }
    }
}

bind Mbar <Leave>	{+help::leave %W}
bind Mbar <Motion>	{+help::motion %W}
