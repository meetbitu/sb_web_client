import React from 'react';
import Order from './Order.jsx';

function Orders({ orders }) {
  const allOrders = orders.map((order, index, array) => {
    return (
      <Order order={order} key={order._id}/>
    );
  });

  return (
    <div className="orders">
      {allOrders}
    </div>
  );
}

export default Orders;
