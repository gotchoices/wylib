LIBNAME=wylib
VERSION=0.35
OBJS=args.tcl cal.tcl calc.tcl cdew.tcl color.tcl date.tcl datim.tcl dbe.tcl dbp.tcl dbs.tcl ddis.tcl debug.tcl dew.tcl dia.tcl docedit.tcl edwin.tcl etext.tcl etw*.tcl exedit.tcl form.tcl help.tcl ksock.tcl lbsel.tcl lib.tcl loglst.tcl logtime.tcl lout.tcl macro.tcl mbar.tcl mdew.tcl mlb.tcl misc.tcl osdep.tcl passwd.tcl photo.tcl pref.tcl print.tcl report.tcl scm.tcl search.tcl sizer.tcl sfile.tcl spin.tcl spell.tcl scanvas.tcl stext.tcl sql.tcl tabs.tcl tim.tcl top.tcl tsearch.tcl web.tcl zip.tcl
BUILTIN=init.tcl wbutton.tcl wcanvas.tcl wcheckbutton.tcl wentry.tcl wframe.tcl wkeys.tcl wlabel.tcl wlistbox.tcl wmenubutton.tcl wmenu.tcl wmessage.tcl wradiobutton.tcl wscale.tcl wtext.tcl ww.tcl

#Allow the user to install where he wants
ifeq ("$(WYLIB)","")
    LIBDIR=/usr/lib
else
    LIBDIR=${WYLIB}
endif

PKGNAME=${LIBNAME}-${VERSION}
INSTDIR=${LIBDIR}/${PKGNAME}
HTMLDIR=${INSTDIR}/html

all: pkgIndex.tcl help

help:
	cd html; make all

libwylib.so: c/*.c
	cd c; make
	ln -f -s c/libwylib.so .

pkgIndex.tcl: libwylib.so init.tcl ${OBJS}
	wmmkpkg ${LIBNAME} ${VERSION}
#	echo "pkg_mkIndex -lazy . ${OBJS} libwylib.so" | tclsh

#	#Now adjust the standard pkgIndex to:
#	# - define wylib_library to the location where this library was found
#	# - force init.tcl to load on package require, even though other modules are loaded on demand
#	cat pkgIndex.tcl |sed -e 's~\(wylib.*\)\[~\1\[list set wylib_library $$dir\]\\n\[list source \[file join $$dir init.tcl\]\]\\n\[~' >pkgIndex.tmp
#	mv pkgIndex.tmp pkgIndex.tcl

install: all
	if ! [ -d ${INSTDIR} ] ; then mkdir ${INSTDIR} ; fi
	install -m 644 ${BUILTIN} ${OBJS} pkgIndex.tcl ${INSTDIR}
	install -m 755 libwylib.so ${INSTDIR}
	mkdir -p ${INSTDIR}/images
	install -m 644 images/* ${INSTDIR}/images/
	cd html; make install HTMLDIR=${HTMLDIR} 

uninstall:
	rm -rf ${INSTDIR}

clean:
	rm -f pkgIndex.tcl
	rm -f *.so
	rm -f ${PKGNAME}.tgz
	rm -f -r ${PKGNAME}
	cd c; make clean
	cd html; make clean

release: 
	mkrelease
