import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const categoryName = product.category ? product.category.name : 'No Category';

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price} TND</p>
        <p>{categoryName}</p>
        <button className='product-button' onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;