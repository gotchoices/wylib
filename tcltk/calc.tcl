#A simple calculator widget
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- add PI and some other functions
#- 

namespace eval calc {
    namespace export calc dia
    variable cfig		;#widget configuration
    variable v			;#holds dynamic values

    set cfig(barr) {{{Sto sto {Store current value}}		{Rcl rcl {Recall stored value}}	{C clr {Clear last entry}}	{AC ac {Clear entry and current function}}}
    		    {{PI pi {The constant PI (3.14...)}}	{Sin sin {Sine function}}	{Cos cos {Cosine function}}	{Tan tan {Tangent}}}
    		    {{1/x inv {Compute inverse}}		{Sqrt sqrt {Square root}}	{x^2 sqr {Value squared}}	{+/- pm {Change sign (plus or minus)}}}
    		    {{7}	{8}		{9}		{/ dv Divide}}
    		    {{4}	{5}		{6}		{* mu Multiply}}
    		    {{1}	{2}		{3}		{- mi Minus}}
    		    {{0}	{. dot Decimal}	{= eq Solve}	{+ pl Plus}}}
}

option add *Calc.d.Entry.width 24 widgetDefault
option add *Calc.d.Entry.bd 2 widgetDefault
option add *Calc.d.Entry.justify right widgetDefault
option add *Calc.d.fill none widgetDefault
option add *Calc.d.f.width 1 widgetDefault
option add *Calc.Frame.Button.width 4 widgetDefault
option add *Calc.Frame.Button.takeFocus 0 widgetDefault
#option add *Calc.Frame.Button.font 24 widgetDefault
#option add *Calc.bindret 1 widgetDefault

#Various simple function procedures
#------------------------------------------
proc calc::dot {w} {variable v; keyproc $w "."}
proc calc::pm {w} {variable v; $w assert [expr -[$w get]]}
proc calc::pl {w} {func $w +}
proc calc::mi {w} {func $w -}
proc calc::dv {w} {func $w /}
proc calc::mu {w} {func $w *}

proc calc::pi {w}	{$w set [expr asin(1) * 2]}
proc calc::sqr {w}	{$w set [expr pow([$w get],2)]}
proc calc::sqrt {w}	{$w set [expr sqrt([$w get])]}
proc calc::inv {w}	{$w set [expr 1.00 / [$w get]]}
proc calc::sin {w}	{$w set [expr sin([$w get])]}
proc calc::cos {w}	{$w set [expr cos([$w get])]}
proc calc::tan {w}	{$w set [expr tan([$w get])]}
proc calc::rcl {w}	{$w set $calc::v(mem$w)}

#Store value in memory
#------------------------------------------
proc calc::sto {w}	{
    variable v
    set v(mem$w) [$w get]
    set v(nxtclr$w) 1
}

#Register a binary function
#------------------------------------------
proc calc::func {w func} {
    variable v
#puts "func:$func"    
    if {$v(func$w) != {} && $v(nxtclr$w) == 0} {	;#if already a function and some entry done
        eq $w			;#compute the function first
    }
    set v(func$w) $func
    set v(alu$w) [$w get]
    set v(nxtclr$w) 1		;#remember to clear on next entry
}

#Equals - compute value
#------------------------------------------
proc calc::eq {w} {
    variable v

#puts "eq func:$v(func$w) val:[$w get]"
    if {$v(func$w) == {/} && [$w get] == 0} {dia::brief {Error: Can not divide by 0}; return}
    if {$v(func$w) != {}} {
        $w set [expr (1.0 * $v(alu$w)) $v(func$w) [$w get]]
    }
    set v(func$w) {}
    set v(alu$w) {}
}

#Full clear
#------------------------------------------
proc calc::ac {w} {
    variable v
    $w set		0	;#clear displayed value
    set v(alu$w)	{}	;#no stored value
    set v(func$w)	{}	;#no current function
}

#Clear entry
#------------------------------------------
proc calc::clr {w} {
    variable v
    $w assert [csubstr [$w get] 0 end]		;#kill last char
    if {[$w get] == {}} {$w set 0}
}

#Handle a key or a number input to the calculator
#------------------------------------------
proc calc::keyproc {w key} {
    variable cfig
    variable v
#puts "key:$key func:$v(func$w) nxtclr:$v(nxtclr$w)"
    if {[lcontain {+ - / *} $key]} {			;#function keys
        func $w $key
    } elseif {[string is double -strict $key] || [lcontain {. e E} $key]} {	;#numeric keys
        if {$v(nxtclr$w)} {
            $w assert $key
        } else {
            $w append $key
        }
    } elseif {[lcontain {! ~ _} $key]} {		;#change sign
        pm $w
    } elseif {$key == {=}} {				;#equals
        eq $w
    } elseif {$key == "\b"} {				;#little clear
        clr $w
    }
}

