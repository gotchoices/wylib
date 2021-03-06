# This allows the user to select a filename from the file system
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- Use mlb for dirs, files
#X- Enable clicking/double clicking on files/directories
#X- Enable history from previous choices
#X- allow to type partial filename, then enter? for completion
#X- Only change directories on Enter--not /
#X- Cleanup/review parameters
#X- OK button always first
#X- Show file sizes, types (in a multi-listbox?)
#X- Breaks on second invocation
#X- Button to enable/disable hidden files
#X- Try sorting on columns (dates)
#X- instead of top, make sfile::dia (call dia.tcl)
#- Save geometry and history as prefs
#- 

option add *Sfile.l.d.width 180 widgetDefault
option add *Sfile.l.Mlb.height 300 widgetDefault
option add *Sfile.Frame.borderWidth 1 widgetDefault
option add *Sfile.Frame.relief raised widgetDefault
option add *Sfile.m.Button.padY 0 widgetDefault
option add *Sfile.m.Button.borderWidth 1 widgetDefault
option add *Sfile.l.d.width 200 30
option add *Sfile.l.f.width 400 30
option add *Sfile.l.Mlb.height 400 30

namespace eval sfile {
    namespace export sfile top get dia pref
    variable cfig	;#configuration values
    variable v		;#variables
}

# Move to the specified directory
#------------------------------------------
proc sfile::key_proc {w {key {}}} {
    variable cfig
    variable v
    set srch "$v(file$w)"
#puts "key:$key: srch:$srch"
    if {!$v(compl$w) || $srch == {}} return
    if {![string is wordchar -strict $key] && ![string is punct -strict $key]} {
#        catch {$w.f.e delete sel.first sel.last}
        return
    }
    if {!$v(compl$w)} return
    set len [[set flb [[set lb $w.l.f] column file w]] size]
#puts "Completion lb:$lb flb:$flb"
    $lb selection clear 0 end
    for {set i 0} {$i < $len} {incr i} {
        set s [$flb get $i]
#puts "srch:$srch: s:$s:"
        if {[regexp -- "^$srch" $s]} {
#puts "line:$i s:$s e:$srch"
            $w.f.e delete 0 end
            $w.f.e insert 0 $s
            $w.f.e selection range [string length $srch] end
            $lb mark $i
            $lb see $i
            break  
        }
    }
}

# Return a list of the currently selected files (full path)
#------------------------------------------
proc sfile::flist {w} {
    variable v
    set flist {}
    foreach i [$w.l.f mark ?] {
#puts "i:$i file:[$w.l.f column file get $i]"
        lappend flist "$v(cwd$w)/[$w.l.f column file get $i]"
    }
    return $flist
}

# Previous (or next) directory entry
#------------------------------------------
proc sfile::dir_hist {w {fwd -1}} {
    variable v
    incr v(didx$w) $fwd
#puts "didx:$v(didx$w) dhist:\n[join $v(dhist$w) "\n"]"
    if {$v(didx$w) < 0} {set v(didx$w) 0; return}
    set hlast [expr [llength $v(dhist$w)] - 1]
    if {$v(didx$w) > $hlast} {set v(didx$w) $hlast; return}
#puts "go:[lindex $v(dhist$w) $v(didx$w)]"
    dir_go $w [lindex $v(dhist$w) $v(didx$w)] 0
}

# Move to the specified directory
#------------------------------------------
proc sfile::dir_go {w dir {residx 1}} {
    variable v
#puts "Dir: $dir"
    if {$v(cwd$w) == {/}} {set v(cwd$w) {}}
    switch $dir {
        {/}	{set dir {/}}
        {.}	-
        {./}	{set dir "$v(cwd$w)"}
        {../}	{if {$v(cwd$w) == {}} {set dir /} else {set dir "[file dirname $v(cwd$w)]"}}
        default {
            if {[file pathtype $dir] == {relative}} {set dir "$v(cwd$w)/[string trimright $dir /]"}
        }
    }
#puts " dir:$dir"
    set v(cwd$w) $dir
    set hlast [expr [llength $v(dhist$w)] - 1]
    if {$residx} {set v(didx$w) $hlast}
    if {$v(didx$w) >= $hlast && $dir != [lindex $v(dhist$w) end]} {
        lappend v(dhist$w) $dir
        set v(didx$w) [expr [llength $v(dhist$w)] - 1]
    }
    if {![lcontain $v(dsave$w) $dir]} {lappend v(dsave$w) $dir}
    load $w
}

