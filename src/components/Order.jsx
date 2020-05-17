import React, {
  useState,
  useEffect,
} from 'react';

function Order({ order, displayCost, orderService }) {
  if (order.cost === 'undefined') {
    console.log(order);
  }
  const initialCost = !isNaN(order.cost) ? order.cost : 0;
  const initialInput = {
    cost: initialCost,
  };
  const [input, setInput] = useState(initialInput);

  const updateOrderRecord = (e) => {
    // If we add more fields this needs to be updated
    orderService.patch(order._id, {
      cost: parseFloat(e.currentTarget.value).toFixed(2),
    });
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  const costField = () => {
    if (displayCost) {
      return (
        <form>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={input.cost}
            onChange={handleInputChange}
            onBlur={updateOrderRecord}
            onSubmit={e => e.preventDefault()}
            placeholder="Cost"
          />
        </form>
      );
    }
    else {
      return '';
    }
  }

  useEffect(() => {
    setInput({cost: order.cost});
  }, [order]);

  return (
    <div className="order" key={order._id}>
      {order.quantity}x {order.order} {order.options}
      {order.additions &&
        <p className="description">
          {order.additions}
        </p>
      }
      { costField() }
    </div>
  );
}

export default Order;
