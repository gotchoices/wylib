# Misc functions grouped here because they require context variables to be
# stored in a namespace, but they don't really justify their own namespace
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- remove argproc calls below
#- 

namespace eval lib {
    namespace export cwatch cnorm cfig cwait
    variable cursor
    set cursor(lastwin) 	{}
    set cfig(email)     	{/usr/bin/thunderbird -remote 'mailto(%s)'}
    set cfig(phonemap)		{}
    set cfig(domain)		{wyatterp.com}
    set cfig(smtphost)		{smtp.$cfig(domain)}
    set cfig(smtpuser)		{}
    set cfig(smtppass)		{}

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

    set cfig(userpref)  {~/.myprefs} ;# external user preference file
}

#Return library configuration information
#------------------------------------------
proc lib::cfig {idx} {
    variable cfig
    if {[info exists cfig($idx)]} {return $cfig($idx)} else {return {}}
}

# Make a dialable phone number considering local prefixes
#------------------------------------------
proc lib::phonemap {num} {
    variable cfig
    if {$cfig(phonemap) != {} && [file exists $cfig(phonemap)]} {return "[exec $cfig(phonemap) $num]"} else {return $num}
}

#Change the cursor to a watch, update & change it back (newer version of cwatch)
#------------------------------------------
proc lib::cwait {w} {
    variable cfig
    if {[catch {set cur_cursor [$w cget cursor]}]} {set cur_cursor top_left_arrow}
#puts "cwatch w:$w"
    $w configure -cursor watch
#puts " mapped $w:[winfo ismapped $w]"
    if {[winfo ismapped $w]} {update idletasks}	;#bad to update before toplevel is constructed (on initial launch)
    $w configure -cursor $cur_cursor
}

#Change the cursor to a watch and save the current cursor (depricated)
#------------------------------------------
proc lib::cwatch {w} {
    variable cursor
    variable cfig
    if {[catch {set cur_cursor [$w cget cursor]}]} {set cur_cursor top_left_arrow}
#puts "cwatch w:$w"
    $w configure -cursor watch
#puts "mapped $w:[winfo ismapped $w]"

#Let's give up on update for now, it also causes dbs to leave a ghost window
#If we need to put this back, we need a way to have dbs/dbp suppress cwatch call
#    if {[winfo ismapped $w]} {update idletasks}	;#bad to update before toplevel is constructed (on initial launch)

    set cursor($w) $cur_cursor
    set cursor(lastwin) $w
    return $cur_cursor
}

#Restore the cursor from a cursor_watch call (depricated)
#------------------------------------------
proc lib::cnorm {{w {}}} {
    variable cursor
    if {$w == {} && [info exists cursor(lastwin)]} {set w $cursor(lastwin)}
    if {$w == {}} return
#puts " cnorm: w:$w $cursor($w)"
    $w configure -cursor $cursor($w)
    return $cursor($w)
}

#FIXME: can we remove this yet?
# Fix for bug #827436 - mail data must end with \r\n.\r\n (fix may be in tcllib at some point)
#------------------------------------------
proc lib::mime_hack {body} {
#    if {[string compare [string index $body end] "\n"] != 0} {
#        append body "\r\n"
#    }
    return $body
}

# Startup the standard interactive email client to send mail to a list of people
#------------------------------------------
proc lib::email {to args} {
    variable cfig
    package require mime
    package require smtp
#puts "lib::email to:$to args:$args"
    argform {message subject} args
    argnorm {{text 1} {message 1} {subject 1}} args
    lassign {0} text
    foreach s {message subject} {set $s [xswitch $s args]}
    foreach s {text} {xswitch $s args $s}
    
    if {$to == {}} return
    if {$text} {
        if {[dia::query "Subject:" subject 0 OK Cancel] < 0} {return 0}
        if {![edwin::edwin .email_msg -dest message -abort Cancel -commit {Send Message} -wait yes -insert end -title {Please edit the email message}]} {return 0}

        set token [mime::initialize -canonical text/plain -string [lib::mime_hack $message]]
        mime::setheader $token Subject $subject
        smtp::sendmessage $token -recipients $to -servers [lib::cfig smtphost] 
        mime::finalize $token        
        dia::brief "Sending to $to" 400
    } else {
        system [format $cfig(email) $to]
    }
}

# Send a text email to someone, possibly with an embedded application launch link and/or other attachments
#------------------------------------------
proc lib::mail_to {addr args} {
    variable cfig
    package require mime
    package require smtp
 
    argform {message subject launch description} args
    argnorm {{editmsg 1 edit} {message 1 msg} {subject 1} {copy 1} {launch 1} {description 1 descr} {attach 1} {signature 1} {origin 1} {inline 1}} args
    lassign {0} edit
    lassign {0} signature
    foreach s {msg subject copy launch descr attach origin inline} {set $s [xswitch $s args]}
    foreach s {edit signature} {xswitch $s args $s}
    if {$addr == {}} {
        if {[dia::query {Input an email address (or several separated by commas):} addr 0 OK Cancel] < 0} {return 0}
    }
    if {$subject == {}} {
	if {[dia::query {What is the subject for the email:} subject 0 OK Cancel] < 0} {return 0}
    }
   if {$edit} {
	    if {![edwin::edwin .mail_to_msg -init yes -dest msg -abort Cancel -commit {Send Message} -wait yes -insert end -title "Please edit the email/text message for: $addr"]} {return 0}
    }

    if {$inline != {}} {
	set fp [open $inline r]
	set msg [read $fp]
	close $fp
    }
#puts "msg: $msg"
    
    set tlist [mime::initialize -canonical text/plain -string $msg]	;#start out with the text message
	
    if {$launch != {}} {			;#if a launch command given, attach it
        lappend tlist [mime::initialize -canonical application/x-applaunch -string $launch -header [list Content-Disposition "attachment;\n filename=\"$descr\""]]
    }

#puts "attach: $attach"
    foreach {rec name} $attach {			;#if other files specified, attach them
        set file $rec
	set descr $name
        set fmt [docedit::ffmt $file]
        if {[info exists cfig(mmc.$fmt)]} {
            set content $cfig(mmc.$fmt)
            set encode $cfig(mme.$fmt)
        } else {
            set content {text/plain}
            set encode {base64}
        }
#debug file descr fmt content encode
        lappend tlist [mime::initialize -canonical $content -file $file -encoding $encode -header [list Content-Disposition "attachment;\n filename=\"$descr\""]]
    }

    if {$signature} {
	lappend tlist [mime::initialize -canonical text/html -file /home/[id user]/.sigfile.html]
    }
    if {[llength $tlist] > 1} {
        set tok [mime::initialize -canonical multipart/mixed -parts $tlist]
    } else {
        set tok [lindex $tlist 0]
    }

    foreach to [split $addr { ,}] {		;#formalize to addresses, default to local domain
        lassign [split $to @] name domain
        if {$domain == {}} {set domain $cfig(domain)}
        lappend tolist "${name}@$domain"
    }

    if {$origin != {}} {
	set sender $origin
    } else {
	set sender [id user]
    }

#debug tolist
#debug copy
    mime::setheader $tok Subject $subject cc $copy
    smtp::sendmessage $tok -recipients [join $tolist ,] -originator $sender -servers [lib::cfig smtphost] -username [lib::cfig smtpuser] -password [lib::cfig smtppass]
    mime::finalize $tok -subordinates all
#puts "token:$tok subject:$subject cc:$copy"
    if {$edit} {dia::brief "Sending to $addr" 400}
    return 1
}

if {[info commands locawyze] != {}} {locawyze lib}
