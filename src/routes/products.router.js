import { Router } from "express";
//importo la función del controlador
import { getAllProducts, getSearchProduct, getSearchByCategoria, getSearchById, crearNuevoProduct, reemplazaProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router(); //es una instancia de ese router
                        //Ahora todo se maneja con el Router,por lo tanto hay que reemplazar todos los app.
//=============LLAMA A RUTINA GET=============================================================
router.get("/products", getAllProducts);//La ruta llama al controlador con getAllProducts
//Los QUERY no están definidos en la RUTA, se pasan extra
router.get("/products/search", getSearchProduct );
//Los PARAMS están definidos en la RUTA
router.get("/products/:id/:category", getSearchByCategoria);
router.get("/products/:id", getSearchById);

/* Rutina para probar el post en POSTMAN
router.post("/products", (req,res) => {
  console.log(req.body);//recibo parámetros a través del cuerpo de la petición, NO de params ni de querys
  res.send("POST");//No se trabaja en la URL... Hay que ir a Postman al body(cuerpo de la petición)
}); */

//==============LLAMA A RUTINA POST==========================================================
//Rutina para crear un objeto JSON en POSTMAN
router.post("/products",crearNuevoProduct);//Voy a crearNuevoProducto del Controller

//==============LLAMA A RUTINA PUT==========================================================
router.put("/products/:id", reemplazaProduct);

//===============LLAMA A RUTINA DELETE======================================================
router.delete("/products/:id", deleteProduct);//LLama al controlador

export default router; //por si afuera lo quiero llamar de otra forma

export const Hola = () => {//es una importación nombrada, si la importo desde afuera, siempre se va a llamar Hola

}