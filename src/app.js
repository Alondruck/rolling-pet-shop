import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { isAuth } from './middlewares/auth';
import { singUp, singIn } from './controllers/user';


import indexRouter from './routes/index';
import usuariosRouter from './routes/usuarios';

//import privateRouter from './routes/private';

const app = express();


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.post('/singup', singUp);
app.post('/singin', singIn);
app.get('/private', isAuth ,(req,res)=>{
    res.status(200).send({message: "Tienes acceso"});
});

export default app;
