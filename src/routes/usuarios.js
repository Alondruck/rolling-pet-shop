import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Usuario from '../models/usuario';

mongoose.connect('mongodb://localhost:27017/petShop');

router.get('/', (req,res,next) => {
    Usuario.find({}, null, (err,data)=>{
        if(err) res.status(500).send(err);
        else res.send(data);
    })
})

router.post('/', (req,res,next) =>{
  console.log(req.body);

  const nuevo = new Usuario({
    username: req.body.username,
    password: req.body.password
  })

  nuevo.save((err,data) => {
    if(err) res.status(500).send(err);
    else res.send(data);
  })
})

router.delete('/',(req,res,next) =>{
    Usuario.deleteOne({_id:req.body.id}, (err,data)=>{
        if(err) res.status(500).send(err);
        else res.send(data);
    })
})

export default router;
