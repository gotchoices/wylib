# Create an image displayed on a label (a packable image)
# By requiring the Img package, we can transparently support several image formats (jpeg, gif, png, etc)
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35
package require Img

#TODO:
#- "system convert" call is not platform independent
#- 

namespace eval photo {
    namespace export photo edit readfile
    variable cfig
    set cfig(swar)	{{frame 2} {textvariable 5 textv} {resx 4} {resy 4}}
}

#option add *Photo.borderWidth 1 widgetDefault
#option add *Photo.relief sunken widgetDefault

# Return encoded data from a graphics file
#------------------------------------------
proc photo::edit {w} {
    variable cfig

    set tmpf [getval $w 0]		;# get file
    docedit::edit $tmpf			;# edit it
    setval $w $tmpf			;# write back file
}

# Get data from the entry widget
#------------------------------------------
proc photo::getval {w {asdata 1}} {
    variable cfig

    # temp file name
    set tmpf $lib::cfig(workdir)/$cfig(imgo$w).jpg
    
    # write out a temporary file of the original image
    $cfig(imgo$w) write $tmpf -format jpeg

    if { $asdata == 1 } {
        # return the data
        return [osdep::smash_file $tmpf]
    } else {
        # return the name
        return $tmpf
    }
}

# Set the photo to a specific file or data (auto-detected type)
#------------------------------------------
proc photo::setval {w value} {
    variable cfig
    if {"$value" == {}} {
        clear $w
        return
    }
#puts "photo::setval $w $value"
    # clear shown image
    image create photo blank
    set mx [image width $cfig(img$w)]
    set my [image height $cfig(img$w)]
    blank configure -width $mx -height $my
    $w configure -image blank

    # delete old
    image delete $cfig(img$w)
    image delete $cfig(imgo$w)

    # file or data ?
    if { [file exists $value] == 0 } {
        set tmpf $lib::cfig(workdir)/$w.tmp.img

        # is data uuencoded?
        if { [regexp "begin-base64" $value] == 1 } {
            # unsmash the data
            osdep::unsmash_data $value $tmpf
        } else {
            # write out the raw image data to a temp file
            set f [open $tmpf w]
            puts -nonewline $f $value
            close $f
        }
        
        # now let's just pretend we were given a file
        set value $tmpf
    }

    # create new
    if {$cfig(resx$w) == {} || $cfig(resy$w) == {}} {
        image create photo $cfig(img$w) -file $value
        image create photo $cfig(imgo$w) -file $value
    } else {
        set tmpf $lib::cfig(workdir)/$w.tmp2.jpg
        image create photo $cfig(imgo$w) -file $value
        eval system "convert -sample $\{cfig(resx$w)\}x$\{cfig(resy$w)\} $value $tmpf"
        image create photo $cfig(img$w) -file $tmpf
#        resize $cfig(imgo$w) $cfig(resx$w) $cfig(resy$w) $cfig(img$w)
    }

    # set
    $w configure -image $cfig(img$w)

    # cleanup
    image delete blank
}

# Set the photo to a specific file or data (auto-detected type)
#------------------------------------------
proc photo::clear {w} {
    variable cfig
#puts "photo::clear $w"
    # clear shown image
    image create photo blank
    set mx [image width $cfig(img$w)]
    set my [image height $cfig(img$w)]
    blank configure -width $mx -height $my
    $w configure -image blank

    # delete old
    image delete $cfig(img$w)
    image delete $cfig(imgo$w)

    # clear old
    image create photo $cfig(img$w)
    image create photo $cfig(imgo$w)
    $cfig(img$w) configure -width $mx -height $my
    $cfig(imgo$w) configure -width $mx -height $my

    # reset, and cleanup
    $w configure -image $cfig(img$w)
    image delete blank
}

