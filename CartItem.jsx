import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectTotalAmount, 
  removeItem, 
  updateQuantity 
} from '../features/cart/cartSlice';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Amount: ${totalAmount}</h3>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
          <button className="btn-primary" onClick={onContinueShopping}>
            Explore Plants
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price}</p>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => dispatch(removeItem(item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <button className="btn-secondary" onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button className="btn-primary" onClick={() => alert('Checkout functionality coming soon!')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;