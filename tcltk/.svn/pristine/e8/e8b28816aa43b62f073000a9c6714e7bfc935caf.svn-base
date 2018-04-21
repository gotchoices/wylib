LIBDIR=/ati/etc/tcl
SWCH=-fpic -c
OBJS=

all:	libwylib.so

libwylib.so: checkline.o checkpwd.o misc.o rpn.o wylib.o
	gcc -shared checkline.o checkpwd.o misc.o rpn.o wylib.o -o libwylib.so -lpam -lcrypt

wylib.o: wylib.c ../Version.h
	gcc ${SWCH} wylib.c ${DEFS}

misc.o: misc.c ../Version.h
	gcc ${SWCH} misc.c ${DEFS}

rpn.o: rpn.c ../Version.h
	gcc ${SWCH} rpn.c ${DEFS}

checkline.o: checkline.c
	gcc ${SWCH} checkline.c ${DEFS}

checkpwd.o: checkpwd.c
	gcc ${SWCH} checkpwd.c ${DEFS}

clean:
	rm -f *.so *.o
