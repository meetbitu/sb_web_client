import React, {
  useState,
  useEffect,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function SubmitCocoInviteForm({ setInvite, inviteService }) {
  const initialState = {
      splitCost: '',
      perCustomerFee: '',
      paymentInstructions: '',
      pickupInstructions: '',
      orderTitle: "Let's order CoCo together!",
  };
  const [input, setInput] = useState(initialState);
  const [startedTyping, setTyping] = useState(false);

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'submit request form',
      'first_contact_time': Date.now(),
    });
  }, []); // Only fire once

  const handleInputChange = (e) => {
    if (!startedTyping) {
      setTyping(true);

      Mixpanel.track('Started typing in the initial request form');
    }

    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: input.orderTitle,
      timestamp: Date.now(),
      splitCost: input.splitCost,
      perCustomerFee: input.perCustomerFee,
      paymentInstructions: input.paymentInstructions,
      pickupInstructions: input.pickupInstructions,
    }).then((data) => {
      setInvite(data);

      Mixpanel.track('Successfully created a request');

      // Should we update the browser address?
    }).catch(e => {
      console.log(e);
      // @TODO: Display an error message
    });

  }

  return (
    <form
      className="submit-request"
      onSubmit={submitRequest}
    >
      <input
        type="text"
        name="orderTitle"
        value={input.orderTitle}
        onChange={handleInputChange}
      />
      <input
        type="number"
        step="0.01"
        name="splitCost"
        value={input.splitCost}
        onChange={handleInputChange}
        placeholder="Delivery fee and other split costs"
      />
      <input
        type="number"
        step="0.01"
        name="perCustomerFee"
        value={input.perCustomerFee}
        onChange={handleInputChange}
        placeholder="Fixed fees per order"
      />
      <textarea
        name="pickupInstructions"
        onChange={handleInputChange}
        placeholder="Pickup instructions"
      />
      <textarea
        name="paymentInstructions"
        onChange={handleInputChange}
        placeholder="Payment instructions"
      />
      <div className="form-actions">
        <button
          type="submit"
          className="request-submit"
        >
          Invite your friends
        </button>
      </div>
    </form>
  );
}

export default SubmitCocoInviteForm;
