#Run this before using the wyatt basic library
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

package require Tclx
if {[info exists ::env(WYLIB_SITELIB)] && $::env(WYLIB_SITELIB) != {}} {package require $::env(WYLIB_SITELIB)}

namespace eval lib {
    variable cfig

    set cfig(resdir)	"/usr/etc/wyatt"	;#find local resources here
    set cfig(sharedir)	"/usr/etc/wyatt/share"	;#all shared files here
    set cfig(appdir)	"$::env(HOME)/.wyatt"
    set cfig(workdir)	"/tmp/wyatt-[id user]"
    set cfig(imgdir)	"$wylib_library/images"
    set cfig(bugrpt)	"/bin/mail -s Bug_Report wyatt@localhost"

    if {[info exists ::env(WYLIB_APPNAME)]} {
        set cfig(appname)	$::env(WYLIB_APPNAME)
    } else {
        set cfig(appname)	"[file tail [lindex [split [read_file /proc/self/cmdline] \000] 1]]"
    }
}

# Update auto_path
#------------------------------------------
#echo lib:$wylib_library
if {[info exists auto_path] && [string compare {} $wylib_library] && [lsearch -exact $auto_path $wylib_library] < 0} {
    lappend auto_path $wylib_library
}

#puts "auto_path:$auto_path"
source $wylib_library/lib.tcl		;#always load lib module
if {![file exists $lib::cfig(appdir)]}  {system "mkdir $lib::cfig(appdir)"}
if {![file exists $lib::cfig(workdir)]} {system "mkdir $lib::cfig(workdir)"}

# Run the rest of the file only if in TK
#------------------------------------------
if {[info commands tk] == {}} return

#puts "tcl_pkgPath:$tcl_pkgPath"
# Put wrappers around the standard widgets
foreach w {keys w button canvas checkbutton entry frame label listbox menu menubutton radiobutton text message scale} {
    source $wylib_library/w$w.tcl
    if {[info commands locawyze] != {}} {locawyze $w}

    set cf [string toupper [string range $w 0 0]][string range $w 1 end]
#puts "cf:$cf Leave:[bind $cf <Leave>]\nMotion:[bind $cf <Motion>]"
    bind $cf <Leave>	{+help::leave %W}
    bind $cf <Motion>	{+help::motion %W}
}

# Always load these modules
foreach w {dia help} {source $wylib_library/$w.tcl}
    
catch {rename send {}}		;#disable remote sends by default
event add <<SelAll>> <Control-a>
event add <<Undo>> <Control-z>
event add <<Redo>> <Control-b>

# Background error handler
#------------------------------------------
proc bgerror {err} {
    global errorInfo
    set info $errorInfo

    if {[dia::ask "Error:\n$err" 0 {Review Error Report} {Ignore}] < 0} return
    set msg "Please read the error message right after the \"Stack Trace:\" below.\nIf you think you simply operated the program incorrectly, please do not send the bug report.  But if you think the program is not functioning properly, please type a detailed explanation of exactly how to make the error happen.  Then send the report:\n\nHow to reproduce this error: \n\nStack Trace:\n\n$info"
    set omsg $msg
    while 1 {
        if {![edwin::edwin .bug_msg -init yes -wrap word -dest msg -abort Cancel -commit {Send This Window as a Bug Report} -wait yes -title {Please enter the bug report message} -insert 4.end]} return
        if {$omsg != $msg} break
        dia::brief {You need to type an explanation before sending}
    }
    set fp [open "|$lib::cfig(bugrpt)" w]
    puts $fp "Bug report from [id user] in [. cget -class]:\nUser Comment:\n$msg\nError Message:$err\nInfo:$info"
    close $fp
    dia::brief {The error has been reported}
}
