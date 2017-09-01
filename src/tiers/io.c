#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#define ERROR -1
#define OK 1

/*
* write data to the disk, sync it, then remove file
*/
EXPORT int stressIO(char* filePath, long length){
    FILE* random = fopen("/dev/urandom", "r");
    if(random == NULL) return ERROR;

    int fd = open(filePath, O_CREAT | O_WRONLY);
    if(fd < 0)return ERROR;
    
    char *buf = (char*)malloc(length * sizeof(char));
    if(buf == NULL) return ERROR;

    fread(buf, sizeof(char), length, random);
    fclose(random);

    int bytesWritten = write(fd, buf, length);
    if(bytesWritten != length) return ERROR;

    fsync(fd);
    ftruncate(fd, 0);
    unlink(filePath);
    free(buf);
    close(fd);
    return OK;
}