import React from 'react';
import LineItem from './LineItem.jsx';

function CheckoutCostSummary({ items, total, invite, orderCount }) {
  const renderedItems = items.map((item, index) => <LineItem item={item} key={index} />);

  const proRatedDelivery = parseFloat(parseFloat(invite.splitCost) / parseFloat(orderCount)).toFixed(2);

  return (
    <div className="checkout-cost-summary">
      {renderedItems}
      {!!invite.splitCost &&
        <div className="line-item">
          <div>Your portion of delivery fee: <span className="price">₱{proRatedDelivery}</span></div>
          <p className="description">The more people who join this curry club the cheaper the delivery fee will be!</p>
        </div>
      }
      <div className="line-item">Total: <span className="price">₱{parseFloat(total).toFixed(2)}</span></div>
    </div>
  );
}

export default CheckoutCostSummary;
