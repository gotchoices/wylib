# A text widget that includes its own built-in scroll bars.  The scroll bars
# will automatically appear and disappear when the amount of data inside the
# widget would require their existence.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO
#- 

option add *Stext.txt.width		400	widgetDefault
option add *Stext.txt.height		400	widgetDefault
option add *Stext.style			text	widgetDefault
option add *Stext.Scrollbar.takeFocus	0	widgetDefault
option add *Stext.Scrollbar.width	10	widgetDefault
option add *Stext.auto			0	widgetDefault

namespace eval stext {
    namespace export stext
    variable cfig
}

#Anytime the widget main frame is configured, reconfigure the inner component sizes
#--------------------------------
proc stext::fconfig {w} {
    variable cfig
    if {!$cfig(auto$w)} return
#puts "  xview [$w.txt xview] yview:[$w.txt yview]"
    if {[$w.txt xview] == {0 1}} {grid forget $w.xs} else {grid $w.xs -row 2 -column 0 -sticky ew}
    if {[$w.txt yview] == {0 1}} {grid forget $w.ys} else {grid $w.ys -row 1 -column 1 -sticky ns}
}

# Create a scrolling text widget
#------------------------------------------
proc stext::stext {w args} {
    variable cfig

    argform {width height} args
    argnorm {{xargs 2} {yargs 2} {frame 2} {style 2} {auto 2}} args
    set frame {}
    foreach tag {frame xargs yargs} {
        while {[set $tag [xswitch $tag args]] != {}} {lappend frame $tag}
    }

    if {![winfo exists $w]} {eval wframe::_frame $w -class Stext $frame}
    widginit $w stext *$w
    swores $w args cfig(%s$w) {style auto}
    
    eval "$cfig(style$w) $w.txt -xsc {stext::fconfig $w; $w.xs set} -ysc {stext::fconfig $w; $w.ys set}" $args
    eval "scrollbar $w.xs -command {$w.txt xview} -orient horizontal" $xargs
    eval "scrollbar $w.ys -command {$w.txt yview}" $yargs

    bind $w <FocusIn> "focus $w.txt"		;#defer focus to text box
    bind $w.txt <Configure> "stext::fconfig $w"
    bind $w.txt <<Modified>> "ww::modgen $w %s"	;#pass up to this widget
    bind $w.txt <<Changed>> "ww::chagen $w"

    grid columnconfigure $w 0 -weight 1
    grid rowconfigure $w 1 -weight 1
    grid $w.txt -row 1 -column 0 -sticky news
    grid $w.ys  -row 1 -column 1 -sticky ns
    grid $w.xs  -row 2 -column 0 -sticky ew
    
    return $w
}

# Widget command
#------------------------------------------
proc stext::wcmd {w cmd args} {
    switch -exact -- [unabbrev {{frame 2} {xscroll 2} {yscroll 2} {text 1}} $cmd] {
        {w}		{return $w}
        {xscroll}	{return [eval $w.xs $args]}
        {yscroll}	{return [eval $w.ys $args]}
        {frame}		{return [eval _$w $args]}
        {text}		{return [eval $w.txt $args]}
        {default}	{return [eval $w.txt $cmd $args]}
    }
}
