# NJSAPI

```sh
# build NJSAPI image
docker build -t njsapi:v1 .
```

```sh
# launch NJSAPI container
docker run --name njsapi -p 80:80 -p 8080:8080 -v D:\project\njsapi:/usr/local/njsapi -dit njsapi:v1 /bin/bash

# or
docker-compose ...
```

```sh
# build config
./bin/njsapi
```
