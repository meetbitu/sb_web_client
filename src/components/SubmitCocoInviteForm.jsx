import React, {
  useState,
  useEffect,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function SubmitCocoInviteForm({ setInvite, inviteService, userService, user, authenticate }) {
  const initialState = {
      splitCost: '',
      perCustomerFee: 100,
      paymentInstructions: '',
      pickupInstructions: '',
      orderTitle: "Let's order CoCo together!",
      username: user ? user : '',
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

    // If we don't have a user then create one from the phone number
    if (!user) {
      if (input.username === '') {
        alert('Phone number is required');
        return;
      }

      userService.create({
        username: input.username,
        password: input.username,
      })
      .then(data => {
        console.log(data);

        return authenticate({
          strategy: 'local',
          username: input.username,
          password: input.username,
        });
      })
      .then(data => {
        console.log('logged in');

        return inviteService.create({
          text: input.orderTitle,
          timestamp: Date.now(),
          splitCost: input.splitCost,
          perCustomerFee: input.perCustomerFee,
          paymentInstructions: input.paymentInstructions,
          pickupInstructions: input.pickupInstructions,
        });
      })
      .then(data => {
        setInvite(data);
        console.log(data);

        Mixpanel.track('Successfully created a request');

        // Should we update the browser address?
      })
      .catch(e => console.log(e));
    }
    else {
      // If we do have a user then go ahead and create the invite
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
        console.log(data);

        Mixpanel.track('Successfully created a request');

        // Should we update the browser address?
      }).catch(e => {
        console.log(e);
        // @TODO: Display an error message
      });
    }
  }

  return (
    <form
      className="submit-request"
      onSubmit={submitRequest}
    >
      <label className="content">
        Name of your invite
        <input
          type="text"
          name="orderTitle"
          value={input.orderTitle}
          onChange={handleInputChange}
        />
      </label>
      <label className="content">
        Delivery fee and other split costs
        <input
          type="number"
          step="0.01"
          name="splitCost"
          value={input.splitCost}
          onChange={handleInputChange}
        />
      </label>
      <label className="content">
        Fixed fee per order
        <input
          type="number"
          step="0.01"
          name="perCustomerFee"
          disabled
          value={input.perCustomerFee}
          onChange={handleInputChange}
        />
      </label>
      <label className="content">
        Pickup instructions
        <textarea
          name="pickupInstructions"
          value={input.pickupInstructions}
          onChange={handleInputChange}
        />
      </label>
      <label className="content">
      Payment instructions
        <textarea
          name="paymentInstructions"
          value={input.paymentInstructions}
          onChange={handleInputChange}
        />
      </label>
      {user &&
        <label className="content">
        Phone number
          <input
            type="text"
            name="username"
            disabled
            readOnly
            value={input.username}
          />
          <p className="description">You will use this number to log in and place the order for your friends</p>
        </label>
      }
      {!user &&
        <label className="content">
        Phone number
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            value={input.username}
          />
          <p className="description">You will use this number to log in and place the order for your friends</p>
        </label>
      }
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
