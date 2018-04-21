# Connect/disconnect/reconnect to the postgresql database as needed.  This
# currently supports only a single connection to a single database (but avoids)
# having to pass handles around.
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33
package require Pgtcl
package require wyseman

#TODO:
#X- modularize error codes
#X- general cleaning pass
#X- call disconnect on asynchronous disconnect notify
#X- use pg_quote for quoting sql strings
#- use asynchronous mode so we can cancel a long query
#-   state=init:
#-     if query pending, block, poll for ready before continuing
#-     if no query pending, start query, schedule timeout,	state=timer
#-   state=timer: 
#-     if reason=timer, launch wait/quit dialog,		state=wait
#-     if reason=query done, harvest query, return
#-   state=wait:
#-     if reason=cancel, cancel query, cleanup, return
#-     if reason=query done, harvest query, return
#-   
#- use new pg::command names? (wait to see which library is more stable)
#- 

namespace eval sql {
    namespace export configure init cget listen disconnect connect exe x one value qlist quote esc escape bton quote_list lo_import

    variable cfig
    set cfig(host)		{localhost}
    set cfig(port)		{5432}
    set cfig(db)		{wyatt}
    set cfig(timeout)		{900000}	;#15 minutes
    set cfig(error)		{}		;#user error routine
    set cfig(defaults)		{DateStyle 'ISO' CLIENT_ENCODING 'LATIN1'}
    set cfig(listens)		{}

    if {[info exists ::env(WYATTDB)] && $::env(WYATTDB) != {}} {set cfig(db) $::env(WYATTDB)}
    set cfig(swar) {{database 2 db} {host 1 host} {timeout 1} {port 1} {error 1} {user 1} {password 1} {defaults 2}}

    variable v
    set v(dbc)			{}		;#database handle - only one connection at a time
    set v(aid)			{}		;#ID of timeout alarm
    set v(auto)			1		;#automatically disconnect after idle time
    
    set errs {
        {{duplicate key violates unique} {Duplicate record.  Each record in this table must be unique in certain key fields.  The insert (or update) operation you requested would have violated this rule.}}
        {{violates check constraint} {Invalid data.  The database contains rules to check certain fields within a record to make sure they contain allowable values (and/or are compatible with each other).  One of the values you tried to input is not a valid value.  Try looking at the pop-up helps for each field to see what values the computer is execting you to input.}}
    }
}

#Report errors properly whether running TK or just plain TCL (call only from within this module!)
#------------------------------------------
proc sql::err {strg {info {}}} {
    variable cfig
    if {$cfig(error) != {}} {
        uplevel 2 [list $cfig(error) $strg $info]
    } elseif {[info commands tk] == {}} {
        uplevel 2 [list error $strg $info]
    } else {
        if {$info != {}} {append strg "\n\n" $info}
        uplevel 2 [list dia::err $strg]
    }
}

#Configure this module
#------------------------------------------
proc sql::configure {args} {
    variable cfig
    argform {database host user password} args
    argnorm $cfig(swar) args
    foreach tag {db host timeout port error user password defaults} {xswitchs $tag args cfig($tag)}
}
proc sql::init {args} {eval configure $args}		;#obsolete in favor of configure?

#Get configuration settings
#------------------------------------------
proc sql::cget {option} {
    variable cfig
    argnorm $cfig(swar) option
    return $cfig($option)
}

#Connect (or reconnect) to the database
#------------------------------------------
proc sql::connect {args} {
    variable cfig
    variable v

    if {$args != {}} {eval configure $args}		;#reparse any arguments
    catch {pg_disconnect $v(dbc)}			;#in case we were connected

    if {$cfig(host) == {} || $cfig(host) == {localhost}} {
        set h {}
    } else {
        set h "-host $cfig(host)"
    }
#puts "pg_connect $cfig(db) $h"
    if {![info exists cfig(user)]} {
        set v(dbc) [eval pg_connect $cfig(db) $h]
    } else {
        set v(dbc) [eval pg_connect $cfig(db) $h -user $cfig(user) -password $cfig(password)]
    }
#puts "def:[pg_conndefaults]"
    if {$cfig(defaults) != {}} {		;#set connection defaults
        foreach {sw va} $cfig(defaults) {append cmd "set $sw to $va;\n"}
#puts "  cmd:$cmd"
        pg_result [pg_exec $v(dbc) $cmd] -clear
    }

    if {[info commands tk] != {}} {
        pg_on_connection_loss $v(dbc) "sql::disconnect; dia::warn {Unexpected loss of connection with database: $cfig(db), at: $cfig(host)}"
    }
    foreach name $cfig(listens) {
#puts "Re-register listen: $name $cfig(lcode.$name)"
        pg_listen $v(dbc) $name $cfig(lcode.$name)
    }
}

