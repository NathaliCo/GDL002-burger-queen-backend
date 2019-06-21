const express = require('express');
const Product = require('../models/Product');
const app = express();

const bodyParser = require('body-parser');
const {
    requireAuth,
    requireAdmin,
    isAdmin,
} = require('../middleware/auth');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/products', requireAuth, (req, res) => {

    Product.find({ state: true })
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

app.get('/products/:id', requireAuth, (req, resp) => {
    Product.find({ _id: req.params.id })
        .then(data => resp.json(data))
});
app.post('/products', requireAdmin, (req, res) => {

    let body = req.body;

    let product = new Product({
        name: body.name,
        price: body.price,
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


app.put('/product/:id', requireAdmin, (req, res) => {

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



app.delete('/product/:id', requireAdmin, (req, res) => {

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


// getProducts = (item) => {
//     Product.find({ name: item })
//         .exec((err, products) => {
//             if (err) {
//                 return ({
//                     ok: false,
//                     err
//                 });
//             }

//             return products
//         })
// }

function getProducts(items) {

    Product.findById(items, 'name price', function(err, prod) {

        console.log(prod)
        if (err) {
            //console.log(err);
        };
        //console.log(data);
        // console.log(data.key);


    });
    // Product.find({ _id: items }, function(err, data) {
    //     console.log(Product);
    //     if (err) {
    //         //console.log(err);
    //     };
    //     console.log(data);
    //     // console.log(data.key);
    // });
}

module.exports = app;
//module.exports = getProducts;