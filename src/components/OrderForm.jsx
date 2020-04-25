import React from 'react';

function OrderForm({ invite, orderService }) {
  function submitRequest(event) {
    event.preventDefault();

    // Use the orders service from the server
    orderService.create({
      name: event.target.name.value,
      quantity: event.target.quantity.value,
      order: event.target.order.value,
      inviteId: invite._id,
    }).then((data) => {
      console.log(data);
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
            value={encodeURI(`http://social-buying-web-client.lndo.site/?invite=${invite._id}&text=${invite.text}`)}
            readOnly
          />
        </label>
      </header>
      <label>
        <input
          type="number"
          name="quantity"
          placeholder="3"
        />
        <input
          type="text"
          name="order"
          placeholder="Chickenjoy"
        />
      </label>
      <label>
        for
        <input
          type="text"
          name="name"
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
