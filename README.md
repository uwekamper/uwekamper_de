# How to run

```
docker build -t uwekamper_de .
docker run -i -t -p 127.0.0.1:8080:8080/tcp -v $(pwd):$(pwd) -w $(pwd)  uwekamper_de /bin/bash

hyde build
```
