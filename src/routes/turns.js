import express from 'express';
var router = express.Router();
import Appointment from './../models/appointment';
import { isAuth, isAdmin } from '../middlewares/auth';
import moment from 'moment';

router.get('/', isAuth, isAdmin, function (req, res, next) {
  let response = {};
  if (req.query.date) {
    Appointment.find({
      date: {
        $gte: new Date(req.query.date),
        $lt: new Date(new Date(req.query.date).setHours(44, 59, 59))
      }
    }, null, (err, list) => {
      if (err) res.status(500).send(err);
      response = {
        result: list,
        total: list.length
      }
      res.send(response);
    }).sort({ date: 'desc' });
  } else {
    Appointment.find({
      date: {
        $gte: moment().subtract(15, 'days')
      }
    }, null, (err, list) => {
      if (err) res.status(500).send(err);
      response = {
        result: list,
        total: list.length,
      };
      res.send(response);
    }).sort({ date: 'desc' });
  }
});

router.post('/', isAuth, (req, res) => {
  const newDate = new Appointment({
    petName: req.body.petName,
    ownerName: req.body.ownerName,
    description: req.body.description,
    date: req.body.date
  });
  newDate.save((err, newDate) => {
    if (err) res.status(500).send(err);
    res.send(newDate);
  });
});

export default router;