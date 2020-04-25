import React from 'react';

function Order({ order }) {
  console.log(order);
  return (
    <div className="order" key={order._id}>
      {order.name} ordered {order.quantity} {order.order}
    </div>
  );
}

export default Order;
