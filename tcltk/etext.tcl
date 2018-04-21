# Routines to read and write tcl editor files which may include tags, etc.
# The elements "title" and "fmtver" are assumed to exist in the header array
# This is used for programs like noedit, ledit, bedit
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO
#X- test spell on widget
#X- better handling for hanam
#X- re-add support for format converter (FIXME)
#X- merge in edit.tcl ???
#X- allow arguments to each standard function
#X- FIX: The elements "title" and "fmtver" are assumed to exist in the header array
#X- implement modified function in wtext
#X- support for force set/clear modified status
#X- do we have something better than clrmod now?
#X- enough undo's takes us back to unmodified state
#X- modify state of save menu choice when unmodified
#X- save/restore preferences
#X- save-file working
#X- adjust to smiley on save
#X- use mdew to display header data
#X- clear space working 
#X- what is updcmd for?  Do we need it?
#X- load_file working
#X- Handle multiple open files
#- mark as 'modified' when text marked as bold
#- implement 'modified' method for dew, mdew
#- include header entries when checking if modified
#- implement a text editor using module
#-  Exit all
#-  Save status of last exit
#- check all key bindings according to key template
#- 
#- implement import/export submenus
#- make context menu to reference main menus (maybe not?)
#- 

namespace eval etext {
    namespace export etext filename
    variable cfig
    variable v
    
    set cfig(fmtver) 2
    set cfig(swar) {{application 3 app} {mode 2} {header 2} {filecallback 2 fcb} {nativeextension 3 natext} {importextension 3 iext} {exportextension 3 eext} {frame 2} {formatversion 3 fmtver} {converter 3 conv}}
    set cfig(cmar) {clearm natext iext eext mode app conv header etw}

    set cfig(subwcmd)	{etw::create $w.$k end $d}	;#command to build new embedded windows
    
    set cfig(tagtypes)	{s e}
    set cfig(tagnams.s)	{s_norm s_bold s_italic s_bital}
    set cfig(taglabs.s)	{Roman Bold Italic Bold/Italic}     
    set cfig(tagnams.e)	{e_norm e_under}     
    set cfig(taglabs.e)	{Nounder Underline}

    image create bitmap but   -data "#define dot_width 7\n#define dot_height 7\nstatic unsigned char dot_bits[] = {\n0x08, 0x14, 0x2a, 0x55, 0x2a, 0x14, 0x08};"
    image create bitmap smile -data "#define smiley_width 14\n#define smiley_height 14\nstatic unsigned char smiley_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x02, 0x38, 0x07, 0x00, 0x00,0x00, 0x00, 0x00, 0x00, 0x04, 0x08, 0x08, 0x04, 0x10, 0x02, 0xe0, 0x01,0x00, 0x00, 0x00, 0x00};"
    image create bitmap frown -data "#define frowny_width 14\n#define frowny_height 14\nstatic unsigned char frowny_bits[] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x02, 0x38, 0x07, 0x00, 0x00,0x00, 0x00, 0x00, 0x00, 0xe0, 0x01, 0x10, 0x02, 0x08, 0x04, 0x04, 0x08,0x00, 0x00, 0x00, 0x00};"
}

#option add *Etext.txt.width 10 widgetDefault
#option add *Etext.txt.height 10 widgetDefault
option add *Etext.Button.borderWidth 1 widgetDefault
option add *Etext.Scrollbar.width 12 widgetDefault

# Set or query the current filename
#------------------------------------------
proc etext::filename {w {filename {?}}} {
    variable cfig
    variable v
    if {$filename != {?}} {
        set v(curfname$w) $filename
        if {$cfig(fcb$w) != {}} {
            regsub -all {%f} $cfig(fcb$w) $filename cmd
            eval $cmd
        }
    }
    return $v(curfname$w)
}

# Change the characteristics of the selected text
#------------------------------------------
proc etext::settags {w tagnam} {
    variable cfig
#puts "[$w curselection]"
    set tagtyp [lindex [split $tagnam _] 0]
    lassign [$w tag ranges sel] start stop
    if {$start == {} && $stop == {}} return
#puts "tagnam:$tagnam start:$start stop:$stop"
    if {$tagtyp == {x}} {		;# if removing all tags
    	foreach k $cfig(tagtypes) {
            foreach i $cfig(tagnams.$k) {$w tag remove $i $start $stop}	;#remove old tags
    	}
        return
    }
    foreach i $cfig(tagnams.$tagtyp) {$w tag remove $i $start $stop}	;#remove old tags of this type
    if {$tagnam != "${tagtyp}_norm"} {$w tag add $tagnam $start $stop}	;#apply new tag
#    if {$cfig(setmod$w) != {}} {eval $cfig(setmod$w)}
}

