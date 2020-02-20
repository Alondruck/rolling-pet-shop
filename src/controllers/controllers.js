import User from '../models/user';
import Profile from '../models/profile';
import { createToken } from '../services/service';

function signUp(req, res) {
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) return res.status(500).send({ message: err });
        if (data) return res.send({ message: "Ya existe ese nombre de usuario" });
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        user.save((err) => { //Se guarda a traves de models/mongoose
            if (err) return res.status(500).send(err);
            return res.status(200).send({
                message: "El usuario ha sido creado correctamente",
                token: createToken(user)
            })
        })
    });
}

function signIn(req, res) {
    let isAdmin = false;
    User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user) return res.status(404).send({ mesagge: "Usuario o contraseña incorrecta" });
        Profile.findOne({ userId: user._id }, (err, profile) => {
            if (err) return res.status(500).send(err);
            if (profile.isAdmin == true) { isAdmin = true }
        });
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: createToken(user, isAdmin)
        })
    })
}

export { signUp, signIn };