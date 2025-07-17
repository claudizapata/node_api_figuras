
import express from 'express';
import {login} from '../controllers/auth.contoller.js';
import { admLogin } from '../controllers/auth.contoller.js';

const router = express.Router();
router.post('/login', login);///Aquí atendemos el endpoint /login, mediante el método POST
router.post ('/login', admLogin);

export default router;



