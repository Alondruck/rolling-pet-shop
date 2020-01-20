import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Usuario from '../models/usuario';
import Profile from '../models/profile';
import { signUp, signIn } from '../controllers/user';
import { isAuth, isAdmin } from '../middlewares/auth';

mongoose.connect('mongodb://localhost:27017/petShop');

router.post('/signup', signUp);
router.post('/signin', signIn);

router.get('/admin/usuarios', isAuth, isAdmin, (req, res) => {
  Usuario.find({}, (err, data) => {
    return res.send({ data: data });
  })
});

router.post('/signup/profile', isAuth, (req, res) => {
  const profile = new Profile({
    userId: req.userId,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    celphone: req.body.celphone
  })
  profile.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({
      message: "El perfil del usuario ha sido creado correctamente",
    })
  })
});


// router.get('/signin', isAuth, (req, res) => {
//   console.log("id: ",req.userId);

//   return res.send({id: req.userId});
// });

// router.get('/', (req, res, next) => {
//   Usuario.find({}, null, (err, data) => {
//     if (err) res.status(500).send(err);
//     else res.send(data);
//   })
// })

// router.post('/', (req, res, next) => {
//   console.log(req.body);

//   const nuevo = new Usuario({
//     username: req.body.username,
//     password: req.body.password
//   })

//   nuevo.save((err, data) => {
//     if (err) res.status(500).send(err);
//     else res.send(data);
//   })
// })

// router.delete('/', (req, res, next) => {
//   Usuario.deleteOne({ _id: req.body.id }, (err, data) => {
//     if (err) res.status(500).send(err);
//     else res.send(data);
//   })
// })

export default router;
