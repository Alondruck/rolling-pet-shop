import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Profile from '../models/profile';
import { isAuth, isAdmin } from '../middlewares/auth';

router.post('/signup', isAuth, (req, res) => {
  const profile = new Profile({
    userId: req.userId,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    celphone: req.body.celphone
  });
  profile.save((err, newProfile) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({
      message: "El perfil del usuario ha sido creado correctamente",
      profile: newProfile
    })
  })
});

router.get('/', isAuth, (req, res) => {
  Profile.findOne({ userId: req.userId }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ mesagge: "No existe el usuario" });
    res.send(user);
  })
})

router.put('/', isAuth, (req,res) => {
  const userId = req.userId;
  const update = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    celphone: req.body.celphone
  }

  Profile.findOneAndUpdate(userId, update, (err,profileUpdate) => {
    if (err) return res.status(500).send({ message: err });
    else return res.send(profileUpdate);
  })
})

router.delete('/', isAuth, isAdmin, (req,res) => {
  const username = { username: req.body.username };
  User.deleteOne(username, (err) => {
    if (err) return res.status(500).send(err);
    else return res.send({
      message: "El usuario se elimino correctamente"
    });
  })
})
export default router;