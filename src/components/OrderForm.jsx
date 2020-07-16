import LineItemForm from './LineItemForm.jsx';
// import Order from './Order.jsx';
import Mixpanel from '../imports/Mixpanel';
import React, {
  useState,
  useEffect,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import coco from '../coco.png';
// import mitsuyado from '../mitsuyado.png';
import mos from '../mos.png';
import tendon from '../tendon.png';

const OrderForm = ({ invite, cartItems, setCartItems }) => {
  const defaultCopyText = 'Copy invite link to send to your friends';
  const [copiedText, setCopiedText] = useState(defaultCopyText);

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'order form',
      'first_contact_time': Date.now(),
      'referring_user': 'beta',
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
      <h3>MOS Burger</h3>

      <LineItemForm
        name="Wagyu Burger"
        price="309"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="MOS Cheeseburger"
        price="169"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Teriyaki Chicken Burger"
        price="189"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Wagyu Garlic Rice Burger"
        price="329"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Yakiniku Garlic Rice Burger"
        price="189"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Seafood Tempura Garlic Rice Burger"
        price="209"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Teriyaki Chicken Garlic Rice Burger"
        price="229"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <h4>Family Pack</h4>

      <LineItemForm
        name="MOS Cheesburger Family Pack – 3 Pack"
        price="499"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="MOS Cheesburger Family Pack – 6 Pack"
        price="989"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Yakiniku Garlic Rice Burger Family Pack – 3 Pack"
        price="549"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Yakiniku Garlic Rice Burger Family Pack – 6 Pack"
        price="999"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <h4>Variety Pack</h4>
      <LineItemForm
        name="2 MOS Fries, 2 Sweet Potato Fries"
        price="383"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="2 MOS Fries, 2 Karaage"
        price="429"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <h4>MOS Chicken</h4>
      <LineItemForm
        name="MOS Chicken – 1 pc."
        price="179"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="MOS Chicken – 2 pc."
        price="349"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="MOS Chicken – 4 pc."
        price="699"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Add Japanese Rice with Gravy"
        price="40"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Add Gravy Sauce"
        price="20"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Add Cheese Sauce"
        price="20"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <h4>Sides</h4>
      <LineItemForm
        name="MOS Fries"
        price="70"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Sweet Potato"
        price="130"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Poutine"
        price="150"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <LineItemForm
        name="Karaage"
        price="150"
        appendCartOrder={appendCartOrder}
        category="MOS Burger"
      />

      <img src={coco} className="group-logo" alt="logo" />
      <h3>CoCo Ichibanya</h3>

      <LineItemForm
        name="Chicken Cutlet Curry"
        price="357"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Fried Chicken Omlette Curry"
        price="347"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Pork Cutlet Omlette Curry"
        price="378"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Beef Omlette Curry"
        price="399"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Cream Croquette & Cheese Curry"
        price="378"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Yakiniku Curry"
        price="305"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Hamburg Steak Curry with Cheese"
        price="357"
        appendCartOrder={appendCartOrder}
        options={spiceLevels}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Shrimp Cutlet Curry"
        price="357"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
        category="CoCo Ichibanya"
      />

      <LineItemForm
        name="Seafood Curry"
        price="357"
        options={spiceLevels}
        appendCartOrder={appendCartOrder}
        category="CoCo Ichibanya"
      />

      {/*
      <img src={mitsuyado} className="group-logo" alt="logo" />
      <h3>Mitsuyado Sei-Men</h3>
      <LineItemForm
        name="Yuzu Tsukemen"
        price="321"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Karashi Tsukemen"
        price="353"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Pork Cutlet Don"
        price="221"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Chicken Karaage Don"
        price="221"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Chahan"
        price="188"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <h4>Add-ons (cooked)</h4>
      <LineItemForm
        name="Pork Cutlet"
        price="144"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Gyoza"
        price="210"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Chicken Karaage"
        price="210"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />

      <LineItemForm
        name="Extra Cheese Sauce"
        price="89"
        appendCartOrder={appendCartOrder}
        category="Mitsuyado Sei-Men"
      />
      */}

      <img src={tendon} className="group-logo" alt="logo" />
      <h3>Tendon Kohaku</h3>

      <LineItemForm
        name="Spicy Tuna Baked Sushi"
        price="629"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Smoked Salmon and Unagi Baked Sushi"
        price="679"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Seafood Special Baked Sushi"
        price="679"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Kohaku Tendon"
        price="419"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Kakiage Tendon"
        price="343"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Shrimp Tendon (8pcs)"
        price="530"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Shrimp Tendon (5pc)"
        price="419"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Hanakatsu Don"
        price="378"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Yakibuta Don"
        price="353"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Kohaku Japanese White Rice"
        price="56"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />

      <LineItemForm
        name="Wild Tiger Prawn Tempura (5pcs)"
        price="387"
        appendCartOrder={appendCartOrder}
        category="Tendon Kohaku"
      />
    </div>
  );
}

export default OrderForm;
