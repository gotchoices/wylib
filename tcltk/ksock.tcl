# Client side to open a connection to a server (like iteld or eventd)
# and then retry to re-open the connection any time it dies
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 
#- 

namespace eval ksock {
    namespace export init message
    variable cfig		;#config values
    variable v
    
    set cfig(host)	{localhost}
    set cfig(time)	{5}	;#seconds after disconnect before trying reconnect
    set cfig(sfact)	{1.5}	;#how much longer to wait for each failed reconnect attempt
#    set cfig(ext) {}
#    set cfig(notify) {yes}	;#give screen pops for incoming calls
}

# Initialize connection to the server
#------------------------------------------
proc ksock::init {sk args} {
    variable cfig
    variable v

#puts "ksock::init $sk $args"
    argform {handler msg host} args
    argnorm {{hostname 2 host} {timeout 2 time} {handler 2} {message 2 msg}} args
    foreach s {msg handler} {set cfig($s.$sk) [xswitchs $s args]}
    foreach s {host time} {set cfig($s.$sk) $cfig($s); xswitchs $s args cfig($s.$sk)}

    set v(tmult.$sk) 1			;#default timeout multiple
    connect $sk				;#try to connect
}

# Attempt to connect/reconnect to the server
#------------------------------------------
proc ksock::connect {sk} {
    variable cfig
    variable v

#puts "Connecting to socket: $sk at $cfig(host.$sk)"
    set v(sfd.$sk) {}
    if {[catch {set v(sfd.$sk) [socket $cfig(host.$sk) $sk]}]} {	;#if connect failed
        set secs [expr int($cfig(time.$sk) * $v(tmult.$sk))]
#puts " failed, will retry in $secs secs"
        after [expr $secs * 1000] "ksock::connect $sk"	;#try a reconnect
        set v(tmult.$sk) [expr $cfig(sfact) * $v(tmult.$sk)]	;#increase timeout multiple for next time
    } else {
#puts " connected"
        fconfigure $v(sfd.$sk) -blocking no				;#don't block on reads
        fileevent $v(sfd.$sk) readable "ksock::incoming $sk"	;#handle data coming from server
        if {$cfig(msg.$sk) != {}} {			;#if we have an initial message to send
            message $sk $cfig(msg.$sk)			;#send it
        }
        set v(tmult.$sk) 1			;#reinit timeout multiple
    }
}

# Process an incoming message from the server
#------------------------------------------
proc ksock::incoming {sk} {
    variable cfig
    variable v

    if {$v(sfd.$sk) == {} || [eof $v(sfd.$sk)]} {
#puts "connection to $sk at $cfig(host.$sk) is dead"
        close $v(sfd.$sk)
        set v(sfd.$sk) {}
        after idle "ksock::connect $sk"			;#try to reconnect
    } else {
#        set iline [read -nonewline $v(sfd.$sk)]	;#get command from server
        set iline [gets $v(sfd.$sk)]			;#get command from server
#puts "handler:$cfig(handler.$sk) iline:$iline"
        if {$iline != {} && $cfig(handler.$sk) != {}} {
            eval $cfig(handler.$sk) $iline
        }
    }
}

# Send a command to the server
#------------------------------------------
proc ksock::message {sk message} {
    variable cfig
    variable v

    if {$v(sfd.$sk) == {}} {ksock::init $sk}		;#if no connection, try to reconnect
    if {$v(sfd.$sk) == {} || [eof $v(sfd.$sk)]} {	;#if still no connection, return
        dia::err "Can't communicate with server at port $sk"
        return
    }
#puts "Sending to $sk: $message"
    puts $v(sfd.$sk) $message
    flush $v(sfd.$sk)
}

if {[info commands locawyze] != {}} {locawyze ksock}