# Get configuration 
#------------------------------------------
proc calc::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
#puts "cget w:$w option:$option opt:$opt"
    if {[lcontain {title} $opt]} {return $cfig($opt$w)}
    return [eval _$w cget $option]
}

# Configure an existing widget
#------------------------------------------
proc calc::configure {w args} {
    variable cfig
    if {$args == {}} {return [_$w configure]}
    argnorm {{title 2}} args
    foreach s {title} {set cfig($s$w) [xswitch $s args]}
    if {$args != {}} {eval _$w configure $args}
    $w.t configure -text $cfig(title$w)
    set cfig(textv$w) [_$w cget -textv]		;#in case we changed it
    return {}
}

#Create an entry with calculator buttons
#------------------------------------------
proc calc::calc {w args} {
    variable cfig
    variable v

#debug args
    argform {title} args
    argnorm {{frame 2 fr} {title 2} {buttons 2 bu}} args
    array unset cfig *$w
    foreach s {fr bu} {
        set cfig($s$w) {}
        while {[set x [xswitch $s args]] != {}} {append cfig($s$w) { } $x}
    }
    eval wframe::_frame $w -class Calc $cfig(fr$w)
    widginit $w calc *$w
    swores $w args cfig(%s$w) {title}
    
    if {$cfig(title$w) != {}} {
        label $w.t -text $cfig(title$w)
        pack $w.t -side top -anchor w
    }
    frame $w.d; pack $w.d -side top		;#display
    label $w.d.ml -text M:
    entry $w.d.me -textv calc::v(mem$w) -state readonly
    label $w.d.f -textv calc::v(func$w)
    eval entry $w.d.d $args
    checkbutton $w.d.c -text C -state disabled -variable calc::v(nxtclr$w)
    pack $w.d.ml $w.d.me $w.d.f $w.d.d $w.d.c -side left

    set r 1
    foreach row $cfig(barr) {
        frame $w.r$r; pack $w.r$r -side top -fill both -exp 1
        foreach but $row {
            lassign $but lab cod help
            if {$cod == {}} {		;#if a numeric key
                set cod $lab
                set cmd "calc::keyproc $w $lab"
                set help "Enter the digit: $lab"
            } else {			;#else a function
                set cmd "calc::$cod $w"
            }
            if {$help != {}} {set hlp [list -help $help]} else {set hlp {}}
            eval button $w.r$r.$cod $cfig(bu$w) $hlp -text \$lab -command \$cmd
            pack $w.r$r.$cod -side left -exp 1 -fill both
        }
        incr r
    }
    bind $w <FocusIn> "focus $w.d.d"
    bind $w.d.d <Key> "calc::keyproc $w %A"
    foreach e {<Return> <KP_Enter>} {
        bind $w $e "calc::eq $w; event generate $w <<Ok>>"
    }
    bindtags $w.d.d "$w.d.d $w all"

    set v(mem$w) 0.0
    ac $w		;#clear all
}

# Widget command
#------------------------------------------
proc calc::wcmd {w cmd args} {
    variable cfig
    variable v
    set cmd [unabbrev {{frame 2} {get 1} {set 1} {assert 2} {store 2 sto} {recall 2 rcl} {initialize 2 init} {entry 1} {cget 2} {configure 2}} $cmd]
    if {[lcontain {dot pm pl mi dv mu pi sqr sqrt inv sto rcl} $cmd]} {return [eval calc::$cmd $w $args]}
    if {$cmd == {key}} {return [eval keyproc $w $args]}
    switch -exact $cmd {
        {w}		{return $w}
        {get}		{return [$w.d.d get]}
        {set}		{$w.d.d delete 0 end; eval $w append $args; set v(nxtclr$w) 1}
        {assert}	{$w.d.d delete 0 end; eval $w append $args; set v(nxtclr$w) 0}
        {append}	{foreach a $args {$w.d.d insert end $a};    set v(nxtclr$w) 0}
        {init}		{ac $w}
        {frame}		{return [eval _$w $args]}
        {entry}		{return [eval $w.d.d $args]}
        {cget}		{return [eval cget $w $args]}
        {configure}	{return [eval configure $w $args]}
        {default}	{return [eval $w.d.d $cmd $args]}
    }
}

#Allow user to edit a value using the calculator
#------------------------------------------
proc calc::dia {args} {
    variable defca

    argform {dest title} args
    argnorm {{destination 3 dest}} args

    return [eval dia::dia .calc_dia -ent calc::calc -place p -init 0 $args -uplevel 2]
}
