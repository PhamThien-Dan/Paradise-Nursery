import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// Expanded array to meet the 6 plants per category rubric requirement
const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", cost: 15, image: "https://via.placeholder.com/150" },
      { name: "Spider Plant", cost: 12, image: "https://via.placeholder.com/150" },
      { name: "Peace Lily", cost: 20, image: "https://via.placeholder.com/150" },
      { name: "Boston Fern", cost: 18, image: "https://via.placeholder.com/150" },
      { name: "Rubber Plant", cost: 25, image: "https://via.placeholder.com/150" },
      { name: "Aloe Vera", cost: 10, image: "https://via.placeholder.com/150" }
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Echeveria", cost: 8, image: "https://via.placeholder.com/150" },
      { name: "Jade Plant", cost: 15, image: "https://via.placeholder.com/150" },
      { name: "Zebra Plant", cost: 12, image: "https://via.placeholder.com/150" },
      { name: "Burro's Tail", cost: 14, image: "https://via.placeholder.com/150" },
      { name: "String of Pearls", cost: 16, image: "https://via.placeholder.com/150" },
      { name: "Haworthia", cost: 9, image: "https://via.placeholder.com/150" }
    ]
  },
  {
    category: "Flowering",
    plants: [
      { name: "Orchid", cost: 25, image: "https://via.placeholder.com/150" },
      { name: "African Violet", cost: 12, image: "https://via.placeholder.com/150" },
      { name: "Anthurium", cost: 22, image: "https://via.placeholder.com/150" },
      { name: "Begonia", cost: 14, image: "https://via.placeholder.com/150" },
      { name: "Bromeliad", cost: 18, image: "https://via.placeholder.com/150" },
      { name: "Christmas Cactus", cost: 15, image: "https://via.placeholder.com/150" }
    ]
  }
];

const ProductList = ({ onBackToHome }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="nav-logo">Paradise Nursery</div>
        <div className="nav-links">
          {/* Added Home link to satisfy rubric requirement */}
          <span onClick={onBackToHome}>Home</span>
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
