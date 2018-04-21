//This will receive a number from tcl and turn it into a written number
// -------------------------------
/*include(Copyright)*/


#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <tcl.h>

#define LSTRLEN	512
#define STRLEN	256

extern int Checkline_Init(Tcl_Interp *interp);	/* run when library loaded */
extern Tcl_ObjCmdProc checkline;		/* actual rpn command */

static char *digs[] = 
        {
        "","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE",
        "TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN",
        "SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN",
        };

static char *tens[] = 
        {
        "ZERO","TEN","TWEN","THIR","FOR","FIF","SIX","SEVEN","EIGH","NINE",
        };

static char *grps[] = 
        {
        "","THOUSAND ","MILLION ","BILLION ","TRILLION ",
        "QUADRILLION ","QUINTILLION ","SEXILLION ","SEPTILLION ",
        "OCTILLION ","ZILLION ",
        };

/* this will convert a three digit integer to a string of written words */
static char *writegroup(int inval)
        {
        int digit;
        char tmpstrg[STRLEN];
        static char retstrg[LSTRLEN];
        
        *retstrg = '\0';					/* start with an empty string */
        
        if (inval > 99)						/* add on hundreds part */
            {
            digit = inval / 100;
            inval -= digit * 100;
            sprintf(tmpstrg,"%s HUNDRED ",digs[digit]);
            strncat(retstrg,tmpstrg,LSTRLEN);
            }

        if (inval > 19)                         /* add on 'ty' part */
            {
            digit = inval / 10;
            inval -= digit * 10;
            sprintf(tmpstrg,"%sTY ",tens[digit]);
            strncat(retstrg,tmpstrg,LSTRLEN);
            }

        if (inval > 0)                          /* add on 0 - 19 part */
            {
            digit = inval;
            sprintf(tmpstrg,"%s ",digs[digit]);
            strncat(retstrg,tmpstrg,LSTRLEN);
            }

        return(retstrg);                       /* return string */
        }

/* This will convert a dollar figure (1234.56) to a written string of words
   describing how many dollars it is, and a string of two characters telling
   how many cents are at the end. */
static int valstrg( char *dollars, char *cents, char *inval)
    {
    int digits, groups, tmpval, lefto, i, size;
    char *tmpptr, *s, *d;
    char istrg[STRLEN], tmpstrg[LSTRLEN], grpstrg[8];
    
    strncpy(istrg, inval, STRLEN);
    strcpy(cents,"00");
    /* step through string to see if a '.' is present */
    for( s = istrg; *s && *s != '.'; s++);

    /* if '.' present, null terminate and put remainder in cents */
    if (*s)
        {
        *s++ = 0;                               /* null terminate */
        if (cents[0] = *s++)
            if (!(cents[1] = *s++))
                cents[1] = '0';
        cents[2] = 0;
        }

    if (!strcmp(istrg,"0"))
        strncat(dollars,"ZERO ",STRLEN);
    else
        {
        digits = strlen(istrg);
        groups = (digits - 1) / 3;
        lefto = digits % 3;
    
        for(s = istrg, i = groups; i >= 0; i--)
            {
            size = (s == istrg && lefto) ? lefto : 3;
            strncpy(grpstrg, s, size);
            grpstrg[size] = 0;
            tmpval = atoi(grpstrg);
            tmpptr = writegroup(tmpval);
            if (!tmpval)
                sprintf(tmpstrg,"%s",tmpptr);
            else
                sprintf(tmpstrg,"%s%s",tmpptr,grps[i]);
            strncat(dollars,tmpstrg,STRLEN);
            s += size;
            }
        }
    }

/* This will return a line for a check
   parm1:	The number to convert
   parm2:	Optional length of line to pad to */
int checkline(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
	{
	static char retstrg[LSTRLEN + 32];
	char dollars[LSTRLEN], cents[8], *sptr, *iptr;
	int linelen = 0;
	int tmplen, i, slen;

    if (objc < 2 || objc > 3) {
        Tcl_WrongNumArgs(interp, 1, objv, "value ?arg ...?");
        return TCL_ERROR;
    }
    iptr = Tcl_GetStringFromObj(objv[1], &slen);
    
    if (objc > 2) {			/* if length specified */
        if (Tcl_GetIntFromObj(interp, objv[2], &linelen) != TCL_OK) {
            Tcl_AddErrorInfo(interp, "Can't convert line length");
            return TCL_ERROR;			/* couldn't convert long */
        }
    }
    if (linelen >= LSTRLEN) {
        Tcl_AddErrorInfo(interp, "Line length too long");
        return TCL_ERROR;
    }
        
	*dollars = '\0';
	valstrg(dollars,cents,iptr);
	sprintf(retstrg,"%sand %s/100 ",dollars,cents);
	tmplen = linelen - strlen(retstrg);
	for(i = 0; i < tmplen; i++)
	    strncat(retstrg,"-",LSTRLEN);
//	strncat(retstrg," DOLLARS",LSTRLEN);

    Tcl_SetObjResult(interp, Tcl_NewStringObj(retstrg,-1));
    return TCL_OK;
	}

/* Initialization for this module */
/* ------------------------------------------------------------------------- */
int Checkline_Init(Tcl_Interp *interp) {

//printf("Initing 0\n");
    Tcl_CreateObjCommand(interp,"checkline",checkline,(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);

    return TCL_OK;
    }
