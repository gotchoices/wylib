/* This will check a user's password and return success or failure */
/*include(Copyright)*/

/*  Parts lifted from:
  A program contributed by Shane Watts <shane@icarus.bofh.asn.au>
  slight modifications by AGM.

  You need to add the following (or equivalent) to the /etc/pam.conf file.
  # check authorization
  check   auth       required     pam_unix_auth.so
  check   account    required     pam_unix_acct.so
 */

#include <stdlib.h>
#include <tcl.h>

#include <pwd.h>
#include <sys/types.h>

#include <security/pam_appl.h>
#include <security/_pam_macros.h>
#include <malloc.h>
#include <string.h>

#define __USE_XOPEN
#define _XOPEN_SOURCE
#include <unistd.h>

#define STRLEN	256
#define USERNAMESIZE    1024

static Tcl_Interp *cp_interp = NULL;
static char *cp_cmd = "dia::pquery %s";

static void pam_misc_conv_delete_binary(void **delete_me)
{
    if (delete_me && *delete_me) {
    unsigned char *packet = *(unsigned char **)delete_me;
    int length;

    length = (packet[0]<<24)+(packet[1]<<16)+(packet[2]<<8)+packet[3];
    memset(packet, 0, length);
    free(packet);
    *delete_me = packet = NULL;
    }
}

int (*pam_binary_handler_fn)(const void *send, void **receive) = NULL;
void (*pam_binary_handler_free)(void **packet_p) = pam_misc_conv_delete_binary;

/* Copies a string in a safe manner */
char *xstrdup(const char *x)
{
    register char *new=NULL;

    if (x != NULL) {
        register int i;

        for (i=0; x[i]; ++i);		/* length of string */
        if ((new = malloc(++i)) == NULL) {
            i = 0;
        } else {
            while (i-- > 0) {
                new[i] = x[i];
            }
        }
        x = NULL;
    }
    return new;		/* return the duplicate or NULL on error */
}

static char *get_resp (const char *prompt)
{
    char cmd[STRLEN];
    sprintf(cmd, cp_cmd, prompt);
    Tcl_Eval(cp_interp, cmd);
    return (x_strdup(Tcl_GetStringResult(cp_interp)));
}

/* This defines the conversation structure for PAM */
int tcl_conv(int num_msg, const struct pam_message **msgm,
          struct pam_response **response, void *appdata_ptr)
{
    int count=0;
    struct pam_response *reply;

    if (num_msg <= 0)
    return PAM_CONV_ERR;

    reply = (struct pam_response *) calloc(num_msg,
                       sizeof(struct pam_response));
    if (reply == NULL) {
        return PAM_CONV_ERR;
    }

    for (count=0; count < num_msg; ++count) {
        char *string=NULL;

        switch (msgm[count]->msg_style) {
            case PAM_PROMPT_ECHO_OFF:
                string = get_resp(msgm[count]->msg);
                if (string == NULL) {
                    goto failed_conversation;
                }
                break;
            case PAM_PROMPT_ECHO_ON:
                string = get_resp(msgm[count]->msg);
                if (string == NULL) {
                    goto failed_conversation;
                }
                break;
            case PAM_ERROR_MSG:
                if (fprintf(stderr,"%s\n",msgm[count]->msg) < 0) {
                    goto failed_conversation;
                }
                break;
            case PAM_TEXT_INFO:
                if (fprintf(stdout,"%s\n",msgm[count]->msg) < 0) {
            	    goto failed_conversation;
                }
                break;
            case PAM_BINARY_PROMPT:
            {
                void *pack_out=NULL;
                const void *pack_in = msgm[count]->msg;
        
                if (!pam_binary_handler_fn
                || pam_binary_handler_fn(pack_in, &pack_out) != PAM_SUCCESS
                || pack_out == NULL) {
                    goto failed_conversation;
                }
                string = (char *) pack_out;
                pack_out = NULL;
        
                break;
            }
            default:
                fprintf(stderr, "erroneous conversation (%d)\n",msgm[count]->msg_style);
                goto failed_conversation;
        }
        
        if (string) {                         /* must add to reply array */
            /* add string to list of responses */

            reply[count].resp_retcode = 0;
            reply[count].resp = string;
            string = NULL;
        }
    }

    /* New (0.59+) behavior is to always have a reply - this is
       compatable with the X/Open (March 1997) spec. */
    *response = reply;
    reply = NULL;
    return PAM_SUCCESS;

failed_conversation:
    if (reply) {
        for (count=0; count<num_msg; ++count) {
            if (reply[count].resp == NULL) {
                continue;
            }
            switch (msgm[count]->msg_style) {
                case PAM_PROMPT_ECHO_ON:
                case PAM_PROMPT_ECHO_OFF:
                    _pam_overwrite(reply[count].resp);
                    free(reply[count].resp);
                    break;
                case PAM_BINARY_PROMPT:
                    pam_binary_handler_free((void **) &reply[count].resp);
                    break;
                case PAM_ERROR_MSG:
                case PAM_TEXT_INFO:
                /* should not actually be able to get here... */
                    free(reply[count].resp);
            }
            reply[count].resp = NULL;
        }
    /* forget reply too */
    free(reply);
    reply = NULL;
    }

