# A canvas with built-in scroll bars and dynamic zooming.
# The scroll bars will automatically appear and disappear when the amount of data inside the widget would require their existence.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO
#X- Get test widget working
#X- Can draw objects on the canvas
#X- Implement right-click menu
#X-   Can capture to gimp, print
#X-   Can zoom in or out
#X- Handle buttons 4,5,6,7 for panning
#-   Can zoom to fit
#-   Can zoom to a selected box
#- Hot keys for zooming
#- Help page for canvas widget
#- Allow only certain items to be draggable
#- When dragging an item past the edge of the canvas, adjust the view automatically
#- 

option add *Scanvas.width		1000	widgetDefault
option add *Scanvas.height		500	widgetDefault
option add *Scanvas.Scrollbar.takeFocus	0	widgetDefault
option add *Scanvas.Scrollbar.width	10	widgetDefault
option add *Scanvas.auto		1	widgetDefault

namespace eval scanvas {
    namespace export scanvas drag
    variable v
    variable cfig
}

#Anytime the widget main frame is configured, reconfigure the inner component sizes
#--------------------------------
proc scanvas::fconfig {w} {
    variable cfig
    if {!$cfig(auto$w)} return
    lassign [$w.c bbox all] x1 y1 x2 y2
#puts -nonewline "fconfig w:$w bb: [$w.c bbox all]"
    set x1 [expr min(0, $x1 - $cfig(pad$w))]
    set y1 [expr min(0, $y1 - $cfig(pad$w))]
    set x2 [expr max($cfig(width$w), $x2 + $cfig(pad$w))]
    set y2 [expr max($cfig(height$w), $y2 + $cfig(pad$w))]
#puts " : x1:$x1 y1:$y1 x2:$x2 y2:$y2"

    set cfig(auto$w) 0			;#to avoid possibly recursive loop
    $w.c configure -scrollregion "$x1 $y1 $x2 $y2"
    if {[info exists cfig(childx$w)]} {
        set sr2 [$cfig(childx$w) cget -scrollregion]
        if {$sr2 == {}} {
            set y3 0
            set y4 [$cfig(childx$w) cget -height]
        } else {
            lassign $sr2 x3 y3 x4 y4
        }
        $cfig(childx$w) configure -scrollregion [list $x1 $y3 $x2 $y4] ;# change only x's
    }
    if {[info exists cfig(childy$w)]} {
        set sr2 [$cfig(childx$w) cget -scrollregion]
        if {$sr2 == {}} {
            set x3 0
            set x4 [$cfig(childx$w) cget -width]
        } else {
            lassign $sr2 x3 y3 x4 y4
        }
        $cfig(childx$w) configure -scrollregion [list $x3 $y1 $x4 $y2] ;# change only y's
    }
    update idletasks; after idle "set scanvas::cfig(auto$w) 1"

#puts "  xview: [$w xview] yview:[$w yview]"
    if {[$w.c xview] == {0.0 1.0}} {grid forget $w.xs} else {grid $w.xs -row 2 -column 0 -sticky ew}
    if {[$w.c yview] == {0.0 1.0}} {grid forget $w.ys} else {grid $w.ys -row 1 -column 1 -sticky ns}
}

# Zoom
#----------------------------------------------------
proc scanvas::zoom {w {dir {}} args} {
    variable cfig
    variable v
#puts "zoom w:$w cmd:$cfig(zoom$w) dir:$dir args:$args"
    if {$cfig(zoom$w) == {}} return
    eval $cfig(zoom$w) $dir $args
#    if {[regexp -- {%w} $cfig(zoom$w)]} {
#        set cmd "$cfig(zoom$w) [string map [list %w $w] $cfig(zoom$w)] $dir $args"
#    } else {
#        set cmd "$cfig(zoom$w) $w $dir $args"
#    }
debug cmd
#    eval $cmd
}

