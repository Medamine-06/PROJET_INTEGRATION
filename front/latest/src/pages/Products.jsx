import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/product.service'; // import the service
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
/* import PromotionCard from '../components/PromotionCard';
import promoimage from '../assets/promo-image.jpg' */





const Home = ({addToCart}) => {
  const [products, setProducts] = useState([]); // state to hold product data
  const [loading, setLoading] = useState(true); // loading state to show a loading indicator

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts(); // call the service
        setProducts(fetchedProducts); // update the state with fetched products
        setPromotions(fetchedProducts.filter((p) => p.discount > 0)); // filter discounted products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // set loading to false after the request completes
      }
    };

    fetchProducts();
  }, []); // empty dependency array so it runs once when the component mounts
  return (
    <div className="home">
     
      {/* Product Section */}

      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
