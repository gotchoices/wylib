#A file attached to a document
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- Still inserts the attachment even if the filetype check fails
#- move database references to sitelib extension somehow?
#- see FIXME below (sql on ord_hdr should be part of atilib)
#- write manual
#- 

package require base64
namespace eval etwatt {
    namespace export create lout get flist
    variable cfig
    variable v
    variable largest_tag 0
    set v(attfname) {}
    set v(attaches) {{Disk File (included)} {
        if {[sfile::dia {Select file to attach} -dest fname] != 0} {return 0}
        $w set file [file tail $fname]
        $w set type [docedit::ffmt $fname]
        $w set data [osdep::smash_file $fname]
        if {[dia::query "Description for this attachment:" descr 0 OK Cancel] < 0} {return 0}
        $w set descr $descr
    } {Disk File (referenced only)} {
        if {[dia::ask "Including by reference should only be used for common marketing materials where the exact content is not important.  If the disk file is changed or deleted you will not be able to see later what the document actually contained" 0 {OK, Continue} Cancel] < 0} {return 0}
        if {[sfile::dia {Select file to attach} -dest fname] != 0} {return 0}
        $w set file $fname
        $w set type file
        if {[dia::query "Description for this attachment:" descr 0 OK Cancel] < 0} {return 0}
        $w set descr $descr
    }}
}

#Dump all attachments in the specified text window in lout format
#------------------------------------------
proc etwatt::lout {t} {
    variable v
    set alist {}
    foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {	;#find all attachments
        if {[lindex [split [lindex [split $k :] 0] .] end] == {att}} {
#puts "j:$j k:$k l:$l"
        lassign [$k get {type descr file}] type descr file
#puts "type:$type descr:$descr"
            if {$descr == {} && $type == {order}} {set descr "Bid/order #$file"}
            lappend alist [lout::quote $descr]
        }
    }
    if {[llength $alist] > 0} {
        return "// Encl: @OPar @LM {1i} lines @Break \{[join $alist { //1vx }]\}\n@DP\n"
    }
    return {}
}

#Return a list of sub-widgets that can be spell-checked
#------------------------------------------
proc etwatt::splist {w} {
    return [$w.d field descr entry w]]
}

#Dump the widget contents as a list
#------------------------------------------
proc etwatt::get {w {fields {file type descr data}}} {
#puts "$w.d get $fields"
    return [$w.d get $fields]
}

#Load widget values from name/value pairs
#------------------------------------------
proc etwatt::setvals {w args} {$w.d set $args}

#Load the widget contents from a list
#------------------------------------------
proc etwatt::load {w vals} {
#    variable v
#    set v(tag$w) [lrange [split $w {:}] end end]

    set i 0; foreach t {file type descr data} {
        $w.d set [list $t [lindex $vals $i]]
        incr i
    }
}

#Dump each attachment to a file, return a list of the {filename fmt descr}
#------------------------------------------
proc etwatt::flist {t} {
    variable v
    set alist {}
    foreach {j k l} [$t dump -window 0.0 {end - 1 chars}] {	;#find all attachments
        if {[lindex [split [lindex [split $k :] 0] .] end] == {att}} {
            set fname [lib::cfig workdir]/att-$v(file$k)
            uplevel "output \"  $v(descr$k) --> $fname\""
            if {$v(type$k) == {order}} {
                append fname . [set fmt ps]
                set wrkfile [docedit::build_ps $v(file$k) order $fname $fmt]
            } elseif {$v(type$k) == {file}} {
                file copy -force $v(file$k) [set fname [lib::cfig workdir]/[file tail $v(file$k)]]
                set fmt [docedit::ffmt $fname]
            } else {
                exec /usr/bin/uudecode -o - << $v(data$k) | /bin/zcat > $fname	;#write file
                set fmt $v(type$k)
            }
            lappend alist [list $fname $fmt $v(descr$k)]
        }
    }
#puts "alist:$alist"
    return $alist
}

