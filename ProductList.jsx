// ProductList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './cartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Separate PlantCard component for improved modularity and maintainability
const PlantCard = ({ plant, isAdded, onAddToCart }) => (
  <div className="product-card">
    <img src={plant.image} alt={plant.name} className="product-image" />
    <h3 className="product-title">{plant.name}</h3>
    <p className="product-price">${plant.cost}</p>
    <p className="product-description">{plant.description}</p>
    <button
      className="product-button"
      disabled={isAdded}
      onClick={() => onAddToCart(plant)}
    >
      {isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  </div>
);

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total number of items in cart dynamically for badge display
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: 15, description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12, description: "Filters formaldehyde and xylene." },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: 18, description: "Removes mold spores from the air." },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", cost: 14, description: "Restores moisture naturally." },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: 20, description: "Easy to grow indoor plant." },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/36/aloe-vera-3284568_1280.jpg", cost: 10, description: "Medicinal and air purifying." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <h2 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 <span className="cart-count">{totalCartQuantity}</span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => {
                  const isAdded = cartItems.some((item) => item.name === plant.name);
                  return (
                    <PlantCard
                      key={pIndex}
                      plant={plant}
                      isAdded={isAdded}
                      onAddToCart={handleAddToCart}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;