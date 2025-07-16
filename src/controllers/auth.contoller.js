
import {generateToken}from '../utils/token-generator.js';

const default_user = {//Genera el objeto usuario (usuario real registrado)
    id: 1,
    email: "2118crz@gmail.com",
    password: "strongpass123"
}

export async function login(req, res){//el usuario realiza petición a la ruta de login
    const {email, password} = req.body;//eniando en el body de la petición email y password

    //Aquí se deberían verificar las credenciales del USUARIO
    const user = {id: 1, email};
    if (email === default_user.email && password === default_user.password){
        const token = generateToken(user);//Todo ok ----> creamos el token
        res.json({token});//Devolvemos el token creado en la response
        //A partir de ahora, el usuario tiene cun token válido
    }else{
        res.sendStatus(401).json({Error:"Las credenciales no son válidas"});
    }
}
