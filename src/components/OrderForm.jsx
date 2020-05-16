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

  return (
    <div className="order-form">
      <header>
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
        <select
          name="order"
          onChange={handleInputChange}
          value={input.order}
        >
          <option value="">Select dish</option>
          <option value="Chicken Katsu">Chicken Katsu</option>
          <option value="Port Katsu">Pork Katsu</option>
          <option value="Naan Bread with Curry Sauce">Naan Bread with Curry Sauce</option>
          <option value="Naan Bread">Naan Bread</option>
        </select>
        <select
          name="spice"
          onChange={handleInputChange}
          value={input.spice}
        >
          <option value="">Select spice level</option>
          <option value="Mild">Mild</option>
          <option value="Standard">Standard</option>
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
    </div>
  );
}

export default OrderForm;
