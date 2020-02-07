import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Appointment from '../models/appointment';
import { isAuth, isAdmin } from '../middlewares/auth';

router.post('/', isAuth, (req,res) => {
    const appointment = new Appointment ({
        userId: req.userId,
        type: req.body.type,
        date: req.body.date
    })
    appointment.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({
          message: "El turno ha sido guardado correctamente"
        })
      })
})