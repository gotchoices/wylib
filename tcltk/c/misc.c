//Other miscellaneous C functions
// -------------------------------
/*include(Copyright)*/

#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <tcl.h>

#define STRLEN	256

extern int Misc_Init(Tcl_Interp *interp);	/* run when library loaded */
extern Tcl_ObjCmdProc money;				/* actual rpn command */

// Convert a float value to a comma separated dollar amount
int money(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
	{
    double value;
    int i, j, len, slen, gotdigit;
    char buf1[STRLEN], buf2[STRLEN], *fmt;

    if (objc < 2 || objc > 3) {
        Tcl_WrongNumArgs(interp, 1, objv, "value <format>");
        return TCL_ERROR;
    }

    if (Tcl_GetDoubleFromObj(interp, objv[1], &value) != TCL_OK) {
        Tcl_AddErrorInfo(interp, "Can't convert numeric value");
        return TCL_ERROR;
    }
    
    if (objc > 2) {			/* if format specified */
        fmt = Tcl_GetStringFromObj(objv[2], &slen);
        snprintf(buf1,STRLEN,fmt,value);
        len = strcspn(buf1,".");	//how many digits before the decimal
    } else {
        fmt = "%#.2f";
        snprintf(buf1,STRLEN,fmt,value);
        len = strlen(buf1) - 3;		//how many digits before decimal
    }
//printf("len:%d\n",len);

    i = j = gotdigit = 0;
    while (buf1[i]) {
        if (isdigit(buf2[j++] = buf1[i++])) {gotdigit++;}
        if (gotdigit && len > 3 && !((len-1) % 3)) {buf2[j++] = ',';}
        len--;
    }
    buf2[j] = '\0';
    
    Tcl_SetObjResult(interp, Tcl_NewStringObj(buf2,-1));
    return TCL_OK;
	}

/* Initialization for this module */
/* ------------------------------------------------------------------------- */
int Misc_Init(Tcl_Interp *interp) {

//printf("Initing 0\n");
    Tcl_CreateObjCommand(interp,"money",money,(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);

    return TCL_OK;
    }
