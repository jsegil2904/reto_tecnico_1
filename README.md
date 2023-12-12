Reto Técnico
=================

Pasos previos:
1. Clonar este repositorio.
2. Deberá tener acceso desde su entorno local a la URL http://localhost:4400
3. Deberá tener instalado la última versión NodeJS.
4. Para la BDD Redis. Si tiene un entorno local Windows, deberá tener instalado Ubuntu sobre WSL.
5. Deberá tener instalado el cliente REST API: Postman.

BDD Redis:
1. Se implementó en un entorno local el servidor Redis-Stack. Se usó esta versión para poder manipular los objetos del proyecto de manera más práctica. 
    https://redis.io/docs/install/install-stack/windows/
2. Instalación del servidor Redis-Stack:
    - curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
    - sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
    - echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
    - sudo apt-get update
    - sudo apt-get install redis-stack-server
3. Para iniciar el servicio ejecutar el comando: redis-stack-server

Implementación:
1. Descomprimir la aplicación sobre una carpeta en su entorno local.
2. Desde la raíz del proyecto ejecutar en el terminal : npm install 
3. Crear un archivo .env  en su entorno local, y copiar el contenido.

Ejecución APP:
1. Ejecutar el comando: npm start
2. Puede realizar las pruebas de API, mediante la colección  de Postman. Esta colección la puede encontrar en la carpeta del proyecto: "postman".
    a. Importa la colección a Postman.
    b. Genera las pruebas de los métodos: 
        - Generar token.
        - Operación con el token.

Ejecución de Test:
1. Ejecutar el comando: npm test

    