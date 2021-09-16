# Distribute documents via printer, FAX or email
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- port to wylib (help::init, etc)
#- this whole thing is messy.  The interface should probably be cleaned up
#- 
#- Can we re-write this to:
#-   Pass parameters in a cleaner way
#-   Only send one fax for the whole recipient (letter plus attachments as one file)
#-   Handle mail-merge on a list of contacts
#- 
#- Have dprompt use top::top, mbar::mbar, etc.
#- dprompt pull-down scm's should read database titles, helps
#- Generalize to handle more document types than lout and text
#- do_dist needs to accept information from the caller for a To: field on a fax cover page
#-   also Company: field
#-   also Subject: field
#-   Syntax: sendfax -x "Action Target" -c "Some comments" -r "A subject" -d "Kyle Bateman@705-9184" /tmp/t1.txt
#- 

namespace eval ddis {
    namespace export do_dist dprompt
    variable cfig
    set cfig(gifres)	{100x100}
    set cfig(printpr)	{P}
    set cfig(printcc)	{P}
    set cfig(faxcmd)	{sendfax -D}		;#hylafax
    set cfig(domain)	{localhost}
    set cfig(pdfhdr)	"\n!! ATTENTION !!\n
Some enclosures with this email may have been transmitted in Adobe Acrobat 
Format (PDF Documents).  To view PDF documents, you must obtain the FREE 
viewer software from Adobe systems via the Internet.  Please open the 
following URL in your browser to get instructions on downloading the viewer.
\nhttp://www.adobe.com/prodindex/acrobat/readstep.html\n"


# NDB - PDF stopped working with sendfax...so odd...now it's just txt and ps in the list
    set cfig(faxable)	{txt ps}	;#what can we fax (and print)
    
    set cfig(mme.gif)	{base64}	;#metasend encoding (formats we can email)
    set cfig(mme.pdf)	{base64}
    set cfig(mme.doc)	{base64}
    set cfig(mme.jpg)	{base64}
    set cfig(mme.txt)	{7bit}

    set cfig(mmc.gif)	{image/gif}	;#metasend content type
    set cfig(mmc.pdf)	{application/pdf}
    set cfig(mmc.doc)	{application/msword}
    set cfig(mmc.jpg)	{image/jpeg}
    set cfig(mmc.txt)	{text/plain}

    image create bitmap pull.dn -data "#define down_width 14\n#define down_height 8\nstatic unsigned char down_bits[] = {\n0xff, 0x3f, 0x03, 0x30, 0x06, 0x18, 0x0c, 0x0c, 0x18, 0x06, 0x30, 0x03, 0xe0, 0x01, 0xc0, 0x00};"
}

#Create a gif for each letter page
#psfile:	The file we're converting
#basefn:	Work file basename (as in: /home/fred/ati/final-ord.pg)
#------------------------------------------
proc ddis::make_gifs {psfile basefn} {
    variable cfig
    system "/bin/rm -f ${basefn}* ${basefn}*.gif"
    exec /usr/bin/gs -sDEVICE=ppmraw -dNOPAUSE -sOutputFile=${basefn}%d -q -r$cfig(gifres) $psfile -c quit
    set fnams {}
    foreach i [glob -nocomplain "${basefn}*"] {
#puts "Giffing: $i"
        exec /usr/bin/ppmtogif $i >${i}.gif 2>/dev/null
        lappend fnams ${i}.gif		;#list of file names
    }
    return $fnams
}

