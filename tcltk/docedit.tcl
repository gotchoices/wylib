#These functions provide for viewing and/or editing files of a variety of
#different types and formats
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33

#TODO:
#- in edit, make a file selector that allows import/export of ro files such 
#  as postscript (this will serve as a pseudo editor for unsupported formats)
#- It seems useless to open the edit pipe if post == {}
#- Allow a figure (tgif/proE) to be rendered with parameters (parametric)
#- 

namespace eval docedit {
    namespace export fext view edit build_ps ffmt scale
    variable cfig

#format_name file_extension writable_format editor viewer
    foreach {tag rec} {
        tgif	{obj	rw	{tgif 2>/dev/null}}
        ps	{ps	rw	leafpad  evince}
        eps	{eps	rw	leafpad  evince}
        pdf	{pdf	ro	/usr/bin/acroread   /usr/bin/acroread}
        gif	{gif	rw	/usr/bin/gimp	/usr/bin/display}
        jpg	{jpg	rw	/usr/bin/gimp	/usr/bin/display}
        tiff	{tif	rw	/usr/bin/gimp	/usr/bin/display}
        png	{png	rw	/usr/bin/gimp	/usr/bin/display}
        dxf	{dxf	rw	/usr/bin/qcad   /usr/bin/qcad}
        doc	{doc	rw	/usr/bin/office    /usr/bin/office}
        xls	{xls	rw	/usr/bin/calc /usr/bin/calc}
        ppt	{ppt	rw	/usr/bin/office /usr/bin/office}
        sdw	{sdw	rw	/usr/bin/office    /usr/bin/office}
        sdc	{sdc	rw	/usr/bin/office    /usr/bin/office}
        sxw	{sxw	rw	/usr/bin/office    /usr/bin/office}
        sxc	{sxc	rw	/usr/bin/office    /usr/bin/office}
        sxi	{sxi	rw	/usr/bin/office    /usr/bin/office}
        odt	{odt	rw	/usr/bin/calc /usr/bin/calc}
        ods	{ods	rw	/usr/bin/calc /usr/bin/calc}
        rtf	{rtf	rw	/usr/bin/oowriter   /usr/bin/oowriter}
        wp	{wp	rw	/usr/local/bin/xwp  /usr/local/bin/xwp}
        dwb	{dwb	rw	/usr/bin/varicad    /usr/bin/varicad}
        mrp	{mrproject rw	/usr/bin/planner    /usr/bin/planner}
		  zip {zip	ro	/ati/bin/tarball	/ati/bin/tarball}
    } {
        lassign $rec cfig(ext.$tag) cfig(mode.$tag) cfig(edit.$tag) cfig(view.$tag)
    }
}

# Return a file extension given a file format name
#------------------------------------------
proc docedit::fext {format} {
    variable cfig
    if {![info exists cfig(ext.$format)]} {return {}}
    return $cfig(ext.$format)
}

# View a PS of the named document
#------------------------------------------
proc docedit::view {fname args} {
    variable cfig
    argproc ca(\$s) $args {{format {}} {apargs {}} {print 0} {misfig {}}}
    if {$ca(format) != {}} {set format $ca(format)} else {set format [ffmt $fname]}
#debug format fname
    if {[info exists cfig(view.$format)] && $cfig(view.$format) != {}} {
        if {$format != {}} {system "$cfig(view.$format) \"$fname\" &"}
        return 0
    }
    if {![lcontain {ps eps pdf} $format]} {
        set psname [build_ps $fname $format $fname.ps ps -err 0 -apargs $ca(apargs) -misfig $ca(misfig)]
#        debug psname
        if {$psname != {}} {
            if {$ca(print)} {print::print pdoc_print -file $psname; return 1}
            set fname $psname
            set format {ps}
        }
    }
    if {[info exists cfig(view.$format)]} {
        if {$format != {}} {system "$cfig(view.$format) \"$fname\" &"}
    } else {
        if {[dia::ask "There is no view available for format: $format\nWould you like to:" 0 {Export the file} Cancel] < 0} {return 0}
        if {[sfile::dia {Select a filename to export to} -dest ename -op {Export to} -mask {*} -wait 1] < 0} return
        if {[string range $format 0 0] == {.} && [file extension $ename] == {}} {append ename $format}
        file copy -force $fname $ename		;#copy to the destination file
        dia::brief "File: $fname\ncopied to: $ename"
    }
    return 1
}

