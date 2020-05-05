import React, { useState } from 'react';

function OrderCost({ order }) {
  const initialState = {
      cost: "",
  };
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  return (
    <div className="order" key={order._id}>
      <div className="order-text">
        {order.name} ordered {order.quantity} {order.order}
      </div>
      <div className="order-cost">
        <form>
          <input
            type="number"
            name="cost"
            step="0.01"
            onChange={handleInputChange}
          />

        </form>
      </div>
    </div>
  );
}

export default OrderCost;
