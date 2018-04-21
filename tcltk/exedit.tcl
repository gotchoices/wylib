# Call an external editor on a chunk of data.  Do some action each time the
# user saves the file
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

namespace eval exedit {
    namespace export exedit
    set cfig(editor)		$::env(EDITOR)
}

# Call when the editor closes
#------------------------------------------
proc exedit::done {w} {
    variable cfig
    variable v
    set junk [read $cfig(fd$w)]	;#empty the pipe
#puts "Editor Finished:[eof $cfig(fd$w)]:$junk:"
    close $cfig(fd$w)
    file delete $v(dfile$w)
    set isdiff [catch {exec /usr/bin/diff -q $v(wfile$w) $v(wfile$w).org}]
    writeval $w [read_file $v(wfile$w)]		;#read the data
}

# Call when chars can be read from the editor
#------------------------------------------
proc exedit::readable {w} {
    variable cfig
    variable v
#puts "readable:$w"
    fconfigure $cfig(fd$w) -blocking no		;#don't block on reads
    writeval $w [read $cfig(fd$w)]			;#read the data
}

# Call when chars can be read from the editor
#------------------------------------------
proc exedit::writeval {w data} {
    variable cfig
#puts "dest:$cfig(dest$w) data:$data:"
    if {$cfig(dest$w) != {}} {		;#dest must be a global variable
        set $cfig(dest$w) $data
    }
    if {$cfig(proc$w) != {}} {$cfig(proc$w) $data}
}

# Start an editor and feed it data to edit
#------------------------------------------
proc exedit::exedit {w data args} {
    variable cfig
    variable v

    argproc cfig(\$s$w) $args {{fname exedit-workfile} {pipe 0} {par .} {editor $cfig(editor)} {dest {}} {proc {}}}
    set fname [translit { } _ $cfig(fname$w)]
#puts "data:$data:"

    set wfile [set v(wfile$w) $lib::cfig(workdir)/$fname]
    if {[regexp -- {%f} $cfig(editor$w)]} {
        regsub -all {%t} $cfig(editor$w) $wfile cmd
    } else {
        set cmd "$cfig(editor$w) $wfile"
    }

    if {$cfig(pipe$w)} {	;#if running editor on a data pipe
        file delete $wfile
        system "mkfifo $wfile"			;#pipe for the data
#puts "open |$cmd"
        open |$cmd			;#start the editor
        write_file $wfile $data
        sleep 1					;#wait before read mode
        set cfig(fd$w) [open $wfile r+]		;#open the work file
        fileevent $cfig(fd$w) readable "exedit::readable $w"	;#alarm when editor writes
    } else {			;#else we trigger on editor terminate
        set dfile [set v(dfile$w) $lib::cfig(workdir)/$fname.done]
        set fp [open $wfile w]; puts -nonewline $fp $data; close $fp
#        write_file $wfile $data	;#seems to add newlines
        file copy -force $wfile $wfile.org	;#keep unmodified copy
        file delete $dfile
        system "mkfifo $dfile"			;#make a pipe
        set cfig(fd$w) [open $dfile r+]		;#open it
        fconfigure $cfig(fd$w) -blocking no	;#don't block on reads
        fileevent $cfig(fd$w) readable "exedit::done $w"	;#call when editor done
        set cmd "{ $cmd ; echo DONE >>$dfile } &"
#puts "cmd:$cmd"
        system $cmd
    }
}
