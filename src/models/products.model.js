//Lo 1ro que hay que hacer es traer nuestra fuente de información
//fs (fileSystem ) se complementa con path para poder obtener las rutas a los...
// ..archivos de forma dinámica
import { error } from 'console';
import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");//creo el path para leer el archivo products.json
const json = fs.readFileSync(jsonPath, "utf-8");//para leer directamente el json, y que no genere un buffer
const products = JSON.parse(json);

import {db} from "./data.js";
import { collection, getDocs } from 'firebase/firestore';

const productsCollection = collection(db, "products");

//el modelo va a exponer varios MÉTODOS
export const getAllProducts = async () =>{
    try{
      const snapshot = await getDocs(productsCollection);//getDocs: Este método se utiliza para obtener todos los documentos de una colección.
      return snapshot.docs.map((item) => ({id: item.id, ...item.data()}));//Va a expandir todo lo que está en data, menos el id

    }catch (error){
      console.error(error);
    }
};

export const getProductById = (id) =>{
    return products.find((item) => item.id == id);
};

export const createProduct = (data) =>{
    const newProduct = {//estoy creando un nuevo objeto a partir de los datos que recibo
        id: products.length + 1,//esto es algo ficticio, se apaga el servidor y se borra
       ...data,
  };
  products.push(newProduct);//Esto despues va a la BD
  fs.writeFileSync(jsonPath, JSON.stringify(products));//Con esto lo persiste en el json
  return newProduct;//devuelvo el producto que acabo de crear

};

export const changeProduct = (productId, data) =>{//Recibe el id del elemento a modificar, y los datos    
    const productIndex = products.findIndex((item) => item.id === productId);//Busca el elemento por el id
    if (productIndex === -1) return null;

    products[productIndex] = {id:productId,  ...data};//copia todas las propiedades del objeto ...data que viene del req.body, y las..
    //.. agrega al objeto a modificar que es products[productIndex]

    //Guardo el array products (Ya modificado) en el archivo JSON
    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");//jsonPath: ruta del archivo donde se guarda el JSON(./products.json)
    //Convierte el array products a un string JSON  //El null y 2, formatean el JSON con indentación de 2 espacios
    //"utf-8": codificación del texto usada al escribir el archivo
    return products[productIndex];//respondo con ese nuevo producto para que se vea
};

export const deleteProduct = (id) => {//EL MODELO maneja los datos
    const productIndex = products.findIndex((item) => item.id === id);//El modelo busca si el producto existe
    
    if (productIndex == -1){
      return null;//NO es STATUS porque responde datos. STATUS va en el controlador porque le responde al cliente
    }else{
      const product = products.splice(productIndex, 1);//quita 1 producto del array y lo guarda en product
      fs.writeFileSync(jsonPath, JSON.stringify(products));//Con esto lo persiste en el json
      return product;
    };
    
};