# Resize an new copy of the image
# It resizes with the same aspect ratio as the original, potentially creating an image not of the size given in newx/newy
# You should treat newx/newy as maximums, not hard numbers
# original code from http://wiki.tcl.tk/11196 (retrieved Jan-10-2007)
#------------------------------------------
proc photo::resize {src newx newy {dest ""} } {

    set mx [image width $src]
    set my [image height $src]

    if { "$dest" == ""} {
        set dest [image create photo]
    }

    # If the original is empty, create dest as a big empty, and return
    if { $mx == 0 || $my == 0 } {
        $dest configure -width $newx -height $newy
        return $dest
    }

    # Recreate original aspect ratio in newx/newy
    if { $mx > $my } {
        set newy [ int [ expr "$newx / ( 1.0 * $mx / $my )" ] ]
    } else {
        set newx [ int [ expr "$newy * ( 1.0 * $mx / $my )" ] ]
    }

    $dest configure -width $newx -height $newy

    # Check if we can just zoom using -zoom option on copy
    if { $newx % $mx == 0 && $newy % $my == 0} {

        set ix [expr {$newx / $mx}]
        set iy [expr {$newy / $my}]
        $dest copy $src -zoom $ix $iy
        return $dest
    }

    set ny 0
    set ytot $my

    for {set y 0} {$y < $my} {incr y} {

        #
        # Do horizontal resize
        #

        foreach {pr pg pb} [$src get 0 $y] {break}

        set row [list]
        set thisrow [list]

        set nx 0
        set xtot $mx

        for {set x 1} {$x < $mx} {incr x} {

            # Add whole pixels as necessary
            while { $xtot <= $newx } {
                lappend row [format "#%02x%02x%02x" $pr $pg $pb]
                lappend thisrow $pr $pg $pb
                incr xtot $mx
                incr nx
            }

            # Now add mixed pixels

            foreach {r g b} [$src get $x $y] {break}

            # Calculate ratios to use

            set xtot [expr {$xtot - $newx}]
            set rn $xtot
            set rp [expr {$mx - $xtot}]

            # This section covers shrinking an image where
            # more than 1 source pixel may be required to
            # define the destination pixel

            set xr 0
            set xg 0
            set xb 0

            while { $xtot > $newx } {
                incr xr $r
                incr xg $g
                incr xb $b

                set xtot [expr {$xtot - $newx}]
                incr x
                foreach {r g b} [$src get $x $y] {break}
            }

            # Work out the new pixel colours

            set tr [expr {int( ($rn*$r + $xr + $rp*$pr) / $mx)}]
            set tg [expr {int( ($rn*$g + $xg + $rp*$pg) / $mx)}]
            set tb [expr {int( ($rn*$b + $xb + $rp*$pb) / $mx)}]

            if {$tr > 255} {set tr 255}
            if {$tg > 255} {set tg 255}
            if {$tb > 255} {set tb 255}

            # Output the pixel

            lappend row [format "#%02x%02x%02x" $tr $tg $tb]
            lappend thisrow $tr $tg $tb
            incr xtot $mx
            incr nx

            set pr $r
            set pg $g
            set pb $b
        }

        # Finish off pixels on this row
        while { $nx < $newx } {
            lappend row [format "#%02x%02x%02x" $r $g $b]
            lappend thisrow $r $g $b
            incr nx
        }

        #
        # Do vertical resize
        #

        if {[info exists prevrow]} {

            set nrow [list]

            # Add whole lines as necessary
            while { $ytot <= $newy } {

                $dest put -to 0 $ny [list $prow]

                incr ytot $my
                incr ny
            }

            # Now add mixed line
            # Calculate ratios to use

            set ytot [expr {$ytot - $newy}]
            set rn $ytot
            set rp [expr {$my - $rn}]

            # This section covers shrinking an image
            # where a single pixel is made from more than
            # 2 others.  Actually we cheat and just remove
            # a line of pixels which is not as good as it should be

            while { $ytot > $newy } {

                set ytot [expr {$ytot - $newy}]
                incr y
                continue
            }

            # Calculate new row

            foreach {pr pg pb} $prevrow {r g b} $thisrow {

                set tr [expr {int( ($rn*$r + $rp*$pr) / $my)}]
                set tg [expr {int( ($rn*$g + $rp*$pg) / $my)}]
                set tb [expr {int( ($rn*$b + $rp*$pb) / $my)}]

                lappend nrow [format "#%02x%02x%02x" $tr $tg $tb]
            }

            $dest put -to 0 $ny [list $nrow]

            incr ytot $my
            incr ny
        }

        set prevrow $thisrow
        set prow $row

        update idletasks
    }

    # Finish off last rows
    while { $ny < $newy } {
        $dest put -to 0 $ny [list $row]
        incr ny
    }
    update idletasks

    return $dest
}


    
# Return encoded data from a graphics file
#------------------------------------------
proc photo::readfile {fname} {
    
    fconfigure [set fp [open $fname r]] -encoding binary -translation binary
    set imgdata [base64::encode [read $fp]]
    close $fp
    return $imgdata
}

