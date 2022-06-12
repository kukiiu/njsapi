#!/bin/bash
# generate nginx.conf
if [ -s './src/build.js' ]; then
        NJSAPI_INDEX=./src/build.js
fi
# njs $NJSAPI_INDEX
echo '[build] npm run build'
npm run build

echo '[build] cp -f /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak'
cp -f /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

echo '[build] cp -f ./nginx.conf /etc/nginx/nginx.conf'
cp -f ./nginx.conf /etc/nginx/nginx.conf

if [ -s '/var/run/nginx.pid' ]; then
        echo '[build] nginx reload...'
        nginx -s reload
else
        echo '[build] nginx start...'
        nginx
fi

echo "[build] finish"