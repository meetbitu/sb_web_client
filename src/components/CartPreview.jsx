import React from 'react';
import LineItem from './LineItem.jsx';

function CartPreview({ cartItems, toggleCheckout }) {
  // const cartCount = Object.keys(cartItems).length;
  let cartCount = 0;
  const numberOfOrders = Object.keys(cartItems).length;
  for (var i = numberOfOrders - 1; i >= 0; i--) {
    cartCount += parseFloat(cartItems[i].quantity, 10);
  }

  const itemPlural = cartCount === 1 ? 'item' : 'items';

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <header className="cart-header">
          <h3>{cartCount} {itemPlural} in your cart</h3>
          <button onClick={toggleCheckout}>
            Review order
          </button>
        </header>
        <LineItem item={cartItems[numberOfOrders -  1]} />
      </div>
    </div>
  );

}

export default CartPreview;
