import LineItem from './LineItem.jsx';
import Order from './Order.jsx';
import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const OrderForm = ({ invite, orderService }) => {
  const initialInput = {
    name: "",
    order: "",
    spice: "",
  };
  const [input, setInput] = useState(initialInput);
  const [cartOrders, setCartOrders] = useState([]);
  const [message, setMessage] = useState();

  const defaultCopyText = 'Copy invite link to send to your friends';
  const [copiedText, setCopiedText] = useState(defaultCopyText);

  // Keep the name assuming the same person is ordering again
  const resetInput = {
    name: input.name,
    order: "",
    spice: "",
  };

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

    if (event.currentTarget.className === 'submit-order') {
      return;
    }

    // @TODO: Validate required fields on form

    // Use the orders service from the server
    orderService.create({
      name: input.name,
      order: input.order,
      spice: input.spice,
      inviteId: invite._id,
      timestamp: Date.now(),
    }).then((data) => {
      setMessage('Order submitted');
      setInput(resetInput);
    });

  }

  function inviteEmoji() {
    return (copiedText === defaultCopyText) ?
      { __html: '🤝' } :
      { __html: '✨🍛✨'};
  }

  function renderSubmitButton() {
    return (Object.keys(cartOrders).length) ? (
      <div className="form-actions">
        <button
          type="submit"
          className="order-submit"
        >
          Thankssss!
        </button>
      </div>
    ) :
    '';
  }

  function renderCartOrders() {
    const orders = cartOrders.map((order, index) => <Order order={order} key={index} />);

    // const cartCount = Object.keys(cartOrders).length;
    let cartCount = 0;

    for (var i = Object.keys(cartOrders).length - 1; i >= 0; i--) {
      cartCount += parseFloat(cartOrders[i].quantity, 10);
    }

    const itemPlural = cartCount === 1 ? 'item' : 'items';

    const output = (
      <div className="cart-wrapper">
        <div className="cart">
          <header className="cart-header">
            <h3>{cartCount} {itemPlural} in your cart</h3>
            <button>
              Checkout
            </button>
          </header>
          {orders}
        </div>
      </div>
    );

    return cartCount > 0 ? output : '';
  }

  function appendCartOrder(order) {
    setCartOrders(cartOrders.concat(order));
  }

  return (
    <div className="order-form">
      <header className="order-form-header">
        <h2>{invite.text}</h2>
        <CopyToClipboard
          text={encodeURI(`${window.location.protocol}//${window.location.host}?invite=${invite._id}&text=${invite.text}`)}
          onCopy={() => setCopiedText('Invite link has been copied to your clipboard')}
          onClick={() => Mixpanel.track('Clicked copy invite link')}
        >
          <button>{copiedText}</button>
        </CopyToClipboard>
        <div
          className="invite-copy-emoji"
          dangerouslySetInnerHTML={inviteEmoji()}
        />
      </header>

      <LineItem
        name="Chicken Katsu"
        appendCartOrder={appendCartOrder}
        options={[
          'level 1',
          'level 2',
          'level 3',
          'level 4',
          'level 5',
          'level 6',
          'level 7',
          'level 8',
          'level 9',
          'level 10',
        ]}
      />

      <LineItem
        name="Pork Katsu"
        appendCartOrder={appendCartOrder}
        options={[
          'level 1',
          'level 2',
          'level 3',
          'level 4',
          'level 5',
          'level 6',
          'level 7',
          'level 8',
          'level 9',
          'level 10',
        ]}
      />

      <LineItem
        name="Naan Bread with Curry Sauce"
        appendCartOrder={appendCartOrder}
      />

      <LineItem
        name="Naan Bread"
        appendCartOrder={appendCartOrder}
      />

      <form
        className="submit-order"
        onSubmit={submitRequest}
      >
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          placeholder="Name"
        />

        {renderSubmitButton()}
        <footer>
          <h3 className="messages">{message}</h3>
        </footer>
      </form>
      {renderCartOrders()}
    </div>
  );
}

export default OrderForm;