# Handle panning around the canvas
#----------------------------------------------------
proc scanvas::pan {w ev x y} {
    variable v
    variable cfig
    if {$ev == {start}} {
#puts "pan_start w:$w x:$x y:$y current: [$w.c find withtag current]"
        set v(lx$w) [$w.c canvasx $x]
        set v(ly$w) [$w.c canvasy $y]
    } elseif {$ev == {move}} {
#puts "pan w:$w vx:$v(lx$w) vy:$v(ly$w) x:$x y:$y"
        while {$x <= $v(lx$w) - $cfig(pand$w)} {$w xview scroll  1 unit; set v(lx$w) [expr $v(lx$w) - $cfig(pand$w)]}
        while {$x >= $v(lx$w) + $cfig(pand$w)} {$w xview scroll -1 unit; set v(lx$w) [expr $v(lx$w) + $cfig(pand$w)]}
        while {$y <= $v(ly$w) - $cfig(pand$w)} {$w yview scroll  1 unit; set v(ly$w) [expr $v(ly$w) - $cfig(pand$w)]}
        while {$y >= $v(ly$w) + $cfig(pand$w)} {$w yview scroll -1 unit; set v(ly$w) [expr $v(ly$w) + $cfig(pand$w)]}
    }
}

# Run the scroll command as normal
#----------------------------------------------------
proc scanvas::doscroll {w dir} {
    $w yview scroll $dir unit
}

# Change the main canvas scroll binding to a different command
#----------------------------------------------------
proc scanvas::scrollcmd {w cmd args} {
    bind $w.c <Button-4> "$cmd $w -1 $args"
    bind $w.c <Button-5> "$cmd $w  1 $args"
}

# Handle default drag/drop behavior (x and y are coordinates on the canvas--not necessarily the visible pane)
#----------------------------------------------------
proc scanvas::drag {w ev x y {tag current}} {
    variable v
#puts "scanvas::drag w:$w ev:$ev x:$x y:$y tag:$tag"
    if {$ev == {start}} {
        set v(cur$w) [$w.c find withtag $tag]
        set v(sx$w) $x
        set v(sy$w) $y
#puts " start w:$w x:$x y:$y current: $v(cur$w)"
    } elseif {$ev == {move}} {
#puts " move w:$w lx:$v(lx$w) ly:$v(ly$w) x:$x y:$y cur:$v(cur$w)"
        if {$v(cur$w) == {}} {
            $w.c delete _select
            $w.c create rectangle $v(sx$w) $v(sy$w) $x $y -tag _select
        } else {
            $w.c move $v(cur$w) [expr $x-$v(lx$w)] [expr $y-$v(ly$w)]
#puts "     $v(cur$w) [expr $x-$v(lx$w)] [expr $y-$v(ly$w)]"
        }
    } elseif {$ev == {end}} {
#puts " end w:$w x:$x y:$y cur:$v(cur$w)"
        if {$v(cur$w) == {}} {
            $w.c delete _select
            zoom $w box $v(sx$w) $v(sy$w) $x $y
        }
        fconfig $w
    }
    set v(lx$w) $x
    set v(ly$w) $y
}

