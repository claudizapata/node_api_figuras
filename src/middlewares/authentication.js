//MIDDLEWARE ENCARGADO DE VALIDAR EN TOKEN
//Este middleware intercepta las peticiones antes de que lleguen a los controladores
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;
//Middleware para verificar el token jwt
export const autenticacion = (req, res, next) => {
    //Leemos el token recibido en el header de authorization- y separa la cadena de texto con "".
    const token = req.headers['authorization'].split("")[1];//Toma el valor del token en la posición [1]donde se encuentra el código en Base64

    if (!token) return res.sendStatus(401).json({Error:"No autorizado, credenciales incorrectas"});

    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403).json({Error:"Prohibido, no tiene permisos para acceder al recurso"});
        next();
    }) ;
};

const admin_key = process.env.JWT_SECRET_KEY;
//Middleware para verificar el token jwt
export const admAutentic = (req, res, next) => {
    //Leemos el token recibido en el header de authorization- y separa la cadena de texto con "".
    const token = req.headers['authorization'].split("")[1];//Toma el valor del token en la posición [1]donde se encuentra el código en Base64

    if (!token) return res.sendStatus(401).json({Error:"No autorizado, credenciales incorrectas"});

    jwt.verify(token, admin_key, (err) => {
        if (err) return res.sendStatus(403).json({Error:"Prohibido, no tiene permisos para acceder al recurso"});
        next();
    }) ;
};