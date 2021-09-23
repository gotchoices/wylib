#Substitute for various tclx commands
package provide wylib 0.35

#Execute a command in the shell
#------------------------------------------
proc system {command} {
#This was previously implemented via Tclx.  Can we reimplement using exec?
    puts "System command not yet implemented in this wylib version"
}

#Tell if a list contains an element
#------------------------------------------
proc lcontain {list element} {
    if {[lsearch -exact $list $element] >= 0} {return true} else {return false}
}

#Grab a value off a list
#------------------------------------------
proc lvarpop {upVar {index 0}} {
    upvar 1 $upVar list
    if {![info exists list]} { return "-1" }
    set top [lindex $list $index]
    set list [lreplace $list $index $index]
    return $top
 }

#Read a file in as a string
#------------------------------------------
proc read_file {fileName args} {
    if {$fileName == "-nonewline"} {
        set flag $fileName
        set fileName [lvarpop args]
    } else {
        set flag {}
    }
    set fp [open $fileName]
    set result [eval read $flag $fp $args]
    close $fp
    return $result
} 

proc write_file {fileName args} {
    set fp [open $fileName w]
    foreach string $args {
        puts $fp $string  
    }
    close $fp
}

proc loop {var start end step {script {__none__}}} {
    upvar v $var
    if {$script == {__none__}} {set script $step; set step 1}
    for {set v $start} {$v < $end} {set v [incr v $step]} {uplevel $script}
}
