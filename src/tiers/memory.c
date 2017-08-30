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

EXPORT int stressMemory(long size) {
    srand(time(NULL));
    size *= 100;
    int i;
    unsigned long r = 8;
    unsigned char *var;
    var = calloc(size, 1);
    for(i = 0; i < r; ++i) {
        nt_memset(var, (int)i, size);
        printf("%4d/%4ld\r", var[0], r); /* "use" the result */
        fflush(stdout);
    }
    free(var);
    return OK;
}