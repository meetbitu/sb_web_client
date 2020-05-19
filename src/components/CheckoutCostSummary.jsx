import React from 'react';
import LineItem from './LineItem.jsx';

function CheckoutCostSummary({ cartItems, total, invite, customerCount }) {
  const renderedOrders = cartItems.map((item, index) => <LineItem item={item} key={index} />);

  return (
    <div className="checkout-cost-summary">
      {renderedOrders}
      {!!invite.splitCost &&
        <div className="line-item">
          <div>Your portion of delivery fee: <span className="price">₱{parseFloat(invite.splitCost) / parseFloat(customerCount)}</span></div>
          <p className="description">The more people who join this curry club the cheaper the delivery fee will be!</p>
        </div>
      }
      <div className="line-item">Total: <span className="price">₱{parseFloat(total).toFixed(2)}</span></div>
    </div>
  );
}

export default CheckoutCostSummary;
