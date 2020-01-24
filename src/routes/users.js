import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Profile from '../models/profile';
import { isAuth, isAdmin } from '../middlewares/auth';
import User from './../models/user';

mongoose.connect('mongodb://localhost:27017/petShop');

/*router.get('/admin', isAuth, isAdmin, (req, res) => {
  User.find({}, (err, data) => {
    if(err) return res.status(500).send({ message: err });
    return res.send({ data: data });
  })
});*/

router.get('/admin', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
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
