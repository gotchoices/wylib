/* A collection of handy functions we can add to Tcl */
// -------------------------------
/*include(Copyright)*/

#include <tcl.h>
#include "../Version.h"

extern int Wylib_Init(Tcl_Interp *interp);	/* run when library loaded */
//extern int Wylib_SafeInit(Tcl_Interp *interp);
extern int Checkline_Init(Tcl_Interp *interp);
extern int Checkpwd_Init(Tcl_Interp *interp);
extern int Rpn_Init(Tcl_Interp *interp);
extern int Misc_Init(Tcl_Interp *interp);

/* Initialization for this module */
/* ------------------------------------------------------------------------- */
int Wylib_Init(Tcl_Interp *interp) {
    register int r;

    r = Checkline_Init(interp);
    if (r != TCL_OK) {return TCL_ERROR;}
    
    r = Rpn_Init(interp);
    if (r != TCL_OK) {return TCL_ERROR;}
    
    r = Checkpwd_Init(interp);
    if (r != TCL_OK) {return TCL_ERROR;}
    
    r = Misc_Init(interp);
    if (r != TCL_OK) {return TCL_ERROR;}
    
    Tcl_PkgProvide(interp,PACKAGE,VERSION);
    return TCL_OK;
    }

//int Wylib_SafeInit(Tcl_Interp *interp) {return Wylib_Init(interp);}	/* do we need this? */
