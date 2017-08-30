#include <time.h>
#include <stdlib.h>
#include<string.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#define ERROR -1
#define OK 1

EXPORT int stressMemory(long size) {
    srand(time(NULL));
    int i, j;
    for(i = 0; i<16; i++){
        double* var = malloc(size * sizeof(double));
        if(var == NULL){
            return ERROR;
        }
        var[0] = rand();
        for(j=1; j<size; j++){
            var[j] = var[j-1] + j;
        }

    }
    return OK;
}