# Fax a number of files to a specified fax number
#------------------------------------------
proc ddis::fax_files {faxnum subject frm args} {
    variable cfig
    set flist {}

#puts "fax_files faxnum:$faxnum subject:$subject  frm: $from args:$args:"
    if {[llength $faxnum] > 1} {
        lassign $faxnum fnum fto
        set faxto "$fto@[lib::phonemap $fnum]"	;#This is dependent on Hylafax!!
    } else {
        set faxto [lib::phonemap $faxnum]
    }
    if {$subject == {}} {
        set cmd "$cfig(faxcmd) -f \$frm -d \$faxto"
    } else {
        set cmd "$cfig(faxcmd) -r \$subject -f \$frm -d \$faxto"
    }
    set i 0
    foreach f $args {		;#in case filenames have strange chars, hold off evaluation until last second
        set arg$i [lindex $args $i]
        append cmd " \$arg$i"
        incr i
    }
#puts "faxcmd:$cmd\n[subst $cmd]:"
    eval exec $cmd
    return [subst $cmd]
}
    
# Fax a piece of text to a specified fax number
#------------------------------------------
#proc ddis::fax_text {faxnum text} {
#    write_file [set fname "$lib::cfig(workdir)/tmpfax.txt"] $text
#    fax_files $faxnum $subject $fname
#}
    
