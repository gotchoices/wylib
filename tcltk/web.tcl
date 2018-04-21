# Communicate with various web interfaces
# These are dependent upon various providers' web sites and so are subject to change
#------------------------------------------
#Copyright WyattERP, all other rights reserved
package provide wylib 0.33
#TODO:
#- 

package require http 2.0
package require tls
package require autoproxy
package require xml
package require dom

namespace eval web {
    namespace export web zip fetch view zip_lookup
    variable cfig
    set cfig(zipurl)		{http://www.webservicex.net/uszip.asmx/GetInfoByZIP}
    set cfig(zipfield)		{USZip}
    set cfig(browser)		{/usr/bin/firefox %s}
}

# Fetch a URL with a POST query.  Return the HTML page as a string
#----------------------------------------------------
proc web::fetch {url query {timeout 5000} {chunk 4096}} {

    set token [http::geturl $url -query $query -blocksize $chunk -timeout $timeout]
    upvar #0 $token state
    
    foreach {name value} $state(meta) {
        if {[regexp -nocase ^location$ $name]} {	;# Handle URL redirects
            return [fetch [string trim $value] $query $timeout $chunk]
        }
    }
#puts "META:$state(meta)"
#puts "BODY:$state(body)"
    return $state(body)
}

# SPF handler for looking city, state up from zip code (should work for mdew, dbe, sdew, etc,)
#------------------------------------------
proc web::zip_lookup {w entry zfld cfld sfld} {
#puts "dbe::zip w:$w entry:$entry zfld:$zfld cfld:$cfld sfld:$sfld"
    set zip [$w get $zfld]
    lassign [web::zip $zip] city state
    if {$state != {}}	{$w set $sfld $state}
    if {$city != {}}	{
        $w set $cfld $city
        after idle "focus [$w field $cfld w]"		;#leave focus in city field
    }
}

# Get text from the USPS showing cities in a zip code area, select a city,state
# !!This must change if the web site XML format changes!!
#----------------------------------------------------
proc web::zip {code} {
    variable cfig

    if { $code == {} } {dia::brief "Please enter a zip code"; return {}}
    set code [lindex [split $code -] 0]			;#remove any suffix
    set query [http::formatQuery $cfig(zipfield) $code]

#puts "url:$cfig(zipurl)/$query"
    set text [fetch $cfig(zipurl) $query]
#puts "text:$text"

    set d [dom::parse $text]				;#parse the document
    set city [dom::node stringValue [dom::node selectNode $d /NewDataSet/Table/CITY]]
    set state [dom::node stringValue [dom::node selectNode $d /NewDataSet/Table/STATE]]
#debug city state

    if {$city == {} || $state == {}} {dia::brief "Zip: $code not found"; return {}}
    return [list $city $state]
}

# View a URL in the default browser
#----------------------------------------------------
proc web::view {url} {
    variable cfig
    eval exec [format $cfig(browser) $url]
}

if {[info commands locawyze] != {}} {locawyze web}
