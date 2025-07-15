# node_api_figuras

Esta aplicación tiene como objetivo que el usuario pueda interactuar con la base de datos "Productos", mediante una serie de peticiones y envío de datos al servidor, donde se encuentra alojada. Las propiedades de cada registro en el servidor de datos, son:
"name": string,
"descrip": string, 
"price": num,
"category": array de 2 elementos.

Los datos se encuentran alojados en la nube mediante Firestore en el entorno de desarrollo del SDK Firebase.

Archivo INDEX.js: es el punto de entrada.

Archivo products.model.js se modificó para utilizar Firestore en lugar de un archivo JSON local. Este archivo contendrá métodos para interactuar con la colección de productos en Firestore.
getDocs:
● Este método se utiliza para obtener todos los documentos de una colección.


=======La APP se ejecuta desde la terminal con "npm run dev"========

El archivo data.js dentro de la carpeta models, contiene el código para inicializar FIREBASE y FIRESTORE.


POSTMAN: El usuario podrá explorar la colección de datos mediante Postman. Podrá hacer peticiones o enviar datos para crear o actualizar registros en el servidor.
Postman simplifica el desarrollo y las pruebas de APIs, permitiendo crear y compartir solicitudes de manera rápida y segura.

Módulos GET (TRAE PRODUCTOS):
GET: /api/products devuelve todos los productos de la Base de Datos:
http://localhost:3000/api/products/

Petición que trae el registro por determinado id:
GET /api/products/:id devuelve el producto por el ID indicado.(En este caso solo el que tenga el id=1)
http://localhost:3000/api/products/1

Petición que trae el/los registro/s por determinado name:(NO es necesario que el name coincida exactamente)
(En este caso solo el que contenga como nombre o una parte, name=medieval)
http://localhost:3000/api/products/search?name=medieval

Módulo POST (CREATE PRODUCT):
POST /api/products/create envía datos al servidor para crear un nuevo registro.

Módulo PUT (CHANGE PRODUCT):
PUT /api/products/:id envía datos al servidor para un determinado id. El recurso (producto) ya existente queda reemplazado completamente con los datos proporcionados por el usuario.

Módulo PATCH (CHANGE PART OF PRODUCT):
PATCH /api/products/:id envía datos al servidor para un determinado id. El producto ya existente queda actualizado SOLO en los campos específicos. Este método solo actualiza la parte que el ususario desea modificar, con los datos que envíe.

Módulo DELETE (Elimina PRODUCT):
DELETE /api/products/:id elimina el registro de acuerdo al "id" especificado.
(En este caso el producto que corresponda al id 6)
http://localhost:3000/api/products/6