#Disconnect from the database
#------------------------------------------
proc sql::disconnect {} {			;#disconnect from db
    variable cfig
    variable v
#puts disconnect
    catch {pg_disconnect $v(dbc)}
    set v(dbc) {}
}

#Register a callback for notify events on a particular name
#------------------------------------------
proc sql::listen {name {code {}}} {
    variable cfig
    variable v
#puts "listen name:$name code:$code"
    if {$v(dbc) == {}} {connect}	;#if not already connected, connect now
    if {$code != {}} {
        set v(auto) 0			;#once any listen has been registered, we will disable timeout disconnects for this connection
        if {$v(aid) != {}} {after cancel $v(aid)}	;#cancel any pending disconnect timeout
    }
    pg_listen $v(dbc) $name $code
    if {$code == {}} {
        set cfig(listens) [lremove $cfig(listens) $name]
    } else {
        if {![lcontain $cfig(listens) $name]} {lappend cfig(listens) $name}
    }
    set cfig(lcode.$name) $code
}

#Execute a query as a transaction, clearing the result when done
#------------------------------------------
proc sql::x {query} {
    return [sql::exe $query -clear 1 -trans 1]
}

#Execute a query, connecting to the database first if necessary
#------------------------------------------
proc sql::exe {query args} {
    variable errs
    variable cfig
    variable v

    argform {clear trans} args
    argnorm {{clear 1} {transaction 1 trans} {process 1}} args
    lassign {0 0 0} clear trans process
    foreach tag {clear trans process} {xswitchs $tag args $tag}

    if {$args != {}} {eval configure $args}	;#reconfigure with any other arguments
    if {$v(dbc) == {}} {connect}		;#if not already connected, connect now
    
    if {$trans} {set query "begin;\n$query"}	;#wrap the query in a transaction
    if {$process} {set trans 1}			;#else if a transaction has been begun already externally...

#puts "sql::exe query:$query"
    set qh [pg_exec $v(dbc) $query]		;#execute the query
    set err [pg_result $qh -error]		;#check for sql errors
#puts "qh:$qh err:$err"
    if {$err == {}} {				;#if no errors found
        if {$trans} {catch {set r [pg_exec $v(dbc) {commit}];   pg_result $r -clear}}	;#commit
    } else {
        if {$trans} {catch {set r [pg_exec $v(dbc) {rollback}];  pg_result $r -clear}}	;#abort

        set found 0				;#Translate terse, backend errors to more user-friendly versions if possible
        if {[regexp {^ERROR:.*violates check constraint .*!([A_Za-z_.]*)\.([A-Z][A-Z][A-Z])(.*)$} $err junk table code rest]} {	;#Is this a check constraint error defined by the schema?
#debug check: err table code rest
            lassign [wmdd::errtext $table $code] title help
            if {$title != {}} {err "Check Constraint:\n$title ($code):" $help; set found 1}
        }
        if {!$found && [regexp {^ERROR: .*!([A_Za-z_.]*)\.([A-Z][A-Z][A-Z])(.*)$} $err junk table code rest]} {	;#Is this an exception error defined by the schema?
            lassign [wmdd::errtext $table $code] title help
#debug raise: err table code rest title help
            if {$title != {}} {err "$title ($code): $rest" $help; set found 1}
        }
        if {!$found} {
            foreach e $errs {			;#then look for a message hard-coded in this module
                lassign $e str msg
#puts " cmp:$str:$err:"
                if {[regexp $str $err]} {err $msg "Database message:\n$err"; set found 1; break}
            }
        }
        if {!$found} {err "In database query: $query" $err}	;#otherwise, give them the raw error

    }
    if {$v(aid) != {}} {after cancel $v(aid)}			;#cancel pending disconnect alarms
    if {$v(auto)} {
#puts "Timeout in $cfig(timeout) msec"
        set v(aid) [after $cfig(timeout) {sql::disconnect}]	;#set a new disconnect alarm
    }
    if {$clear} {
        pg_result $qh -clear
        return {}
    }
    return $qh					;#return query handle
}

# Execute a query that should return a single record
#------------------------------------------
proc sql::one {query args} {
#puts "one: query:$query args:$args"
    argform {message error} args
    argnorm {{message 1} {error 1}} args
    set error 0
    set message {}
    foreach tag {message error} {xswitchs $tag args $tag}
    if {$error && $message == {}} {set message "query: $query"}		;#force generic error message

    set qh [sql::exe $query]
    set cnt [pg_result $qh -numTuples]
    if {$cnt < 1} {
        if {$message != {}} {err "Record not found in database" $message}
        set data {}
    } else {
        if {$cnt > 1 && $message != {}} {err "Found multiple ($cnt) records when looking for only one" $message}
        set data [pg_result $qh -getTuple 0]
    }
    pg_result $qh -clear
    return $data
}

