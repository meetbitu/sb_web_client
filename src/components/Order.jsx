import React, {
  useState,
  useEffect,
} from 'react';

function Order({ order, displayCost, orderService }) {
  const initialCost = order.cost ? order.cost : '';
  const initialInput = {
    cost: initialCost,
  };
  const [input, setInput] = useState(initialInput);

  const handleInputChange = (e) => {
    // If we add more fields this needs to be updated
    orderService.patch(order._id, {
      cost: parseFloat(e.currentTarget.value).toFixed(2),
    });

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
       {order.order} - Spice {order.spice} for {order.name}
       { costField() }
    </div>
  );
}

export default Order;
