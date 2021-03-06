#Routines to format etext documents into postscript using lout
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval lout {
    namespace export quote preview parse cleanup addincl
    variable cfig
    variable gv
    variable last
    
    set cfig(incl)	[list [pwd] /usr/local/etc]	;#where to find any include files
    set cfig(loutcmd)	{lout}
    set cfig(viewer)	{evince}
    set last(lout)	{}		;#last lout filename
    set last(ps)	{}		;#last ps filename
    set gv(pid)		0		;#pid of a child gv program
    set gv(file)	{}		;#name of file gv is looking at
    set gv(fp)		0		;#file handle
}

#Add a default include directory
#------------------------------------------
proc lout::addincl {dir} {
    variable cfig
    lappend cfig(incl) $dir
}

#Do any cleanup needed before exiting
#------------------------------------------
proc lout::cleanup {} {
    variable gv
    if {$gv(pid)} {catch {kill TERM $gv(pid)}}	;#kill ghostview
}

#Preview a document
#------------------------------------------
proc lout::preview {args} {
    variable gv
    variable last
    variable cfig

    argproc ca(\$s) $args {{file $last(ps)} {wait 0}}

    if {$ca(wait)} {system "$cfig(viewer) $ca(file)"; return}
    
#puts "draft ; pid:$gv(pid)"
    if {$gv(pid) != 0} {		;#if we've started a viewer before
        if {$ca(file) == $gv(file)} {	;#if we're viewing the same file
            if {[system kill -HUP $gv(pid)] == 0} {	;#if its pid seems to exist (we just told it to reload file)
                if {[lindex [read_file "/proc/$gv(pid)/stat"] 2] != "Z"} {
                    return		;#if its not a zombie, return
                }
            }
        } else {			;#else this is a new file
            catch {kill SIGTERM $gv(pid)}	;#kill the old process
        }
    }
#puts "starting viewer"
    catch {close $gv(fp)}		;#cleanup any old zombie	
    set gv(fp) [open "|$cfig(viewer) $ca(file)"]	;#start a new viewer
    set gv(pid) [pid $gv(fp)]		;#remember its pid
    set gv(file) $ca(file)
#puts "its pid: $gv(pid)"
}

#Put double quotes around any special lout characters
# #&"/@\^{|}~
#------------------------------------------
proc lout::quote {istrg} {
#    regsub -all {"} $istrg {"\""} istrg
    regsub -all {[\\"]} $istrg {ZaChAr&} istrg
    regsub -all "\[|/\{\}@#&^~\]+" $istrg {"&"} istrg
    regsub -all {ZaChAr(.)} $istrg {"\\\1"} istrg
#    regsub -all {([^"])\\} $istrg {\1"\\\"} istrg
#    regsub -all {^\\} $istrg {"\\\"} istrg	;#at beginning of line
    return $istrg
}

#Generate a postscript file using lout (final or draft)
#------------------------------------------
#lname	name of file (lout) we're reading
#pname:	name of file (generally postscript) we're creating
#args:
#	tries:	how many retries to run lout	
#	text:	produce plain text output
#	incl:	directory to search for lout includes
proc lout::parse {lname pname args} {
    variable cfig
    variable last

    argproc ca(\$s) $args {{text no} {tries {4}} {incl $cfig(incl)}}
    set incl {}; foreach i $ca(incl) {append incl "-I$i "}
    if {$ca(text)} {set ca(text) {-p}} else {set ca(text) {}}
    pushd [file dirname $lname]		;#move to work area
    set fname [file tail $lname]
    if {$last(lout) != $lname} {file delete {lout.li}}	;#delete old cross-ref
    set last(lout) $lname
    set last(ps) $pname
    set ename "$lname.err"		;#error file
    set fatal 0				;#found fatal errors
    set error 1				;#if we found errors
    for {set tries 0} {$error} {incr tries} {
#puts "Try:$tries error:$error"
        incr error -1			;#no errors found yet
#puts "exec $cfig(loutcmd) $incl \"$lname\" > \"$pname\" 2> \"$ename\""
        if {[catch {eval "exec $cfig(loutcmd) $ca(text) $incl \"$lname\" > \"$pname\" 2> \"$ename\""}]} {
            regsub -all "\[{}\]" [read_file $ename] {\\&} err
#puts "err:$err"
            set lout_txt [read_file $lname]
            popd
            if {[dia::err "In Lout Execution:\n[string range $err 0 500]" {View Lout File}] != 0} {
                edwin::edwin .view_lout -init yes -dest lout_txt -abort Dismiss -commit {} -wait 1
            }
            return 0
        }
        set efp [open $ename r]
#puts "ln:[gets $efp]"
        set errcnt 0
        while {[set ln [gets $efp]] != {}} {		;#read error output
#puts "ln:$ln:"
            if {$ln == {}} continue			;#ignore blank lines
            if {[regexp {^lout file} $ln]} continue	;#ignore file lines
            if {$tries > $ca(tries)} {
                popd
                close $efp
                dia::err "$ln (after $tries tries)"
                return 0
            }
            if {[regexp -- {unresolved} $ln]} {
                set errcnt [max $errcnt 1]		;#note we had an error
            } elseif {!$fatal && [regexp -- {ContentsPlace} $ln]} {
                set errcnt 3		;#lout seems to need up to 2 extra passes for Table of Contents
            } elseif {$errcnt && [regexp -- {reducing|deleted|inserted} $ln]} {
            	#ignore certain errors on initial passes
            } else {
                set fatal 1
                set lout_txt [read_file $lname]
                if {[dia::ask "Warning:\nError message generated from Lout formatter:\n$ln" 0 Ignore {View Lout File}] != 0} {
                    edwin::edwin .view_lout -init yes -dest lout_txt -readonly yes -abort Dismiss -commit {} -wait 1
                    popd
                    close $efp
                    return 0
                }
            }
        }
        incr error $errcnt
        close $efp
    }
    popd				;#restore our current directory
    return 1
}

if {[info commands locawyze] != {}} {locawyze lout}

#For testing lout::quote
#set test {Here's a ! @ # $ % ^ & * ( ) _ - " : ; < > ? / \ | ~ [ ] #& \&.}
#puts {#}
#puts $test
#puts [lout::quote $test]
#set test "Sample \{ another test \} 1/4\" \& \# \@ \\\{ \\\}"
#puts $test
#puts [lout::quote $test]