# Return a single field from a single record
#------------------------------------------
proc sql::value {args} {
    argform {table column pkey} args
    argnorm {{table 1} {column 1} {primarykey 1 pkey} {where} 1} args
    foreach s {table column pkey where} {set $s [xswitchs $s args]}

    set query "select $column"
    if {$table != {}} {append query " from $table"}
    if {$where != {}} {
        append query " where $where"
    } elseif {$pkey != {}} {
        append query " where [wmdd::pkey $table] = [sql::quote $table $column $pkey]"
#    } elseif {$table != {}} {
#        error {You must specify a primary key or where clause}		;# select count(*) from table has no PK or where
    }
#debug query
    return [lindex [sql::one $query] 0]
}

# Execute a query that returns multiple rows
#query:		a query that will fetch the desired field(s)
#------------------------------------------
proc sql::qlist {query args} {

    argform {array columns} args
    argnorm {{array 1} {columns 1 cols}} args
    lassign {{} ?} array cols
    foreach tag {array cols} {xswitchs $tag args $tag}
    set qh [sql::exe $query]
    
    if {[catch {set cnt [pg_result $qh -numTuples]}]} {	;#if handle broken
        catch {pg_result $qh -clear}
        return {}					
    } elseif {$array == {}} {				;#returning a list of rows
        set data [pg_result $qh -llist]
    } else {						;#return an array of columns
        upvar $array locarr
        if {$cols == {?}} {set cols [pg_result $qh -attributes]}
#puts "cols:$cols"
        foreach col $cols {set locarr($col) {}}
        loop i 0 $cnt {
            set j 0
            set row [pg_result $qh -getTuple $i]
            foreach col $cols {
                lappend array($col) [lindex $row $j]
                incr j
            }
        }
        set data $cnt
    }
    pg_result $qh -clear
    return $data
}

# Import a large object with optional associated query
#------------------------------------------
proc sql::lo_import {fname args} {
    variable v

    argform {query} args
    argnorm {{query 1}} args
    foreach tag {query} {set $tag [xswitchs $tag args]}
    
    if {$v(dbc) == {}} {connect}		;#if not already connected, connect now
    set qh [pg_exec $v(dbc) {begin;}]		;#wrap in a transaction
    pg_result $qh -clear
    set oid [pg_lo_import $v(dbc) $fname]
    if {$query != {}} {
        regsub -all {%O} $query $oid query
        sql::exe "$query" -clear 1 -process 1
        set res 1
    } else {
        set res $oid
        set qh [pg_exec $v(dbc) {end;}]		;#end transaction
        pg_result $qh -clear
    }
    return $res
}

# Escape any embedded quotes in a string (obsolete this in favor of sql::escape?)
#------------------------------------------
proc sql::esc {str} {
    regsub -all {'} $str {''} str
    regsub -all {\\} $str {\\\\} str
    return $str
}

# Escape any embedded quotes in a string and quote the string
#------------------------------------------
proc sql::escape {str} {
    return [pg_escape_string $str]
}

# Convert a blank value to a null
#------------------------------------------
proc sql::bton {val} {
    if {$val == {}} {return {null}} else {return $val}
}

#Return a list of values quoted and escaped if necessary, based on the specified table and column
#------------------------------------------
proc sql::quote_list {t f val {delim { }}} {
    set rlist {}
    foreach elem [split $val $delim] {
#puts "val:$val strip:[string trim $elem { '}]"
        lappend rlist [quote $t $f [string trim $elem { '}]]
    }
    return [join $rlist ,]
}

#Return a value quoted and escaped if necessary, based on the specified table and column
#------------------------------------------
proc sql::quote {t f val {errchk 1}} {
    if {$f == {oid}} {return $val}
    set tp [wmdd::type $t $f]			;#get table.column type
    if {$val == {} && ![wmdd::nonull $t $f]} {	;#if blank value and nulls allowed
        return {null}				;#map it to a null
    }
    if {[lcontain {numeric int float} $tp]} {
        regsub -all {[$,]} $val {} val		;#strip common illegal chars from numbers
        if {$val == {}} {
            if {$errchk} {error "Illegal blank value for table: $t, field: $f"}		;#this is really a programming error, not a user error
            return {null}
        }
        return $val
    } elseif {[string range $tp 0 0] == {_}} {	;#if an array type, quote with brackets
        set val "{$val}"
    }
    return [pg_quote [string trim $val]]	;#return quoted value (possibly empty string)
}

if {[info commands locawyze] != {}} {locawyze sql}
