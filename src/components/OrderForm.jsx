import React, { useState } from 'react';

const OrderForm = ({ invite, orderService }) => {
  const initialState = {
      quantity: "",
      order: "",
      name: "",
  };
  const [input, setInput] = useState(initialState);
  const [message, setMessage] = useState();

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  function submitRequest(event) {
    event.preventDefault();

    // Use the orders service from the server
    orderService.create({
      name: event.target.name.value,
      quantity: event.target.quantity.value,
      order: event.target.order.value,
      inviteId: invite._id,
    }).then((data) => {
      setMessage(`${input.name} ordered ${input.quantity} ${input.order}`);
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
        <div className="messages">{message}</div>
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
        placeholder="3"
      />
      <input
        type="text"
        name="order"
        value={input.order}
        onChange={handleInputChange}
        placeholder="Chickenjoy"
      />
      <label>
        for
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
      </label>
      <div className="form-actions">
        <button
          type="submit"
          className="order-submit"
        >
          Thankssss!
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
