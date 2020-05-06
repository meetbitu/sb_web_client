import React from 'react';

function Order({ order }) {
  return (
    <div className="order" key={order._id}>
       {order.order} - Spice {order.spice} for {order.name}
    </div>
  );
}

export default Order;
