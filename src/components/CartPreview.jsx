import React from 'react';
import LineItem from './LineItem.jsx';

function CartPreview({ cartOrders, toggleCheckout }) {
  // const cartCount = Object.keys(cartOrders).length;
  let cartCount = 0;
  const numberOfOrders = Object.keys(cartOrders).length;
  for (var i = numberOfOrders - 1; i >= 0; i--) {
    cartCount += parseFloat(cartOrders[i].quantity, 10);
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
        <LineItem item={cartOrders[numberOfOrders -  1]} />
      </div>
    </div>
  );

}

export default CartPreview;
