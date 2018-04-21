#Functions to work with colors and rgb
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- 

namespace eval color {
    namespace export edit bright
}

# Change the brightness of a color
# Delta is the number to add (or subtract) from each 256 bit color range
#------------------------------------------
proc color::bright {color delta} {
#debug color delta
    if {$delta < -100} {set delta -100}
    if {$delta >  100} {set delta 100}
    if {$delta == 0} {return $color}
    
    lassign [winfo rgb . $color] red green blue
#debug red green blue
    
    set red   [expr max(min(($red  / 0x100) + $delta, 255), 0)]
    set green [expr max(min(($green/ 0x100) + $delta, 255), 0)]
    set blue  [expr max(min(($blue / 0x100) + $delta, 255), 0)]
    set color [format {#%02X%02X%02X} $red $green $blue]
#debug color
    return $color
}

# Allow the user to select a color
#------------------------------------------
proc color::edit {vname} {
    upvar $vname v
    if {$v == {}} {set v ivory3}
    set clr [tk_chooseColor -initialcolor $v]   
    if {$clr == {}} {set clr $v}
    if {$clr == {}} {set clr ivory3}
    set v $clr
}
