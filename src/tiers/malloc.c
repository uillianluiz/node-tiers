#include<stdlib.h>
#include<string.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#define ERROR -1
#define OK 1

/**
* It executes a malloc, then calloc, then realloc, then free.
* The size of the allocation is received by parameter
*/
EXPORT int stressMalloc(long size) {
    int i = 0;
    long mid = ((long)size/2);
    for(i = 0; i<128; i++){
        //malloc
        void* var = malloc(size);
        if(var == NULL){
            return ERROR;
        }
        memset(var, 0, sizeof(var));
        free(var);
        
        //calloc
        var = (double*) calloc(size, sizeof(double));
        if(var == NULL){
            return ERROR;
        }
        memset(var, 1, sizeof(var));

        //iteration even reduce, odd increase
        if(i % 2 == 0){
            var = (double*) realloc(var, ((long)size/2) * sizeof(double));
        }else{
            var = (double*) realloc(var, (size) * sizeof(double));
        }
        if(var == NULL){
            return ERROR;
        }
        memset(var, 2, sizeof(var));
        free(var);
    }
    return OK;
}