# Open the document in its associated editor
# If file specified, give list: {filename format}
#------------------------------------------
proc docedit::edit {fname args} {
    variable cfig
    argproc ca(\$s) $args {{ro 0} {brief 1} {format {}} {post {}} {apargs {}}}
    if {$ca(format) == {}} {set ca(format) [ffmt $fname]}
    if {![info exists cfig(edit.$ca(format))]} {
        if {[dia::ask "There is no editor available for format: $ca(format)\nWould you like to:" 0 {Export the file} Cancel] < 0} return
        if {[sfile::dia {Select a filename to export to} -dest ename -op {Export to} -mask {*} -wait 1] < 0} return
        if {[string range $ca(format) 0 0] == {.} && [file extension $ename] == {}} {append ename $ca(format)}
        file copy -force $fname $ename		;#copy to the destination file
        dia::brief "File: $fname\ncopied to: $ename"
        return
    }
    if {$ca(ro) || $cfig(mode.$ca(format)) == {ro}} {
        if {$ca(brief)} {after 800 {dia::brief {Read-only mode} 3000}}
        system "$cfig(edit.$ca(format)) \"$fname\" $ca(apargs) &"
        return
    }
    file copy -force $fname $fname.org		;#keep unmodified copy
    system "mkfifo \"$fname.watch\""		;#make a pipe
    set wfd [open $fname.watch r+]		;#open it
    fconfigure $wfd -blocking no		;#don't block on reads
    fileevent $wfd readable "docedit::walarm {$fname} $wfd {$ca(post)}"	;#alarm when editor done
#Old way
    set cmd "sh -c '$cfig(edit.$ca(format)) \"$fname\" $ca(apargs) ; echo DONE >>\"$fname.watch\"' &"
#puts "cmd:$cmd"
    system $cmd
}

# Call this when an editor session is complete to update the database
#------------------------------------------
proc docedit::walarm {fname wfd {post {}}} {
    variable v

    set gval [read $wfd]	;#empty the pipe
#puts "Editor Finished:[eof $wfd]:$gval:"
    close $wfd
    file delete "$fname.watch"
    set isdiff [catch {exec /usr/bin/diff -q "$fname" "$fname.org"}]
    if {$post != {}} {
        regsub -- {%d} $post $isdiff post
        eval $post
    }
}

