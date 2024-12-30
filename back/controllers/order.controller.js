const OrderModel = require('../models/Order.model');
const ProductModel = require('../models/Product.model')
const nodemailer = require('nodemailer');
const UserModel = require('../models/User.model');


const getOrders = async (req, res) => {
    try {
        let result = await OrderModel.find().populate('products.product').populate('user_id');
        res.send(result);
    } catch (error) {
        res.status(420).send(error);
    }
};

const updateOrder = async (req, res) => {
    let id = req.params.id;
    try {
        let result = await OrderModel.updateOne({ _id: id }, req.body);
        res.send(result);
    } catch (error) {
        res.status(420).send(error);
    }
};

const deleteOrder = async (req, res) => {
    let id = req.params.id;
    try {
        let result = await OrderModel.deleteOne({ _id: id });
        res.send(result);
    } catch (error) {
        res.status(420).send(error);
    }
};

const getOrderById = async (req, res) => {
    let id = req.params.id;
    try {
        let result = await OrderModel.findOne({ _id: id }).populate('products.product').populate('user_id');
        res.send(result);
    } catch (error) {
        res.status(420).send(error);
    }
};

const createOrder = async (req, res) => {
    const { user_id, products, customerName } = req.body;

    try {
        // Validate input
        if (!user_id || !products || !customerName) {
            return res.status(400).json({ message: 'Missing required fields: user_id, products, or customerName' });
        }

        // Calculate total price of incoming products
        let totalIncomingPrice = 0;
        for (const item of products) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.product} not found` });
            }

            // stock check
            if (product.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for product ${product.name}. Available stock: ${product.quantity}, requested quantity: ${item.quantity}`
                });
            }

            // Update total price
            totalIncomingPrice += product.price * item.quantity;

            // update stock
            product.quantity -= item.quantity;
            await product.save();
        }       
            // saving order
           let order = new OrderModel({
                customerName,
                user_id,
                products,
                totalPrice: totalIncomingPrice,
                status: 'Pending',
    })
        
        await order.save();

        res.status(200).json({
            message: 'Products added to order successfully',
            order,
        });
    } catch (error) {
        console.error('Error adding products to order:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const confirmOrder = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const order = await OrderModel.findById(id).populate('user_id'); 
        
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }

       
        order.status = 'Confirmed'; 
        await order.save();

        const user = order.user_id;
        if (!user || !user.email) {
            return res.status(400).send({ message: 'User email not found' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        
        const mailContent = {
            from: 'E-Commerce App <your-email@gmail.com>',
            to: user.email,
            subject: 'Order Confirmation',
            text: `Hello ${order.customerName}, your order has been confirmed.`,
            html: `<p>Hello ${order.customerName},</p>
                   <p>Your order with ID <b>${order._id}</b> has been confirmed.</p>
                   <p>Thank you for shopping with us!</p>`,
        };

        await transporter.sendMail(mailContent);

        res.status(200).send({
            message: 'Order confirmed successfully and email sent',
            order,
        });
    } catch (error) {
        console.error('Error confirming order:', error.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};


module.exports = { createOrder, updateOrder, deleteOrder, getOrders, getOrderById,confirmOrder };
