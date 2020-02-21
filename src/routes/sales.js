import express from 'express';
var router = express.Router();
import Sale from './../models/sale';
import Product from './../models/product';
import mercadopago from 'mercadopago';
import { isAuth, isAdmin } from './../middlewares/auth';
import transporter from './../middlewares/server';
import Profile from './../models/profile';

router.post('/', isAuth, function (req, res, next) {
    let itemsMP = [];
    let ids = [];
    req.body.products.forEach((item) => {
        ids.push(item.productId);
    });
    Profile.findOne({ userId: req.userId }, (err, profile) => {
        if (err) return res.status(500).send(err);
        Product.find({ _id: ids }, (err, products) => {
            if (err) return res.status(500).send(err);
            if (req.body.products.length !== products.length) return res.send({
                message: "no se encontró el producto seleccionado"
            });
            let flg = false; // se activa cuando quantity supera el stock
            req.body.products.forEach((item, index) => {
                if (parseInt(products[index].stock, 10) >= parseInt(item.quantity, 10)) {

                    //arreglo de productos para MP
                    let productItem = {
                        title: products[index].name,
                        unit_price: products[index].price,
                        quantity: item.quantity
                    };
                    itemsMP.push(productItem);
                    
                    //Una vez que llega al último
                    if ((index == req.body.products.length - 1)) {
                        //Algún producto estaba sin stock?
                        if (!flg) {
                            const newSale = new Sale({
                                products: req.body.products,
                                email: profile.email
                            });
                            newSale.save((err, newSale) => {
                                if (err) return res.status(500).send(err);
                                
                                //Preferencia de MP
                                let preference = {
                                    items: itemsMP,
                                    back_urls: {
                                        success: "http://localhost:3000/compra/success",
                                        failure: "http://localhost:3000/compra/failure",
                                        pending: "http://localhost:3000/compra/failure"
                                    },
                                    external_reference: newSale._id.toString()
                                };
                                
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

        });
    });


});

router.put('/:id', (req, res, next) => {
    const mp_id = req.params.id;
    //consulta en la base de datos de MP
    mercadopago.payment.get(mp_id, {}, (err, response) => {
        if (err) res.status(500).send(err);
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
            let mailOptions = {
                from: 'rolling-pet-shop@rc.com',
                to: saleUpdated.email,
                subject: 'COMPRA ROLLING PET SHOP',
                text: 'Señor usuario de Rolling Pet Shop, queríamos informar que el estado de su compra realizada el ' + saleUpdated.date + ' es ' + saleUpdated.status + '. Gracias por confiar en nosotros.'
            }
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) { console.log(err) } else { console.log('success!') }
            });
        });

    });

});

router.get('/', isAuth, isAdmin, (req, res, next) => {
    Sale.find({}, (err, sales) => {
        if (err) return res.status(500).send(err);
        res.send(sales);
    });
});


export default router;