# Create a scrolling text widget
#------------------------------------------
proc scanvas::scanvas {w args} {
    variable cfig

    argform {width height} args
    argnorm {{xargs 2} {yargs 2} {frame 2} {auto 2} {drag 2} {width 2} {height 2} {padding 3 pad} {pandelta 3 pand} {zoom 1} {childx 6} {childy 6}} args
    set frame {}
    foreach tag {frame xargs yargs} {
        while {[set $tag [xswitch $tag args]] != {}} {lappend frame $tag}
    }
    array set cfig "pad$w 5 pand$w 5 drag$w scanvas::drag"
    foreach s {pad pand drag childx childy} {xswitchs $s args cfig($s$w)}
    foreach s {zoom} {set cfig($s$w) [xswitchs $s args]}

    if {![winfo exists $w]} {eval wframe::_frame $w -class Scanvas $frame}
    widginit $w scanvas *$w
    swores $w args cfig(%s$w) {width height auto}
#puts "scanv:$w array:[array get cfig]"
    eval canvas $w.c -xscrollcommand "\"$w xset\"" -yscrollcommand "\"$w yset\"" -xscrollincrement $cfig(pand$w) -yscrollincrement $cfig(pand$w) -width $cfig(width$w) -height $cfig(height$w) $args
    if {[info exists cfig(childx$w)]} {
        $cfig(childx$w) configure -xscrollcommand "$w xsetchild" -xscrollincrement $cfig(pand$w) 
    }
    if {[info exists cfig(childy$w)]} {
        $cfig(childy$w) configure -yscrollcommand "$w ysetchild" -yscrollincrement $cfig(pand$w) 
    }
    scrollbar $w.xs -command "$w xview" -orient horizontal {*}$xargs
    scrollbar $w.ys -command "$w yview" {*}$yargs

    bind $w   <FocusIn>    "focus $w.c"			;#defer focus to text box
    bind $w.c <Configure>  "scanvas::fconfig $w"
    bind $w.c <<Modified>> "ww::modgen $w %s"		;#pass up to this widget
    bind $w.c <<Changed>>  "ww::chagen $w"

    bind $w.c <Button-1>	"$cfig(drag$w) $w start \[$w.c canvasx %x\] \[$w.c canvasy %y\]"
    bind $w.c <B1-Motion>	"$cfig(drag$w) $w move  \[$w.c canvasx %x\] \[$w.c canvasy %y\]"
    bind $w.c <ButtonRelease-1> "$cfig(drag$w) $w end   \[$w.c canvasx %x\] \[$w.c canvasy %y\]"

    bind $w.c <Button-2>	"scanvas::pan  $w start %x %y"
    bind $w.c <B2-Motion>	"scanvas::pan  $w move  %x %y"

    bind $w.c <Button-4> "$w yview scroll -1 unit"
    bind $w.c <Button-5> "$w yview scroll  1 unit"
    bind $w.ys <Button-4> "$w yview scroll -1 unit"
    bind $w.ys <Button-5> "$w yview scroll  1 unit"
    bind $w.xs <Button-4> "$w xview scroll -1 unit"
    bind $w.xs <Button-5> "$w xview scroll  1 unit"
    bind $w.c <Button> "if {%b == 6} {$w xview scroll -1 unit} elseif {%b == 7} {$w xview scroll 1 unit}"	;#buttons 6.7 don't behave normally under X

#    bind $w.c <MouseWheel> "puts w:$w x:%x y:%y"	;#windows only?

    grid columnconfigure $w 0 -weight 1
    grid rowconfigure $w 1 -weight 1
    grid $w.c   -row 1 -column 0 -sticky news
    grid $w.ys  -row 1 -column 1 -sticky ns
    grid $w.xs  -row 2 -column 0 -sticky ew

    if {$cfig(zoom$w) != {}} {
        set m [$w.c menu]
        $m add command zmin -label {Zoom In}  -command "scanvas::zoom $w +" -help {Reduce magnification of canvas view}
        $m add command zmot -label {Zoom Out} -command "scanvas::zoom $w -" -help {Reduce magnification of canvas view}
        $m add command zmft -label {Zoom Fit} -command "scanvas::zoom $w ?" -help {Set magnification as needed to show all objects on the canvas}
        $m add sep
        $m add command zrep -label {Refresh}  -command "scanvas::zoom $w" -help {Repaint the canvas as the current magnification level}
    }
    
    return $w
}

