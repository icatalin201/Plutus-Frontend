FROM node:13.8.0 as build

LABEL vendor="Catalin Matache"
MAINTAINER Catalin Matache "https://i-catalin.ro"

WORKDIR /app
COPY package.json /app/package.json
RUN npm install && npm install -g @angular/cli@10.1.3

COPY . /app
RUN node ng build --prod --output-path=dist

FROM nginx:1.17.8
COPY --from=build /app/dist /usr/share/nginx/html
COPY /env/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]