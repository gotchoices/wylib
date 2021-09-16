#The signature block for a letter
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#X- port edsigs
#X- close spf/scm returns yours truly in curly brackets
#- help page for signatures
#- 

namespace eval etwsig {
    namespace export create enable save lout get default
    variable v
    variable cfig
    set cfig(defsig) {}
    set cfig(sigext) {.es}
    set cfig(esig) 1
}

# Dump the widget contents in lout format
#------------------------------------------
proc etwsig::lout {w} {
    variable cfig
    variable v

    set stag [$w.d get stag]
    set esfile [file join [lib::cfig appdir] $stag$cfig(sigext)]
    if {$cfig(esig) && [file exists $esfile] && $v(esig$w) && $stag != {}} {
        set epsfile [file join [lib::cfig workdir] sig-${stag}.eps]
        write_file $epsfile $v(eps$w)
        set esig "@Esig \{\"$epsfile\"\}"
        return "//1v\n\{[lout::quote $v(sinc$w)]\} @Signed $esig @Tspc \{$v(sab$w)io\} @Bspc \{$v(sbe$w)io\} @Hsh \{$v(shs$w)i\} @Wid \{$v(ssw$w)i\} \{[lout::quote $v(name$w)]\}\n//1v\n"
    }
    return "//1v\n\{[lout::quote $v(sinc$w)]\} @Signed \{[lout::quote $v(name$w)]\}\n//1v\n"
}

# Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwsig::splist {w} {
    foreach f {sinc name} {
        lappend retlist [$w.d field $f entry w]
    }
    return $retlist
}

# Dump the widget contents as a list
#------------------------------------------
proc etwsig::get {w {fields {sinc name email esig stag}}} {
    return [$w.d get $fields]
}

# Load widget values from name/value pairs
#------------------------------------------
proc etwsig::setvals {w args} {
    foreach {nam val} $args {$w.d set $nam $val}
}

# Specify a default signature to use when inserting signatures
#------------------------------------------
proc etwsig::default {signame} {
    variable cfig
    set cfig(defsig) $signame
}

# Load the widget contents from a list of values in a preset order
#------------------------------------------
proc etwsig::load {w vals} {

    set stag [lindex $vals 4]
    catch {loadfile $w $stag}		;#load this sig from disk (if possible)
    set i 0; foreach t {sinc name email esig stag} {	;#now lay in saved parameters over top
        $w.d set [list $t [lindex $vals $i]]
        incr i
    }
}

# Enable/disable electronic signatures (for the whole class)
#------------------------------------------
proc etwsig::enable {{enab ?}} {
    variable cfig
    if {$enab != {?}} {
        set cfig(esig) $enab
    }
    return $cfig(esig)
}

# Find a field value from the first (only) signature found
#------------------------------------------
proc etwsig::fvalue {t {fld {email}}} {
    variable v
    foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {	;#find all signatures
        if {[lindex [split [lindex [split $k :] 0] .] end] != {sig}} continue
        return $v($fld$k)
    }
    return {}
}

# Load the signature stag from disk into the widget
# (things like the signature vector and its rendering parameters are not stored with the document)
#------------------------------------------
proc etwsig::loadfile {w stag {import 0}} {
    variable cfig
    variable v
    
    if {$import} {
        if {[sfile::dia {Import From} -mask "*.es" -dest sigfile -extension .es -wait 1] == {}} return
        if {[dia::query "Tag name to use for this signature:" stag 0 OK Cancel] < 0} {return}
    } elseif {$stag != {}} {
        set sigfile [file join [lib::cfig appdir] $stag$cfig(sigext)]
    } else {
        return
    }
    if {![file exists $sigfile]} {dia::warn "Can't find signature file: $sigfile"; return}
    lassign [read_file $sigfile] fields v(source$w) v(eps$w)
    lassign $fields v(sinc$w) v(name$w) v(email$w) v(sab$w) v(sbe$w) v(shs$w) v(ssw$w)
#puts "loadfile w:$w stag:$stag fields:$fields"
    set v(stag$w) $stag
    if {$v(eps$w) == {}} {
        set v(esig$w) 0
        $w.m menu view configure -state disabled
    } else {
        set v(esig$w) 1
        $w.m menu view configure -state normal
    }
}

