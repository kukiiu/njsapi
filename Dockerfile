FROM centos:latest

RUN set -x \
    && sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-* \
    && sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-* \
    && yum makecache \
    && yum update -y \
    && yum -y install yum-utils \
    && echo $'[nginx-stable]\n\
name=nginx stable repo\n\
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/\n\
gpgcheck=1\n\
enabled=1\n\
gpgkey=https://nginx.org/keys/nginx_signing.key\n\
module_hotfixes=true' >> /etc/yum.repos.d/nginx.repo \
    && yum -y install nginx \
    && yum -y install nginx-module-njs \
    && yum -y install npm \
    && npm install yarn \
    && mkdir -p /usr/local/njsapi

EXPOSE 80

WORKDIR /usr/local/njsapi
