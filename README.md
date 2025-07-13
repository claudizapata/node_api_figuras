# node_api_figuras

Esta aplicación tiene como objetivo que el usuario pueda interactuar con la base de datos "Productos", mediante una serie de peticiones y envío de datos al servidor donde se encuentra alojada. Las propiedades de cada registro en el servidor de datos, son:
"name": string,
"descrip": string, 
"price": num,
"category": array de 2 elementos.

Los datos se encuentran alojados en la nube mediante Firestore bajo la gestión de Firebase.

POSTMAN
El usuario podrá explorar la colección de datos mediante Postman. Podrá hacer peticiones o enviar datos para crear o actualizar registros en el servidor.
Postman simplifica el desarrollo y las pruebas de APIs, permitiendo crear y compartir solicitudes de manera rápida y segura.


Módulos GET (TRAE PRODUCTOS):
Petición que trae todos los registros de la Base de Datos:
http://localhost:3000/api/products/

Petición que trae solo el/los registro/s que coincidan con el "name" y "category" consultados:(NO es necesario que coincida exactamente el nombre y la categoría)
(En este caso name=Armadura y categoria=guerra)
http://localhost:3000/api/products/search?name=armadura&category=guerra 

Petición que trae el registro por determinado id:
(En este caso solo el que tenga el id=1)
http://localhost:3000/api/products/1

Petición que trae el/los registro/s por determinado name:(NO es necesario que el name coincida exactamente)
(En este caso solo el que tenga el name=medieval)
http://localhost:3000/api/products/search?name=medieval



Módulo POST (CREATE PRODUCT):
Este método se utiliza para enviar datos al servidor para crear un nuevo registro.

Módulo PUT (CHANGE PRODUCT):
Este método se utiliza para enviar datos al servidor para un determinado id. El producto ya existente queda actualizado en alguna de sus propiedades por el cambio que ingresó el usuario.

Módulo DELETE (Elimina PRODUCT):
Este método elimina el registro de acuerdo al "id" especificado.
(En este caso el producto que corresponda al id 6)
http://localhost:3000/api/products/6
