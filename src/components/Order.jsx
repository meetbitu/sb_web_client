import React from 'react';
import CheckoutCostSummary from './CheckoutCostSummary.jsx';

function Order({ order, invite, fees }) {
  return (
    <CheckoutCostSummary
      // key={order._id}
      items={order.items}
      invite={invite}
      total={total}
      orderCount={projectedCustomerCount}
    />
  );
}

export default Order;
