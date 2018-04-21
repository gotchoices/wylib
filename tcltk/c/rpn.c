//This will receive a string from tcl and process it as an RPN expression.
//Any token on the command line is first checked to see if it is a variable
//name.  Then it is checked to see if it is a command name.  Then it is
//checked for the special form: "fixN" or st:abc.  Anything not fitting any
//of these forms is assumed to be a literal number to insert onto the stack.
// -------------------------------
/*include(Copyright)*/

//TODO:
// - implement list command
// - 
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <errno.h>
#include <ctype.h>
#include <tcl.h>
//#include "../Version.h"

#define STRLEN 256
#define STKSIZE 8					/* how many stack elements */

extern int Rpn_Init(Tcl_Interp *interp);	/* run when library loaded */
extern int Rpn_SafeInit(Tcl_Interp *interp);
extern Tcl_ObjCmdProc rpn;		/* do I need these? */
extern Tcl_ObjCmdProc rpx;

typedef struct {					/* interpretor context */
    int		error;					/* non-zero if an error occurred */
    char	errstrg[STRLEN];		/* description of the last error */
    int		fixval;					/* how many digits to show */
    int		use_rads;				/* in radian mode */
    double	stk[STKSIZE];			/* rpn stack */
    Tcl_HashTable vartab;			/* table of variables and their values */
} ri;

//common to all interpretors
static Tcl_HashTable cmdtab;		/* table of commands and their routines */
static Tcl_HashTable rintab;		/* table of interpretors */

// convert string to double */
// ----------------------------------------------
int GetDouble(char *sptr, int slen, double *tdoub) {
	char ts[STRLEN], *t = ts, *eptr;
	register int i, lead = 1;
	double sign = 1;
	double retval;

    if (slen > STRLEN) {
        *tdoub = 0;
        return 0;			// ERROR;
    }
    for(; slen && *sptr; slen--, sptr++) {		/* for each character in sptr */
    	if (*sptr == ',') {				/* ignore commas */
    		continue;
    	} else if (lead && *sptr == '+') {	/* and leading plusses */
    		;
    	} else if (lead && *sptr == '-') {	/* tally total number of leading negatives */
    		sign *= -1;
    	} else {
    		*t++ = *sptr;
    		lead = 0;
    	}
    }
	*t = 0;							/* null terminate */
    errno = 0;
    *tdoub = strtod(ts, &eptr) * sign;		/* convert the value */
    i = (eptr - ts);
//printf("strtod:%s: errno:%d diff:%d", ts, errno, i);fflush(stdout);
    if (errno || i != strlen(ts)) {
        *tdoub = 0;
		return 0; 		// ERROR;
    }
//printf(" tdoub:%f  errno:%d\n", *tdoub, errno);
    return 1;
}

//Compare out to a given digit fixval, but no less than 11 digits
// ----------------------------------------------
static double fcmp(double a, double b, int fixval) {
	double small = pow(10,-(fixval > 11 ? fixval : 11));
//printf("a=%.14f b=%.14f diff=%.14f small=%.14f\n",a,b,a-b,small); fflush(stdout);
	if (fabs(a-b) < small) return 0;
	if (a > b) return 1;
	return -1;
}

// Create a new interpretor structure
// ----------------------------------------------
ri *rpn_new() {
    int isnew;
    ri *r = malloc(sizeof(ri));
//printf("rpn_new:%0X\n", r); fflush(stdout);
    r->error = 0;
    r->fixval = 9;
    r->use_rads = 1;
    
    Tcl_InitHashTable(&r->vartab, TCL_STRING_KEYS);	/* create variable table */
    Tcl_SetHashValue(Tcl_CreateHashEntry(&r->vartab, "_E" ,&isnew), Tcl_NewDoubleObj(M_E));
    Tcl_SetHashValue(Tcl_CreateHashEntry(&r->vartab, "_PI",&isnew), Tcl_NewDoubleObj(M_PI));

    return(r);
}

// ----------------------------------------------
static void push(ri *r, double a) {		/* Push a onto the stack */
	int i;
	for(i = STKSIZE-1; i > 0; i--)		/* for each stack element */
		r->stk[i] = r->stk[i-1];		/* roll it up */
	r->stk[0] = a;
}

