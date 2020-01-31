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
import { signUp, signIn } from './controllers/controllers';

import router from './routes/turn'


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
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/contact', contactRouter);
app.use('/sales', salesRouter);
app.post('/signup', signUp);
app.post('/signin', signIn);

app.use('/', router)



export default app;
