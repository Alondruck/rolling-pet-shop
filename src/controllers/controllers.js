import User from '../models/user';
import { createToken } from '../services/service';

function signUp(req, res) {

    User.findOne({username: req.body.username}, (err,data)=>{
        if (err) return res.status(500).send({ message: err });
        if (data) return res.send({message: "Ya existe ese nombre de usuario"});
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

function signUpAdmin (req,res) {
    const user = new User({
        username: 'admin',
        password: '1234'
    })
    user.save((err, data) => { //Se guarda a traves de models/mongoose
        if (err) return res.status(500).send(err);
        return res.status(200).send({
            message: "El usuario ha sido creado correctamente",
            id: data._id
        })
    })
}

function signIn(req, res) {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user) return res.status(404).send({ mesagge: "Usuario o contraseña incorrecta"});
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: createToken(user)
        })
    })
}

export { signUp, signIn, signUpAdmin };