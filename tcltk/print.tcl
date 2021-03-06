# Print text from a variety of sources
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- save/restore prefs
#X- optional preview textbox
#X- top/left margin settings?
#X- auto-die after print
#X- set fields to default first time
#
#Later:
#- handle postscript files correctly (email/preview)
#- this is all a very OS-dependent
#- 

namespace eval print {
    namespace export print grab
    variable cfig
    variable v
    
    set cfig(import)	{/usr/bin/import}	;#for printing to file
    set cfig(viewer)	{/usr/bin/gimp}		;#for viewing print file
    set cfig(prcmd)	{/usr/bin/lpr}
    set cfig(defcmd)	{mpage -2 -PP}
    set cfig(email)	{/bin/mail}
    set cfig(fax)	{}
    proc printer_list {} {return [print::printers]}		;#sitelib can return more/other printers

    set cfig(swar) {{title 2} {field 2} {data 2} {command 2} {file 2} {die 2} {initialize 2 init}}
    set cfig(sdef) {title {Please select a print destination:} die 1}
    set cfig(sblk) {data file command}
    
    set cfig(mdew) {\
      -f [list prchk	rad	0	{0 1}	{Print}		-variable print::v(dest$t) -value print -command "print::radio $t" {Check this button to direct the printout to a printer}]\
      -f [list prname	ent	4	{1 1}	{Printer:}	-spf scm -data [list -title {Select a printer:} -f name -f description -token name -eval print::printer_list] {The name of the printer to print on}]\
      -f [list copies	ent	2	{2 1}	{Copies:}	-init 1 -spin {int {0 99}} -just r {How many copies to print}]\
      -f [list option	ent	20	{3 1}	{Options:}	-spf "print::options $w %v" {Special printing options that apply to this printer}]\
      -f [list tofchk	rad	0	{0 2}	{To File}	-variable print::v(dest$t) -value tofile -command "print::radio $t" {Check this button to direct the printout to a file}]\
      -f [list tofile	ent	45	{1 2 3}	{Filename:}	-spf fil {The name of the file where this printout should be sent}]\
      -f [list emchk	rad	0	{0 3}	{To Email}	-variable print::v(dest$t) -value email -command "print::radio $t" {Check this button to direct the printout to an email address}]\
      -f [list email	ent	16	{1 3 2}	{Address:}		{An email address where this printout should be sent}]\
      -f [list subject	ent	24	{3 3}	{Subject:}		{A subject to include on the email when it is sent}]\
      -f [list faxchk	rad	0	{0 4}	{To FAX}	-variable print::v(dest$t) -value fax -command "print::radio $t" {Check this button to direct the printout to a FAX number}]\
      -f [list faxnum	ent	12	{1 4 2}	{Number:}		{A FAX number where this printout should be sent}]\
      -f [list header	ent	24	{3 4}	{Header:}		{A title to put on the FAX when it is sent}]\
      -f [list cmdchk	rad	0	{0 5}	{With Cmd}	-variable print::v(dest$t) -value wcmd -command "print::radio $t" {Check this button to direct (pipe) the printout to a UNIX command you specify}]\
      -f [list command	ent	60	{1 5 3}	{Command:}	-init $print::cfig(defcmd) {A shell command line to use for processing this printout}]\
      -f [list tmarg	ent	2	{1 7}	{Top Margin:}	-textvariable print::v(tmarg$t) -init 2 -just r -spin "int {0 20} -command {print::doprint $w 1}" {Add this many blank lines to the top of the printout}]\
      -f [list lmarg	ent	2	{2 7}	{Left Margin:}	-textvariable print::v(lmarg$t) -init 2 -just r -spin "int {0 20} -command {print::doprint $w 1}" {Add this many blank columns to the left side of the printout}]\
      -f [list wrap	ent	3	{3 7}	{Wrapping:}	-textvariable print::v(wrap$t) -init 120 -just r -spin "int {0 400} -incr 10 -command {print::doprint $w 1}" {Wrap lines (insert a line-feed) if they are longer than this many characters}]\
      -f [list frm	ent	50	{0 0}	{From:}	-init [user::username] -just r -hide 1 {The from address on this emailed document}]\
    }
}