# Display directories and files in current location
#------------------------------------------
proc sfile::load {w} {
    lib::cwatch $w
    load_dirs $w
    load_files $w
    lib::cnorm $w
}

# Load directories into select box
#------------------------------------------
proc sfile::load_dirs {w} {
    variable cfig
    variable v
    
    proc diritems {d} {
        if {[catch {readdir $d} res]} {
            set items {?}
        } else {
            set items [llength $res]
        }
        return $items
    }

    set d $w.l.d
    set dlist [glob -nocomplain -types d "$v(cwd$w)/*" "$v(cwd$w)/.."]
    if {$v(hidden$w)} {eval lappend dlist [glob -nocomplain -types d "$v(cwd$w)/.*"]}
    set dirs {}
    foreach file [lsort -unique $dlist] {
        if {[file tail $file] != {.}} {lappend dirs [list [file tail $file]/ [diritems $file]]}
    }
    $d reset
    eval $d insert end $dirs

    set dm $cfig(dmenu$w)
    $dm delete 1 end
    set dirs {}
    if {[info exists ::env(HOME)]} {lappend dirs $::env(HOME)}
#puts "cwd:$v(cwd$w)"
    for {set rem $v(cwd$w); set last {}} {$rem != $last} {set rem [file dirname $rem]} {
        set dirs [concat [list $rem] $dirs]
        set last $rem
#puts "rem:$rem"
    }
#puts "dirs:$dirs"
    foreach dir [lsort -unique $dirs] {$dm add command -label $dir -command "sfile::dir_go $w $dir"}
    $dm add separator
    foreach dir $v(dsave$w) {$dm add command -label $dir -command "sfile::dir_go $w $dir"}
}

# Load files select box
#------------------------------------------
proc sfile::load_files {w} {
    variable cfig
    variable v

    set files [lsort -unique [glob -nocomplain -types {f l p s} "$v(cwd$w)/$v(mask$w)"]]
    if {$v(hidden$w)} {eval lappend files [glob -nocomplain -types {f l p s} "$v(cwd$w)/.$v(mask$w)"]}
#puts "disp:[$w.l.f display]"
    if {[lcontain [$w.l.f display] type]} {
        set types [osdep::filetypes $files]
    } else {
        set types {}
    }
    set i 0
    set recs {}
    foreach file $files {
#puts "file:$file"
        catch {lappend recs [list [file tail $file] [file size $file] [date::date_tim [file mtime $file]] [lindex $types $i]]}
        incr i
    }
    [set f $w.l.f] reset
    if {[llength $recs] > 0} {
        eval $f insert end $recs
        after idle "$f resize size; $f resize type"
    }
}

# Yield/restore preferences
#------------------------------------------
proc sfile::pref {w args} {
    variable cfig
    variable v
    if {[llength $args] > 0} {eval pref::restore $args; return}
    
    set parr {}
    lappend parr [eval list dir pref [$w.l.d pref]]
    lappend parr [eval list dir configure -width [$w.l.d cget -width]]
    lappend parr [eval list file pref [$w.l.f pref]]
#    lappend parr [eval list file configure -width [$w.l.f cget -width]]
#puts "sfile Dump $w pref:[join $parr "\n"]"
    return $parr
}

# Start by looking at a particular file
#------------------------------------------
proc sfile::setfile {w fpath} {
    variable cfig
    variable v

    set first [lindex $fpath 0]
    dir_go $w [file dirname $first]
    set v(file$w) [file tail $first]
    return $v(file$w)
}

