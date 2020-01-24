import express, { Router } from 'express';
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('achieve');
});

export default router;