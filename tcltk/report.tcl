# Run custom reports in a text window
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- how does print/spell/search get into proper menus
#X- how to store chunklets of report for running later
#X- how to automatically re-run report on master dbe reload
#X- how to include dbe at top of report
#X- make hyperlink for drilling (rather than parsing data line)
#- how to include a graph with the report?
#- why is etext::smiley still green after first report run?
#- 

option add *Report*Text.width 180 widgetDefault
option add *Report*Text.height 80 widgetDefault

namespace eval report {
    namespace export report padlines linkbind
    variable cfig
    
    set cfig(swar) {{tag 2} {procedure 2 proc} {header 2} {text 2} {query 2} {menu 2} {passedarguments 2 pargs} {editarguments 2 eargs} {see 1} {run 2} {mode 2} {reuse 2} {links 2}}
    set cfig(sdef) {menu {Report:} run yes reuse no links link}
    set cfig(sblk) {pargs eargs see header mode}
    set cfig(workdir)        [lib::cfig workdir]
}

# Pad a string to be the given number of lines long
#-----------------------------------------------------
proc report::padlines {v lines} {
    for {set i [llength [split $v "\n"]]} {$i < $lines} {incr i} {
        append v "\n"
    }
    return $v
}

# Open a report toplevel window
# This is called indirectly by the application as the report procedure itself
#-----------------------------------------------------
proc report::new_win {tag name args} {
    variable cfig
#puts "new_win tag:$tag name:$name args:$args"
    if {$args == {w}} {			;#common error
        error "Report functions should have a tag different from the function name"
    }
    foreach sw {run reuse} {xswitchs $sw args cfig($sw.$tag)}	;#override certain defined switch values

    set cfig(cargs.$tag) $args		;#arguments from calling program
    if {$cfig(reuse.$tag) && ![catch {$tag w} w]} {	;#if window found and we want to reuse it
        raise $w
        if {$cfig(run.$tag)} {report::run $w}
    } else {						;#else create a new one
        set w [top::top $tag -build "report::build_win %w $tag" -title {Report:} -reopen "$name $args"]
    }
}

# Jump here when a hot link is pressed in the report
#-----------------------------------------------------
proc report::link {w lkname idx} {
    variable cfig
#puts "link! w:$w lkname:$lkname idx:$idx next:[$w.edit tag nextrange $lkname $idx] prev:[$w.edit tag prevrange $lkname $idx]"
    lassign [split $idx .] y x
    set linktext {}
    foreach name [$w.edit tag names $idx] {				;# Scan for a tag containing metadata
        if {[regexp {^data:(.*)} $name junk linktext]}  break         
    }
    if { $linktext == {} } { 					;# Otherwise use the link text itself
        lassign [$w.edit tag prevrange $lkname $idx] idx1 idx2
        set linktext [$w.edit get $idx1 $idx2]
#puts "    idx1:$idx1 idx2:$idx2 linktext:$linktext"
    }
    event generate $w.edit "<<[cap_first $lkname]>>" -x $x -y $y -data $linktext
}

