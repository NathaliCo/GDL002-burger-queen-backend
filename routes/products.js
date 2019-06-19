const express = require('express');
const Product = require('../models/product');

const app = express();


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/product', function(req, res) {
    Product.find({})
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });
        })
});


app.post('/product', function(req, res) {

    let body = req.body;

    let product = new Product({
        name: body.name,
        price: body.price,
        status: true
    })

    product.save((err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productDB
        })
    });
});


app.put('/product/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Product.findByIdAndUpdate(id, body, { new: true }, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            product: productDB
        });
    })


});



app.delete('/product/:id', function(req, res) {

    let id = req.params.id;
    // Product.findByIdAndRemove(id, (err, deleteProduct) => {
    let changeState = {
        state: false
    };
    Product.findByIdAndUpdate(id, changeState, { new: true }, (err, deleteProduct) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            product: deleteProduct
        })
    })
});

module.exports = app;