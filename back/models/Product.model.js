const mongoose = require('mongoose');
const Category = require('../models/Category.model');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, },
    quantity: { type: Number },
    image: { type: String }, //****** */
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }
});

module.exports = mongoose.model('Product', productSchema);