# Make sure the text window has one and only one LF at the end
#------------------------------------------
proc etext::trimend {w} {
    for {set i 2} {[$w index end-1c] != 1.0} {incr i} {
#puts "i:$i"
        set text {}
        foreach {j k l} [$w dump -text -window -tag end-${i}c end-1c] {
            if {$j == {text}} {append text $k} else {append text {X}}
        }
        if {$text != {} && ![string is space -strict $text]} break
        if [$w compare end-${i}c <= 0.0] return		;#if checking back before beginning of window (like if window empty)
    }
    if {$i > 1} {$w delete end-[expr $i - 2]c end}	;#nuke any trailing spaces
    $w insert end "\n"		;#add a LF back in
}

#Load a data from a variable into the editor
#------------------------------------------
proc etext::load_data {w fcvar} {
    variable cfig
    variable v
    upvar $fcvar fcont

    set lastk {}
    set taglist {}
    set curins [$w index insert]
    foreach {j k l} $fcont {		;#read file one record at a time
#puts "LN|$j|$k|$l|"
        if {$j == {text}} {		;#insert regular text
            $w insert insert $k $taglist	;#(with any tags)
        } elseif {$j == {tagon}} {	;#add this tag in
            if {[lsearch $taglist $k] < 0} {set taglist "$taglist $k"}
        } elseif {$j == {tagoff}} {	;#or remove it
            set idx [lsearch $taglist $k]
            if {$idx >= 0} {lvarpop taglist $idx}
        } elseif {$j == {mark}} {
            if {$k == {insert}} {set curins $l}
        } elseif {$j == {_fmtver}} {
            set fmtver $l
#puts "fmtver:$fmtver"
            if {$fmtver > $cfig(fmtver$w)} {dia::err "File format $fmtver too large for this program version: $cfig(fmtver$w)"; return}
            if {$fmtver < $cfig(fmtver$w)} {		;#if this is an older version file
#puts "header:$cfig(header$w)"
#puts "trying: [lib::cfig appname]::legacy-${fmtver}-$cfig(fmtver$w) $cfig(header$w)"
#                            [lib::cfig appname]::legacy-${fmtver}-$cfig(fmtver$w) $w $fcont $cfig(header$w)
                if {[catch {[lib::cfig appname]::legacy-${fmtver}-$cfig(fmtver$w) $w $fcont $cfig(header$w)}]} {		;#try to execute a legacy converter
                    dia::err "Error converting from older format: ${fmtver} to current: $cfig(fmtver$w)"
                }
                break
            }
        } elseif {$j == {_subw} && $cfig(mode$w) == {ant}} {	;#dont recognize subwindows for straight text files
            set lastk $k
            set d $l					;#remember sub-window data for create in next step
        } elseif {$j == {window} && $cfig(mode$w) == {ant}} {	;#embedded window
#puts "subwcmd:$cfig(subwcmd):[subst $cfig(subwcmd)]:d:$d:"
            if {$lastk != $k} {dia::warn "Unexpected window command: $k, skipping widget"; continue}
            eval $cfig(subwcmd)	;#insert the window in the text widget
        } elseif {[string range $j 0 0] == {_}} {	;#if header element
            set tag [string range $j 1 end]
#puts "tag:$tag hdr:$cfig(header$w)"
            if {$cfig(header$w) != {} && [lcontain [$cfig(header$w) tags] $tag]} {
                $cfig(header$w) set [list $tag $k]
            } elseif {$fmtver == $cfig(fmtver$w)} {
                dia::warn "Unknown record type: $j; ignoring"
                continue
            }
        } else {
            if {[dia::warn "Unknown record type name: $j; ignoring" Cancel] > 0} return
        }
    }
#    $w mark set insert $curins		;#seems to cause coredump in certain rare instances when $w see insert done below
    focus $w
}

