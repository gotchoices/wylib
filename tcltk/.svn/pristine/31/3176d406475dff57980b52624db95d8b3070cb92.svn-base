# Routines common to all Embedded Text Widget modules
# This is used for programs like noedit, ledit
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#X- rewrite suptext
#X- port ledit to wylib (test)
#X- spell-all works in ledit
#- rename ::load commands in etw's
#- file insert working properly
#- 
#All ETW's:
#- port all create/load/dump methods
#- port all lout methods
#-  sec
#-  qcc
#-  psm
#-  inc
#X-  fig
#-  bom
#- 
#LATER:
#- allow to rename a subwidget and all its data
#- allow copy/paste of subwidgets
#- 

#Not needed anymore: ?
#option add *Etw*Button.cursor top_left_arrow widgetDefault
#option add *Etw*Menubutton.cursor top_left_arrow widgetDefault
#option add *Etw*Menubutton.relief raised widgetDefault
#option add *Etw*Checkbutton.cursor top_left_arrow widgetDefault
#Why doesn't this work:
#option add *Etw*Menubutton.borderwidth 4 widgetDefault
#option add *Etw.m.Menubutton.padX 0 widgetDefault

namespace eval etw {
    namespace export create splist title widgcmd
    variable cfig
    variable v
}

#Return titles of various etw types
#------------------------------------------
proc etw::title {type} {
    switch $type {
        att	{return {Attachment {Disk file or other document attached to the main document}}}
        add	{return {Address {Mailing address information for a recipient}}}
        cmt	{return {Comment {Contains author notations which will not show up in the formatted document}}}
        fmt	{return {{Formatting Command} {Command to produce special characters not normally part of the keyboard}}}
        par	{return {{Paragraph Style} {Controls indentation of paragraphs due to outline-type section numbering}}}
        ref	{return {Reference {Inserts a reference to a figure or table}}}
        sig	{return {{Signature Block} {Contains the sender's signature and email return address}}}
        tab	{return {Table {Contains rows and columns of data}}}
    }
}

#Create a user-generated tag name
#------------------------------------------
uproc etw::create_atag 1 {
    variable last_tagname
    regsub -- {^::etw} [namespace current] {} _prefix
    if {$tag == {}} {
        while {1} {
            if {[dia::query "Input a tag name:" last_tagname 0 OK Cancel] > 0} {return {}}
            if {[regexp {^[a-zA-Z_~0-9]+$} $last_tagname]} {break}
            dia::err {Use only alphanumeric characters please}
       }
        set tag $last_tagname
    }
    set w $t.${_prefix}:$tag
}

#Create a unique tag number
#------------------------------------------
uproc etw::create_itag 1 {
    regsub -- {^::etw} [namespace current] {} _prefix
    if {$tag == {}} {
        for {set tag 0} {[winfo exists $t.$_prefix:$tag]} {incr tag} {}
    }
    set w $t.$_prefix:$tag
}

#Common steps to the beginning of creating an etw
#------------------------------------------
uproc etw::create_begin 1 {
    argproc ca(\$s) $args {{index {[$t index insert]}} {init yes} {focus yes} {data {}}}
    ::wframe::_frame $w -class Etw -bd 1 -relief raised
    $t window create $ca(index) -window $w
}

#Common steps to the end of creating an etw
#------------------------------------------
uproc etw::create_end 1 {
    if {$ca(data) != {}} {load $w $ca(data)}
    rename ::$w ::etw::_$w		;#move out original frame command
    proc ::$w {cmd args} "eval etw::widgcmd $w etw$_prefix \$cmd \$args"	;#make widget command
    bind $w <Destroy> "+etw::widgclose $w"
    return $w
}

# Do things common to destroying an etw
#----------------------------------------------------
proc etw::widgclose {w} {
#    array unset $etw${???}::v $w?	;#deallocate any storage
    catch {rename ::$w {}}
}

#Generic widget command for all etw's
#------------------------------------------
proc etw::widgcmd {w ns cmd args} {
    set cmd [unabbrev {{setvals 3} {cget 2} {configure 4}} $cmd]	;#bad idea to rename "set"
#puts "etw::widgcmd w:$w ns:$ns cmd:$cmd args:$args"
    if {[lcontain {cget configure} $cmd]} {
        return [eval ::etw::_$w $cmd $args]
    } else {		;#assume there is a command by this name in the individual etw namespace
#puts "eval ${ns}::$cmd $w $args"
        return [eval ${ns}::$cmd $w $args]
    }
}

#create a sub-window widget
#------------------------------------------
proc etw::create {wnam idx {data {}}} {
    set dot [string last {.} $wnam]
    set t [string range $wnam 0 [expr $dot - 1]]	;#text window name
    lassign [split [string range $wnam [expr $dot + 1] end] {:}] typ nam	;#get type and name
#puts "TYP:$typ nam:$nam t:$t data:$data"
    etw${typ}::create $t $nam -index $idx -init no -focus no -data $data
}

#Return spell-checkable sub-windows
#------------------------------------------
proc etw::splist {wnam} {
    set dot [string last {.} $wnam]
    lassign [split [string range $wnam [expr $dot + 1] end] {:}] typ nam	;#get type and name
    return [etw${typ}::splist $wnam]
}

#Return a data entry value from within the named etw
#------------------------------------------
proc etw::get {w field} {
    return [$w.d field $field get]
}
