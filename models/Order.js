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
        default: 'pending',
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
    state: {
        type: Boolean,
        default: true
    }
});

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);