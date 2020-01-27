import express, { Router } from 'express';
var router = express.Router();
import Sale from './../models/sale';
import Product from './../models/product';

router.post('/', function (req, res, next) {
    const productsReq = req.body.products;
    productsReq.forEach((item, index) => {
        Product.findOne({ _id: item.productId }, (err, product) => {
            if (err) return res.status(500).send(err);
            let productStock = parseInt(product.stock, 10);
            let quantity = parseInt(item.quantity, 10);
            if (productStock >= quantity) {
                let update = { stock: productStock - quantity }
                Product.findOneAndUpdate({ _id: product._id }, update, { new: true }, (err, productUpdated) => {
                    if (err) return res.status(500).send(err);
                    if (index == req.body.products.length - 1) {
                        const newSale = new Sale({
                            products: req.body.products
                        });
                        console.log("nueva venta: " + newSale);
                        newSale.save((err, newSale) => {
                            if (err) return res.status(500).send(err);
                            res.send(newSale);
                        });
                    }
                });
            } else {
                return res.status(404).send({
                    message: "No hay stock suficiente"
                });
            }
        })
    });

    /*{
        "products": [
            {
                "_id": "5e2b48cf806533331c28cce6",
                "productId": "testId1234",
                "quantity": 4
            },
            {
                "_id": "5e2b48cf806533331c28cce5",
                "productId": "testId1235",
                "quantity": 2
            }
        ]
    }*/

});

export default router;