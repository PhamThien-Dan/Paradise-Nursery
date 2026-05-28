import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <img src={item.image} alt={item.name} width="100" />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.cost}</p>
              <p>Subtotal: ${item.cost * item.quantity}</p>
            </div>
            
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            
            <button 
              className="action-btn" 
              style={{ backgroundColor: '#f44336' }} 
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions" style={{ marginTop: '20px' }}>
        <button className="action-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button 
          className="action-btn" 
          style={{ marginLeft: '10px' }} 
          onClick={() => alert('Coming Soon!')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