// ----------------------------------------------
static void rdn(ri *r) {				/* roll down stack (not incl 0) */
	int i;
	for(i = 1; i < (STKSIZE-1); i++)	/* for each stack register */
		r->stk[i] = r->stk[i+1];		/* roll it down */
}
	
// ----------------------------------------------
static double to_rads(ri *r, double inval) {	/* convert to radians */
	if (r->use_rads)
		return(inval);
	return(inval * M_PI / 180.0);
}

// ----------------------------------------------
static double from_rads(ri *r, double inval) {	/* convert to degrees */
	if (r->use_rads)
		return(inval);
	return(inval / M_PI * 180.0);
}

/* The Func_xx routines get called from their correspnding RPN command */
// ----------------------------------------------
static void Func_plus(ri *r)	{r->stk[0] += r->stk[1]; rdn(r);}
static void Func_minus(ri *r)	{r->stk[0] = r->stk[1] - r->stk[0]; rdn(r);}
static void Func_times(ri *r)	{r->stk[0] *= r->stk[1]; rdn(r);}
static void Func_divide(ri *r)	{r->stk[0] = r->stk[1] / r->stk[0]; rdn(r);}
static void Func_mod(ri *r)		{r->stk[0] = fmod(r->stk[1], r->stk[0]); rdn(r);}
static void Func_min(ri *r)		{r->stk[0] = (r->stk[1] < r->stk[0]) ? r->stk[1] : r->stk[0]; rdn(r);}
static void Func_max(ri *r)		{r->stk[0] = (r->stk[1] > r->stk[0]) ? r->stk[1] : r->stk[0]; rdn(r);}
static void Func_sin(ri *r)		{r->stk[0] = sin(to_rads(r,r->stk[0]));}
static void Func_cos(ri *r)		{r->stk[0] = cos(to_rads(r,r->stk[0]));}
static void Func_tan(ri *r)		{r->stk[0] = tan(to_rads(r,r->stk[0]));}
static void Func_asin(ri *r)	{r->stk[0] = from_rads(r,asin(r->stk[0]));}
static void Func_acos(ri *r)	{r->stk[0] = from_rads(r,acos(r->stk[0]));}
static void Func_atan(ri *r)	{r->stk[0] = from_rads(r,atan(r->stk[0]));}
static void Func_rad(ri *r)		{r->use_rads = 1;}
static void Func_deg(ri *r)		{r->use_rads = 0;}
static void Func_int(ri *r)		{r->stk[0] = floor(r->stk[0]);}
static void Func_frc(ri *r)		{r->stk[0] -= floor(r->stk[0]);}
static void Func_rnd(ri *r)		{r->stk[0] = floor(r->stk[0] + 0.5);}
static void Func_sqrt(ri *r)	{r->stk[0] = sqrt(r->stk[0]);}
static void Func_sqr(ri *r)		{r->stk[0] = r->stk[0] * r->stk[0];}
static void Func_abs(ri *r)		{r->stk[0] = fabs(r->stk[0]);}
static void Func_ln(ri *r)		{r->stk[0] = log(r->stk[0]);}
static void Func_exp(ri *r)		{r->stk[0] = exp(r->stk[0]);}
static void Func_inv(ri *r)		{r->stk[0] = (1 / r->stk[0]);}
static void Func_log(ri *r)		{r->stk[0] = log10(r->stk[0]);}
static void Func_10x(ri *r)		{r->stk[0] = pow(10,r->stk[0]);}
static void Func_yx(ri *r)		{r->stk[0] = pow(r->stk[1],r->stk[0]); rdn(r);}
static void Func_clr(ri *r)		{r->stk[0] = 0;}
static void Func_rdn(ri *r)		{r->stk[0] = r->stk[1];rdn(r);}
static void Func_chs(ri *r)		{r->stk[0] = -r->stk[0];}
static void Func_pi(ri *r)		{push(r,M_PI);}
static void Func_ent(ri *r)		{push(r,r->stk[0]);}
static void Func_xch(ri *r)		{register double td = r->stk[0]; r->stk[0] = r->stk[1]; r->stk[1] = td;}