# Build a postscript file (or EPS or PDF) from the document
#	cache:	don't try to rebuild if the eps file already exists
#	fmt:	ps or eps
#------------------------------------------
proc docedit::build_ps {sfile sfmt dfile dfmt args} {
    variable cfig
    argproc ca(\$s) $args {{apargs {}} {err 1} {delete 1} {misfig {}}}
    if {![lcontain {ps eps pdf} $dfmt]} {dia::err "Unsupported output format: $dfmt"; return {}}
    set dfmt_is $dfmt					;#assume we got to our final format
#debug sfmt dfmt_is
    if {$sfmt == {eps} && $dfmt == {ps}} {		;#EPS
        file copy -force $sfile $dfile
        set fp [open $dfile a]; puts $fp {showpage}; close $fp
        set dfmt_is {ps}

    } elseif {[lcontain {tiff gif jpg png pdf txt text} $sfmt]} {	;#Graphics
        switch $sfmt {
            {tiff} {exec /usr/bin/tifftopnm $sfile 2>/dev/null | /usr/bin/pnmtops -noturn 2>/dev/null >$dfile}
            {gif}  {exec /usr/bin/giftopnm $sfile | /usr/bin/pnmtops >$dfile -noturn 2>/dev/null}
            {jpg}  {exec /usr/bin/jpegtopnm $sfile | /usr/bin/pnmtops -scale 0.74 >$dfile -noturn 2>/dev/null}
            {png}  {exec /usr/bin/pngtopnm $sfile | /usr/bin/pnmtops >$dfile -noturn 2>/dev/null}
            {pdf}  {exec /usr/bin/pdf2ps $sfile $dfile}
            {txt}  {exec /usr/bin/mpage -1 -o $sfile >$dfile}
            {text} {exec /usr/bin/mpage -1 -o $sfile >$dfile}
        }
        set dfmt_is {ps}

    } elseif {[lcontain {sxw sxc sxi sdw sdc doc xls rtf} $sfmt]} {		;#Openoffice
        exec /ati/bin/ooview $sfile $dfile
        if {![lcontain {ps eps pdf} $dfmt]} {set dfmt_is {ps}}		;#ooview can do ps, pdf, eps
    } elseif {[lcontain {ledit noedit brn con bm4 order} $sfmt]} {	;#ledit/noedit/bedit
        set tfile [eval [concat [list exec $cfig(edit.$sfmt) $sfile -only build] $ca(apargs)]]
        if {![file exists $tfile]} {return {}}
        file rename -force $tfile $dfile
        set dfmt_is {ps}

    } elseif {$sfmt == {dxf}} {			;#DXF
        set workdir [file dirname $sfile] 
        set ename "$workdir/qcad.err"		;#error file
        if {[catch {exec /usr/bin/qcad $sfile --autozoom --printtofile $dfile --exit 2> $ename}]} {dia::err "Running Qcad:\n[read_file $ename]"; return {}}
        set dfmt_is {ps}

    } elseif {$sfmt == {tgif} && $ca(misfig) == {}} {	;#Simple Tgif
        set workdir [file dirname $sfile] 
        set ename "$workdir/tgif.err"		;#error file
        regsub -- {obj$} $sfile $dfmt tmpfile	;#tgif can't write to an arbitrary filename
        if {![lcontain {ps eps} $dfmt]} {set dfmt_is {ps}}		;#ooview can do ps, pdf, eps
#puts "exec tgif -quiet -print -$dfmt_is -color $sfile 2> $ename"
        if {[catch {exec tgif -quiet -print -$dfmt_is -color $sfile 2> $ename}]} {dia::err "Running Tgif:\n[read_file $ename]"; return {}}
        file rename -force $tmpfile $dfile

    } elseif {$sfmt == {tgif}} {			;#Tgif with inclusions
        set workdir [file dirname $sfile] 
        set ename "$workdir/tgif.err"		;#error file
        set dotry yes				;#keep trying
        regsub -- {obj$} $sfile $dfmt tmpfile	;#tgif can't write to an arbitrary filename
        if {![lcontain {ps eps} $dfmt]} {set dfmt_is {ps}}		;#ooview can do ps, pdf, eps
#puts "Sfile:$sfile\ndfile:$dfile\ntmpfile:$tmpfile"
        for {set tries 0} {$dotry} {incr tries} {	;#for each retry
            set error no
            pushd $workdir
            set res [catch {exec tgif -quiet -print -$dfmt_is -color $sfile 2> $ename}]
            popd
            if {$res} {dia::err "Running Tgif:\n[read_file $ename]"; break}
            set dotry no
            set efp [open $ename r]		;#open error file
            while {![eof $efp]} {		;#read error output
                set ln [gets $efp]
                if {[regexp {^Can.*not.*EPS} $ln]} {	;#missing eps figure
                    if {$tries < 1} {
                        regsub -all {^.*'(.*)\.eps'.*$} $ln {\1} misfig
                        set misfig [file tail $misfig]
                        set mfile $workdir/${misfig}.eps
                        if {[file exists $mfile]} continue
                        regsub -- {%f} $ca(misfig) $misfig cmd
#puts "Need to build: $cmd"
                        if {[set epfn [eval $cmd]] != {}} {	;#if file found
#puts "file rename -force $epfn [file dirname $epfn]/${misfig}.eps"
                            file copy -force $epfn $mfile	;#name it what tgif wants
                            set dotry yes
                        }
                    } else {
                        set error yes
                    }
                }
            }
            close $efp
            if {$error} {dia::err "In Tgif:\n[read_file $ename]"}
        }
        file rename -force $tmpfile $dfile

    } elseif {$sfmt == {ps} && $dfmt == {eps}} {
        exec ps2eps $sfile $dfile
    } elseif {$sfmt == {ps} && $dfmt == {pdf}} {
        exec -ignorestderr /usr/bin/ps2pdf $sfile $dfile
    } else {
        if {$ca(err)} {dia::err "Can't translate format $sfmt to $dfmt"}
        return {}
    }

#Some of the above conversions may have made it only as far as PS
#puts "dfile:$dfile dfmt_is:$dfmt_is dfmt:$dfmt"
    if {$dfmt_is == {ps} && $dfmt == {eps}} {	;#still need EPS conversion
        file rename -force $dfile $dfile.tmp.ps
        exec ps2eps $dfile.tmp.ps $dfile
        file delete $dfile.tmp.ps
    } elseif {[lcontain {ps eps} $dfmt_is] && $dfmt == {pdf}} {	;#still need PDF conversion
        file rename -force $dfile $dfile.tmp.ps
        exec -ignorestderr /usr/bin/ps2pdf $dfile.tmp.ps $dfile
        file delete $dfile.tmp.ps
    } elseif {$dfmt_is != $dfmt} {		;#still haven't reached desired format
#puts "file rename -force $sfile $dfile"
        if {$ca(err)} {dia::err "Don't know how to get to format: $dfmt"}
    }
    if {$ca(delete) && $sfile != $dfile} {file delete $sfile}
    return $dfile
}

