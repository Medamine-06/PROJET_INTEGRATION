const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    customerName: { type: String, required: true }, 
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true } 
        }
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number}, 
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }

})


module.exports = mongoose.model('Order', orderSchema);