# Render this attachment out to a disk file in the workspace, returning the name
#------------------------------------------
proc etwatt::unsmash {w} {
    variable cfig
    variable v
    if {[$w get type] == {file}} {
        set wrkfile [$w get file]
    } else {
        set wrkfile [lib::cfig workdir]/ledit-view-[$w get file]
        if {[$w get type] == {order}} {
            set wrkfile [docedit::build_ps [$w get file] order $wrkfile.ps ps]
        } else {
            osdep::unsmash_data [$w get data] $wrkfile
#puts "Expanded: $wrkfile"
        }
    }
    return $wrkfile
}

#View this enclosure
#------------------------------------------
proc etwatt::view {w {doprint 0}} {
    docedit::view [unsmash $w] -print $doprint
}

#Save this enclosure to a named file
#------------------------------------------
proc etwatt::saveas {w} {
    set source [unsmash $w]
    set ext [file extension $source]
    set file [file tail $source]
    if {[sfile::dia -dest file -op {Save As} -ext $ext -mask "*$ext"] != 0} return
    if {[file exists $file]} {
        if {[dia::ask "File $file exists" 0 {OK, Overwrite It} {Cancel}] != 0} {return}
    }
    file copy -force [unsmash $w] $file
}

#Clear the widget
#------------------------------------------
proc etwatt::clear {w} {
    variable v
    $w.d init
}

# Attach a document
#------------------------------------------
proc etwatt::attach {w} {
    variable v

    set names {}
    foreach {n val} $v(attaches) { lappend names $n }
    if {[set res [eval "dia::ask {Attach which type of document:} 0 $names Cancel"]] < 0} {return 0}

    eval [lindex $v(attaches) [expr {(2*$res)+1}]]
    
    return 1
}

# Add an attachment type.
# It should include a name (shown on the button) and a command to
# execute if the button is pressed.
#------------------------------------------
proc etwatt::add_attach {args} {
    variable v

    argform {name cmd} args
    argnorm {{name 1} {command 1 cmd}} args
    foreach s {name cmd} {set $s [xswitchs $s args]}
    lappend v(attaches) $name $cmd
}

#Insert an attachment
#------------------------------------------
proc etwatt::create {t {tag {}} args} {
    variable v

    etw::create_itag
    etw::create_begin
    $w configure -bg {light green}
    mbar::mbar $w.m -gmc {-side top -pady 0} -bg {light green} \
        -mb {menu Attachment {Common functions operating on this address container}}
    $w.m menu mi view {View Document} -help {See the contents of this attached document} -command "etwatt::view $w"
    $w.m menu mi print {Print Document} -help {See the contents of this attached document} -command "etwatt::view $w 1"
    $w.m menu mi save {Save to File} -help "Write this document out to a disk file" -command "etwatt::saveas $w"
    $w.m menu mi help {Widget Help} -command {help::locate etwatt} -help {Instructions on using the attachment widget}
    $w.m menu mi close Close -help {Close this attachment box} -command "destroy $w"
    pack $w.m -side left -fill y -exp 1

    mdew::mdew $w.d \
        -f "file	ent	20	{0 0}		{File:}		-textv etwatt::v(file$w) -state disabled -spf {etwatt::attach $w} -help {The full name of the attached file/document}"\
        -f "type	ent	8	{1 0}		{Type:}		-textv etwatt::v(type$w) -state disabled -help {The type (or format) of the attached document}"\
        -f "descr	ent	36	{2 0}		{Descr:}	-textv etwatt::v(descr$w) -help {A brief comment describing the attached document}"\
        -f "data	ent	0	{3 0}		{Data:}		-textv etwatt::v(data$w) -hide 1 -help {The actual document data}"
    pack $w.d -side left
    etw::create_end
    if {$ca(init)} {
        clear $w
        if {![attach $w]} return
        $t insert $ca(index)+1c "\n"
    }
    if {$ca(focus)} {after idle "focus [$w.d field descr w]"}
}

if {[info commands locawyze] != {}} {locawyze etwatt}
