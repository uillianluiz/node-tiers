#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <emmintrin.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#define ERROR -1
#define OK 1

/** 
nt_memset taken from: https://stackoverflow.com/a/25835186
The magic is all in _mm_stream_si128, aka the machine instruction movntdq, which writes a 16-byte quantity to system RAM, bypassing the cache (the official jargon for this is "non-temporal store"). I think this pretty conclusively demonstrates that the performance difference is all about the cache behavior.
*
*/
static void nt_memset(char *buf, unsigned char val, size_t n){
    /* this will only work with aligned address and size */
    assert((uintptr_t)buf % sizeof(__m128i) == 0);
    assert(n % sizeof(__m128i) == 0);

    __m128i xval = _mm_set_epi8(val, val, val, val,
                                val, val, val, val,
                                val, val, val, val,
                                val, val, val, val);

    for (__m128i *p = (__m128i*)buf; p < (__m128i*)(buf + n); p++)
        _mm_stream_si128(p, xval);
    _mm_sfence();
}

/**
* Stress memory function.
* Receives the number of bytes to allocate, allocates a char array, and use the function nt_memset to set it. 
*/
EXPORT int stressMemory(long size) {
    srand(time(NULL));
    size *= 256;
    int i;
    unsigned long r = 1;
    unsigned char *var;
    var = calloc(size, 1);
    if(var == NULL) return ERROR;
    for(i = 0; i < r; ++i) {
        nt_memset(var, (int)i, size);
    }
    free(var);
    return OK;
}