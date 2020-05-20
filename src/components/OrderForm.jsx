import LineItemForm from './LineItemForm.jsx';
// import Order from './Order.jsx';
import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import coco from '../coco.png';
import mos from '../mos.png';
import tendon from '../tendon.png';
import mitsuyado from '../mitsuyado.png';

const OrderForm = ({ invite, cartItems, setCartItems }) => {
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
    // @TODO: Add some values to the line item to identify it later
    setCartItems(cartItems.concat(order));
  }

  const spiceLevels = [
    'Mild',
    'Standard',
    'Level 1',
    'Level 2',
    'Level 3',
    'Level 4',
    'Level 5',
    'Level 6',
    'Level 7',
    'Level 8',
    'Level 9',
    'Level 10',
  ];

  return (
    <div className="order-form">
      <header className="order-form-header">
        <h2>{invite.text}</h2>
        <CopyToClipboard
          text={encodeURI(`${window.location.protocol}//${window.location.host}?invite=${invite._id}`)}
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

      <img src={mos} className="group-logo" alt="logo" />
      <h3>Mos Burger</h3>

      <LineItemForm
        name="MOS Cheeseburger"
        price="169"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Teriyaki Chicken Burger"
        price="189"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Wagyu Burger"
        price="309"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Yakiniku Garlic Rice Burger"
        price="189"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Seafood Tempura Garlic Rice Burger"
        price="209"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Teriyaki Chicken Garlic Rice Burger"
        price="229"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Wagyu Garlic Rice Burger"
        price="329"
        appendCartOrder={appendCartOrder}
      />

      <h4>Family Pack</h4>

      <LineItemForm
        name="MOS Cheesburger Family Pack – 3 Pack"
        price="499"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="MOS Cheesburger Family Pack – 6 Pack"
        price="989"
        appendCartOrder={appendCartOrder}
      />


      <LineItemForm
        name="Yakiniku Garlic Rice Burger Family Pack – 3 Pack"
        price="549"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Yakiniku Garlic Rice Burger Family Pack – 6 Pack"
        price="999"
        appendCartOrder={appendCartOrder}
      />

      <h4>Variety Pack</h4>
      <LineItemForm
        name="2 MOS Fries, 2 Sweet Potato Fries"
        price="383"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="2 MOS Fries, 2 Karaage"
        price="429"
        appendCartOrder={appendCartOrder}
      />

      <h4>MOS Chicken</h4>
      <LineItemForm
        name="MOS Chicken – 1 pc."
        price="179"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="MOS Chicken – 2 pc."
        price="349"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="MOS Chicken – 4 pc."
        price="699"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Add Japanese Rice with Gravy"
        price="40"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Add Gravy Sauce"
        price="20"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Add Cheese Sauce"
        price="20"
        appendCartOrder={appendCartOrder}
      />

      <h4>Sides</h4>
      <LineItemForm
        name="MOS Fries"
        price="70"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Sweet Potato"
        price="130"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Poutine"
        price="150"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Karaage"
        price="150"
        appendCartOrder={appendCartOrder}
      />

      <img src={coco} className="group-logo" alt="logo" />
      <h3>CoCoIchibanya</h3>

      <LineItemForm
        name="Chicken Cutlet Curry"
        price="340"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Fried Chicken Omlette Curry"
        price="330"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Pork Cutlet Omlette Curry"
        price="360"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
      />

      <LineItemForm
        name="Beef Omlette Curry"
        price="380"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
      />

      <LineItemForm
        name="Cream Croquette & Cheese Curry"
        price="360"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
      />

      <LineItemForm
        name="Yakiniku Curry"
        price="290"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
      />

      <LineItemForm
        name="Hamburg Steak Curry with Cheese"
        price="340"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
      />

      <LineItemForm
        name="Shrimp Cutlet Curry"
        price="340"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Seafood Curry"
        price="340"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
      />

      <img src={mitsuyado} className="group-logo" alt="logo" />
      <h3>Mitsuyado Sei-Men</h3>
      <LineItemForm
        name="Yuzu Tsukemen"
        price="305"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Karashi Tsukemen"
        price="336"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Pork Cutlet Don"
        price="210"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Chicken Karaage Don"
        price="210"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Chahan"
        price="179"
        appendCartOrder={appendCartOrder}
      />

      <h4>Add-ons (cooked)</h4>
      <LineItemForm
        name="Pork Cutlet"
        price="137"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Gyoza"
        price="200"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Chicken Karaage"
        price="200"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Extra Cheese Sauce"
        price="84"
        appendCartOrder={appendCartOrder}
      />

      <img src={tendon} className="group-logo" alt="logo" />
      <h3>Tendon Kohaku</h3>

      <LineItemForm
        name="Kohaku Tendon"
        price="399"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Kakiage Tendon"
        price="326"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Shrimp Tendon (8pcs)"
        price="504"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Shrimp Tendon (5pc)"
        price="399"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Pork Katsudon"
        price="357"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Yakibuta Don"
        price="336"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Kohaku Japanese White Rice"
        price="53"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Wild Tiger Prawn Tempura (5pcs)"
        price="368"
        appendCartOrder={appendCartOrder}
      />

      <LineItemForm
        name="Spicy Sweet Fried Chicken"
        price="294"
        appendCartOrder={appendCartOrder}
      />

    </div>
  );
}

export default OrderForm;
