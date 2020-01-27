import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';
import Product from './../models/product';
import { isAuth, isAdmin } from '../middlewares/auth';
import config from '../../config';

mongoose.connect(config.mongo_uri);

router.get('/', function (req, res, next) {
    if (req.query.page && req.query.quantity) {
        let page = parseInt(req.query.page, 10);
        let quantity = parseInt(req.query.quantity, 10);
        Product.find({}, null, { skip: quantity * (page - 1), limit: quantity }, (err, products) => {
            if (err) return res.status(500).send(err);
            Product.estimatedDocumentCount((err, count) => {
                if (err) return res.status(500).send(err);
                let totalPages = Math.ceil(count / quantity);
                let response = {
                    result: products,
                    currentPage: page,
                    totalPages: totalPages,
                    total: count,
                    quantity: quantity
                }
                res.send(response);
            });
        });
    } else {
        Product.find({}, { name: 'asc' }, { skip: 0, limit: 10 }, (err, products) => {
            if (err) return res.status(500).send(err);
            res.send(products);
        }).sort({ name: 'asc' });
    }
});

router.post('/new', function (req, res, next) { //is auth, is admin
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    });
    newProduct.save((err, newProduct) => {
        if (err) return res.status(500).send(err);
        res.send(newProduct);
    });
});

router.put('/', isAuth, isAdmin, function (req, res, next) {
    const query = { _id: req.query.id };
    const update = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }
    Product.findOneAndUpdate(query, update, { new: true }, (err, productUpdated) => {
        if (err) return res.status(500).send(err);
        res.send(productUpdated);
    });
});

router.delete('/', isAuth, isAdmin, function (req, res, next) {
    const query = { _id: req.query.id };
    Product.deleteOne(query, (err) => {
        if (err) return res.status(500).send(err);
    });
});

export default router;