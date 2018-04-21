# Procedures related to command line processing
#------------------------------------------
#Copyright WyattERP, all other rights reserved
#provides: argproc prargs argform unabbrev argnorm xswitch xswitchs swores swexp
package provide wylib 0.33

#Process command line arguments
#------------------------------------------
#Obsolete, depricate this procedures:
#Process command line arguments normally passed into a tcl procedure
#------------------------------------------
proc argproc {svar av exps {def 1}} {
#puts "svar:$svar av:$av exps:$exps def:$def"
    foreach earg $exps {			;#set defaults
        lassign $earg s v p			;#get switch, default, procedure
        set es($s) 1				;#remember expected switch
        set ep($s) $p				;#remember procedure name
        if {!$def || [llength $earg] <= 1 || $s == {*}} continue
#puts "set [subst $svar] \[subst \{$v\}\]"
        uplevel 1 "set [subst $svar] \[subst \{$v\}\]"
    }
    set n 0
    foreach {s v} $av {				;#for each actual switch
        incr n
        if {[string range $s 0 0] != {-}} {error {In program} "Expected switch, got: $s"}
        set s [string range $s 1 end]		;#lose -
        if {[info exists es($s)]} {		;#if expected switch
            set si $s				;#look for expected procedure
        } else {
            if {![info exists es(*)]} {error {In program} "Unexpected switch: -$s"}
#puts "Generic proc: $ep(*) s:$s v:$v svar:$svar"
            set si {*}				;#look for default procedure
        }
        if {$ep($si) == {}} {			;#if no procedure
#puts "Set [subst $svar] \[subst \{$v\}\]"
            uplevel 1 "set [subst $svar] \{$v\}"
        } else {
#puts "SET [subst $svar] \[eval [subst $ep($si)]\]"
            uplevel 1 "set [subst $svar] \[[subst $ep($si)]\]"
        }
    }
    return $n
}

#Handle command line parameters passed into the main application
#sspec: what to do with switches (-switch value)
#aspec: what to do with anticipated arguments (value)
#espec: what to do with extra arguments (value)
#------------------------------------------
proc prargs {argv sspec {aspec {}} {espec {}}} {
    set acnt 0
#puts "argc:$argc: argv:$argv:"
    set argc [llength $argv]
    for {set i 0} {$i < $argc} {incr i} {
        set arg [lindex $argv $i]
        if {![regexp -- {^-} $arg]} {		;#if regular arg, assign it
            if {[llength $aspec] <= $acnt} {
                if {$espec == {}} {
                    error {On command line} "Unexpected parameter: $arg"
                } else {
                    regsub -all -- {%v} $espec $arg cmd
#puts "espec:$espec arg:$arg cmd:$cmd"
                }
            } else {
                regsub -all -- {%v} [lindex $aspec $acnt] $arg cmd
                incr acnt
            }
        } else {				;#else a switch
            if {[regexp -- {^-icon*} $arg]} {
                set cmd {wm iconify .}
                continue
            }
            set cmd {}
            foreach {s c} $sspec {
#puts "cmp:^$s.*:$arg: c:$c"
                if {[regexp -- "^$s.*" $arg]} {
#puts "regsub -all {%v} $c \[lindex $argv \[incr i\]\] cmd"
                    if {[regexp -- {%v} $c]} {
                        regsub -all {&} [lindex $argv [incr i]] {\\\&} subspec	;#in case argument has &'s in it
#puts "subspec:$subspec"
                        regsub -all {%v} $c $subspec cmd
                    } else {
                        set cmd $c
                    }
                    break;
                }
            }
            if {$cmd == {}} {error {On command line} "Unrecognized Switch: $arg"}
        }
#puts "cmd:$cmd"
        uplevel "$cmd"
    }
}

# Find shortcut arguments (missing their switch) and add it in
#------------------------------------------
proc argform {switches av} {
    upvar $av args
    set slen [llength $switches]
    set alen [llength $args]
    for {set s 0; set a 0} {$s < $slen && $a < $alen} {incr a 2} {
        if {[string range [lindex $args $a] 0 0] != {-} || [llength [lindex $args $a]] > 1} {
            set args [linsert $args $a -[lindex $switches $s]]
            incr alen
            incr s
        }
    }
}

# Correct an abbreviated value
#------------------------------------------
proc unabbrev {switches arg} {
    set arln [string length $arg]
#puts "arg:$arg arln:$arln"
    foreach rec $switches {
        lassign $rec full len std
        if {$std == {}} {set std $full}
#puts "$arg == $std"
        if {$arg == $std} break
#puts "$arln >= $len && $arg == [string range $full 0 [expr $arln - 1]]"
        if {$arln >= $len && $arg == [string range $full 0 [expr $arln - 1]]} {
            return $std
        }
    }
    return $arg
}

# Find abbreviated (or longer) switches and substitute their standard form
#------------------------------------------
proc argnorm {switches av} {
    upvar $av args
    set anum [llength $args]
    for {set a 0} {$a < $anum} {incr a 2} {
        if {[string range [set arg [lindex $args $a]] 0 0] != {-}} continue
        set arg [string range $arg 1 end]
        if {[set farg [unabbrev $switches $arg]] != $arg} {
            set args [lreplace $args $a $a -$farg]
        }
    }
}

# Extract a switch and its value from an argument list
#------------------------------------------
proc xswitch {sw av {vv {}} {sv {}} {rm 1}} {
    upvar $av alist
    if {$vv != {}} {upvar $vv val}
    if {[set si [lsearch -regexp $alist "^-($sw)$"]] < 0} {return {}}
#    if {[set si [lsearch -regexp $alist "^-([swexp $sw])\$"]] < 0} {return {}}
    if {$sv != {}} {upvar $sv asw; set asw [lindex $alist $si]}
    set vi [expr $si + 1]
    set val [lindex $alist $vi]
    if {$rm} {set alist [lreplace $alist $si $vi]}
    return $val
}

# Call above repeatedly until all matching switches have been extracted
#------------------------------------------
proc xswitchs {sw av {vv {}}} {
    upvar $av alist
    set retval {}

#Fails if non-last switch value is {}:
#    while {[set x [uplevel xswitch $sw $av $vv]] != {}} {
#        set retval $x
#    }

#This keeps going as long as target switches remain in command line:
    while {[lcontain $alist "-$sw"]} {
        set retval [uplevel xswitch $sw $av $vv]
    }
    return $retval
}

# Set a value from a command line switch or from a resource if it exists
#------------------------------------------
proc swores {w av vv swar {init 1}} {
    upvar $av args
    foreach s $swar {
        regsub -- {%s} $vv $s cfnam
        upvar $cfnam cfig
        xswitchs $s args cfig
        if {![info exists cfig]} {
            if {[set o [option get $w $s {}]] != {} || $init} {
                set cfig $o
            }
        }
    }
}

# Produce RE matching string from switch specification (textv<ariable>)
#------------------------------------------
proc swexp {s} {
    lassign [split $s {%/<>}] base ext
    foreach c [concat {{}} [regexp -all -inline -- {\w} $ext]] {
        lappend rlist [append base $c]
    }
    return [join $rlist |]
}

#Obsolete?
# A switch statement with automatic partial matching for cmd line switches
#------------------------------------------
#proc swcase {s lst} {
#    foreach {val cmd} $lst {
#puts "s:$s val:[swexp $val]"
#        if {$val == {default}} {
#            set defcmd $cmd
#        } elseif {[regexp -- "^-([swexp $val])\$" $s]} {
#            uplevel $cmd
#            return
#        }
#    }
#    uplevel $defcmd
#}
