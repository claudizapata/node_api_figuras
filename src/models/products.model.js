//Lo 1ro que hay que hacer es traer nuestra fuente de información
//fs (fileSystem ) se complementa con path para poder obtener las rutas a los...
// ..archivos de forma dinámica
import { error } from 'console';
import fs from 'fs';
import path from 'path';

//const __dirname = import.meta.dirname;

//const jsonPath = path.join(__dirname, "./products.json");//creo el path para leer el archivo products.json
//const json = fs.readFileSync(jsonPath, "utf-8");//para leer directamente el json, y que no genere un buffer
//const products = JSON.parse(json);

import {db} from "./data.js";
import { collection, getDocs, doc, getDoc, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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

export const getProductById = async (id) =>{
  try{
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? {id: snapshot.id, ...snapshot.data()}: null;
  }catch (error){
    console.error(error);
    throw error;
  }
    //return products.find((item) => item.id == id);
};

/* export const getProductByIdCategory = async (id, category) =>{
  try{ 
    const productId = doc(productsCollection, id, category);
    const snapshot = await getDoc(productId);
    return snapshot.exists() ? {id: snapshot.id, ...snapshot.data()}: null;
  }catch (error){
    console.error(error);
  }
    //return products.find((item) => item.id == id);
}; */


//Crear un nuevo producto en FIRESTORE
export const createProduct = async (data) =>{
    try{
      const newProd = await addDoc(productsCollection, data);
      return {id: newProd.id, ...data};//Devuelve el documento que acabo de crear
    }catch(error){
      console.error("Error al crear el producto en Firestore:", error);
      throw error;
    };
         //estoy creando un nuevo objeto a partir de los datos que recibo  
  };

  //PUT
export const changeProduct = async (productId, data) =>{//Recibe el id del elemento a modificar, y los datos    
  try{
    //const productIndex = products.findIndex((item) => item.id === productId);//Busca el elemento por el id
    const productRef = doc(productsCollection, productId);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()){
      return null;
    }
    await setDoc(productRef, data);//Reemplazo el producto completo
    //Devuelve el producto actualizado
    const productActualizado= {id: productId, ...snapshot.data(), ...data}; //sobreescribo con los datos NUEVOS
    return productActualizado;
  }catch(error){
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
    //Guardo el array products (Ya modificado) en el archivo JSON
    //fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");//jsonPath: ruta del archivo donde se guarda el JSON(./products.json)
    //Convierte el array products a un string JSON  //El null y 2, formatean el JSON con indentación de 2 espacios
    //"utf-8": codificación del texto usada al escribir el archivo
    //return products[productIndex];//respondo con ese nuevo producto para que se vea
};

export const changePartProduct = async (productId, data) =>{
  try{
    //Refiere el producto por el id especificado
    const productRef = doc(productsCollection, productId);
    //Fetch al producto
    const productDoc = await getDoc(productRef);

    //Chequea si el producto existe
    if (!productDoc.exists()){
      return null;
    }
    //Update parte del producto con la nueva data
    await updateDoc(productRef, data);

    //Devuelve la data del producto updated
    const updatedProduct = {id: productDoc.id, ...productDoc.data(), ...data};
    return updatedProduct;

  }catch (error){
    console.error("Error al actualizar parte del producto");
    return null;
  }
};


export const deleteProduct = async (id) => {//EL MODELO maneja los datos
  try{
     const productRef = doc(productsCollection, id);
      const snapshot = await getDoc(productRef);

      if(!snapshot.exists()){
        return null; //Producto no encontrado
      }
      await deleteDoc(productRef)
      return{id, ...snapshot.data()}//Devuelve los datos eliminados
  }catch(error){
      console.error("Error al eliminar el producto:", error);
      throw new Error ("No se pudo eliminar el producto");
    }
};
    
    
   /*  if (productIndex == -1){
      return null;//NO es STATUS porque responde datos. STATUS va en el controlador porque le responde al cliente
    }else{
      const product = products.splice(productIndex, 1);//quita 1 producto del array y lo guarda en product
      fs.writeFileSync(jsonPath, JSON.stringify(products));//Con esto lo persiste en el json
      return product;
    }; */
    
