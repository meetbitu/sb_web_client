import React, {
  useState,
} from 'react';
import CheckoutCostSummary from './CheckoutCostSummary.jsx';

function Checkout({ invite, cartOrders, orderService, customerCount, toggleCheckout }) {
  const initialInput = {
    name: '',
    orders: '',
    address: '',
  };

  const [input, setInput] = useState(initialInput);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  function onSubmit(event) {
    event.preventDefault();

    // @TODO: Validate required fields on form
    if (input.name === '') {
      alert('Name is required');
      return;
    }

    // Use the orders service from the server
    orderService.create({
      name: input.name,
      address: input.address,
      orders: cartOrders,
      inviteId: invite._id,
      timestamp: Date.now(),
    }).then((data) => {
      setInput(initialInput);
      setCheckoutComplete(true);
    });

  }

  return (
    <div className="checkout">
      <header className="checkout-header">
        <h3>Review order</h3>
        <button
          onClick={toggleCheckout}
        >
          Back to menu
        </button>
      </header>
      <CheckoutCostSummary
        cartOrders={cartOrders}
        invite={invite}
        customerCount={checkoutComplete ? customerCount : customerCount + 1}
      />
      {!checkoutComplete &&
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
      }
      {checkoutComplete && invite.instructions &&
        <p className="instructions multi-line-text">{invite.instructions}</p>
      }
    </div>
  );

}

export default Checkout;