# Populate a report toplevel window with its text widget and other optional items
# This is called by top after making a new window
#-----------------------------------------------------
proc report::build_win {w tag} {
    variable cfig

    set cfig(tag$w) $tag
#puts "header:$cfig(header.$tag)"
    if {$cfig(header.$tag) != {}} {
        top::add [eval mdew::mdew $w.head [translit "\n" { } $cfig(header.$tag)]]
        pack $w.head -side top -fill x
        foreach t [$w.head tags] {
#puts "w:$w tag:$tag style:[$w.head field $t cget style]"
            if {[$w.head field $t cget style] == {ent}} {
                bind [$w.head field $t e w] <<Ok>> "report::run $w"
            }
        }
    }
    
    top::add [eval etext::etext $w.edit -menu $w.m $cfig(eargs.$tag) -mode txt]		;#eargs are any args to be applied to the editing window
    if {"$cfig(mode.$tag)" != {lout}} {
        pack $w.edit -side top -fill both -exp 1
    }

    #Provide a default tag for hyperlinks (user routine will have to bind it to something)
    set curs [$w.edit cget -cursor]
    foreach lk $cfig(links.$tag) {
        set args [lassign $lk tag]				;# tag is required as first parameter
#        argform {command color} args				;# can also supply optional arguments
#        argnorm {{command 3} {color 3} {help 1}} args
#        lassign {blue {} {} {This word contains an active link}} color command data help
#        foreach s {command color help} {xswitchs $s args $s}
#        $w.edit tag configure $tag -foreground $color
        argform {command config} args				;# can also supply optional arguments
        argnorm {{command 3} {config 3} {help 1}} args
        lassign {{-foreground blue} {} {} {This word contains an active link}} config command data help
        foreach s {command config help} {xswitchs $s args $s}
        $w.edit tag configure $tag {*}$config
        $w.edit tag bind $tag <Enter> "$w.edit configure -cursor top_left_arrow"
        $w.edit tag bind $tag <Leave> "$w.edit configure -cursor $curs; help::leave %W"
        $w.edit tag bind $tag <Motion> "help::motion %W"
        $w.edit tag bind $tag <1> "report::link $w $tag \[$w.edit index @%x,%y\]"
        if {$command != {}} { bind $w.edit "<<[cap_first $tag]>>" $command }
#FIXME: Help module doesn't yet support content help for widget objects. 
    }
    
    $w.edit tag configure red -foreground red		;#tag for negative numbers

    top::add $w.obey -alias "report::obey $w"

    $w menu file mi save	{Save Named Settings}	"report::save $w" -under 0 {Save the configurable settings currently in the report header} -before import
    $w menu file mi load	{Load Named Settings}	"report::load $w" -s {Load -bg pink} -under 0 {Restore named settings in the report header which have been previously saved} -before import
    $w menu file mi sep -before import

    $w menu tools mi run	{Run Report}	"report::run $w"	-s {Run -bg lightgreen -bd 2 -gmc {-fill x -exp 1}}	{Re-execute the report}
    $w menu tools mi arun	{Auto Run}	-type checkbutton	-s Auto -variable report::cfig(run.$tag) -help {Automatically run the report each time this window is opened, or when the entry it is linked to changes its data.}
    $w menu tools mi see	{Show End}	-type checkbutton	-variable report::cfig(see.$tag) -offvalue {1.0} -onvalue {end} -help {Automatically run the report each time this window is opened, or when the entry it is linked to changes its data.}
#    $w menu tools mi print	{Print Report}	"$w.edit menu invoke pr" -s {Print}	{Print the report}
    $w menu help mi rhelp	{Using Reports}	"help::locate report" -help {Get help using this window (reports)} -before app
    if {$cfig(run.$tag)} {after idle "report::run $w"}
    return 1
}

# When a new value is loaded in a master dbe, re-run the report
#-----------------------------------------------------
proc report::obey {w args} {
    variable cfig
    if {$cfig(run.$cfig(tag$w))} {
#puts "report::obey w:$w args:$args"
        run $w		;#throw away the args from the master dbe (we already know its name)
    }
}