# Distribute the Document to its recipient
# Control array: {{fmtcmd1 print_count fax_list} {fmtcmd2 ...}}
#------------------------------------------
proc ddis::do_dist_old {car args} {
    variable cfig
    proc output {msg} {.dp.t insert end "$msg\n"; .dp.t see end; update}
    argproc ca(\$s) $args {{output {}} {eval 1} {emlist {}} {emfmt {}} {emclist {}} {emgif 1} {empdf 1} {emtxt 1} {emreturn {}} {attcmd {}} {subject {}} {title {Distribution Progress}} {height 36} {width 132} {printpr $cfig(printpr)} {printcc $cfig(printcc)} {from {}}}
    catch {destroy .dp}
    toplevel .dp
    wm title .dp $ca(title)
    text [set t .dp.t] -width $ca(width) -height $ca(height)
    button .dp.o -text Dismiss -command "destroy .dp" -state disabled
    pack .dp.t .dp.o -expand yes -fill x
    dia::place .dp
    lib::cwatch .dp

    output $ca(output)
    lassign {0 0} didpdf i attlst attflst
    if {$ca(attcmd) != {}} {
        output "Getting attachments..."
        foreach att [eval $ca(attcmd)] {
            lassign $att file fmt tag
            if {[lcontain $cfig(faxable) $fmt]} {	;#if faxable format
                lappend attflst $file			;#add it to fax/print file list
            } else {
                output "Converting $file to PS"
                if {[set nfile [docedit::build_ps $file $fmt $file.ps ps -delete 0]] == {}} continue
                lappend attflst $nfile			;#add PS version to fax/print file list
            }
            if {![info exists cfig(mme.$fmt)]} {	;#if non-emailable format
                output "Converting $file to PDF"
                if {[set file [docedit::build_ps $file $fmt $file.pdf [set fmt pdf] -delete 0]] == {}} continue
            }
            if {$fmt == {pdf}} {output "didpdf !" ; set didpdf 1}		;#remember we have a pdf file in the list
            lappend attlst [list $file $fmt "Part [incr i]: $tag"]	;#build email attachment list
        }
        output "Attachments: \n  [join $attlst "\n  "]"
    }
#debug car
    foreach ae $car {		;#For each distribution mode
        lassign $ae fmtcmd prcnt faxlist printer

#puts "ae:$ae"
        if {$printer == {}} {set printer $ca(printpr)}
        output "Formatting document\n  $fmtcmd"
        if {$ca(eval)} {set srcfile [eval $fmtcmd]} else {set srcfile [subst $fmtcmd]}
#puts "srcfile:$srcfile"
        set fbase [file rootname $srcfile]
        if {[file extension $srcfile] == {.lout}} {
            set pfile $fbase.ps
            set tfile $fbase.txt
            if {$prcnt <= 0 && [llength $faxlist] <= 0} continue
            lout::parse $srcfile $pfile	;#format the lout file
        } else {				;#assume text format
            set tfile [set pfile $srcfile]	;#the file is a text file
        }
        for {set i 0} {$i < $prcnt} {incr i} {	;#Printed copies
	    if {$printer == {H}} {
		set cmd "/usr/bin/lpr -o Resolution=600dpi -o PageSize=Letter -o Col -o MediaType=LetterFirst -o RICollate=true -o RIOrientOvr=Portrait -P$printer $pfile"
	    } else {
		set cmd "/usr/bin/lpr -P$printer $pfile"
	    }
           output "  Printing: $cmd"
      		system $cmd
            if {$attflst != {}} {
                output "  Printing: [set cmd "/usr/bin/lpr -P$ca(printcc) $attflst"]"
                system $cmd
            }
        }
        foreach fnum $faxlist {
            output "  Faxing: [eval fax_files \$fnum \$ca(subject) \$ca(from) \$pfile $attflst]"
        }
    }
    
    if {$ca(emlist) == {} && $ca(emclist) != {}} {set ca(emlist) $ca(emclist); set ca(emclist) {}}
    if {$ca(emlist) != {}} {
        if {![file exists pfile] && $ca(emfmt) == {}} {set ca(emfmt) $fmtcmd}
        if {$ca(eval) && $ca(emfmt) != {}} {
            output "Formatting document for email\n  $ca(emfmt)"
            set srcfile [eval $ca(emfmt)]
            set fbase [file rootname $srcfile]
            set pfile $fbase.ps
            set tfile $fbase.txt
            lout::parse $srcfile $pfile		;#format the lout file
        }
        if {$ca(emtxt) && [file extension $srcfile] == {.lout}} {
            output "Formatting plain text for email. Sometimes produces minor formatting errors\n(You can generally ignore these but be aware that some small part of the text rendition could be scaled or deleted.)"
            lout::parse $srcfile $tfile -text yes		;#make text version
        } elseif {$ca(eval)} {
            write_file $tfile {}			;#text is empty file
        }
        if {$ca(emreturn) == {}} {set ca(emreturn) "$::tcl_platform(user)@$cfig(domain)"}
        set mcmd "/usr/bin/metasend -t \"[join $ca(emlist) ,]\" -F \"$ca(emreturn)\""	;#start email command
        if {$ca(emclist) != {}} {append mcmd " -c \"[join $ca(emclist) ,]\""}
        write_file $lib::cfig(workdir)/preamble.mm "This is a multi-part message in MIME format."
        append mcmd " -b -P $lib::cfig(workdir)/preamble.mm -s \"$ca(subject)\" -S 10000000"
        append mcmd " -f \"$tfile\" -e 7bit -m \"text/plain; name=\\\"Text Rendition.txt\\\"\" -D \"Text Rendition\""
        if {$ca(emgif)} {			;#make list of gif files
            set pg 1
            output {Making GIF files}
            foreach i [make_gifs $pfile $fbase.pg] {
                append mcmd " -n -f \"$i\" -e base64 -m \"image/gif; name=\\\"Page ${pg}.gif\\\"\" -D \"Page $pg\""
                incr pg
            }
        }

        if {$ca(empdf) && [file extension $srcfile] == {.lout}} {set attlst [concat [list [list $pfile ps {PDF Version of Document}]] $attlst]}
#puts "attlst:$attlst"
        foreach att $attlst {
            lassign $att fname ffmt fdescr
            if {$ffmt == {ps}} {	;#some docs may still be in PS (from lout::parse above)
                output "Translating file $fname to PDF: $fname.pdf"
                if {[file exists $fname]} {exec /usr/bin/ps2pdf $fname $fname.pdf}
                if {![file exists $fname.pdf]} {dia::error "Failed creating PDF file: $fname.pdf"; continue}
                set fname $fname.pdf
                set ffmt {pdf}
                set didpdf 1
            }
            if {![info exists cfig(mme.$ffmt)]} {dia::err "Don't know how to handle format: $ffmt"; continue}
            append mcmd " -n -f \"$fname\" -e $cfig(mme.$ffmt) -m \"$cfig(mmc.$ffmt); name=\\\"${fdescr}.${ffmt}\\\"\" -D \"$fdescr\""
        }
        if {$didpdf} {
            set fp [open $tfile a]		;#include instructions for PDF/Acrobat
            puts $fp $cfig(pdfhdr)
            close $fp
        }
        output "Emailing document to $ca(emlist) $ca(emclist)"
        output $mcmd
        if {[system "$mcmd"]} {dia::err "Sending email: $mcmd"}
    }

    output "Distribution done!"
    .dp.t configure -state disabled
    .dp.o configure -state normal
    focus .dp.o
    lib::cnorm .dp
    return .dp
}

