// src/services/order.service.js

import axios from 'axios';

export const createOrder = async (userId, products, customerName, token) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/createOrder',  // Your backend URL
      {
        user_id: userId,
        products: products,
        customerName: customerName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the auth token if needed
        },
      }
    );
    return { success: true, order: response.data.order };
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};
