import express, { Router } from 'express';
var router = express.Router();
import Sale from './../models/sale';
import Product from './../models/product';
import mercadopago from 'mercadopago';
import { email } from '../services/service';
import User from './../models/user';
import Profile from '../models/profile';

router.post('/', function (req, res, next) {
    let itemsMP = [];
    let ids = [];
    req.body.products.forEach((item) => {
        ids.push(item.productId);
    });
    Product.find({ _id: ids }, (err, products) => {
        if (err) return res.status(500).send(err);
        if (req.body.products.length !== products.length) return res.send({
            message: "no se encontró el producto seleccionado"
        });
        let flg = false; // se activa cuando quantity supera el stock
        req.body.products.forEach((item, index) => {
            if (parseInt(products[index].stock, 10) >= parseInt(item.quantity, 10)) {
                let productItem = {
                    title: products[index].name,
                    unit_price: products[index].price,
                    quantity: item.quantity
                };
                itemsMP.push(productItem);
                if ((index == req.body.products.length - 1)) {
                    if (!flg) {
                        const newSale = new Sale({
                            products: req.body.products
                        });
                        newSale.save((err, newSale) => {
                            if (err) return res.status(500).send(err);
                            //res.send(newSale);
                            let preference = {
                                items: itemsMP,
                                back_urls: {
                                    success: "http://localhost:3000",
                                    failure: "http://localhost:3000",
                                    pending: "http://localhost:3000"
                                },
                                external_reference: newSale._id.toString()
                            };
                            console.log(preference);
                            mercadopago.preferences.create(preference)
                                .then(function (response) {
                                    // Este valor reemplazará el string "$$init_point$$" en tu HTML
                                    global.init_point = response.body.init_point;
                                    res.send({
                                        url: global.init_point
                                    });
                                }).catch(function (error) {
                                    res.status(500).send(error);
                                });
                        });
                    } else {
                        return res.status(500).send({
                            message: "No hay stock suficiente"
                        });
                    }
                }
            } else {
                flg = true;
                if (index == req.body.products.length - 1) {
                    return res.status(500).send({
                        message: "No hay stock suficiente"
                    });
                }
            }
        });

        //res.send(products);
        /*products.forEach((item, index) => {
            let productStock = parseInt(item.stock, 10);
            let quantity = parseInt(item.quantity, 10);
        });*/
    });
    /*if (err) return res.status(500).send(err);
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
})*/
});

router.put('/:id', (req, res, next) => {
    const mp_id = req.params.id;
    mercadopago.payment.get(mp_id, {}, (err, response) => {
        if (err) res.status(500).send(err);
        console.log("status: " + response.response.status, "id: " + response.response.external_reference);
        let update = { status: response.response.status };
        let saleId = response.response.external_reference;
        Sale.findOneAndUpdate({ _id: saleId }, update, { new: true }, (err, saleUpdated) => {
            if (err) return res.status(500).send(err);
            if (update.status == "approved") {
                let ids = [];
                saleUpdated.products.forEach((item) => {
                    ids.push(item.productId);
                });
                Product.find({ _id: ids }, (err, products) => {
                    if (err) res.status(500).send(err);
                    products.forEach((item, index) => {
                        console.log("productoFind: ", item);
                        console.log("Sale Updated: ", saleUpdated.products[index]);
                        let updateStock = { stock: parseInt(item.stock, 10) - parseInt(saleUpdated.products[index].quantity, 10) }
                        Product.findOneAndUpdate({ _id: item._id }, updateStock, { new: true }, (err) => {
                            if (err) res.status(500).send(err);
                        });
                    });
                    res.send({
                        message: update.status,
                        response: saleUpdated
                    });
                });
            } else {
                res.send({
                    message: "ok",
                    response: saleUpdated
                });
            }
        });

    });

});

router.get('/', (req, res, next) => {
    const newAdmin = new User({
        username: 'admin',
        password: '123456',
    });
    newAdmin.save((err, admin) => {
        if (err) res.status(500).send(err);
        let newAdminProfile = new Profile({
            userId: admin._id,
            name: 'admin',
            lastname: 'admin',
            email: 'hans@admin.com',
            address: 'av. siempre viva 123',
            celphone: 12345,
            isAdmin: true
        });
        newAdminProfile.save((err,profile) => {
            if(err) res.status(500).send(err);
            res.send({
                user: admin,
                profile: profile
            });
        });
    });
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


export default router;