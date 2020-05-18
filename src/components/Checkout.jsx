import React, {
  useState,
} from 'react';
import CheckoutCostSummary from './CheckoutCostSummary.jsx';

function Checkout({ invite, cartOrders, orderService, customerCount }) {
  const initialInput = {
    name: '',
    orders: '',
    address: '',
  };

  const [input, setInput] = useState(initialInput);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  function onSubmit(event) {
    event.preventDefault();

    // @TODO: Validate required fields on form

    // Use the orders service from the server
    orderService.create({
      name: input.name,
      address: input.address,
      orders: cartOrders,
      inviteId: invite._id,
      timestamp: Date.now(),
    }).then((data) => {
      console.log(data);
      setInput(initialInput);
    });

  }

  return (
    <div className="checkout">
      <header className="checkout-header">
        <h3>Review order</h3>
      </header>
      <CheckoutCostSummary
        cartOrders={cartOrders}
        invite={invite}
        customerCount={customerCount}
      />
      {!!invite.instructions &&
        <p className="instructions multi-line-text">{invite.instructions}</p>
      }
      <form
        onSubmit={onSubmit}
      >
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          placeholder="Your name"
        />
        <div className="form-actions">
          <button
            type="submit"
            className="order-submit"
          >
            Confirm order
          </button>
        </div>
      </form>
    </div>
  );

}

export default Checkout;