static void Func_not(ri *r) 	{r->stk[0] = !r->stk[0];}
static void Func_ne(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) != 0 ? 1 : 0; rdn(r);}
static void Func_eq(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) == 0 ? 1 : 0; rdn(r);}
static void Func_gt(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) >  0 ? 1 : 0; rdn(r);}
static void Func_ge(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) >= 0 ? 1 : 0; rdn(r);}
static void Func_lt(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) <  0 ? 1 : 0; rdn(r);}
static void Func_le(ri *r) 		{r->stk[0] = fcmp(r->stk[1],r->stk[0],r->fixval) <= 0 ? 1 : 0; rdn(r);}

// ----------------------------------------------
static void Func_rtop(ri *r) {	/* r->stk[0] = x, r->stk[1] = y */
    register double m, sgn;
    m = sqrt(pow(r->stk[0],2.0) + pow(r->stk[1],2.0));
    if (r->stk[1] >= 0) sgn = 1; else sgn = -1;
    if (r->stk[0] > 0)
        r->stk[1] = from_rads(r,atan(r->stk[1] / r->stk[0]));
    else if (r->stk[0] < 0)
        r->stk[1] = from_rads(r,atan(r->stk[1] / r->stk[0]) + (sgn * M_PI));
    else
        r->stk[1] = from_rads(r,sgn * M_PI_2);
    r->stk[0] = m;
}

// ----------------------------------------------
static void Func_ptor(ri *r) {
    register double x;
    x         = r->stk[0] * cos(to_rads(r,r->stk[1]));
    r->stk[1] = r->stk[0] * sin(to_rads(r,r->stk[1]));
    r->stk[0] = x;
}

// ----------------------------------------------
static void Func_trim(ri *r)			/* trim digits beyond the fix value */
	{
	char ts[STRLEN];
	double td;
	snprintf(ts, STRLEN, "%.*f", r->fixval, r->stk[0]);
	if (!GetDouble(ts, STRLEN, &td)) {
		snprintf(r->errstrg, STRLEN, "Improper numeric value: %s",ts);
	    r->error = 1;
	}
	r->stk[0] = td;
	}

// ----------------------------------------------
static void store(ri *r, Tcl_Interp *interp, char *istrg) {	/* store in a memory location */
    double td = 0;
    char c = *istrg++;
    Tcl_HashEntry *hashent;
    Tcl_Obj *hobj;
    int isnew;

    if (!isalpha(*istrg)) {			/* symbol must start with an alpha */
        snprintf(r->errstrg, STRLEN, "Invalid variable symbol: %s",istrg);
        r->error = 1;
        return;
    }
    hashent = Tcl_CreateHashEntry(&(r->vartab), istrg, &isnew);
//printf("store 2;  hashent=%08X\n", hashent);
    if (isnew) {						/* if this is a new entry */
        hobj = Tcl_NewDoubleObj(td);	/* make an object for it */
        Tcl_SetHashValue(hashent, hobj);
    } else {						/* else get the starting value */
        hobj = Tcl_GetHashValue(hashent);
        if (Tcl_GetDoubleFromObj(interp, hobj, &td) != TCL_OK) {
            snprintf(r->errstrg, STRLEN, "Couldn't convert double");
            r->error = 1;
            return;
        }
    }
    switch(c) {
        case ':':	td  = r->stk[0]; break;
        case '*':	td *= r->stk[0]; break;
        case '/':	td /= r->stk[0]; break;
        case '+':	td += r->stk[0]; break;
        case '-':	td -= r->stk[0]; break;
    }

    Tcl_SetDoubleObj(hobj, td);		/* set the value into the hash table */
}		

