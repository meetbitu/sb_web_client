import React, {
  useState,
} from 'react';
import LineItem from './LineItem.jsx';

function Checkout({ invite, cartOrders, orderService }) {
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



  const renderedOrders = cartOrders.map((item, index) => <LineItem item={item} key={index} />);
  // let cartCount = 0;
  // for (var i = Object.keys(cartOrders).length - 1; i >= 0; i--) {
  //   cartCount += parseFloat(cartOrders[i].quantity, 10);
  // }
  // const itemPlural = cartCount === 1 ? 'item' : 'items';

  return (
    <div className="checkout">
      <header className="checkout-header">
        <h3>Review order</h3>
      </header>
      {renderedOrders}
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
