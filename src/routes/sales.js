import express, { Router } from 'express';
var router = express.Router();
import Sale from './../models/sale';
import Product from './../models/product';

router.post('/', function (req, res, next) {
    const products = req.body.products;
    products.forEach((item, index) => {
        Product.findOne({ _id: item.productId }, (err, product) => {
            if (err) return res.status(500).send(err);
            let update = { stock: parseInt(product.stock, 10) - parseInt(item.quantity, 10) }
            Product.findOneAndUpdate({ _id: product._id }, update, { new: true }, (err, productUpdated) => {
                if (err) return res.status(500).send(err);
                console.log("producto actualizado " + index + ": " + productUpdated);
            });
        })
    });
    res.send(req.body.products);
    /*const newSale = new Sale({
        products: [{
            productId: "testId1234",
            quantity: 4
        }, {
            productId: "testId1235",
            quantity: 2
        }
        ]
    });*/
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