# Scroll commands that scroll main canvas and child canvases
#------------------------------------------
proc scanvas::xview {w args} {
    variable cfig
    # try to make sure we don't run over the end
    set t [lindex $args 0]
    set t1 [lindex $args 1]
    if {$t == "moveto"} {
        if {$t1 < 0.0001} { set args "moveto 0" }
        if {$t1 > .999} { set args "moveto 1" }
    } elseif {$t == "scroll"} {
        lassign [$w.c xview] x1 x2
        if {$t1 < 0 && $x1 <= 0.0001} { return }
        if {$t1 > 0 && $x2 >= .999} { return }
    }
    # run
    set ret [$w.c xview {*}$args]
    if {[info exists cfig(childx$w)]} {
        # run child
        $cfig(childx$w) xview {*}$args
    }
    # make sure we didn't run over the end
    lassign [$w.c xview] s0 s1
    if {$s0 < 0} { xview moveto 0 }
    if {$s1 > 1} { xview moveto 1 }
    if {$s0 == 0.0 && $s1 == 1.0} {
        # if we're showing everything, align it correctly
        $w.c xview moveto 0
        if {[info exists cfig(childx$w)]} {
            $cfig(childx$w) xview moveto 0
        }
    }
    # return
    return $ret
}

proc scanvas::yview {w args} {
    variable cfig
    # try to make sure we don't run over the end
    set t [lindex $args 0]
    set t1 [lindex $args 1]
    if {$t == "moveto"} {
        if {$t1 < 0.0001} { set args "moveto 0" }
        if {$t1 > 0.999} { set args "moveto 1" }
    } elseif {$t == "scroll"} {
        lassign [$w.c yview] y1 y2
        if {$t1 < 0 && $y1 <= 0.0001} { return }
        if {$t1 > 0 && $y2 >= 0.999} { return }
    }
    # run
    set ret [$w.c yview {*}$args]
    if {[info exists cfig(childy$w)]} {
        # run child
        $cfig(childy$w) yview {*}$args
    }
    # make sure we didn't run over the end
    lassign [$w.c yview] s0 s1
    if {$s0 < 0} { yview moveto 0 }
    if {$s1 > 1} { yview moveto 1 }
    if {$s0 == 0.0 && $s1 == 1.0} {
        # if we're showing everything, align it correctly
        $w.c yview moveto 0
        if {[info exists cfig(childy$w)]} {
            $cfig(childy$w) yview moveto 0
        }
    }
    # return
    return $ret
}

proc scanvas::xset {w args} {
    variable cfig
#    puts "xset"
    set ret [$w.xs set {*}$args]
#    puts "xset $w $args = $ret"
    return $ret
}

proc scanvas::yset {w args} {
    variable cfig
#    puts "yset"
    set ret [$w.ys set {*}$args]
#    puts "yset $w $args = $ret"
    return $ret
}

proc scanvas::xsetchild {w args} {
#    variable cfig
#    puts "xsetchild $args"
}

proc scanvas::ysetchild {w args} {
#    variable cfig
#    puts "ysetchild $args"
}

# Widget command
#------------------------------------------
proc scanvas::wcmd {w cmd args} {
#puts "wcmd w:$w cmd:$cmd args:$args"
    switch -exact -- [unabbrev {{frame 2} {xscroll 2} {yscroll 2} {scrollcmd 3} {doscroll 3} {canvas 1} {zoom 1}} $cmd] {
        {w}		{return $w}
        {drag}		{return [eval drag $w $args]}
        {zoom}		{return [eval zoom $w $args]}
        {xscroll}	{return [puts "xscroll" ; eval $w.xs $args]}
        {yscroll}	{return [puts "yscroll" ; eval $w.ys $args]}
        {xview}		{return [eval xview $w $args]}
        {yview}		{return [eval yview $w $args]}
        {xset}		{return [eval xset $w $args]}
        {yset}		{return [eval yset $w $args]}
        {xsetchild}	{return [eval xsetchild $w $args]}
        {ysetchild}	{return [eval ysetchild $w $args]}
        {scrollcmd}	{return [eval scrollcmd $w $args]}
        {doscroll}	{return [eval doscroll $w $args]}
        {frame}		{return [eval _$w $args]}
        {canvas}	{return [eval $w.c $args]}
        {default}	{return [eval $w.c $cmd $args]}
    }
}
