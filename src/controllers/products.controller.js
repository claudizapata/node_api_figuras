//EL CONTROLADOR va a tomar datos, y los va a devolver
//Son los que gestionan las solicitudes HTTP y responden la petición 
//LAS VALIDACIONES SE HACEN EN EL FRON O ACÁ EN EL CONTROLADOR

//0000 En el CONTROLADOR tengo que llamar al SERVICIO para que me dé los datos  0000
import * as model from '../models/products.model.js';

export const getAllProducts = async (req, res) => {
    res.json(await model.getAllProducts());//Se usaría service. si la funcion en este módulo se llamase...
    //...igual a la función en el servicio
};

export const getSearchProduct = (req,res) =>{
   /*  console.log(req.query);
    res.json(products); */
    const {name} = req.query;

    const products = model.getAllProducts();

    const filtrados = products.filter((item) => 
        item.name.toLowerCase().includes(name.toLowerCase())
);
res.json(filtrados);
};

export const getSearchByIdCategoria = async (req, res) =>{
    const {id, category} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const products = model.getAllProducts();
    const product = products.find((item) => item.id == id && item.category == category);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.status(201).json(product);
};

export const getSearchById = async (req, res) =>{
    const {id} = req.params;//capturo el id y la categoria ingresados en la URL x el usuario
    const products = model.getAllProducts();
    const product = products.find((item) => item.id == id);
    if (!product){
        res.status(404).json({error: "No existe el producto"});
        };
    res.status(201).json(product);
};

export const crearNuevoProduct = (req, res) =>{
  const {name, descrip, price, category } = req.body;//lo sacamos del request / voy a recibir un cuerpo en la petición, siempre que tenga un Middleware
  //con esa información voy a hacer, en este caso, uh objeto nuevo
  //const products = model.getAllProductos();
  const newProduct =  model.createProduct({name, descrip, price, category});//Llamo al modelo y le paso los datos 
  //Con un try catch en newProduct capturamos un error al guardar el producto en la BD
  res.status(201).json(newProduct);
};


export const reemplazaProduct= (req, res) =>{
  const productId = parseInt(req.params.id, 10);//base 10, puede ser octal o binario, etc
  const product = req.body;

  const updateProduct = model.changeProduct(productId, product);

  if (!updateProduct){
    return res.status(404).json({error:"Producto no encontrado"});
  };

  res.status(204).json(updateProduct);  
  
} ;

export const deleteProduct = (req, res) =>{
  const productId = parseInt(req.params.id,10);//Recibe los datos y los parsea

  const product = model.deleteProduct(productId);//LLama al modelo, y abajo chequea si se borró

   if (!product){
      return res.status(404).json({error: "Producto no encontrado"});
    };
  
  res.status(204).send();//Acá responde que se borró
};   