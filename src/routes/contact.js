import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Contact from './../models/contact';
import { isAuth, isAdmin } from '../middlewares/auth';

mongoose.connect('mongodb://localhost:27017/petShop', { useNewUrlParser: true });

router.get('/', isAuth, isAdmin, function (req, res, next) {
    Contact.find((err, messages) => {
        if (err) return res.status(500).send(err);
        res.send(messages);
    })
});

router.post('/', function (req, res, next) {
    const newMessage = new Contact({
        userId: req.body.userId,
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        species: req.body.species,
        race: req.body.race,
        sex: req.body.sex,
        petName: req.body.petName,
        message: req.body.message,
        email: req.body.email
    });
    console.log(newMessage);
    newMessage.save((err, newMessage) => {
        if (err) return res.status(500).send(err);
        res.send(newMessage);
    });
});

router.put('/', isAuth, isAdmin, (req, res, next) => {
    if (req.query.id) {
        let id = req.query.id;
        const update = { isChecked: true };
        Contact.findOneAndUpdate({ _id: id }, update, (err, contact) => {
            if (err) return res.status(500).send(err);
            res.send({
                message: "ok",
                contact: contact
            });
        });
    } else {
        res.status(404).send({
            message: "id no definido"
        });
    }

});

export default router;