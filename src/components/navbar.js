import React from "react";
import "../styles/navbar.css";

const Navbar = ({ setShow, size }) => {
  return (
    <nav>
      <div className="nav_box">
       {/* My Shopping */}
       <span className="my_shop" onClick={() => setShow(true)}>
        <b>SwiftBuy</b>
        </span>
        {/* Search Bar */}
        <div className="search_bar">
          <input type="text" placeholder="Search" />
          <span><i className="fas fa-search"></i></span>
        </div>

        {/* Spacer */}
        <div className="spacer"></div>

        {/* Profile Icon */}
        <div className="profile_icon">
          <span>
            <i className="fas fa-user"></i>
          </span>
        </div>

        {/* Order Icon */}
        <div className="order_icon">
          <span>
            <i className="fas fa-shopping-bag"></i>
          </span>
        </div>

        {/* Cart */}
        <div className="cart" onClick={() => setShow(false)}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
