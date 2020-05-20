import React, {
  useState,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

// Components
import CheckoutCostSummary from './CheckoutCostSummary.jsx';

function Checkout({ invite, cartItems, orderService, orderCount, toggleCheckout }) {
  const initialInput = {
    name: '',
    items: '',
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
      items: cartItems,
      inviteId: invite._id,
      timestamp: Date.now(),
      subtotal,
    }).then((data) => {
      setInput(initialInput);
      setCheckoutComplete(true);
    });

    Mixpanel.track('Submitted order');

  }

  // Calculate subtotal and delivery estimate
  // If the checkout is not completed yet add one to account for this user
  // @TODO: Merge this inside of CheckoutCostSummary to reuse on admin order dsiplay
  const projectedCustomerCount = checkoutComplete ? orderCount : orderCount + 1
  let price = n => isNaN(n.price) ? 0 : parseFloat(n.price) * parseFloat(n.quantity);
  const subtotal = Object.keys(cartItems).reduce((previous, key) => previous + price(cartItems[key]), 0);

  let total = subtotal;
  if (invite.splitCost) {
    total += parseFloat(invite.splitCost) / parseFloat(projectedCustomerCount);
  }

  if (invite.perCustomerFee) {
    total += parseFloat(invite.perCustomerFee);
  }

  return (
    <div className="checkout">
      <header className="checkout-header">
        <h3>{checkoutComplete ? 'Order complete' : 'Review order'}</h3>
        {!checkoutComplete &&
          <button
            onClick={toggleCheckout}
          >
            Back to menu
          </button>
        }
      </header>
      <CheckoutCostSummary
        items={cartItems}
        invite={invite}
        total={total}
        orderCount={projectedCustomerCount}
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
