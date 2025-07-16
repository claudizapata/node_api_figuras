# node_api_figuras

Esta aplicación tiene como objetivo que el usuario pueda interactuar con la base de datos "Productos", mediante una serie de peticiones y envío de datos al servidor donde se encuentra alojada. 
Las propiedades de cada registro en el servidor de datos, son:
"name": string,
"descrip": string, 
"price": num,
"category": array de 2 elementos.

Los datos se encuentran alojados en la nube mediante Firestore en el entorno de desarrollo del SDK Firebase.

Archivo INDEX.js: es el punto de entrada (ARCHIVO ENTRYPOINT)

Archivo products.model.js se modificó para utilizar Firestore en lugar de un archivo JSON local. Este archivo contendrá métodos para interactuar con la colección de productos en Firestore.


=======La APP se ejecuta desde la terminal de VSC con "npm run dev"========


El archivo src/models/data.js, contiene el código para inicializar FIREBASE y FIRESTORE.


_POSTMAN_

El usuario podrá explorar la colección de datos mediante Postman. Podrá hacer peticiones o enviar datos para crear o actualizar registros en el servidor.
Postman simplifica el desarrollo y las pruebas de APIs, permitiendo crear y compartir solicitudes de manera rápida y segura.

_MÉTODOS -PETICIONES Y ENVÍOS-_

Método GET (TRAE PRODUCTOS):
GET: /api/products devuelve todos los productos de la Base de Datos:
http://localhost:3000/api/products/

Petición que trae el registro por determinado id:
GET /api/products/:id devuelve el producto por el ID indicado.(En este caso solo el que tenga el id=1)
http://localhost:3000/api/products/1

Petición que trae el/los registro/s por determinado name:(NO es necesario que el name coincida exactamente)
(En este caso solo el que contenga como nombre o una parte, name=medieval)
http://localhost:3000/api/products/search?name=medieval

Método POST (CREATE PRODUCT):
POST /api/products/create envía datos al servidor para crear un nuevo registro.

Método PUT (CHANGE PRODUCT):
PUT /api/products/:id envía datos al servidor para un determinado id. El recurso (producto) ya existente queda reemplazado completamente con los datos proporcionados por el usuario.

Método PATCH (CHANGE PART OF PRODUCT):
PATCH /api/products/:id envía datos al servidor para un determinado id. El producto ya existente queda actualizado SOLO en los campos específicos. Este método solo actualiza la parte que el ususario desea modificar, con los datos que envíe.

Método DELETE (Elimina PRODUCT):
DELETE /api/products/:id elimina el registro de acuerdo al "id" especificado.
(En este caso el producto que corresponda al id 6)
http://localhost:3000/api/products/6

_SEGURIDAD Y AUTENTICACIÓN_
Se utilizó un servicio de autenticación de terceros "Auth0", que se encarga de todo el proceso de resguardo y validación. De esta manera, no necesitamos contar con una capa específica en la aplicación con este fin. Aunque no escapa a tener que necesitar de un sistema robusto de autenticación hecho a medida.
Se utilizó el estándar abierto JSON Web Token (JWT) ques es un token en formato JSON que contiene información codificada y firmada digitalmente, lo que permite que el servidor valide su autenticidad si necesidad de consultar una BD o mantener una sesión activa. Se compone de 3 partes codificadas en Base64.
Esta metodología es ideal para servicios API Rest, donde se permite enviar _tokens_ mediante los _headers_ de las peticiones que serán capturadas por los middlewares al llegar a las rutas, y harán la validación para permitir o no el acceso a los resursos.

ruta: _src/utils/token-generator.js_ donde se creó una función para generar nuevos tokens.

ruta: _src/routes/auth.routes.js_ donde se atiende al endpoint /login mediante el método POST.

controlador: src/controllers/auth.controller.js    (El cliente realizará una petición a la ruta de /login enviando en el body de la misma el _email_ y la _password_ que deberán coincidir con un usuario real registrado, lo cual consta en "default_user" de este archivo). Si coinciden, se crea un _token_ para este usuario mediante _generateToken_

_PRUEBAS DE AUTENTICACIÓN_
Para validar que todo funcione correctamente se utlizó POSTMAN:
1) Ingresar un token válido con las credenciales definidas en src/utils/tokengenerator.js