# Distribute the Document to its recipient
# Control array: {{fmtcmd1 print_count fax_list} {fmtcmd2 ...}}
#------------------------------------------
proc ddis::do_dist {car args} {
    variable cfig
    proc output {msg} {.dp.t insert end "$msg\n"; .dp.t see end; update}
    argproc ca(\$s) $args {{output {}} {eval 1} {emlist {}} {emfmt {}} {emclist {}} {emgif 0} {empdf 1} {emtxt 0} {emreturn {}} {attcmd {}} {subject {}} {title {Distribution Progress}} {height 36} {width 132} {printpr $cfig(printpr)} {printcc $cfig(printcc)} {from {}} {edit 0} {signature 0} {thunderbird 0}}
    catch {destroy .dp}
    toplevel .dp
    wm title .dp $ca(title)
    text [set t .dp.t] -width $ca(width) -height $ca(height)
    button .dp.o -text Dismiss -command "destroy .dp" -state disabled
    pack .dp.t .dp.o -expand yes -fill x 
    dia::place .dp
    lib::cwatch .dp

    output $ca(output)
    lassign {0 0} didpdf i attlst attflst
    if {$ca(attcmd) != {}} {
        output "Getting attachments..."
        foreach att [eval $ca(attcmd)] {
            lassign $att file fmt tag
#puts "file: $file fmt: $fmt tag: $tag"
#puts "att:$att:"
            if {[lcontain $cfig(faxable) $fmt]} {	;#if faxable format
                lappend attflst $file			;#add it to fax/print file list
            } else {
                output "Converting $file to PS"
                if {[set nfile [docedit::build_ps $file $fmt $file.ps ps -delete 0]] == {}} continue
                lappend attflst $nfile			;#add PS version to fax/print file list
            }
            if {![info exists cfig(mme.$fmt)]} {	;#if non-emailable format
                output "Converting $file to PDF"
                if {[set file [docedit::build_ps $file $fmt $file.pdf [set fmt pdf] -delete 0]] == {}} continue
            }
            if {$fmt == {pdf}} {output "didpdf !" ; set didpdf 1}		;#remember we have a pdf file in the list
            lappend attlst [list $file $fmt "$tag"]	;#build email attachment list
        }
        output "Attachments: \n  [join $attlst "\n  "]"
    }

    foreach ae $car {		;#For each distribution mode
        lassign $ae fmtcmd prcnt faxlist printer
#puts "ae:$ae"
        if {$printer == {}} {set printer $ca(printpr)}
        output "Formatting document\n  $fmtcmd"
        if {$ca(eval)} {set srcfile [eval $fmtcmd]} else {set srcfile [subst $fmtcmd]}
#puts "srcfile:$srcfile"
        set fbase [file rootname $srcfile]
        if {[file extension $srcfile] == {.lout}} {
            set pfile $fbase.ps
            set tfile $fbase.txt
            if {$prcnt <= 0 && [llength $faxlist] <= 0} continue
            lout::parse $srcfile $pfile	;#format the lout file
        } else {				;#assume text format
            set tfile [set pfile $srcfile]	;#the file is a text file
        }
        for {set i 0} {$i < $prcnt} {incr i} {	;#Printed copies
	    if {$printer == {H}} {
		set cmd "/usr/bin/lpr -o Resolution=600dpi -o PageSize=Letter -o Col -o MediaType=LetterFirst -o RICollate=true -o RIOrientOvr=Portrait -P$printer $pfile"
	    } else {
		set cmd "/usr/bin/lpr -P$printer $pfile"
	    }
           output "  Printing: $cmd"
      		system $cmd
            if {$attflst != {}} {
                output "  Printing: [set cmd "/usr/bin/lpr -P$ca(printcc) $attflst"]"
                system $cmd
            }

        }
        foreach fnum $faxlist {
            output "  Faxing: [eval fax_files \$fnum \$ca(subject) \$ca(from) \$pfile $attflst]"
        }
    }
    
    if {$ca(emlist) == {} && $ca(emclist) != {}} {set ca(emlist) $ca(emclist); set ca(emclist) {}}

    if {$ca(emlist) != {}} {
        if {![file exists pfile] && $ca(emfmt) == {}} {set ca(emfmt) $fmtcmd}
        if {$ca(eval) && $ca(emfmt) != {}} {
            output "Formatting document for email\n  $ca(emfmt)"
            set srcfile [eval $ca(emfmt)]
            set fbase [file rootname $srcfile]
            set pfile $fbase.ps
            set tfile $fbase.txt
            lout::parse $srcfile $pfile		;#format the lout file
        }
	
        if {$ca(emreturn) == {}} {set ca(emreturn) "$::tcl_platform(user)@$cfig(domain)"}
		  if {$ca(edit)} {
		      set mcmd "/bin/thunderbird -compose \"to=[join '$ca(emlist)' ,],subject='$ca(subject)',preselectid='$ca(emreturn)'"
			} else {
			   set mcmd "lib::mail_to [join $ca(emlist) ,] -origin $ca(emreturn)"
				append mcmd " -subject \"$ca(subject)\""
			}
#puts "srcfile: $srcfile"
	if {$ca(emtxt) && [file extension $srcfile] == {.lout}} {
            output "Formatting plain text for email. Sometimes produces minor formatting errors\n(You can generally ignore these but be aware that some small part of the text rendition could be scaled or deleted.)"
            lout::parse $srcfile $tfile -text yes		;#make text version
		 append mcmd " -inline $tfile"
	} elseif {[file extension $srcfile] == {.txt}} {
	    append mcmd " -inline $srcfile"
        } elseif {$ca(eval)} {
            write_file $tfile {}			;#text is empty file
        }

        if {$ca(empdf) && [file extension $srcfile] == {.lout}} {set attlst [concat [list [list $pfile ps {PDF Version of Document}]] $attlst]}

#puts "attlst:$attlst"
        foreach att $attlst {
            lassign $att fname ffmt fdescr
            if {$ffmt == {ps}} {	;#some docs may still be in PS (from lout::parse above)
                output "Translating file $fname to PDF: $fname.pdf"
                if {[file exists $fname]} {exec /usr/bin/ps2pdf $fname $fname.pdf}
                if {![file exists $fname.pdf]} {dia::error "Failed creating PDF file: $fname.pdf"; continue}
                set fname $fname.pdf
                set ffmt {pdf}
                set didpdf 1
            }
	    lappend files $fname
    	 if {!$ca(edit)} {lappend files $fdescr}
       if {![info exists cfig(mme.$ffmt)]} {dia::err "Don't know how to handle format: $ffmt"; continue}

        }

        if {$ca(emgif)} {			;#make list of gif files
            set pg 1
            output {Making GIF files}
            foreach i [make_gifs $pfile $fbase.pg] {
		lappend files $i
		lappend files [file tail $fbase].gif
                incr pg

            }
        }
	if {$ca(edit)} {
	   append mcmd ",attachment='file://[join $files ,]'\""
	} else {
	   append mcmd " -attach \"$files\""
	}
#	if {$ca(edit)} {append mcmd " -edit 1"}
	if {$ca(signature) && $ca(edit) == 0} {append mcmd " -signature 1"}
        output "Emailing document to $ca(emlist) $ca(emclist)"
        output $mcmd
#puts "mcmd: $mcmd"
   if {$ca(edit)} {
	   system $mcmd
	} else {
	   eval $mcmd
	}

   }

    output "Distribution done!"
    .dp.t configure -state disabled
    .dp.o configure -state normal
    focus .dp.o
    lib::cnorm .dp
    return .dp
}


