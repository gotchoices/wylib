# zip/unzip data
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.35

#TODO:
#- 

namespace eval zip {
    namespace export gzip gunzip
}

#Compress data
#------------------------------------------
proc zip::gzip {data} {
    set fp [open "|/bin/zip x y z" r+]
    puts -nonewline $fp $data
    set result [read $fp]
    close $fp
    return $result
}

#Compress data
#------------------------------------------
proc zip::gunzip {data} {
    set fp [open "|/bin/zcat" r+]
    puts -nonewline $fp $data
    set result [read $fp]
    close $fp
    return $result
}
