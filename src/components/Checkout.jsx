import React, {
  useState,
} from 'react';
import Order from './Order.jsx';

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



  const renderedOrders = cartOrders.map((order, index) => <Order order={order} key={index} />);
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
