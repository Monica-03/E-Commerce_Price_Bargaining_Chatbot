import React from "react";
import "../styles/cards.css";

const Cards = ({ item, handleClick }) => {
  const { category, title, description, price, img } = item;
  return (
    <div className="card">
      <div className="imageBox">
        <img className="image" src={img} alt="" />
      </div>
      <div className="details">
        <p className="title">{title}</p>
        <p className="author">{description}</p>
        <p className="price">Price: <b>₹{price}</b></p>
        <button className="button" onClick={() => handleClick(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cards;