# Save the current signature to a file
#------------------------------------------
proc etwsig::save {w {export 0}} {
    variable cfig
    variable v

    if {$export} {
        if {[sfile::dia {Export To} -mask "*.es" -dest sigfile -extension .es -wait 1] == {}} return
    } else {
        if {[set stag [$w.d get stag]] == {}} {set stag $::tcl_platform(user)}
        if {[dia::query "Save this signature by the tag name:" stag 0 OK Cancel] < 0} {return}
        $w.d set stag $stag
        set sigfile [file join [lib::cfig appdir] $stag$cfig(sigext)]
    }
    if {[file exists $sigfile]} {
        if {[dia::ask "Overwrite existing signature with same name:" 0 {Yes} {Cancel}] < 0} return
        dia::brief "Updating signature file: $sigfile"
    } else {
        dia::brief "Creating new signature file: $sigfile"
    }
    write_file $sigfile [list [list $v(sinc$w) $v(name$w) $v(email$w) $v(sab$w) $v(sbe$w) $v(shs$w) $v(ssw$w)] $v(source$w) $v(eps$w)]
}

# View the current electronic signature
#------------------------------------------
proc etwsig::view {w} {
    variable cfig
    variable v
    
    if {[set stag $v(stag$w)] == {}} return
    if {$v(eps$w) == {}} {dia::err {No electronic pattern exists yet for this signature}; return}
    set epsfile [file join [lib::cfig appdir] $stag$cfig(sigext).eps]
    write_file $epsfile $v(eps$w)
    docedit::view $epsfile
}

# Delete an electronic signature
#------------------------------------------
proc etwsig::delete {w} {
    variable cfig
    variable v
    if {[set stag $v(stag$w)] == {}} return
    set sigfile [file join [lib::cfig appdir] $stag$cfig(sigext)]
    if {[dia::ask "Are you sure you want to delete signature file: $sigfile\n(Can not be un-done)" 0 {Yes} {Cancel}] < 0} return
    file delete $sigfile
}

# Edit an electronic signature
#------------------------------------------
proc etwsig::edit {w} {
    variable cfig
    variable v
    if {[set stag $v(stag$w)] == {}} return
    set sigfile [file join [lib::cfig appdir] $stag$cfig(sigext)]
    lassign [read_file $sigfile] fields source eps
    set wrkfile [file join [lib::cfig workdir] edit-sig.$stag]
    write_file $wrkfile.obj $source

    docedit::edit $wrkfile.obj -post "etwsig::commit $w $wrkfile %d"
}

