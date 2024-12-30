import axios from 'axios';

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products');// Backend endpoint
    return response.data;  // return the products data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // throw the error to be handled by the component
  }
};

// Fetch product by id
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/product/${id}`);
    return response.data;  // return product data
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