#Perform the print job
#------------------------------------------
proc print::doprint {w {prev 0}} {
    variable cfig
    variable v

    set t .$cfig(tag$w)
#puts "  doprint prev:$prev"
    if {$cfig(command$t) != {}} {set cfig(data$t) [eval $cfig(command$t)]}
    set tfile $lib::cfig(workdir)/print_tmp.txt
    if {$cfig(data$t) != {}} {
        set data $cfig(data$t)
    } elseif {$cfig(file$t) != {}} {
        set data [read_file $cfig(file$t)]
    }
        
    set data $cfig(data$t)
    set data [wrap $data $v(wrap$t)]			;#add wrapping
    set data [margins $data $v(tmarg$t) $v(lmarg$t)]	;#add margins

    if {$prev} {
        $w.t configure -state normal
        $w.t delete 0.0 end
        $w.t insert end $data
        $w.t configure -state disabled
        return
    }

    set fp [open $tfile w]; puts -nonewline $fp $data; close $fp	;#save formatted text to temp file
#puts "Printing to $v(dest$t)"
    switch $v(dest$t) {
        wcmd	{
            set cmd "cat $tfile | [$w.d get command]"
            dia::brief "Printing with user-specified command: $cmd"
            system $cmd
        }
        tofile	{
            if {[$w.d get tofile] == {}} {
                $w.d field tofile spf
                if {[set tofile [$w.d get tofile]] == {}} return
            }
            dia::brief "Printing to file"
            file copy -force $tfile [$w.d get tofile]
        }
        email	{
            if {[set email [$w.d get email]] == {}} {dia::err {You must specify an email address}; return}
            dia::brief "Emailing document to: [$w.d get email]"
            exec $cfig(email) -s [$w.d get subject] -r [$w.d get frm]@actiontarget.com $email <$tfile
        }
        fax	{
            if {$cfig(fax) == {}} {dia::err "FAX service not yet configured"; return}
            if {[set faxnum [$w.d get faxnum]] == {}} {dia::err {You must specify a FAX number}; return}
            dia::brief "FAXing document"
            exec $cfig(fax) -h [$w.d get header] $faxnum <$tfile >&/dev/null
        }
        default	{
            if {[set prname [$w.d get prname]] == {}} {dia::err {You must specify a printer}; return}
            if {[set copies [$w.d get copies]] == {}} {set copies 1}
            set cmd "$cfig(prcmd) -#$copies -P$prname [$w.d get option] $tfile"
            dia::brief "Printing with system command: $cmd"
            system $cmd
        }
    }
    if {$v(die$t)} {after idle "$cfig(tag$w) close"}
}

#Ask cups what printers are available
#------------------------------------------
proc print::printers {{excl {}}} {
    set plist {}
    foreach ln [split [exec lpstat -l -p] "\n"] {
        if {[regexp {^printer ([a-zA-Z0-9]*) } $ln junk pname]} {
        } elseif {[regexp {Location: (.*)$} $ln junk locat]} {   
            if {![lcontain $excl $pname]} {
                lappend plist [list $pname $locat]
            }
        }
    }
    return [lsort -dictionary $plist]
}

#Set/change cups options for a particular printer
#------------------------------------------
proc print::options {w varname} {
    upvar $varname uv

#puts "options:$w"
    if {[set printer [$w.d get prname]] == {}} {dia::err {Specify a printer first}; return}
    
    foreach ar $uv {				;#process existing values in field
        lassign [split $ar =] title val
        if {$val == {}} continue
        set tag [string tolower $title]
#puts "tag:$tag val:$val"
        set init($tag) $val			;#set initial values
    }
    
    set fargs {}
    foreach ln [split [exec lpoptions -p $printer -l] "\n"] {
#puts "  ln:$ln"
        lassign [split $ln :] keyhelp options
        lassign [split $keyhelp /] title help
        set tag [string tolower $title]
        set optlist {}
        set def($tag) {}
        set key($tag) $title
        foreach opt $options {
            if {[string range $opt 0 0] == {*}} {
                set def($tag) [string range $opt 1 end]
                lappend optlist [list $def($tag) (default)]
                if {![info exists init($tag)]} {set init($tag) $def($tag)}
            } else {
                lappend optlist $opt
            }
        }
        if {$def($tag) == {}} {
            lappend optlist {{} (default)}
            set init($tag) {}
        }
        lappend fargs -f [list $tag -style pdm -title ${title}: -data $optlist -init $init($tag) -help $help]
    }

#puts "fargs:$fargs"
    set options {}
    if {[eval dia::dia .print_options -but \{OK Cancel\} -message \{Select printer options:\} -def 0 -entry mdew::mdew -dest fvpairs -pre 1 $fargs] < 0} return
#puts "fvpairs:$fvpairs"
    foreach {tag val} $fvpairs {
        if {$val == $def($tag)} continue
        lappend options -o "$key($tag)=$val"
    }
#puts "options:[join $options]"
    set uv $options
}