#Load a file into the editor, return the name of the file
#------------------------------------------
proc etext::load {w args} {
    variable cfig
    variable v
    
    argform {fname} args
    argnorm {{filename 2 fname}} args
    lassign {yes yes 0.0} clear setcur insert
    foreach s {fname} {set $s [xswitchs $s args]}
    foreach s {clear setcur insert} {xswitchs $s args $s}

    if {$fname == {}} {			;#if no filename given
        if {[sfile::dia -dest fname -ext $cfig(natext$w) -op Load -mask "*$cfig(natext$w)"] != 0} return
    }
    if {![file exists $fname]} {
        append fname $cfig(natext$w)
       if {![file exists $fname]} {dia::warn "File not found: ${fname}"; return {}}
    }
    
    set fcont [read_file $fname]	;#get file contents
    if {$clear} {$w delete 0.0 end}
    if {[string range $fcont 0 6] == {_fmtver}} {
        load_data $w fcont
        set cfig(mode$w) {ant}
    } else {
        $w insert insert $fcont
        set cfig(mode$w) {txt}
    }
    $w mark set insert $insert
    $w see insert
    if {$setcur} {			;#set as current file?
        filename $w $fname		;#set default file name
        $w.txt clearundo
        $w.txt modified 0
    }
    return $fname
}

#Create the data for a save
#------------------------------------------
proc etext::save_data {w} {
    variable cfig

    set sd [list _fmtver $cfig(app$w) $cfig(fmtver$w)]	;#write file version
    if {$cfig(header$w) != {}} {
        foreach tag [$cfig(header$w) tags] {
            lappend sd _$tag [$cfig(header$w) get $tag] 0
        }
    }
#puts "Sd:$sd"
    set tcont [$w dump -all 0.0 {end - 1 chars}]	;#get text contents

    foreach {j k l} $tcont {		;#read file one record at a time
        if {$j == {window}} {		;#if subwindow, write its data
#puts "WLN|$j|$k|$l|"
            set ident [lrange [split $k {.}] end end]	;#get last part of widget name
            lassign [split $ident {:}] typ tag
            lappend sd _subw $ident [$k get]		;#widget must have a get method
            lappend sd $j $ident $l
        } else {
            lappend sd $j $k $l
        }
    }
    return $sd
}

#Save to the current filename
#------------------------------------------
proc etext::save {w args} {
    variable v
    return [eval [list saveto $w -file $v(curfname$w)] $args]
}

#Save to a file fname
#------------------------------------------
proc etext::saveto {w args} {
    variable cfig
    variable v

    argform {file} args
    argnorm {{filename 1 file} {brief 1} {warn 1}} args
    lassign {1 1 {}} brief warn file
    foreach s {file brief warn} {xswitchs $s args $s}

    if {$file == {}} {
        if {[sfile::dia -dest file -ext $cfig(natext$w) -init $v(curfname$w) -op {Save As} -mask "*$cfig(natext$w)"] != 0} return
        filename $w $file
        if {$warn && [file exists $file]} {
            if {[dia::ask "File $file exists" 0 {OK, Overwrite It} {Cancel}] != 0} {return {}}
        }
    }

    if {$cfig(mode$w) == {txt}} {	;#plain text
        set data {}
        foreach {j k l} [$w dump -text 0.0 {end - 1 chars}] {if {"$j" == {text}} {append data $k}}
    } else {
        set data [save_data $w]	;#get before write in case of errors, we don't kill existing file
    }
    write_file $file $data
    $w.txt modified 0
    if {$brief} {dia::brief "File saved to $file" 500}
    return $file
}

#Import a file into a text window
#------------------------------------------
proc etext::import {w args} {
    variable cfig
    variable v

    argform {fname} args
    lassign {no {}} fmt fname
    foreach s {fmt fname} {xswitchs $s args $s}
    if {$fname == {}} {
        if {[sfile::dia -dest fname -ext $cfig(iexext$w) -op Import -init $v(curiname$w) -mask "*$cfig(iext$w)"] != 0} return
        set v(curiname$w) $fname
    }
    set fcont [read_file $fname]	;#get file contents
    if {$fmt} {} else {			;#if plain text
        $w insert insert $fcont
        return
    }					;#else formatted text
    set taglist {}
    foreach {j k l} $fcont {		;#read file one record at a time
        if {$j == {text}} {		;#insert regular text
            $w insert insert $k $taglist
        } elseif {$j == {tagon}} {	;#
            if {[lsearch $taglist $k] < 0} {lappend taglist $k}
        } elseif {$j == {tagoff}} {
            set idx [lsearch $taglist $k]
            if {$idx >= 0} {lvarpop taglist $idx}
        }
    }
    $w see insert
    if {$cfig(setmod$w) != {}} {eval $cfig(setmod$w)}
}

