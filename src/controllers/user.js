import Usuario from '../models/usuario';
import {createToken} from '../services/service';

function singUp(req,res){
    const user = new Usuario({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err) => {
        if(err) res.status(500).send(err);
        return res.status(200).send({token: createToken(user)})
    })
}

function singIn(req,res){
    Usuario.find({username: req.body.username, password: req.body.password}, (err,user) =>{
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({mesagge:"No existe el usuario"});
        req.user = user;
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: createToken(user)
        })
    })
}

export {singUp, singIn};