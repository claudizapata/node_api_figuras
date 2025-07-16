//Función para la generación de nuevos tokens
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

//Función para generar un token JWT
export const generateToken = (userData) => {//la función recibe la info del usuario
    const user = {id: userData.id, email: userData.email};
    const expiration = {expiresIn: '1h'};//expiresIn define el tiempo de vida del token creado

    return jwt.sign(user, secret_key, expiration);
    //jwt: librería sign:método - las demás son variables - Generamos y rertornamos un nuevo tokenId
}