#Export the text window to a text file
#------------------------------------------
proc etext::export {w args} {
    variable cfig
    variable v

    argform {fname} args
    lassign {no {}} fmt fname
    foreach s {fmt fname} {xswitchs $s args $s}
    if {$fname == {}} {
        if {[sfile::dia -dest fname -ext $cfig(eext$w) -op Export -init $v(curename$w) -mask "*$cfig(iexext$w)"] != 0} return
        set v(curename$w) $fname
    }
    set fp [open $fname w]	;#open the file for write
    if {$fmt} {
        puts $fp [$w dump -all 0.0 {end - 1 chars}]
    } else {
        foreach {j k l} [$w dump -text 0.0 {end - 1 chars}] {
            if {$j == {text}} {puts -nonewline $fp $k}
        }
    }
    close $fp
}

#Clear to a blank workspace
#------------------------------------------
proc etext::clear {w} {
    variable cfig
    $w.txt delete 0.0 end         ;#clear text window
    $w.txt modified 0
    if {$cfig(header$w) != {}} {$cfig(header$w) init}
}

#Call each time a key is pressed
#------------------------------------------
proc etext::key_proc {w key} {
#puts "key_proc w:$w key:$key textv: etext::v(pos$w)"
    after idle "set etext::v(pos$w) \[$w index insert\]"
}

