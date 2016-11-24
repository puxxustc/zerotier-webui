# WebUI for ZeroTier #

[![License](https://api.pxx.io/badge/badge/license-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)

Simple WebUI for ZeroTier. Still working in progress.

## Build ##

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run lint && npm run build
```

## Deploy ##

Built files(`dist/`) are meant to be served over an HTTP server. ZeroTier API should be proxyed and rewrite `^/api/(.*)$` to `/(.*)`.

Sample nginx config:

```nginx
server {
    listen 0.0.0.0:80;
    charset utf-8;
    index index.html;
    root /path/to/dist/;
    location / {
        etag on;
        expires 30d;
        try_files $uri $uri/ =404;
    }
    location /api/ {
        rewrite ^/api/(.+)$ /$1 break;
        proxy_pass http://127.0.0.1:9993/;
    }
}
```

## License ##

Copyright (C) 2014 - 2016, Xiaoxiao <i@pxx.io>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
