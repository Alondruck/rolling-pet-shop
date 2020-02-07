import express, { Router } from 'express';
var router = express.Router();
import Sale from './../models/sale';
import Product from './../models/product';
import mercadopago from 'mercadopago';

router.post('/', function (req, res, next) {
    const productsReq = req.body.products;
    let items = [];
    let productItem = {};
    productsReq.forEach((item, index) => {
        Product.findOne({ _id: item.productId }, (err, product) => {
            if (err) return res.status(500).send(err);
            let productStock = parseInt(product.stock, 10);
            let quantity = parseInt(item.quantity, 10);
            if (productStock >= quantity) {
                productItem = {
                    title: product.eventNames,
                    unit_price: product.price,
                    quantity: quantity
                };
                items.push(productItem);
                let update = { stock: productStock - quantity }
                Product.findOneAndUpdate({ _id: product._id }, update, { new: true }, (err, productUpdated) => {
                    if (err) return res.status(500).send(err);
                    if (index == req.body.products.length - 1) {
                        const newSale = new Sale({
                            products: req.body.products
                        });
                        newSale.save((err, newSale) => {
                            if (err) return res.status(500).send(err);
                            //res.send(newSale);
                        });
                        // Crea un objeto de preferencia
                        let preference = {
                            items: items
                        };
                        mercadopago.preferences.create(preference)
                            .then(function (response) {
                                // Este valor reemplazará el string "$$init_point$$" en tu HTML
                                global.init_point = response.body.init_point;
                                res.send(global.init_point);
                            }).catch(function (error) {
                                console.log(error);
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

    // Crea un objeto de preferencia
    /*let preference = {
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    };*/

    /*{
        "products": [
            {
                "productId": "5e25f4248253b346ecdb6ee7",
                "quantity": 4
            },
            {
                "productId": "5e260cd32c1e8246c4755027",
                "quantity": 2
            }
        ]
    }*/

});

export default router;