import React, { useCallback, useEffect, useState } from "react";
import emptyCartImage from '../assets/cart_is_empty.png';
import "../styles/cart.css";
import Chat from "./chat.js";


const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [acceptedPrice, setAcceptedPrice] = useState(0);
  const [negotiationCompleted, setNegotiationCompleted] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // State to manage order placed popup

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const handlePriceAccept = (price) => {
    setPrice(price);
    setAcceptedPrice(price);
    setNegotiationCompleted(true);
  };

  const handlePrice = useCallback(() => {
    let ans = 0;
    cart.forEach((item) => {
      ans += item.amount * item.price;
    });
    setPrice(ans);
  }, [cart]);

  useEffect(() => {
    handlePrice();
  }, [cart, handlePrice]);

  const handleNegotiate = () => {
    setIsChatboxOpen(true);
  };

  const handleBuy = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckout = () => {
    setCart([]);
    setShowCheckoutForm(false);
    setPrice(0);
    setNegotiationCompleted(false);
    setOrderPlaced(true); // Display order placed popup
    // Hide the popup after 5 seconds
  };

  return (
    <article>
      {cart.length === 0 ? (
        <div className="empty-cart">
        <img src={emptyCartImage} alt="Empty Cart" />
      </div>
      ) : (
        <>
          <div className="topic">
            <div className="cart-title">
              <h1>Products</h1>
              <h1>Quantity</h1>
            </div>
            <div>
              <h1>Price (in ₹)</h1>
            </div>
          </div>
          {cart.map((item) => (
            <div className="cart_box" key={item.id}>
              <div className="cart_img">
                <img src={item.img} alt="" />
                <p>{item.title}</p>
              </div>
              <div>
                <button onClick={() => handleChange(item, 1)}>+</button>
                <span style={{ marginLeft: '5px', marginRight: '10px' }}><b>{item.amount}</b></span>
                <button onClick={() => handleChange(item, -1)}>-</button>
              </div>
              <div>
                <span>{item.price}</span>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total">
            <span>Total Amount</span>
            <span>₹{price}/-</span>
          </div>
          <div className="buy-negotiate-container">
            <div className="buynow-button-container">
              <button onClick={handleBuy}>Buy Now</button>
            </div>
            <div className="negotiate-button-container">
              <Chat
                isOpen={isChatboxOpen}
                toggleChatbot={() => setIsChatboxOpen(!isChatboxOpen)}
                totalPrice={price}
                onPriceAccept={handlePriceAccept}
              />
              {!negotiationCompleted && (
                <button onClick={handleNegotiate}>Negotiate Price</button>
              )}
            </div>
          </div>
        </>
      )}
      {showCheckoutForm && (
        <div className="overlay">
          <div className="form-container">
            <form>
              <h2>Checkout</h2>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" required />
              <label htmlFor="phone">Phone No:</label>
              <input type="tel" id="phone" name="phone" required />
              <label htmlFor="payment">Payment Method:</label>
              <select id="payment" name="payment" required>
                <option value="">Select Payment Method</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              <button type="submit" onClick={handleCheckout}>Checkout</button>
            </form>
          </div>
        </div>
      )}
    </article>
  );
};

export default Cart;
