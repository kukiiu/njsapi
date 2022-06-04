const fs = require('fs')
let config = fs.readFileSync('./config/config.json', { encoding: 'utf-8' })
config = JSON.parse(config)

const conf = `
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

load_module modules/ngx_http_js_module.so;
events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    error_log /var/log/nginx/error.log info;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    js_path "/usr/local/njsapi/src/";
    js_import init.js;
    js_import main.js;

    server {
        listen 80;

        location / {
            js_content main;
        }
    }
}
`
// const outputFile = '/etc/nginx/nginx.conf'
const outputFile = '../nginx.conf'
console.log("output file: " + outputFile)
fs.writeFileSync(outputFile, conf)
