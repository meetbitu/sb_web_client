import React from 'react';
import LineItem from './LineItem.jsx';

function CheckoutCostSummary({ cartOrders, invite, customerCount }) {
  const renderedOrders = cartOrders.map((item, index) => <LineItem item={item} key={index} />);
  console.log(cartOrders);
  let price = n => isNaN(n.price) ? 0 : n.price * n.quantity;
  // let price = n => isNaN(n.price) ? 0 : console.log(n.price, n.quantity, n.price * n.quantity);
  const subtotal = cartOrders.reduce((a, b) => price(a) + price(b));
  // let total = subtotal + (parseFloat(invite.splitCost) / parseFloat(customerCount)) + parseFloat(invite.perCustomerCost);

  let total = subtotal;
  if (invite.splitCost) {
    total += parseFloat(invite.splitCost) / parseFloat(customerCount);
  }

  if (invite.perCustomerCost) {
    total += parseFloat(invite.perCustomerCost);
  }

  return (
    <div className="checkout-cost-summary">
      {renderedOrders}
      {!!invite.splitCost &&
        <div>
          <div>Your portion of delivery fee: ₱{parseFloat(invite.splitCost) / parseFloat(customerCount)}</div>
          <p className="description">The more people who join this curry club the cheaper the delivery fee will be!</p>
        </div>
      }
      <div className="total">Total: ₱{parseFloat(total).toFixed(2)}</div>
    </div>
  );
}

export default CheckoutCostSummary;
