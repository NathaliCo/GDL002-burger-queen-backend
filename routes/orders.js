const express = require('express');
const Order = require('../models/Order');

const app = express();


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/order', function(req, res) {
    res.json('Get order');
});


app.post('/order', function(req, res) {

    let body = req.body;

    let order = new Order({
        status: 'pending',
        items: body.items,
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
    order.findByIdAndUpdate(id, (err, usuarioDB) => {

    })

    res.json({
        id
    });
});


app.delete('/order', function(req, res) {
    res.json('Delete order');
});

module.exports = app;