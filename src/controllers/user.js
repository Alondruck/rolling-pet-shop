import Usuario from '../models/usuario';
import { createToken } from '../services/service';

function signUp(req, res) {

    Usuario.findOne({username: req.body.username}, (err,data)=>{
        if (err) return res.status(500).send({ message: err });
        if (data) return res.send("Ya existe ese nombre de usuario");
        const user = new Usuario({
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
    Usuario.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user) return res.status(404).send({ mesagge: "Usuario o contraseña incorrecta"});
        // if(user === "admin") req.admin = user;
        // else req.user = user;
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: createToken(user)
        })
    })
}

export { signUp, signIn };