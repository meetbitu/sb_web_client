import React from 'react';
import Order from './Order.jsx';

function Cart({ cartOrders }) {
  const renderedOrders = cartOrders.map((order, index) => <Order order={order} key={index} />);

  // const cartCount = Object.keys(cartOrders).length;
  let cartCount = 0;

  for (var i = Object.keys(cartOrders).length - 1; i >= 0; i--) {
    cartCount += parseFloat(cartOrders[i].quantity, 10);
  }

  const itemPlural = cartCount === 1 ? 'item' : 'items';

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <header className="cart-header">
          <h3>{cartCount} {itemPlural} in your cart</h3>
          <button>
            Checkout
          </button>
        </header>
        {renderedOrders}
      </div>
    </div>
  );

}

export default Cart;
