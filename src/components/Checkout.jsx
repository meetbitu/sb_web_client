import React, {
  useState,
} from 'react';
import CheckoutCostSummary from './CheckoutCostSummary.jsx';

function Checkout({ invite, cartItems, orderService, customerCount, toggleCheckout }) {
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
      orders: cartItems,
      inviteId: invite._id,
      timestamp: Date.now(),
      subtotal,
    }).then((data) => {
      setInput(initialInput);
      setCheckoutComplete(true);
    });

  }

  // Calculate subtotal and delivery estimate
  // If the checkout is not completed yet add one to account for this user
  const projectedCustomerCount = checkoutComplete ? customerCount : customerCount + 1
  let price = n => isNaN(n.price) ? 0 : n.price * n.quantity;
  const subtotal = Object.keys(cartItems).reduce((previous, key) => previous + price(cartItems[key]), 0);

  let total = subtotal;
  if (invite.splitCost) {
    total += parseFloat(invite.splitCost) / parseFloat(projectedCustomerCount);
  }

  // if (invite.perCustomerCost) {
  //   total += parseFloat(invite.perCustomerCost);
  // }

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
        cartItems={cartItems}
        invite={invite}
        total={total}
        customerCount={projectedCustomerCount}
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