# Run the script to generate the report
#-----------------------------------------------------
proc report::run {w} {
    variable cfig

#puts "run $w tag:$cfig(tag$w)"
    set tag $cfig(tag$w)
    set textstate [$w.edit text cget -state]
    set yview [lindex [$w.edit yview] 0]
    $w.edit text configure -state normal
    $w.edit clear
    lib::cwatch [$w.edit w]
    foreach {type chunk} $cfig(chunks.$tag) {	;#load up the query chunklets
#puts "type:$type chunk:$chunk"
        if {"$cfig(mode.$tag)" != {lout}} {
            switch -- $type {
                {-text} {			;#insert a string (with substitution)
#puts "text:$chunk"
                    eval $w.edit text insert end $chunk
                
                }
                {-query} {			;#run a query
                    lassign $chunk query fmt
#puts "query:$query $fmt"
                    set pgres [sql::exe [subst $query]]
                    set cnt [pg_result $pgres -numTuples]
                    for {set i 0} {$i < $cnt} {incr i} {
                        set res [pg_result $pgres -getTuple $i]
                        $w.edit text insert end "[eval "format \{$fmt\} $res"]\n" ;#"
                    }
                    pg_result $pgres -clear
                }
                {-proc} {			;#call a procedure which returns text
#puts "pargs:$cfig(pargs.$tag) cargs:$cfig(cargs.$tag)"
                    set fargs [concat _tw _hw $cfig(pargs.$tag)]	;#add passed arguments so the function can know the name of the text widget and header widget
                    proc temp_proc $fargs $chunk			;#make a procedure from the code chunk
#puts "[list proc temp_proc $fargs [info body temp_proc]]"
                    $w.edit text insert end [eval temp_proc \$w.edit \$w.head $cfig(cargs.$tag)]	;#and execute it
                }
                default {dia::err "Unknown report chunk type: $type"}
            }
        } else {
            set fargs [concat _tw _hw $cfig(pargs.$tag)]        ;#add passed arguments so the function can know the name of the text widget and header widget
            proc temp_proc $fargs $chunk                        ;#make a procedure from the code chunk

            # create a lout file
            set lfile $cfig(workdir)/report$w.lout
            set pfile $cfig(workdir)/report$w.ps
            set fp [open $lfile w+]
            puts $fp [eval temp_proc \$w.edit \$w.head $cfig(cargs.$tag)]
            close $fp

            # display the lout file via ghostview
            lout::parse $lfile $pfile
            lout::preview -file $pfile
        }
    }
    
    lib::cnorm [$w.edit w]
    $w.edit yview moveto $yview
#        $w.edit text configure -state $textstate
    if {$cfig(see.$tag) != {}} {$w.edit text see $cfig(see.$tag)}
}

#Launch a command from the window
#------------------------------------------
proc report::launch {w} {
    variable cfig
    
    if {$cfig(launchcmd$w) == {}} return
    lassign [split [$w.t.text index insert] .] linenum col
    set line [$w.t.text get $linenum.0 $linenum.end]
#puts "linenum:$linenum line:$line"
    lib::cwatch $w.t.text
    eval $cfig(launchcmd$w) \{$line\}
    after 1000 "lib::cnorm $w.t.text"
}

# Define a procedure or a group of procedures/queries/code-bits for a report
#----------------------------------------------------
proc report::report {name args} {
    variable cfig

    argform {pargs proc} args
    argnorm $cfig(swar) args
    if {[set tag [xswitchs tag args]] == {}} {
        regsub -all {::} $name {_} tag
        if {$tag == $name} {set tag ${name}_tag}	;#make sure tag is different from name
    }
    foreach {s va} $cfig(sdef) {set cfig($s.$tag) $va; xswitchs $s args cfig($s.$tag)}
    foreach s $cfig(sblk) {set cfig($s.$tag) [xswitchs $s args]}

    set cfig(chunks.$tag) $args		;#any arguments left should constitute code chunks to produce the report
#puts "tag:$tag pargs:$cfig(pargs.$tag) chunks:$cfig(chunks.$tag)"

    uplevel #0 [list proc $name args "eval report::new_win $tag $name \$args"]		;#the procedure that opens the report window
#puts "name:$name body:[info body $name]:"
}

# Format a single line of a report with possible links
#----------------------------------------------------
proc report::line {rec fmtlist {links {}} {totals {}} {redneg {}} {totvar {}}} {
    if {$totvar != {}} {upvar $totvar tots}

    for {set f 0} {$f < [llength $fmtlist]} {incr f} {	;#for each field
        set fmt [lindex $fmtlist $f]
        set val [string trim [lindex $rec $f]]
#debug f fmt val
        if {$f != 0} {lappend elarr " [format $fmt $val]"} else {lappend elarr [format $fmt $val]}
        if {[lcontain $links $f]} {
            lappend elarr link
        } elseif {[lcontain $redneg $f] && [string is double -strict $val] && $val < 0} {
            lappend elarr red
        } else {
            lappend elarr {}
        }

        if {[lcontain $totals $f]} {
            if {![info exists tots($f)]} {set tots($f) 0.00}
            if {$val != {}} {set tots($f) [rpn $tots($f) $val +]}
        }
    }
    lappend elarr "\n" {}
    return $elarr
}