#Create a new distribution line in the toplevel prompt
#------------------------------------------
proc ddis::newline {w args} {
    variable v
    variable cfig

    for {set i 1} {[winfo exists $w.f.0$i]} {incr i} {}
    if {$i <= 1} {set v(type.$i$w) {To:}} else {set v(type.$i$w) {CC:}}

    lassign {0 1} v(ro.$i$w) v(fc.$i$w)
    argform {name fax email} args
    argnorm {{name 1} {fax 2} {type 1} {filecopy 2 fc} {readonly 1 ro} {email 1} {identifier 1 id}} args
    foreach tag {name fax email id} {set v($tag.$i$w) [xswitchs $tag args]}
    foreach tag {type ro fc} {xswitchs $tag args v($tag.$i$w)}
    
    frame [set f0 $w.f.0$i] -bd 1 -rel raised
    grid $f0 -column 0 -row $i
    checkbutton $f0.c -variable ddis::v(doprint.$i$w) -help {Press this if you want a printed copy for the recipient}
    frame [set f1 $w.f.1$i] -bd 1 -rel raised
    grid $f1 -column 1 -row $i -sticky ew
    
    label $f1.l -text $v(type.$i$w) -width 4 -anchor e -textv ddis::v(type.$i$w) -padx 3 -help {Whether this is a primary recipient or a recipient of a copy}
    
    entry $f1.e -textv ddis::v(name.$i$w) -width 32 -help {Write the name of the person you are sending the document to}
    entry $f1.i -textv ddis::v(id.$i$w) -width 5 -help {An optional contact ID number}
    if {$v(ro.$i$w)} {$f1.e configure -state readonly; $f1.i configure -state readonly}
    button $f1.b -image pull.dn -help {Select from other possible recipients} -command "scm::dia -tag ddis_nmenu -title {Select recipient:} -dest ddis::v(name.$i$w) $cfig(nmenu$w)"

    frame [set f2 $w.f.2$i] -bd 1 -rel raised; grid $f2 -column 2 -row $i
    checkbutton $f2.c -variable ddis::v(dofax.$i$w) -help {Press this if you want to FAX a copy}
    entry $f2.e -textv ddis::v(fax.$i$w) -width 14 -help {Type the FAX number including area code}
    button $f2.b -image pull.dn -help {Select from other possible FAX numbers} -command "scm::dia -tag ddis_fmenu -title {Select FAX:} -dest ddis::v(fax.$i$w) $cfig(fmenu$w)"

    frame [set f3 $w.f.3$i] -bd 1 -rel raised; grid $f3 -column 3 -row $i
    checkbutton $f3.c -variable ddis::v(doemail.$i$w) -help {Press this if you want to email a copy}
    entry $f3.e -textv ddis::v(email.$i$w) -width 24 -help {Indicate the email address to send to}
    button $f3.b -image pull.dn -help {Select from other possible email addresses} -command "scm::dia -tag ddis_emenu -title {Select Email:} -dest ddis::v(email.$i$w) $cfig(emenu$w)"

    pack $f0.c $f1.l $f1.e $f1.b $f2.c $f2.e $f2.b $f3.c $f3.e $f3.b -side left -fill x
    if {$v(id.$i$w) != {}} {pack $f1.i -side left}
    if {$v(fc.$i$w)} {
        frame [set f4 $w.f.4$i] -bd 1 -rel raised; grid $f4 -column 4 -row $i
        checkbutton $f4.c -variable ddis::v(dofcopy.$i$w) -help {Press this if you want a printed file copy}
        pack $f4.c -side left
    }

    set v(dofax.$i$w) [string compare $v(fax.$i$w) {}]
    set v(doemail.$i$w) [string compare $v(email.$i$w) {}]
#    set v(doprint.$i$w) [expr !($v(doemail.$i$w) || $v(dofax.$i$w))]
    set v(doprint.$i$w) 0
    set v(dofcopy.$i$w) 0
    set v(cnt$w) $i
}

