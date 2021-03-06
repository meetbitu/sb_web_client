import React from 'react';
import LineItem from './LineItem.jsx';

function CheckoutCostSummary({ items, removeCartItem, total, invite, orderCount, checkoutComplete }) {

  const renderedItems = items.map((item, index) => (
    <LineItem
      item={item}
      key={index}
      removeCartItem={checkoutComplete ? null : removeCartItem}
    />
  ));

  const proRatedDelivery = parseFloat(parseFloat(invite.splitCost) / parseFloat(orderCount));
  const renderProRatedDelivery = proRatedDelivery % 1 === 0 ? proRatedDelivery : parseFloat(proRatedDelivery).toFixed(2);

  const renderTotal = total % 1 === 0 ? total : parseFloat(total).toFixed(2);

  return (
    <div className="checkout-cost-summary">
      {renderedItems}
      {!!invite.splitCost &&
        <div className="line-item">
          <div>Your portion of delivery fee: <span className="price">₱{renderProRatedDelivery}</span></div>
          <p className="description">The more people who join this curry club the cheaper the delivery fee will be!</p>
        </div>
      }
      {!!invite.perCustomerFee &&
        <div className="line-item">
          <div>Delivery fee: <span className="price">₱{invite.perCustomerFee}</span></div>
        </div>
      }
      <div className="line-item">Total: <span className="price">₱{renderTotal}</span></div>
    </div>
  );
}

export default CheckoutCostSummary;
