import React, {
  useState,
  useEffect,
} from 'react';

function Order({ order }) {
  return (
    <div className="order" key={order._id}>
      {order.quantity}x {order.order} {order.options}
      {order.additions &&
        <p className="description">
          {order.additions}
        </p>
      }
    </div>
  );
}

export default Order;
