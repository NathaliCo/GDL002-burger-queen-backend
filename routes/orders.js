const express = require('express');
const Order = require('../models/Order');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/order', function(req, res) {
    Order.find({})
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                orders
            });
        })
});


app.post('/order', function(req, res) {

    let body = req.body;

    let order = new Order({
        status: 'pending',
        items: body.items,
        stete: true
    })

    order.save((err, orderDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            order: orderDB
        })
    });
});


app.put('/order/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Order.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, orderDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })


});


app.delete('/order/:id', function(req, res) {

    let id = req.params.id;
    // Product.findByIdAndRemove(id, (err, deleteProduct) => {
    let changeState = {
        state: false
    };
    Order.findByIdAndUpdate(id, changeState, { new: true }, (err, deleteOrder) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            order: deleteOrder
        })
    })
});

module.exports = app;