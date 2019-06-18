const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// const Product = require('./Product');

let statusTrue = {
    values: ['pending', 'preparing', 'delivering', 'delivered'],
    message: '{VALUE} no es un rol válido'
}
const OrderSchema = new mongoose.Schema({
    status: {
        type: statusTrue,
        required: [true, 'The status is required']
    },

    items: {
        //con un array
        required: [true, 'The item is required'],
        type: Array,

    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);