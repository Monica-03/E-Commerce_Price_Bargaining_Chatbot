import React, { useCallback, useEffect, useState } from "react";
import "../styles/cart.css";
import Cart from "./cart.js";
import Chat from "./chat.js";

const ParentComponent = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever cart changes
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.amount * item.price;
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleCartChange = useCallback((item, amount) => {
    // Update cart
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      updatedCart[index].amount += amount;
      if (updatedCart[index].amount <= 0) {
        updatedCart.splice(index, 1); // Remove item if amount becomes zero
      }
      setCart(updatedCart);
    }
  }, [cart]);

  return (
    <div>
      <Cart cart={cart} setCart={setCart} totalPrice={totalPrice} handleChange={handleCartChange} />
      <Chat isOpen={true} toggleChatbot={() => {}} totalPrice={totalPrice} />
    </div>
  );
};

export default ParentComponent;
