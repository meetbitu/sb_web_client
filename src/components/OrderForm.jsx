import LineItem from './LineItem.jsx';
// import Order from './Order.jsx';
import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const OrderForm = ({ invite, cartOrders, setCartOrders }) => {
  const defaultCopyText = 'Copy invite link to send to your friends';
  const [copiedText, setCopiedText] = useState(defaultCopyText);

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'order form',
      'first_contact_time': Date.now(),
      // 'referring_user': '',
    });
  }, []); // Only fire once

  function inviteEmoji() {
    return (copiedText === defaultCopyText) ?
      { __html: '🤝' } :
      { __html: '✨🍛✨'};
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
    </div>
  );
}

export default OrderForm;