# After editing an electronic signature, save it
#------------------------------------------
proc etwsig::commit {w wrkfile isdiff} {
    variable cfig
    variable v
    
    if {!$isdiff} {
        dia::brief {No changes were made to signature}
        return
    }
    set v(source$w) [read_file $wrkfile.obj]
    set epsfile [docedit::build_ps $wrkfile.obj tgif $wrkfile.eps eps]
    set v(eps$w) [read_file $epsfile]
    if {[dia::ask "Changes were made to the electronic signature" 0 {Save Changes to Signature File Now} {I'll Save Later if I Want to}] < 0} return
    save $w
}

# Select from available stored signatures
#------------------------------------------
proc etwsig::select {w} {
    variable cfig
    set siglist {}
    foreach i [lsort [glob -nocomplain [lib::cfig appdir]/*$cfig(sigext)]] {
#puts "sig:[file rootname [file tail $i]]"
        lappend siglist [list [file rootname [file tail $i]]]
    }
#puts "w:$w siglist:$siglist"
    if {[scm::dia {Choose a signature:} -dest stag -f tag -token tag -data $siglist] < 0 || $stag == {}} return
    loadfile $w $stag
}

#Clear the widget
#------------------------------------------
proc etwsig::clear {w} {
    variable v
#puts "Clearing w:$w"
    $w.d init
    $w.e init
    lassign {} v(source$w) v(eps$w)
    showext $w 0
}

#Show/hide extended parameters
#------------------------------------------
proc etwsig::showext {w {set {}}} {
    variable v
#puts "show:$v(show$w) set:$set"
    if {$set != {}} {set v(show$w) $set}
    if {$v(show$w)} {
        pack $w.e -side left -fill y
    } else {
        pack forget $w.e
    }
}

#Insert a signature
#------------------------------------------
proc etwsig::create {t {tag {}} args} {
    variable cfig
    variable v

    etw::create_itag
    if {$tag != 0} {dia::err {Only 1 signature per letter allowed}; return}	;#Take this out if we think of a reason for multiple signatures

    etw::create_begin
    $w configure -bg blue
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg blue \
        -mb {menu Signature {Common functions operating on this address container}}
    $w.m menu mi selec {Select signature} -s Select -help {Choose a signature for this letter} -command "etwsig::select $w"
    $w.m menu mi save  {Save Signature} -help {Save the current signature to disk for later use} -command "etwsig::save $w"
    $w.m menu mi edit  {Edit Electronic Signature} -help {Edit the current electronic signature in TGIF} -command "etwsig::edit $w"
    $w.m menu mi view  {View Electronic Signature} -s View -help {View the current electronic signature} -command "etwsig::view $w"
    $w.m menu mi show  {Show Advanced} -type checkbutton -help {Show (or hide) additional settings associated with the rendering of your electronic signature} -command "etwsig::showext $w" -variable etwsig::v(show$w)
    $w.m menu mi clear {Clear} -help {Reset all fields to blank values} -command "etwsig::clear $w"
    $w.m menu mi del   {Delete Signature} -help {Delete the disk file associated with the current signature (Can not be un-done)} -command "etwsig::delete $w"
    $w.m menu mi exps  {Export Signature} -help {Export the current signature to a disk file} -command "etwsig::save $w 1"
    $w.m menu mi imps  {Import Signature} -help {Import signature parameters from a saved file} -command "etwsig::loadfile $w {} 1"
    $w.m menu mi help  {Widget Help} -command {help::locate etwsig} -help {Instructions on using the signature widget}
    pack $w.m -side left -fill y -exp 1

    mdew::mdew $w.d \
        -f "sinc	ent	16	{0 0}		{Close:}	-textv etwsig::v(sinc$w)  -init {Sincerely,} -spf scm -data {-f closings -token closings -data {{Sincerely,} {{Yours Truly,}} {{Thank you,}}}} -help {Closing greeting to use above your signature}"\
        -f "name	mle	{28 2}	{0 1 1 2}	{Name:}		-textv etwsig::v(name$w)  -help {Name and title to go under the signature}"\
        -f "email	ent	22	{1 2 2}		{Email:}	-textv etwsig::v(email$w) -help {Return E-mail address for the undersigner}"\
        -f "esig	chk	0	{2 0}		{Esig:}		-textv etwsig::v(esig$w)  -help {Use electronic signature (if available) on electronically transmitted letters}"\
        -f "stag	ent	12	{1 0}		{Sig:}		-textv etwsig::v(stag$w)  -spf {etwsig::select $w} -state readonly -help {Shortcut name of the currently selected signature}"
    mdew::mdew $w.e \
        -f "sab		ent	4	{0 0}		{Above:}	-textv etwsig::v(sab$w) -init 0.50 -just r -spin {f {0 1} -inc 0.05}	-help {The amount of space from the top edge of the closing greeting to the centerline of the signature}"\
        -f "sbe		ent	4	{0 1}		{Below:}	-textv etwsig::v(sbe$w) -init 0.50 -just r -spin {f {0 1} -inc 0.05}	-help {The amount of space from the centerline of the signature to the top of the name under the signature}"\
        -f "shs		ent	4	{0 2}		{Shift:}	-textv etwsig::v(shs$w) -init 0.00 -just r -spin {f {.5 2.5} -inc 0.05}	-help {The horizontal distance from the left edge of the closing greeting to the centerline of the signature (normally 1/2 the signature's width)}"\
        -f "ssw		ent	4	{0 3}		{Width:}	-textv etwsig::v(ssw$w) -init 2.00 -just r -spin {f {1 5} -inc 0.10}	-help {The overall width of the signature}"
    pack $w.d -side left -fill y
    if {$ca(init)} {
        clear $w
        if {$cfig(defsig) != {}} {loadfile $w $cfig(defsig); set ca(focus) 0}
        $t insert $ca(index)+1c "\n"
    }
    if {$ca(focus)} {after idle "focus [$w.d field name w]"}
    etw::create_end
}
