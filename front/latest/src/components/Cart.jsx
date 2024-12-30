import React, { useState } from 'react';
import { createOrder } from '../services/order.service';
import '../styles/cart.css'
const Cart = ({ cart, removeFromCart, userId, authToken }) => {
  const [orderStatus, setOrderStatus] = useState(null); // state to show order status

  // Function to handle the order creation
  const handleCreateOrder = async () => {
    const email = localStorage.getItem('email'); // Assuming email is stored in localStorage
    const customerName = email.split('@')[0]; // Extract the name part from the email
    const products = cart.map(item => ({
      product: item._id, // Assuming each cart item has a _id for the product
      quantity: item.quantity,
    }));

    // Call the createOrder service
    const { success, order, message } = await createOrder(userId, products, customerName, authToken);

    if (success) {
      setOrderStatus(`Order created successfully. Order ID: ${order._id}`);
    } else {
      setOrderStatus(`Failed to create order: ${message}`);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <div>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <strong>{item.name}</strong>
                <span>{item.price} TND</span>
              </div>
              <button className="product-button" onClick={() => removeFromCart(item)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Create Order Button */}
      <div className="create-order-button">
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>

      {orderStatus && <p>{orderStatus}</p>}
    </div>
  );
};

export default Cart;