# Fetch the currently selected file (full file path)
#------------------------------------------
proc sfile::getfile {w} {
    variable cfig
    variable v

    set lb $w.l.f
    set sel [$lb curselection]
    if {$cfig(force$w) && $sel != {}} {set v(file$w) [$lb column file get [lindex $sel 0]]}
    if {$cfig(ext$w) != {} && [file extension $v(file$w)] == {}} {append v(file$w) $cfig(ext$w)}

    if {[file pathtype $v(file$w)] == {relative}} {	;#if relative path given
        set prefix "$v(cwd$w)/"				;#prepend current directory
    } else {
        set prefix {})					;#else take given file literally
    }
    if {$cfig(check$w) && ![file exists $v(file$w)]} {dia::err "File: $v(file$w) not found"; return {}}
    if {[lcontain {single browse} [$lb column cget -selectmode]]} {
        return $prefix$v(file$w)			;#return a single filename
    }
    set rets {}
    foreach i $sel {lappend rets "$prefix[$lb column file get $i]"}	;#return list of filenames
    return $rets
}

# Build a widget that will display files in the filesystem
#------------------------------------------
proc sfile::sfile {w args} {
    variable cfig
    variable v

#puts "sfile args:$args"
    argnorm {{complete 2 compl} {operation 2 op} {label 2} frame 2 fr {extension 2 ext} {wait 1} {initialize 2 init} {mask 2} {title 2} {directory 2 dir} {load 2} {force 2} {check 2} {geometry 2 geom}} args
    array set cfig "op$w OK wait$w 1 mask$w * load$w 1 force$w 0 check$w 0 label$w Filename: compl$w 1 geom$w 500x500"
    foreach s {ext dir title} {set cfig($s$w) [xswitchs $s args]}
    foreach s {op wait init mask load force check label compl geom} {xswitchs $s args cfig($s$w)}
    set fr {}; while {[set x [xswitch fr args]] != {}} {append fr { } $x}

    if {[winfo exists $w]} {eval $w configure $fr} else {eval wframe::_frame $w -class Sfile $fr}
    widginit $w sfile *$w

    if {$cfig(title$w) != {}} {
        label $w.t -text $cfig(title$w); pack $w.t -side top -anchor w
    }
    if {[info exists cfig(init$w)]} {
        set first [lindex $cfig(init$w) 0]
        set v(file$w) [file tail $first]
        set v(cwd$w) [file dirname $first]
debug first v(file$w) v(cwd$w)
#        after idle "sfile::key_proc $w"
    }
    if {$cfig(dir$w) != {}} {set v(cwd$w) $cfig(dir$w)}
    if {![info exists v(cwd$w)] || [file pathtype $v(cwd$w)] == {relative}} {set v(cwd$w) [pwd]}

    set v(mask$w) $cfig(mask$w)
    set v(dsave$w) {}
    set v(dhist$w) $v(cwd$w)
    set v(didx$w) 0
    set v(hidden$w) 0
    set v(compl$w) $cfig(compl$w)
    
#puts "cwd:$v(cwd$w) mask:$v(mask$w)"
    foreach f {m l d f} {frame $w.$f}	;#dir hist, mask, lists, filename
    if {$cfig(label$w) != {}} {pack $w.f -side bottom -fill x}
    pack $w.m $w.d -side top -fill x
    pack $w.l -side top -fill both -exp 1

    mlb::mlb $w.l.d \
      -f {folder -w 150				-help {Folders (directories) in the current directory}} \
      -f {items	 -w 40 -just r -sort int	-help {How many files in this folder}}
    eval mlb::mlb $w.l.f {\
      -f {file -w 100				-help {Name of the file}} \
      -f {size -w 30 -just r -sort int		-help {Size of the file in bytes}} \
      -f {date -w 72 -sort date			-help {When the file last modified}} \
      -f {type -w 200				-help {What type of data the file contains}}\
    } $args
    sizer::sizer $w.l.d_f $w.l.d -o v -size 4
    pack $w.l.d $w.l.d_f -side left -fill y
    pack $w.l.f -side left -fill both -exp 1

    $w.l.d bind <Double-1> "sfile::dir_go $w \[lindex \[$w.l.d get @%x,%y\] 0\]"
    $w.l.f bind <Button-1> "set sfile::v(file$w) \[lindex \[$w.l.f get @%x,%y\] 0\]"
    $w.l.f bind <Double-1> "event generate $w <<Ok>>"	;#the user says OK
	
    button $w.m.l -text Filter: -command "sfile::load_files $w" -pady 0 -padx 3 -anchor w -width 12 -bd 1 -help {Rescan the directory for files matching this pattern}
    pack $w.m.l -side left
    entry $w.m.e -relief sunken -textv sfile::v(mask$w) -help {Only show files that match this wildcard pattern}
    bind $w.m.e <Return> "puts HI; sfile::load_files $w"
    bind $w.m.e <KP_Enter> "puts HI; sfile::load_files $w"
#puts "bindtags:[bindtags $w.m.e]"
#    bindtags $w.m.e "$w.m.e Entry all"
    button $w.m.b -text {<<} -command "sfile::dir_hist $w"   -help {Move to the previous directory}
    button $w.m.u -text {^^} -command "sfile::dir_go $w ../" -help {Move up to the parent of the current directory}
    button $w.m.f -text {>>} -command "sfile::dir_hist $w 1" -help {Move to the next (opposite of previous) directory}
    checkbutton $w.m.h -text Hidden -variable sfile::v(hidden$w) -command "sfile::load $w" -help {Enable the display of hidden files and directories}
    checkbutton $w.m.c -text Completion -variable sfile::v(compl$w) -command "sfile::load $w" -help {Automatically complete filenames as you type them}
    pack $w.m.f $w.m.u $w.m.b $w.m.h $w.m.c -side right
    pack $w.m.e -side left -fill both -exp 1

    menubutton $w.d.l -text Directory: -menu $w.d.l.m -bd 1 -relief raised -pady 1 -anchor w -width 9 -bd 1 -indic 1 -help {Select from some commonly used directories (folders)}
    set cfig(dmenu$w) [menu $w.d.l.m]
    pack $w.d.l -side left
    entry $w.d.e -relief sunken -textv sfile::v(cwd$w) -state readonly -help {The directory from which the current list of files is taken}
    pack $w.d.e -side right -fill both -exp 1
    
    label $w.f.l -text $cfig(label$w) -anchor w -width 12; pack $w.f.l -side left
    entry $w.f.e -relief sunken -textv sfile::v(file$w) -help {The name of the file you are selecting}
    pack $w.f.e -side left -fill both -exp 1
    bind $w.f.e <Return> "event generate $w <<Ok>>"	;#the user says OK
    bind $w.f.e <KP_Enter> "event generate $w <<Ok>>"	;#the user says OK

    if {$cfig(load$w)} {after idle "sfile::load $w"}

    bind $w.f.e <Key> "sfile::key_proc $w %A"
#puts "bindtags:[bindtags $w.f.e]"
    bindtags $w.f.e "Entry $w all $w.f.e"
    return $w
}

#The widget command
#------------------------------------------
proc sfile::wcmd {w cmd args} {
    variable cfig
#puts "sfile::wcmd w:$w cmd:$cmd args:$args"
    set cmd [unabbrev {{load 2} {flist 2} {set 2} {entry 2} {cwd} {preference 2 pref}} $cmd]
    switch -exact $cmd {
        {load}		{return [eval load $w $args]}
        {flist}		{return [flist $w]}
        {pref}		{return [eval pref $w $args]}
        {set}		{return [eval setfile $w $args]}
        {get}		{return [getfile $w]}
        {dir}		{return [eval $w.l.d $args]}
        {file}		{return [eval $w.l.f $args]}
        {entry}		{return [eval $w.f.e $args]}
        {cwd}		{return $cfig(cwd$w)}
        {default}	{return [eval _$w $cmd $args]}
    }
}

# Allow to choose a file in a toplevel dialog box
#------------------------------------------
proc sfile::dia {args} {
    argform {message} args
    argnorm {{message 4 mess}} args
    set mess [xswitchs mess args]
    return [eval "dia::dia .sfile_dia -ent sfile::sfile -title \$mess" $args -uplevel 2]
}
