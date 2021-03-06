# Routines that need different handling for different os platforms
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- port to windows
#- can we use tcllib for uuencode and zlib for gzip?

namespace eval osdep {
    namespace export cmd_esc filetypes smash_file unsmash_data print
}

# Escape spaces or other irregular characters for command line processing
#------------------------------------------
proc osdep::cmd_esc {args} {
    set res {}
    foreach i $args {
        regsub -all { } $i {\ } i
        lappend res $i
    }
    return $res
}

# Determine the type of one or more files
#------------------------------------------
proc osdep::filetypes {files} {
    if {[llength $files] <= 0} {return {}}
#debug files
    set types [exec /usr/bin/file -b {*}$files]
    return [split $types "\n"]
}

# Compress file data and then uuencode it, returning the result as a string
#------------------------------------------
proc osdep::smash_file {fname} {
    set fd [open $fname r]		;#open the file
    set data [exec /bin/gzip -c <@$fd | /usr/bin/uuencode -m [file tail $fname]]
    close $fd
    return $data
}

# Expand string data previously compressed with smash_file, write to a file
#------------------------------------------
proc osdep::unsmash_data {data fname} {
    exec /usr/bin/uudecode -o - << $data | /bin/zcat > $fname
}

# Print the contents of a string on a named printer
#------------------------------------------
proc osdep::print {data printer} {
    set fp [open "| /usr/bin/lpr -P$printer" {w}]
#debug fp data printer
    puts -nonewline $fp $data
    close $fp
}