# A helper function to format the results of a query and insert them into a report window
#----------------------------------------------------
proc report::query {tw hdrlist fmtlist query args} {
    argform {links totals} args
    argnorm {{links 1} {totals 1} {hyperlink 1 hyp} {balance 1 bal} {forward 1 fwd} {rednegatives 1 reds}} args
    foreach s {links totals hyp bal reds} {set $s [xswitchs $s args]}
    lassign {0.00} fwd
    foreach s {fwd} {xswitchs $s args $s}
#puts "Query:$query"

    lappend elarr "[eval format \$fmtlist $hdrlist]\n" {}

    set results [sql::qlist $query]		;#Tk chokes on large text windows
#    if {[llength $results] > 60000} {dia::err "Sorry, query result size ([llength $results]) too large to fit in GUI window"; return 0}
    
    foreach rec $results {				;#for each record
        if {$bal != {}} {				;#if running-balance field specified
            set amt [lindex $rec $bal]
            if {$amt == {}} {set amt 0.00}
#debug fwd amt
            set fwd [rpn $fwd $amt +]
            set rec [lreplace $rec $bal $bal [comma_dollar $fwd]] ;#replace the list element with a running balance
        }
        eval lappend elarr [line $rec $fmtlist $links $totals $reds tots]
    }
#update; puts "elarr:[llength $elarr]"
    if {[llength $totals] > 0 && [info exists tots([lindex $totals 0])]} {
        for {set f 0} {$f < [llength $fmtlist]} {incr f} {	;#for each field
#update; puts "f:$f"
            if {$f == 0} {
                set val {Totals}
            } elseif {![lcontain $totals $f]} {
                set val {}
            } else {
                set val [comma_dollar $tots($f)]
            }
            set fmt [lindex $fmtlist $f]
#update; puts "val:$val fmt:$fmt"
            if {$f != 0} {lappend elarr { } {}}
            lappend elarr [format $fmt $val] {}
        }
        lappend elarr "\n" {}
    }
    if {[winfo exists $tw]} {
        eval $tw insert end $elarr
        if {$hyp != {}} {bind $tw <<Link>> "report::linkcall $tw %x %y $hyp"}
    } else {
        return $elarr
    }
}

# Manually establish a link binding on the window
#----------------------------------------------------
proc report::linkbind {tw args} {
    bind $tw <<Link>> "eval report::linkcall $tw %x %y $args"
}

# A helper function to find the value of a hyperlink and call a procedure on it
#----------------------------------------------------
proc report::linkcall {tw x y args} {
#puts "linkcall tw:$tw x:$x y:$y args:$args"

    lassign [$tw tag prevrange link $y.$x] idx1 idx2
    set linktext [string trim [$tw get $idx1 $idx2]]
#puts "    idx1:$idx1 idx2:$idx2 linktext:$linktext"
    lib::cwait $tw
    eval $args \$linktext
    lib::cnorm $tw
}

# Save the header values to a file
#----------------------------------------------------
proc report::save {w} {
    variable cfig
    puts "save w:$w tag:$cfig(tag$w) h:[$w head get]"

    if {[dia::dia .save_report -but {OK Cancel} -def 0 -message {Save Settings As:} -place p -par {} -dest ans -pre 1 -entry mdew::mdew \
        -f {stag	ent	10      {1 1}	{Name:}} \
        -f {desc	ent	32	{1 2}	{Description:}}] < 0} return
#puts "ans:$ans"
    lassign $ans t1 stag t2 desc
    if {![regexp {^[a-zA-Z_~0-9]+$} $stag]} {
        dia::err {Please use only alphanumeric characters (and _ or ~) for the settings name}
        return
    }
#debug stag desc
    set fname [file join [lib::cfig appdir] $cfig(tag$w).$stag.rps]
    write_file $fname [list $stag $desc [$w head get]]
}

# Load the header values from a file
#----------------------------------------------------
proc report::load {w} {
    variable cfig
#puts "load w:$w h:[$w head w]"
    
    set slist {}
    foreach file [lsort [glob -nocomplain -types f [file join [lib::cfig appdir] $cfig(tag$w).*.rps]]] {
#debug file
        lassign [read_file $file] stag desc settings
        lappend slist [list $stag $desc $settings]
    }
    if {[llength $slist] <= 0} {
        dia::brief {No named settings found} 600
        return
    }
#debug slist
    if {[scm::dia {Select saved settings:} rep_named -dest ans -token settings -f stag -f desc -f settings -data $slist] < 0} return
#debug res ans                
    eval $w head set $ans
}