#When a radio button selected, enable the fields associated with it
#------------------------------------------
proc print::radio {t} {
    variable cfig
    variable v
#puts "radio: t:$t dest:$v(dest$t)"

    switch $v(dest$t) {
        wcmd	{set enabs {command}}
        tofile	{set enabs {tofile}}
        email	{set enabs {email subject}}
        fax	{set enabs {faxnum header}}
        default	{set enabs {prname copies option}}
    }

    foreach tag {prname copies option tofile email subject faxnum header command} {
        if {[lcontain $enabs $tag]} {set state normal} else {set state disabled}
        $cfig(win$t).d field $tag title configure -state $state
        $cfig(win$t).d field $tag entry configure -state $state
    }
}

#Build the GUI for the print dialog (separate because we use top)
#------------------------------------------
proc print::build {w tag args} {
    variable cfig
    set t .$tag
    set cfig(win$t) $w
#puts "print::build w:$w tag:$tag t:$t $args"
    top::add [eval mdew::mdew $w.d $cfig(mdew) -relief flat] data
    pack $w.d -fill x -padx 10 -pady 10
    top::add [eval stext::stext $w.t 80 66 $args] text
    pack $w.t -fill both -exp 1
    top::add $w.print -alias "print::doprint $w"
    $w menu file mi print Print "print::doprint $w" -help {Send the printout to the desired location} -before close -s {Print -bg lightgreen -bd 2 -gmc {-fill x -exp 1}}
    $w menu file mi prev Preview "print::doprint $w 1" -help {Refresh the preview} -before close
    $w menu file mi die {Auto Close} -type checkbutton -variable print::v(die$t) -help {Close print window automatically after printing} -before close
    $w menu help mi print {Printing Text} -before 1	-command {help::locate print} -help {Instructions on using the text printing screen}
    $w.d field prchk invoke
    after idle "print::radio $t; print::doprint $w 1"
    return 1
}

#Print/email/FAX files or specified data
#------------------------------------------
proc print::print {tag args} {
    variable cfig
    variable v

#puts "print::print tag:$tag args:$args"
    set t .$tag
    argform {menu} args
    argnorm $cfig(swar) args
    foreach {s va} $cfig(sdef) {set cfig($s$t) $va; xswitchs $s args cfig($s$t)}
    foreach s $cfig(sblk) {set cfig($s$t) [xswitchs $s args]}
#puts "$t command:$cfig(command$t)"

    set iargs {}
    while {[xswitch init args init] != {}} {      ;#grab all field initializations
        lappend iargs $init
    }

    set w [top::top $tag -title $cfig(title$t) -multi 0 -build "print::build %w $tag $args"]
    if {[$w.d get prname] == {}} { ;# if it's blank, read the user's default
        set prname [pref::external myPrinter]
        $w.d set prname $prname
    }
    set cfig(tag$w) $tag
    set v(die$t) $cfig(die$t)
#puts "iargs:$iargs"
    foreach iarg $iargs {
        lassign [split $iarg =] fld val
        set val [regsub ~ $val =];# change ~ back to = so that an = can be in the val field
        $w.d set $fld $val
    }
}

# Render a postscript of a widget frame, for view/print in gimp
#------------------------------------------
proc print::grab {w args} {
    variable cfig
#puts "location: [winfo rootx $w] [winfo rooty $w] [winfo width $w] [winfo height $w]"
    set tfile [file join [lib::cfig workdir] win_grab.jpg]
    dia::brief "Please wait while launching: $cfig(viewer)"
    update			;#repaint any parts of the window disturbed by menus
    exec $cfig(import) -window root -crop "[winfo width $w]x[winfo height $w]+[winfo rootx $w]+[winfo rooty $w]" $tfile
    system "$cfig(viewer) $tfile &"
}

if {[info commands locawyze] != {}} {locawyze print}