    return PAM_CONV_ERR;
}

static struct pam_conv conv = {
    tcl_conv,
    NULL
};

/* This will prompt the user to input their password.  It will return true
   if the user input the correct password or false otherwise.
   parm1:	The username to check
   parm2:	An optional command to use to prompt the user (default dia::pquery %s) */
int checkpwd(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
	{
    pam_handle_t *pamh=NULL;
	char *user;
	int slen, retval;

    if (objc < 2 || objc > 3) {
        Tcl_WrongNumArgs(interp, 1, objv, "username ?prompt_cmd?");
        return TCL_ERROR;
    }

    user = Tcl_GetStringFromObj(objv[1], &slen);
    
    if (objc > 2) {			/* if prompt command specified */
        cp_cmd = Tcl_GetStringFromObj(objv[2], &slen);
    }
    
    cp_interp = interp;			/* have to pass interp globally */
    retval = pam_start("check", user, &conv, &pamh);
    if (retval == PAM_SUCCESS)
        retval = pam_authenticate(pamh, 0);		/* check the user's password */
//printf("retval:%d\n",retval);
    if (retval == PAM_SUCCESS) {
        retval = pam_acct_mgmt(pamh, 0);		/* permitted access? */
//printf("Retval:%d\n",retval);
        if (retval = PAM_AUTHINFO_UNAVAIL) {
            retval = PAM_SUCCESS;				/* if can't find account info, password is sufficient */
        }
    }

    /* This is where we have been authorized or not. */
    if (retval == PAM_SUCCESS) {
        Tcl_SetObjResult(interp, Tcl_NewIntObj(1));
    } else {
        Tcl_SetObjResult(interp, Tcl_NewIntObj(0));
    }

    if (pam_end(pamh,retval) != PAM_SUCCESS) {     /* close Linux-PAM */
        pamh = NULL;
        Tcl_AddErrorInfo(interp, "checkpwd: failed to release authenticator");
        return TCL_ERROR;
    }

    return TCL_OK;
	}

/* This is an interface to the traditional crypt routine.  It is included
   for backward compatibility with old password files.
   parm1:	Two letter salt
   parm2:	Un-encrypted password */
int crypwd(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
	{
	char *salt, *password;
	int slen, retval;

    if (objc != 3) {
        Tcl_WrongNumArgs(interp, 1, objv, "salt password");
        return TCL_ERROR;
    }

    salt = Tcl_GetStringFromObj(objv[1], &slen);
    password = Tcl_GetStringFromObj(objv[2], &slen);
    Tcl_SetObjResult(interp, Tcl_NewStringObj(crypt(password, salt),-1));
    return TCL_OK;
	}

/* Fetch data from the password file based on a user's UID
   parm1:	The user ID (numeric) of the person to look up
   returns a list: {username uid gid real_name home_dir shell} */
int getpwinfo(ClientData clientData, Tcl_Interp *interp, int objc, Tcl_Obj *CONST objv[])
	{
	int slen, oc, uid;
	Tcl_Obj *ov[6];
	struct passwd *pw;
	char *uname;

    if (objc != 2) {
        Tcl_WrongNumArgs(interp, 1, objv, "User_ID");
        return TCL_ERROR;
    }

    if (Tcl_GetIntFromObj(interp, objv[1], &uid) == TCL_OK) {
        pw = getpwuid((uid_t)uid);
    } else {
        uname = Tcl_GetStringFromObj(objv[1], &slen);
        pw = getpwnam(uname);
    }
    if (!pw) {
        Tcl_AddErrorInfo(interp, "Can't find user information");
        return TCL_ERROR;
    }
    ov[0] = Tcl_NewStringObj(pw->pw_name,	-1);
    ov[1] = Tcl_NewIntObj(pw->pw_uid);
    ov[2] = Tcl_NewIntObj(pw->pw_gid);
    ov[3] = Tcl_NewStringObj(pw->pw_gecos,	-1);
    ov[4] = Tcl_NewStringObj(pw->pw_dir,	-1);
    ov[5] = Tcl_NewStringObj(pw->pw_shell,	-1);
    oc = 6;
        
    Tcl_SetObjResult(interp, Tcl_NewListObj(oc, ov));
    return TCL_OK;
	}

/* Initialization for this module */
/* ------------------------------------------------------------------------- */
int Checkpwd_Init(Tcl_Interp *interp) {

//printf("Initing 0\n");
    Tcl_CreateObjCommand(interp,"checkpwd",	checkpwd,	(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);
    Tcl_CreateObjCommand(interp,"crypwd",	crypwd,		(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);
    Tcl_CreateObjCommand(interp,"getpwinfo",getpwinfo,	(ClientData) NULL, (Tcl_CmdDeleteProc *) NULL);

    return TCL_OK;
    }
