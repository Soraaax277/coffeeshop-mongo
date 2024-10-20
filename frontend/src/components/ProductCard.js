import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₱{product.price}</p>

      <p>{product.description}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;