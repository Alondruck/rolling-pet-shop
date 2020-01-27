import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import User from '../models/user';
import { isAuth, isAdmin } from '../middlewares/auth';
import config from '../../config';

mongoose.connect(config.mongo_uri);

router.get('/admin', isAuth, isAdmin, (req, res) => {
  User.findOne({}, (err, data) => {
    return res.send({ data: data });
  })
})

router.put('/admin', isAuth, isAdmin, (req, res) => { //Recibe en el body el username viejo y el username y password nuevos
  const username = { username: req.body.username };
  const update = {
    username: req.body.usernameUpdate,
    password: req.body.passwordUpdate
  }
  User.findOneAndUpdate(username, update, { new: true }, (err, userUpdate) => {
    if (err) return res.status(500).send(err);
    res.send(userUpdate);
  })
})

router.delete('/admin', isAuth, isAdmin, (req, res) => { //Recibe en el body el username y lo borra
  const username = { username: req.body.username };
  User.deleteOne(username, (err) => {
    if (err) return res.status(500).send(err);
    else return res.send({
      message: "El usuario se elimino correctamente"
    });
  })
})

export default router;