#Prompt the user about who should receive copies in the distribution
#Return a structure showing who gets what and how
#------------------------------------------
proc ddis::dprompt {w args} {
    variable v
    variable cfig

    argproc cfig(\$s$w) $args {{svname {}} {rvname {}} {nmenu {}} {fmenu {}} {emenu {}} {new {}} {title {Document Distribution}} {msg {Distribute as follows:}} {par .}}
    catch {destroy $w}
    toplevel $w
    wm title $w $cfig(title$w)
    wm transient $w [winfo parent $cfig(par$w)]

    label $w.tl -text $cfig(msg$w); pack $w.tl -side top -expand y -anchor w

    frame $w.a
    label $w.a.rl -text {Return Email:}
    entry $w.a.re -textv ddis::v(emret$w) -help {Your return email address}
    label $w.a.sl -text {Subject:}
    entry $w.a.se -textv ddis::v(subj$w) -width 55 -help {The subject line that will show up on outbound FAX and email}
    pack $w.a.rl $w.a.re $w.a.sl -side left
    pack $w.a.se -side left -exp 1
    if {$cfig(svname$w) != {} && $cfig(rvname$w) != {}} {
        pack $w.a -side top -fill x -exp 1
        set v(subj$w) [uplevel subst \$$cfig(svname$w)]
        set v(emret$w) [uplevel subst \$$cfig(rvname$w)]
    }
    
    frame $w.f; pack $w.f -side top
    set i 0; foreach ti {Print Recipient FAX Email File} {
        label $w.f.t$i -text ${ti}:
        grid $w.f.t$i -column $i -row 0 -sticky w
        incr i
    }
    foreach tag {nmenu fmenu emenu} {regsub -all {%} $cfig($tag$w) {%%} cfig($tag$w)}
#puts "new:$cfig(new$w)"    
    foreach nl $cfig(new$w) {eval newline $w $nl}
    frame $w.b; pack $w.b -side bottom -expand y -fill x
    button $w.b.ok -text OK -command "set ddis::v(ok$w) 1" -pady 1 -bd 4 -help {Proceed to distribute to the recipients shown}
    button $w.b.new -text {Add Another Recipient} -command "ddis::newline $w" -help {Add another line to allow distribution to an additional person}
    button $w.b.can -text {Cancel Distribution} -command "set ddis::v(ok$w) 0" -help {Cancel the distribution}
    pack $w.b.ok $w.b.new $w.b.can -side left -expand yes -fill x
    bind $w <Return> "$w.b.ok invoke"
    bind $w <KP_Enter> "$w.b.ok invoke"
    dia::place $w
    focus $w.b.ok
    tkwait variable ddis::v(ok$w)
    destroy $w
    set ret {}    
    if {$v(ok$w)} {
        for {set i 1} {$i <= $v(cnt$w)} {incr i} {
            if {![string compare $v(type.$i$w) To:]} {set pc p} else {set pc c}
            set line [list -pc $pc -name $v(name.$i$w) -print $v(doprint.$i$w) -file $v(dofcopy.$i$w)]
            if {$v(dofax.$i$w)} {lappend line -fax $v(fax.$i$w)}
            if {$v(doemail.$i$w)} {lappend line -email $v(email.$i$w)}
            if {$v(id.$i$w) != {}} {lappend line -id $v(id.$i$w)}
            lappend ret $line
        }
        if {$cfig(svname$w) != {} && $cfig(rvname$w) != {}} {
            uplevel "set $cfig(svname$w) \$ddis::v(subj$w)"
            uplevel "set $cfig(rvname$w) \$ddis::v(emret$w)"
        }
    }
    return $ret
}

if {[info commands locawyze] != {}} {locawyze ddis}
