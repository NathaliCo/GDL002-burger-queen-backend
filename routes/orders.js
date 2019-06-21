const express = require('express');
const Order = require('../models/Order');
const getProducts = require('./products');
const Product = require('../models/Product');
//var Product = mongoose.model('Product', userSchema);
const app = express();

const bodyParser = require('body-parser');
const {
    requireAuth,
    requireAdmin,
    isAdmin,
} = require('../middleware/auth');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/orders', requireAuth, (req, res) => {
    Order.find({ state: true })
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

app.get('/orders/:id', requireAuth, (req, resp) => {
    Product.find({ _id: req.params.id })
        .then(data => resp.json(data))
});

app.post('/orders', requireAdmin, (req, res) => {

    let body = req.body;

    let order = new Order({
        items: body.items,
        createdBy: req.user._id
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


app.put('/orders/:id', requireAdmin, (req, res) => {

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


app.delete('/orders/:id', requireAdmin, (req, res) => {

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