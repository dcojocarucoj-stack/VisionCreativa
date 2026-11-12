# VisionCreativa
RETO


docker run --rm -v "${PWD}/certs:/certs" alpine/openssl req -x509 -newkey rsa:2048 -nodes -days 825 -keyout /certs/visioncreativa.key -out /certs/visioncreativa.crt -subj "/CN=visioncreativa.local" -addext "subjectAltName=DNS:visioncreativa.local,DNS:*.visioncreativa.local,DNS:*.visioncreativa.localhost,DNS:localhost"