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
        email: req.body.email,
        body: req.body.body
    });
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