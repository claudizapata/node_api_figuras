//EXPRESS ROUTER (ES UN MIDDLEWARE)
import "dotenv/config";
import express from 'express';
import cors from "cors";
//import bodyParser from "body-parser";

//Comillas dobles en la clave es un JSON (es un archivo de texto)
//Sin comillas dobles en la clave es un objeto de JS
//El MODELO es el que maneja los DATOS
const app = express();

//Uso de next
/* app.use((req, res, next) =>{
  res.json({message: "En mantenimiento"});
}); */
app.use(cors());
app.use(express.json());//siempre antes de todas las rutas, necesario para hacer un POST
                        //para obtener los datos cuando vienen 
app.get("/", (req, res) =>{//esta RUTA no se toma porque es general, NO es de PRODUCTOS
    //res.send("API Rest en Node.js");
    res.json({message: "API Rest en Node.js"});//el json sale con el mensaje formateado 
});


import productsRouter from './src/routes/products.router.js';//Le indico donde están las rutas
app.use("/api",productsRouter);//Cuando venga la petición va a buscar en /api/products
//import productsV1Router from './src/routes/products.router.js';Le indico donde están las rutas
//app.use("/api/v1",productsV1Router);Por si tengo una versión posterior de la api
 


//==========AGREGAMOS EL ROUTER DE AUTENTICACIÓN============
import authRouter from './src/routes/auth.routes.js';
import { autenticacion } from "./src/middlewares/authentication.js";
import { getAllProducts } from "./src/models/products.model.js";
import { crearNuevoProduct } from "./src/controllers/products.controller.js";
//import bodyParser from "body-parser";
//app.use(bodyParser.json());//bodyParser.json(): middleware global que permite leer el body de las peticiones

const router = express.Router();
//Agrego protección a las Routes
router.get('/products', autenticacion, getAllProducts);
app.use('/auth', authRouter);
app.use('/api', router);
router.post('/products', crearNuevoProduct);

//protejo todas las rutas que permiten acceder a los endpoints
//==========================================================




//ERROR HANDLE (404)
//Para mandar un error desde el Middleware, lo anterior fueron errores lanzados por mi HTML controlados x Express
app.use((req, res, next) =>{
  res.status(404).json({error: "Not Found"});
});

//Defino el puerto que recibirá las peticiones
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//000000000000000000000000000000000000000000000000000000000000000000000000000000
/* app.get('/users/:id', (req, res) => {
      const userId = req.params.id; // Get the ID from the URL parameters
      // In a real application, you would query a database here
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
      const foundUser = users.find(item => item.id == userId); // Find the user with the matching ID
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).send('User not found');
      }
    }); */
//0000000000000000000000000000000000000000000000000000000000000000000000000000000
