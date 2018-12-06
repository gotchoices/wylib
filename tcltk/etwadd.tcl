#The "To:" address in a letter
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- port ::dprompt
#- 

namespace eval etwadd {
    namespace export create lout get dprompt cfig
    variable v
    variable largest_tag 0
    variable cfig
    set cfig(dear)	{Dear}
    set cfig(lookup)	{}
}

# Get/Set configuration values for the class
#------------------------------------------
proc etwadd::cfig {tag {value {?}}} {
    variable cfig
    if {$value != {?}} {set cfig($tag) $value}
    return $cfig($tag)
}

#Dump the address contents in lout format
#------------------------------------------
proc etwadd::lout {t {nth 0} {tvar {}} {date {}}} {
    variable v
#puts "etwadd::lout $t $date nth:$nth"
    if {$nth > 0} {		;#we're dumping the n'th To: address
        set i 1
        foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {	;#find the n'th To: address
            if {[lindex [split [lindex [split $k :] 0] .] end] == {add}} {
                lassign [$k get {type name addr salu}] type name addr salu
                if {$type != {To:}} {
                    continue
                } elseif {$i >= $nth} {
                    upvar $tvar totitle
                    set totitle $name		;#pass name up to calling routine separately
                    set date [clock format [date::seconds $date] -format "%B %d, %Y"]
                    return "@Addr @Date \{$date\} \{[lout::quote "$name\n$addr"]\}\n@DP\n@MPar @IN {0i} \{[lout::quote $salu]\}"
                }
                incr i
            }
        }
    } else {			;#else dump all CC addresses
        set clist {}
        foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {		;#find all CC's
            if {[lindex [split [lindex [split $k :] 0] .] end] != {add}} continue
            lassign [$k get {type name}] type name
            if {$type == {CC:}} {lappend clist [lout::quote $name]}
        }
        if {[llength $clist] > 0} {
            return "// \nCC: @OPar @LM {1i} lines @Break \{[join $clist { //1vx }]\}\n@DP\n"
        }
    }
    return {}
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwadd::splist {w} {
    foreach f {name addr salu} {
        lappend retlist [$w.d field $f entry w]
    }
    return $retlist
}

#Dump the widget contents as a list
#------------------------------------------
proc etwadd::get {w {fields {type name addr salu id fax email}}} {
    return [$w.d get $fields]
}

#Load the widget contents from a list of values (already in the right field order)
#------------------------------------------
proc etwadd::load {w vals} {
#    variable v
#    set v(tag$w) [lrange [split $w {:}] end end]
    set i 0; foreach t {type name addr salu id fax email} {
        $w.d set [list $t [lindex $vals $i]]
        incr i
    }
}

#Create a label for this address
#------------------------------------------
proc etwadd::prlab {w} {
#puts "LAB:[join [$w.d get "name addr"] "\n"]"
    print::print lab_print -data "[join [$w.d get {name addr}] "\n"]" -init prname=L -init tmarg=0 -init lmarg=0
}

#Set a lookup function
#------------------------------------------
proc etwadd::setlookup {lookup} {
    variable cfig
    set cfig(lookup) $lookup
}

#Look up a contact in one of the databases
#------------------------------------------
proc etwadd::lookup {w} {
    variable v
    variable cfig
    if {$cfig(lookup) == {}} {dia::err {No lookup program or function can be found}; return}
#puts "lookup:$cfig(lookup)"
    set vals [eval send $cfig(lookup)]
    lassign $vals v(name$w) v(addr$w) v(salu$w) v(id$w) v(fax$w) v(email$w)
}

#Choose a salutation
#------------------------------------------
proc etwadd::salutation {w} {
    variable v
    variable cfig

    set flds [llength [set name [$w.d field name get]]]
#puts "w:$w flds:$flds name:$name"
    for {set i 0} {$i < $flds} {incr i} {
        lappend slist "{$cfig(dear) [lindex $v(name$w) $i]:}"
    }
    lappend slist "{$cfig(dear) Sir:}" "{$cfig(dear) Madam:}"

    set f0 [lindex $v(name$w) 0]
    set fend [lindex $v(name$w) end]
    lappend slist "{$cfig(dear) $v(name$w):}"
    lappend slist "{$cfig(dear) $f0 $fend:}"
    foreach m {Mr. Ms. Mrs.} {lappend slist "{$cfig(dear) $m $fend:}"}
#puts "slist:$slist"

    scm::dia {Opening Greeting:} -dest etwadd::v(salu$w) -data $slist -tag ledit_salu \
      -f {salutation	-wid 60		-help {A list of optional greetings}}\
      -token salutation
}

#Prompt the user about who should receive copies in the distribution
#of a document contained in text window t.
#Return a structure showing who gets what and how
#------------------------------------------
proc etwadd::dprompt {t} {
    variable v

    set newlist {}
    set i 1; foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {	;#find all addresses
        if {[lindex [split [lindex [split $k :] 0] .] end] != {add}} continue
        set line [list -readonly 1 -type $v(type$k) -name $v(name$k) -id $v(id$k)]
        if {![info exists v(tofax$k)] || $v(tofax$k) == {}}     {lappend line -fax $v(fax$k)}
        if {![info exists v(toemail$k)] || $v(toemail$k) == {}} {lappend line -email $v(email$k)}
        lappend newlist $line
    }

    return [ddis::dprompt .etwadd_dist -title {Address Distribution} -new $newlist]
}

#Clear the widget
#------------------------------------------
proc etwadd::clear {w} {
    $w.d init
}

#Insert an address
#------------------------------------------
proc etwadd::create {t {tag {}} args} {
    variable v
    variable cfig

    etw::create_itag
    etw::create_begin
    $w configure -bg red
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg red \
        -mb {menu Address {Common functions operating on this address container}}
    $w.m menu mi grab  {Get Contact Info} -s Get -help "Fill out the fields from the current contact record\n(Assuming a contact manager launched this document)" -command "etwadd::lookup $w"
    $w.m menu mi label {Print Label} -s Label -help {Generate a mailing label for this recipient} -command "etwadd::prlab $w"
    $w.m menu mi salu  {Select Salutation} -help {Select one of several optional salutations} -command "etwadd::salutation $w"
    $w.m menu mi clear {Clear} -help {Reset all fields to blank values} -command "etwadd::clear $w"
    $w.m menu mi help  {Widget Help} -command {help::locate etwadd} -help {Instructions on using the address widget}
    $w.m menu mi close {Close} -help {Close this address box} -command "destroy $w"
    pack $w.m -side left -fill y -exp 1

    mdew::mdew $w.d \
        -f "type	pdm	3	{0 0}		{Recip:}	-textv etwadd::v(type$w) -init {To:} -data {{To: {Primary Recipient}} {CC: {Copied Recipient}} {BC: {Hidden Copy Recipient}}} -help {To: primary recipient\nCC: copy recipient\nBC: blind copy recipient (not shown on letter)}"\
        -f "name	ent	22	{1 0 2}		{:}		-textv etwadd::v(name$w) -help {The full name of the recipient}"\
        -f "id		ent	5	{3 0}		{ID:}		-textv etwadd::v(id$w) -state disabled -just r -help {The contact ID number for this recipient\nThis is the ID to which this document will be logged when the letter is distributed}"\
        -f "addr	mle	{32 4}	{4 0 1 3}	{}		-textv etwadd::v(addr$w) -help {The mailing address of this recipient}"\
        -f "salu	ent	20	{0 1 2}		{Salu:} 	-textv etwadd::v(salu$w) -spf {etwadd::salutation $w} -help {How the recipient will be greeted as the opening line of the letter}"\
        -f "email	ent	20	{0 2 2}		{Email:}	-textv etwadd::v(email$w) -help {E-mail address for this recipient}"\
        -f "fax		ent	14	{2 2 2}		{FAX:}		-textv etwadd::v(fax$w) -help {Facsimile number for this recipient}"
    pack $w.d -side left
    if {$ca(init)} {
        clear $w
        $t insert $ca(index)+1c "\n"
    }

    etw::create_end
}
