FROM arm32v7/nginx:latest

LABEL vendor="Catalin Matache"
MAINTAINER Catalin Matache "https://i-catalin.ro"

COPY /dist /usr/share/nginx/html
COPY /env/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]