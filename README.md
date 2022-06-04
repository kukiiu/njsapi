# NJSAPI

```sh
docker build -t njsapi:v1 .
```

```sh
# launch NJSAPI container
docker run --name njsapi -p 80:80 -v D:\project\njsapi:/usr/local/njsapi -dit njsapi:v1 /bin/bash
```

```sh
# build config
/bin/bash ./bin/njsapi
```
