import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';

const OrderForm = ({ invite, orderService }) => {
  const initialState = {
      quantity: "",
      order: "",
      name: "",
  };
  const [input, setInput] = useState(initialState);
  const [message, setMessage] = useState();

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'order form',
      'first_contact_time': Date.now(),
      // 'referring_user': '',
    });
  }, []); // Only fire once

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  function submitRequest(event) {
    event.preventDefault();

    // Use the orders service from the server
    orderService.create({
      name: input.name,
      quantity: input.quantity,
      order: input.order,
      inviteId: invite._id,
    }).then((data) => {
      setMessage('Order submitted');
      setInput(initialState);
    });

  }

  return (
    <form
      className="submit-order"
      onSubmit={submitRequest}
    >
      <header>
        <h2>{invite.text}</h2>
        <label>
          Copy this link and send to your friends
          <input
            type="text"
            name="share-link"
            className="copy-share-link"
            value={encodeURI(`${window.location}?invite=${invite._id}&text=${invite.text}`)}
            onChange={() => {}}
          />
        </label>
      </header>
      <input
        type="number"
        name="quantity"
        value={input.quantity}
        onChange={handleInputChange}
        placeholder="Quantity"
      />
      <input
        type="text"
        name="order"
        value={input.order}
        onChange={handleInputChange}
        placeholder="Order with spice level"
      />
      <input
        type="text"
        name="name"
        value={input.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <div className="form-actions">
        <button
          type="submit"
          className="order-submit"
        >
          Thankssss!
        </button>
      </div>
      <footer>
        <h3 className="messages">{message}</h3>
      </footer>
    </form>
  );
}

export default OrderForm;
