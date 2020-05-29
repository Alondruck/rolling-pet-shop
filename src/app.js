import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'

// conectar mongo
mongoose.connect('mongodb://localhost/petShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

import indexRouter from './routes/index';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import profilesRouter from './routes/profiles';
import contactRouter from './routes/contact';
import salesRouter from './routes/sales';
import turnsRouter from './routes/turns';
import { signUp, signIn } from './controllers/controllers';
import mongoose from 'mongoose';
import config from './../config';

<<<<<<< HEAD
import router from './routes/turn'

=======
mongoose.connect(config.mongo_uri);

import mercadopago from 'mercadopago';
>>>>>>> fc6f733d931d088973207d15d683a82fc479cf0d

const app = express();

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-607815359835968-020315-75592987f5bb7b97e60df865e77c0cdd-187664559'
});

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
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/contact', contactRouter);
app.use('/sales', salesRouter);
app.use('/turns', turnsRouter);
app.post('/signup', signUp);
app.post('/signin', signIn);

app.use('/', router)


export default app;