# Implement -textvariable switch (handle call to traced variable)
#------------------------------------------
proc photo::trhand {t n1 n2 op} {
    variable cfig
#puts "t:$t n1:$n1 n2:$n2 op:$op"
    if {$n2 == {}} {upvar ${n1} var} else {upvar ${n1}($n2) var}
    if {$op == {r}} {
        set var [$cfig(img$t) data]
    } elseif {$op == {w}} {
        $cfig(img$t) configure -data $var
    }
}

# Get configuration
#------------------------------------------
proc photo::cget {w option} {
    variable cfig
#puts "$w cget $option"
    argnorm $cfig(swar) option
    set opt [string trimleft $option -]
    if {$opt == {help}} {return [_$w cget -help]}
    if {[lcontain {textv} $opt]} {return $cfig($opt$w)}

#FIXME: fill in more parms unique to the label
    if {[lcontain {cursor} [unabbrev {{cursor 2}} $opt]]} {	;#is this a label parameter
        return [eval _$w cget $option]
    }
    return [eval $cfig(img$w) cget $option]		;#or an image parameter
}

# Configure the widget
#------------------------------------------
proc photo::configure {w args} {
    variable cfig
    if {$args == {}} {return [$cfig(img$w) configure]}
    argnorm $cfig(swar) args
#puts "configure $w $args"
    foreach tag {help textv} {xswitchs $tag args cfig($tag$w)}
    _$w configure -help $cfig(help$w)		;#send it to the label
    if {$args != {}} {
        if {[catch {set res [eval $cfig(img$w) configure $args]}]} {
            set res [eval _$w configure $args]
        }
        return $res
    }
    return {}
}

# Make a label and a new image, place the image on the label
#------------------------------------------
proc photo::photo {w args} {
    variable cfig

#    argform {} args
    argnorm $cfig(swar) args
    foreach tag {frame help textv resx resy} {set cfig($tag$w) [xswitchs $tag args]}

    set cfig(img$w) photo::img[translit . _ $w]
#puts "$cfig(img$w)"
    set cfig(imgo$w) photo::img[translit . _ $w]_orig
    if {$cfig(resx$w) == {} || $cfig(resy$w) == {}} {
        eval image create photo $cfig(img$w) $args
        eval image create photo $cfig(imgo$w) $args
    } else {
        eval image create photo $cfig(imgo$w) $args
        image create photo $cfig(img$w)
        resize $cfig(imgo$w) $cfig(resx$w) $cfig(resy$w) $cfig(img$w)
    }
    #eval label $w -image $cfig(img$w) -bd 1 -relief sunken -help \$cfig(help$w) $cfig(frame$w)
    eval label $w -bd 1 -relief sunken -help \$cfig(help$w) $cfig(frame$w)
    $w configure -image $cfig(img$w)

    if {$cfig(textv$w) != {}} {
        upvar $cfig(textv$w) var
        if {![info exists var]} {
            set var {}
        } else {
            $cfig(img$w) configure -data $var
        }
        uplevel "trace variable $cfig(textv$w) rw {photo::trhand $w}"
    }

    widginit $w photo *$w
    return $w
}

# Widget command
#------------------------------------------
proc photo::wcmd {w cmd args} {
    variable cfig
#puts "wcmd $w $cmd $args"
    set cmd [unabbrev {{frame 2} {get 1} {set 1} {file 2} {clear 1} {edit 1} {configure 4} {cget 2}} $cmd]
    if {[lcontain {configure cget} $cmd]} {
        return [eval $cmd $w $args]
    }
    switch -exact -- $cmd {
        {w}		{return $w}
        {get}           {return [eval getval $w $args]}
        {set}           {return [eval setval $w $args]}
        {file}          {return [eval getval $w 0 $args]}
        {clear}         {return [eval clear $w $args]}
        {edit}          {return [eval edit $w $args]}
        {frame}		{return [eval _$w $args]}
        {default}	{return [eval $cfig(img$w) $cmd $args]}
    }
}
