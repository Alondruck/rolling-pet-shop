import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Profile from '../models/profile';
import { isAuth, isAdmin } from '../middlewares/auth';

mongoose.connect('mongodb://localhost:27017/petShop');

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
});

router.put('/', isAuth, (req, res) => {
  const profileUpdate = req.body;
  Profile.findOneAndUpdate({ userId: req.userId }, profileUpdate, { new: true }, (err, profileUpdated) => {
    if (err) return res.status(500).send(err);
    res.send(profileUpdated);
  });
});

export default router;