#Return a standard format string representing the type of file of fname
#------------------------------------------
proc docedit::ffmt {fname} {
    set ext [string tolower [string range [file extension $fname] 1 end]]
    if {[lcontain {as aw sxw sxc sxi sdw sdc odt ods dxf dwb mrp brn con bm4 txt pdf png gif jpg ps html eml tiff tar zip doc xls rtf ppt} $ext]} {return $ext}
    switch -regexp -- [exec /usr/bin/file -b $fname] {
        {.*[pP][dD][fF].*}			{return pdf}
        {.*[pP][nN][gG].*}			{return png}
        {.*tgif.*object.*file}			{return tgif}
        {.*[gG][iI][fF].*}			{return gif}
        {.*[jJ][pP][eE][gG].*}			{return jpg}
        {.*[pP][oO][sS][tT][sS][cC][rR].*}	{return ps}
        {.*[hH][tT][mM][lL].*}			{return html}
        {.*[tT][iI][fF][fF].*}			{return tiff}
        {.*Rich Text.*}				{return rtf}
        {.*[Tt]ar.*arhive.*}			{return tar}
        {.*Zip.*archive.*}			{return zip}
        {.*smtp.*mail.*}			{return eml}
    }
    switch -regexp -- $ext {
        {^ant$}		{return noedit}
        {^led$}		{return ledit}
        {^obj$}		{return tgif}
        {^text$}	{return txt}
        {^mrproject$}	{return mrp}
        {^$}		{return txt}
    }
    return ".$ext"
}

# Scale an image file to a specified size
#------------------------------------------
proc docedit::scale {infile args} {
#puts "scale:$infile args:$args"
    argform {output fit} args
    argnorm {{fit 1} {output 2} {quiet 1} {force 1}} args
    lassign {1024 0 0} fit quiet force
    foreach s {output} {set $s [xswitchs $s args]}
    foreach s {fit quiet force} {xswitchs $s args $s}

    if {[file size $infile] <= 0} {dia::err "No data in file: $infile"; return}
    set ext [string tolower [file extension $infile]]
    set outfile [file join [lib::cfig workdir] docedit_scale_tmp$ext]
    if {![lcontain {.jpg .jpeg .tiff .png} $ext]} {dia::err "Unsupported file extension: $ext"; return 0}
    if {$ext == {.jpg}} {set ext {.jpeg}}
    set ocode [set icode [string range $ext 1 end]]
    
#debug infile outfile
#puts "${icode}topnm $infile 2>/dev/null | pamscale -xyfit $fit $fit 2>/dev/null | pnmto${ocode} 2>/dev/null > $outfile"
    if {[catch {exec ${icode}topnm $infile 2>/dev/null | pamscale -xyfit $fit $fit 2>/dev/null | pnmto${ocode} 2>/dev/null > $outfile} err]} {
        if {!$quiet} {dia::err "Error ($err) scaling file: $infile to fit: $fit"}
        if {!$force} {return 0}
    }
    if {![file exists $outfile] || [file size $outfile] <= 0} {
        if {!$quiet} {dia::err "Error scaling file: $infile to fit: $fit"}
        return 0
    }
#    file delete -force $infile
    if {$output == $infile} {			;#if overwriting
        file copy -force $outfile $output
        file delete -force $outfile
    } elseif {$output != {}} {
        file rename -force $outfile $output
    } else {
        return [read_file $outfile]
    }
    return 1
}

if {[info commands locawyze] != {}} {locawyze docedit}