// Call the generic rpn interpretor context
// ----------------------------------------------
int rpn(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
    {
    int i;
    Tcl_Obj *ov[objc + 1];
    
    ov[0] = Tcl_NewStringObj("rpn",1);
    for (i = 0; i < objc; i++) {
//printf("asn i:%d\n",i); fflush(stdout);
        ov[i + 1] = objv[i];
    }
    return (rpx(clientData, interp, objc + 1, ov));
    }
    
// Main entry point to RPN routine
// ----------------------------------------------
int rpx(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
    {
    int i, j, slen, oc, isnew;
    char *sptr, rstrg[STRLEN];
    double tdoub;
    Tcl_Obj **ov;
    Tcl_HashEntry *hashent;
    void *func;
    ri *r;

    if (objc < 2) {
        sptr = "rpn";
    } else {
        sptr = Tcl_GetStringFromObj(objv[1],&slen);
    }
//printf("sptr: %s\n",sptr); fflush(stdout);
//    if (!*sptr) {
//        Tcl_AddErrorInfo(interp, "Illegal rpn interpretor name");
//        return TCL_ERROR;
//    }
    if (!strcmp(sptr,"forget")) {
        if (!(hashent = Tcl_GetHashValue(Tcl_FindHashEntry(&rintab, sptr)))) {
            Tcl_AddErrorInfo(interp, "Interpreter not found");
            return TCL_ERROR;
        } else {
            r = Tcl_GetHashValue(hashent);
            Tcl_DeleteHashTable(&(r->vartab));
            Tcl_DeleteHashEntry(hashent);
            free(hashent);
            return TCL_OK;
        }
    } else if (!strcmp(sptr,"list")) {
        Tcl_SetObjResult(interp, Tcl_NewStringObj("Not implemented",-1));
        return TCL_ERROR;
    } else if ((hashent = Tcl_FindHashEntry(&rintab, sptr)) == NULL) {	//interpretor not found
//printf("new: %s\n",sptr); fflush(stdout);
        r = rpn_new();
        Tcl_SetHashValue(Tcl_CreateHashEntry(&rintab, sptr,	&isnew), (ClientData)r);
    } else {				//interpretor was found
        r = Tcl_GetHashValue(hashent);
    }

//FIXME:
//r = (ri *)Tcl_GetHashValue(Tcl_FindHashEntry(&rintab, "rpn"));
//printf("r:%0X\n",r); fflush(stdout);		//pointer to interp

//printf("   objc: %d\n", objc); fflush(stdout);
//printf("   i 0: %s\n", Tcl_GetStringFromObj(objv[0],&slen)); fflush(stdout);
//printf("   i 1: %s\n", Tcl_GetStringFromObj(objv[1],&slen)); fflush(stdout);

    for (i = 2; i < objc; i++) {				/* for each parameter */
        Tcl_ListObjGetElements(interp, objv[i], &oc, &ov);
        for (j = 0; j < oc; j++) {			/* for each list element of parameter */
            r->error = 0;
            sptr = Tcl_GetStringFromObj(ov[j], &slen);
//printf("   j %d: %s\n", j, sptr); fflush(stdout);

            if ((hashent = Tcl_FindHashEntry(&r->vartab, sptr)) != NULL) {		/* if a variable found */
//printf("found var\n");fflush(stdout);
                if (Tcl_GetDoubleFromObj(interp, Tcl_GetHashValue(hashent), &tdoub) != TCL_OK) {
                    return TCL_ERROR;			/* couldn't convert float */
                }
                push(r,tdoub);				/* use the variable's value */

            } else if ((hashent = Tcl_FindHashEntry(&cmdtab, sptr)) != NULL) {	/* if a command found */
//printf("found cmd;  func=%08X\n", func); fflush(stdout);
                func = Tcl_GetHashValue(hashent);
                (*((void (*)())(func))) (r);

            } else if (!strncmp(sptr,"fix",3)) {
//printf("found fix;  v=%s\n", sptr+3); fflush(stdout);
                r->fixval = atoi(sptr+3);
                r->fixval %= 100;			/* only valid 0 - 99 */

            } else if (!strncmp(sptr,"st",2) && strchr(":+-*/",sptr[2])) {
                store(r, interp, sptr+2);

            } else {
//printf("found explicit:%s:\n", sptr); fflush(stdout);
#ifdef OLDWAY	/* TCL can't handle a double negative */
                if (Tcl_GetDoubleFromObj(interp, ov[j], &tdoub) != TCL_OK) {
                    return TCL_ERROR;			/* couldn't convert float */
                }
#else			/* use my own string convert function */
                if (!GetDouble(sptr, slen, &tdoub)) {
                    snprintf(r->errstrg, STRLEN, "Improper numeric value: %s",sptr);
                    r->error = 1;
                }
#endif
                push(r,tdoub);				/* use the explicit value */
            }
            if (r->error) {
                Tcl_AddErrorInfo(interp, r->errstrg);
                return TCL_ERROR;
            }
//printf("  stk: %10.2f %10.2f %10.2f %10.2f \n", r->stk[0], r->stk[1], r->stk[2], r->stk[3]); fflush(stdout);
        }
    }
	if (isnan(r->stk[0])) {
//printf("NAN\n");
        Tcl_SetResult(interp, "Error", TCL_STATIC);
    } else if (isinf(r->stk[0]) == -1) {
//printf("-INF\n");
        Tcl_SetResult(interp, "-Infinite", TCL_STATIC);
    } else if (isinf(r->stk[0]) == 1) {
//printf("INF\n");
        Tcl_SetResult(interp, "Infinite", TCL_STATIC);
    } else {
		snprintf(rstrg, STRLEN, "%.*f", r->fixval, r->stk[0]);
        Tcl_SetObjResult(interp, Tcl_NewStringObj(rstrg,-1));
    }
//printf("DONE\n");fflush(stdout);
    return TCL_OK;
}

// Initialization for this module
// ----------------------------------------------
int Rpn_Init(Tcl_Interp *interp) {
    int isnew;

//printf("Initing 0\n");
    Tcl_InitHashTable(&cmdtab, TCL_STRING_KEYS);	/* create command table */
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "+",		&isnew), (ClientData)Func_plus);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "-",		&isnew), (ClientData)Func_minus);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "*",		&isnew), (ClientData)Func_times);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, ".",		&isnew), (ClientData)Func_times);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "/",		&isnew), (ClientData)Func_divide);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "%",		&isnew), (ClientData)Func_mod);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "min",	&isnew), (ClientData)Func_min);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "max",	&isnew), (ClientData)Func_max);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "sin",	&isnew), (ClientData)Func_sin);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "cos",	&isnew), (ClientData)Func_cos);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "tan",	&isnew), (ClientData)Func_tan);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "asin",	&isnew), (ClientData)Func_asin);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "acos",	&isnew), (ClientData)Func_acos);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "atan",	&isnew), (ClientData)Func_atan);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "rad",	&isnew), (ClientData)Func_rad);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "deg",	&isnew), (ClientData)Func_deg);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "int",	&isnew), (ClientData)Func_int);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "frc",	&isnew), (ClientData)Func_frc);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "rnd",	&isnew), (ClientData)Func_rnd);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "sqrt",	&isnew), (ClientData)Func_sqrt);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "sqr",	&isnew), (ClientData)Func_sqr);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "abs",	&isnew), (ClientData)Func_abs);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "ln",		&isnew), (ClientData)Func_ln);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "exp",	&isnew), (ClientData)Func_exp);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "inv",	&isnew), (ClientData)Func_inv);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "log",	&isnew), (ClientData)Func_log);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "10x",	&isnew), (ClientData)Func_10x);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "yx",		&isnew), (ClientData)Func_yx);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "clr",	&isnew), (ClientData)Func_clr);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "rdn",	&isnew), (ClientData)Func_rdn);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "chs",	&isnew), (ClientData)Func_chs);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "pi",		&isnew), (ClientData)Func_pi);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "ent",	&isnew), (ClientData)Func_ent);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "xch",	&isnew), (ClientData)Func_xch);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "trim",	&isnew), (ClientData)Func_trim);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "!",		&isnew), (ClientData)Func_not);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "!=",		&isnew), (ClientData)Func_ne);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "=",		&isnew), (ClientData)Func_eq);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, ">",		&isnew), (ClientData)Func_gt);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, ">=",		&isnew), (ClientData)Func_ge);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "<",		&isnew), (ClientData)Func_lt);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "<=",		&isnew), (ClientData)Func_le);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "rtop",	&isnew), (ClientData)Func_rtop);
    Tcl_SetHashValue(Tcl_CreateHashEntry(&cmdtab, "ptor",	&isnew), (ClientData)Func_ptor);

    Tcl_InitHashTable(&rintab, TCL_STRING_KEYS);	/* create command table */
    Tcl_SetHashValue(Tcl_CreateHashEntry(&rintab, "rpn",	&isnew), (ClientData)rpn_new());

    Tcl_CreateObjCommand(interp,"rpn",rpn,(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);
    Tcl_CreateObjCommand(interp,"rpx",rpx,(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);

    return TCL_OK;
    }

// ----------------------------------------------
int Rpn_SafeInit(Tcl_Interp *interp) {return Rpn_Init(interp);}	/* do we need this? */
