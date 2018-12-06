# Routines to check a person's password.
# There can only be one instance of this per application
# Call passwd_ok to see if the password has been entered recently enough.
# If not, the password will be prompted for and the timeout will be restarted.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- adapt to osdep.tcl, port to windows
#- 

namespace eval passwd {
    namespace export init ok
    variable cfig
    variable v
    set cfig(timeout)	[expr 1000 * 60 * 60 * 30]	;#30 minutes
    set cfig(pwdfile)	{/etc/passwd}
    set cfig(uname)	{}
    
    set v(pwdok) 0	;#flag for password OK
    set v(aid) {}	;#after id
}

#if {[info commands checkpwd] == {}} {lib::loadlib libtsl.so}

# Initialize this module
#----------------------------------------------------
proc passwd::init {args} {
    variable cfig
    variable v
    argproc cfig(\$s) $args {{timeout $cfig(timeout)} {uname {}}}
    set v(pwdok) 0
    if {$v(aid) != {}} {after cancel $v(aid)}	;#cancel any old timers
    set v(aid) {}
}

# Timeout handler
#----------------------------------------------------
proc passwd::timehand {} {
    variable v
    set v(pwdok) 0
    set v(aid) {}
}

# Call PAM to see if the password has been entered recently enough
#----------------------------------------------------
proc passwd::ok {} {
    variable cfig
    variable v

    if {$v(pwdok)} {return 1}
    if {$cfig(uname) == {}} {set cfig(uname) [id user]}
    if {[checkpwd $cfig(uname) {dia::pquery "Please input %s"}]} {
        set v(pwdok) 1
        if {$v(aid) != {}} {after cancel $v(aid)}
        set v(aid) [after $cfig(timeout) passwd::timehand]
        return 1
    }
    dia::err "Invalid Password"
    return 0
}	