# Ask user if OK to exit even if not saved
#------------------------------------------
proc etext::quitok {w} {
    variable cfig

#FIXME: call text and header modified routines:?
    if {![$w modified] || $cfig(rwstate$w) == {ro}} {return 1}
    if {[set res [dia::ask "Warning:\nFile has been changed" 2 {Abandon Changes and Quit} {Save File and Quit} {Don't Quit}]] == 1} {
        save_file $w
    }
    return [expr $res == 0]
}

# Get configuration
#------------------------------------------
proc etext::cget {w option} {
    variable cfig
    argnorm $cfig(swar) option

    set opt [string trimleft $option -]
    if {[lcontain $cfig(cmar) $opt]} {return $cfig($opt$w)}
    return [eval $w.txt cget $option]
}

# Configure the text widget
#------------------------------------------
proc etext::configure {w args} {
    variable cfig
    if {$args == {}} {return [$w.txt configure]}
    argnorm $cfig(swar) args
    foreach tag $cfig(cmar) {xswitchs $tag.* args cfig($tag$w)}
    if {$cfig(toolbar$w) != {}}	{grid $cfig(toolbar$w) -row 1 -col 0 -sticky ew -columnspan 2}
    if {$args != {}} {return [eval $w.txt configure $args]}
    return {}
}

# Call when "contents modified" status changes
#------------------------------------------
proc etext::modhand {w dirty} {
    variable cfig
    if {$dirty} {
        $w.b configure -image frown -bg pink
        set st {normal}
    } else {
        $w.b configure -image smile -bg lightgreen
        set st {disabled}
    }
    if {$cfig(menu$w) != {}} {
        $cfig(menu$w) file save configure -state $st
    }
}

# Create an editor text widget
#------------------------------------------
proc etext::etext {w args} {
    variable cfig
    variable v

    argform {width height} args
    argnorm $cfig(swar) args
    array set cfig "mode$w ant fmtver$w $cfig(fmtver) app$w noedit"
    foreach tag {mode natext mode fmtver app} {xswitchs $tag args cfig($tag$w)}
    foreach tag {iext menu eext frame clearm conv toolbar header etw fcb} {set cfig($tag$w) [xswitchs $tag args]}
    if {[regexp {^[Tt].*} $cfig(mode$w)]} {set cfig(mode$w) {txt}} else {set cfig(mode$w) {ant}}
    if {![info exists cfig(natext$w)]} {
        if {$cfig(mode$w) == {txt}} {set cfig(natext$w) {}} else {set cfig(natext$w) {.ant}}
    }

    if {![winfo exists $w]} {eval wframe::_frame $w -class Etext $cfig(frame$w)}
    widginit $w etext *$w
    
    eval "text $w.txt -xsc {$w.xs set} -ysc {$w.ys set}" $args
    scrollbar $w.xs -command "$w.txt xview" -orient h
    scrollbar $w.ys -command "$w.txt yview"
    button $w.b -image but -command "etext::save $w" -help "Quick file save"

#Context menu:    
#    $w.txt menu add separator
    
    if {[set m $cfig(menu$w)] != {}} {		;#if there is a menu bar
        set bef {exit}
        $m mb tools -under 0 -help {A menu of common text editing functions}\
            -mi "spel {Spell Check}    -under 1 -s Sp -help {Check spelling in the text window} -command {spell::spell $w.txt}"\
            -mi "srch {Search/Replace} -under 0 -s Sr -help {Search for text in the window} -command {$w.txt find}"\
            -mi "print {Print Text} -under 0 -help {Print the text in the editing window} -command {$w.txt print}"

        if {$cfig(mode$w) == {ant}} {
            $m tools mi spea {Spell Check All} -after spel -help {Check spelling in the text window and also in applicable fields of any embedded windows} -command {spell::spell $w.txt -etw 1}
            $m mb text -under 2 -help {Change characteristics of the text in the document}
            foreach typ $cfig(tagtypes) {
                foreach nam $cfig(tagnams.${typ}) lab $cfig(taglabs.${typ}) {
                    $m text mi ${typ}_$nam $lab -command "etext::settags $w $nam"	;#-help $help
                }
            }
#standard styles 
            set font [$w.txt cget -font]
#           $w.txt tag configure s_norm		-font $font
            $w.txt tag configure s_bold		-font "$font bold"
            $w.txt tag configure s_italic	-font "$font italic"
            $w.txt tag configure s_bital	-font "$font bold italic"

#standard emphases
#           $w.txt tag configure e_norm -underline off
            $w.txt tag configure e_under -underline on
        }

        if {$cfig(mode$w) == {ant} && $cfig(etw$w) != {}} {
            $m mb insert -under 0 -help {Embed various data features into the document text}
            foreach tag $cfig(etw$w) {
                lassign [etw::title $tag] title help
                $m insert mi etw_$tag $title -command "etw${tag}::create $w" -help $help
            }
        }

        $m s dew::dew pos ent Pos: -width 6 -just right -textv etext::v(pos$w) -init 1 -gmc {-side right} -help {Current file position (row.column)}

        $m file mi save -under 0 -s Sv -acc C-s -command "etext::save $w"  -help {Save the workspace to the current file} -before $bef
        $m file mi saas {Save As} -under 5 -command "etext::saveto $w" -help {Save the workspace to a different filename} -before $bef
        $m file mi load {Load File} -hot C-o -command "etext::load $w" -help {Load a new file into the workspace, replacing its current contents} -before $bef
        $m file mi ins {Insert File} -command "etext::notimp $w" -help {Insert the contents of a file at the current cursor location} -before $bef
        $m file mi clr {Clear Workspace} -command "etext::clear $w" -help {Delete all contents of the workspace} -before $bef
        $m file mi sep -before $bef
        $m file sm import -before $bef
        $m file sm export -before $bef
        $m file mi sep -before $bef
        $m file save configure -state disabled
    }

#If using pack:
#    if {[$w.txt cget -wrap] != {word}} {pack $w.xs -side bottom -fill x}
#    pack $w.mu -side top -fill x
#    pack $w.ys -side right -fill y
#    pack $w.txt -side right -fill both -exp 1
#button $w.b

#If using grid:
    grid columnconfigure $w 1 -weight 1
    grid rowconfigure $w 1 -weight 1
    grid $w.txt -row 1 -column 1 -sticky news
    grid $w.ys  -row 1 -column 2 -sticky ns
    grid $w.xs  -row 2 -column 1 -sticky ew
    grid $w.b   -row 2 -column 2 -sticky news
    if {$cfig(toolbar$w) != {}}	{grid $cfig(toolbar$w) -row 1 -col 0 -sticky ew -columnspan 2}

    bind $w <FocusIn> "focus $w.txt"	;#defer focus to text box

    bind $w.txt <Alt-p> {}		;#remove default functions
    bind $w.txt <Alt-o> {}
    bind $w.txt <Alt-s> {}
#    focus $w.txt				;#initial focus on main window
    bind $w.txt <Key> "etext::key_proc $w %A"	;#call on each key press
    bind $w.txt <ButtonRelease-1> "etext::key_proc $w {}"
    bind $w.txt <<Modified>> "etext::modhand $w %s"

    lassign {} v(curiname$w) v(curename$w)
    filename $w {}
    after idle "set etext::v(pos$w) \[$w index insert\]"
    modhand $w 0
    return $w
}

# Widget command
#------------------------------------------
proc etext::wcmd {w cmd args} {
    variable cfig
    variable v
    set cmd [unabbrev {{frame 1} {text 1} {load 2} {save 2} {cget 2} {configure 2} {import 2} {export 2} {clear 2} {trimend 2} {preference 4 pref}} $cmd]
    if {[lcontain {load save saveto import export configure cget clear trimend} $cmd]} {return [eval $cmd $w $args]}
    switch -exact $cmd {
        {w}		{return $w}
        {pref}		{return {}}
        {frame}		{return [eval _$w $args]}
        {text}		{return [eval $w.txt $args]}
        {pref}		{return {}}
        {default}	{return [eval $w.txt $cmd $args]}
    }
}
