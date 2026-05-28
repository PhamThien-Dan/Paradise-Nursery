import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", cost: 15, image: "https://via.placeholder.com/150" },
      { name: "Spider Plant", cost: 12, image: "https://via.placeholder.com/150" },
      // Note: Add 4 more plants here to meet the "6 per category" rubric requirement
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Aloe Vera", cost: 10, image: "https://via.placeholder.com/150" },
      { name: "Echeveria", cost: 8, image: "https://via.placeholder.com/150" },
      // Note: Add 4 more plants here
    ]
  },
  {
    category: "Flowering",
    plants: [
      { name: "Peace Lily", cost: 20, image: "https://via.placeholder.com/150" },
      { name: "Orchid", cost: 25, image: "https://via.placeholder.com/150" },
      // Note: Add 4 more plants here
    ]
  }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Calculate total items for the cart icon
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Check if plant is already in cart to disable button
  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="nav-logo">Paradise Nursery</div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartItems})
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      {!showCart ? (
        <div className="product-list">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plants-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="plant-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
                    <img src={plant.image} alt={plant.name} width="150" />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button 
                      className="action-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                      style={{ backgroundColor: isAddedToCart(plant.name) ? 'grey' : '#4CAF50' }}
                    >
                      {isAddedToCart(plant.name) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;
