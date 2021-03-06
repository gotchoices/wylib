# Set up a search widget for a text window
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

namespace eval tsearch {
    namespace export tsearch
    variable cfig
    variable v
}

# Do a search
#------------------------------------------
proc tsearch::search {w direction} {
    variable cfig
    variable v
    set t $cfig(t$w)
    set index [lindex [$t tag ranges sel] 0]
    if {$index == {}} {set index insert}
    if {$v(search$w) == {}} {return}
    if {$direction > 0} {
	set index [$t search -forwards -nocase $v(search$w) "$index + 1 char"]
    } else {
	set index [$t search -backwards -nocase $v(search$w) "$index - 1 char"]
    }
    if {$index == {}} {dia::ask "String \"$v(search$w)\" not found" 0 OK; return}
    set index2 [$t index "$index + [string length $v(search$w)] char"]
    $t tag remove sel 1.0 end
    $t tag add sel $index $index2
    $t see $index
}

# Make a search widget
#------------------------------------------
proc tsearch::tsearch {w t args} {
    variable cfig
    variable v
    argproc cfig(\$s$w) $args {{ftitle >>} {btitle <<} {focus 0}}
    set cfig(t$w) $t

    catch {frame $w -class Tsearch}	;#main frame for widget
    
    button $w.sf -text $cfig(ftitle$w) -command "tsearch::search $w 1" -pady 0 -padx 1 -help {Search forward}
    button $w.sb -text $cfig(btitle$w) -command "tsearch::search $w -1" -pady 0 -padx 1 -help {Search backward}
    entry $w.se -textvariable tsearch::v(search$w) -width 12 -borderwidth 1 -help {Enter the word to be searched for in the document}
    bind $w.se <Return> "tsearch::search $w 1"
    bind $w.se <KP_Enter> "tsearch::search $w 1"
    bind $w.se <Control-Return> "tsearch::search $w -1"
    bind $w.se <Control-KP_Enter> "tsearch::search $w -1"
    pack $w.se $w.sf $w.sb -side right
    
    set v(search$w) {}
    if {$cfig(focus$w)} {focus $w.se}
}
