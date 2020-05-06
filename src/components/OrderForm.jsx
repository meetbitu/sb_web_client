import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';

const OrderForm = ({ invite, orderService }) => {
  const initialInput = {
      name: "",
      order: "",
      spice: "",
  };
  const resetInput = {
      order: "",
      spice: "",
  };
  const [input, setInput] = useState(initialInput);
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
      order: input.order,
      spice: input.spice,
      inviteId: invite._id,
    }).then((data) => {
      setMessage('Order submitted');
      setInput(resetInput);
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
        type="text"
        name="name"
        value={input.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <select
        name="order"
        onChange={handleInputChange}
        value={input.order}
      >
        <option value="">Select dish</option>
        <option value="Chicken Katsu">Chicken Katsu</option>
        <option value="Port Katsu">Pork Katsu</option>
      </select>
      <select
        name="spice"
        onChange={handleInputChange}
        value={input.spice}
      >
        <option value="">Select spice level</option>
        <option value="Level 1">Level 1</option>
        <option value="Level 2">Level 2</option>
        <option value="Level 3">Level 3</option>
        <option value="Level 4">Level 4</option>
        <option value="Level 5">Level 5</option>
        <option value="Level 6">Level 6</option>
        <option value="Level 7">Level 7</option>
        <option value="Level 8">Level 8</option>
        <option value="Level 9">Level 9</option>
        <option value="Level 10">Level 10</option>
      </select>
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
