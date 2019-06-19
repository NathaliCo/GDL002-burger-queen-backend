const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The name is required']
    },
    price: {
        type: String,
        required: [true, 'The price is required']
    },
    state: {
        type: Boolean,
        required: true,

    }
});


ProductSchema.plugin(uniqueValidator, { message: '{PATH} need to be unique' })

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', ProductSchema);