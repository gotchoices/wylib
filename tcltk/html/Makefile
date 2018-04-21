HTMLDIR="/usr/share/doc/wylib"
XMLTO=xmlto --skip-validation

%.html : %.xml
	$(XMLTO) html-nochunks $*.xml

%.pdf: %.xml
	$(XMLTO) pdf $*.xml

%.html : %.sgml
	sgml2html $<

all: wylib.html dbe.html dbp.html dbs.html print.html report.html pref.html etwadd.html etwatt.html etwpar.html etwref.html etwsig.html etwtab.html

install: all
	test -d ${HTMLDIR} || mkdir ${HTMLDIR}
	install etw*.html		${HTMLDIR}
	install dbe*.html		${HTMLDIR}
	install dbp*.html		${HTMLDIR}
	install dbs*.html		${HTMLDIR}
	install print*.html		${HTMLDIR}
	install pref*.html		${HTMLDIR}
	install report*.html		${HTMLDIR}
	install wylib*.html		${HTMLDIR}
	    
clean:
	rm -f wylib.html dbe.html dbp.html etw*.html dbs.html print.html report.html pref.html
