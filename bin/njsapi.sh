#!/bin/bash
# generate nginx.conf
if [ -s './src/build.js' ]; then
        NJSAPI_INDEX=./src/build.js
fi
echo $NJSAPI_INDEX

# njs $NJSAPI_INDEX
npm run build

cp -f /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

cp -f ./nginx.conf /etc/nginx/nginx.conf

if [ -s '/var/run/nginx.pid' ]; then
        echo 'nginx reload...'
        nginx -s reload
else
        echo 'nginx start...'
        nginx
fi

echo "success"