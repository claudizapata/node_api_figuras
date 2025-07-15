//EL CONTROLADOR va a tomar datos, y los va a devolver
//Son los que gestionan las solicitudes HTTP y responden la petición 
//LAS VALIDACIONES SE HACEN EN EL FRON O ACÁ EN EL CONTROLADOR

//0000 En el CONTROLADOR tengo que llamar al SERVICIO para que me dé los datos  0000
import * as model from '../models/products.model.js';

export const getAllProducts = async (req, res) => {
    res.json(await model.getAllProducts());//Se usaría service. si la funcion en este módulo se llamase...
    //...igual a la función en el servicio
};

export const getSearchByName = async (req,res) =>{
   /*  console.log(req.query);
    res.json(products); */
    const {name} = req.query;
    try{
       const products = await model.getAllProducts(name);
       if (!products || products.length === 0){
        return res.status(404).json({error: "No existen productos en la base de datos"});
    };
    const filtrados = products.filter((item) => 
        item.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filtrados.length === 0){
      return res.status(404).json({error: "No se encontraron productos con ese nombre"});
    }
    res.json(filtrados);

    }catch(error){
      console.error(error);
    }  
};
/* 
export const getSearchByIdCategoria = async (req, res) =>{
    const {id, category} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    //const products = model.getAllProducts();
    const product = await model.getProductByIdCategory(id, category);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
    };
    res.status(201).json(product);
}; */

export const getSearchById = async (req, res) =>{
    const {id} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const productId = await model.getProductById(id);
    //const products = model.getAllProducts();
    //const product = products.find((item) => item.id == id);
    if (!productId){
        res.status(404).json({error: "No existe el producto"});
      }
    res.json(productId);
};

export const crearNuevoProduct = async (req, res) =>{
  const {name, descrip, price, category } = req.body;//lo sacamos del request / voy a recibir un cuerpo en la petición, siempre que tenga un Middleware
  //con esa información voy a hacer, en este caso, uh objeto nuevo
  //const products = model.getAllProductos();
  try{
    const newProduct = await model.createProduct({name, descrip, price, category});//Llamo al modelo y le paso los datos 
    //Con un try catch en newProduct capturamos un error al guardar el producto en la BD
    res.status(201).json(newProduct);
  }catch (error){
    console.error("Error al crear el producto", error);
    res.status(404).json({error: "Error al crear el producto"});
  }  
};


export const reemplazaProduct= async (req, res) =>{
  const product = req.body;
  const productId = req.params.id;
  
    try{
      const updateProduct = await model.changeProduct(productId, product);

    if (!updateProduct){
      return res.status(404).json({error:"Producto no encontrado"});
    };
    res.status(204).json(updateProduct);//Se actualizó y devuelve el objeto actualizado
  }catch(error){
    console.error("Error encontrado", error);
    res.status(500).json({error: "Error al actualizar el producto"});
  }
} ;

export const deleteProduct = async (req, res) =>{
  //const product = req.body;
  const productId = req.params.id;//Recibe los datos y los parsea
  try{
    const eliminadoProduct = await model.deleteProduct(productId);//LLama al modelo, y abajo chequea si se borró

    if (!eliminadoProduct){
        return res.status(404).json({error: "Producto no encontrado"});
      };
       res.status(204).send();//Acá responde que se borró
  }catch(error){
    console.error("Error encontrado", error);
    res.status(500).json({error: "Error al actualizar el producto"});
  }
};   