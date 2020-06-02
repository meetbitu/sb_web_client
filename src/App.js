import feathers from '@feathersjs/client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import React, {
  useEffect,
  useState,
} from 'react';
import Mixpanel from './imports/Mixpanel';

// Components
import CartPreview from './components/CartPreview.jsx';
import Checkout from './components/Checkout.jsx';
import InviteTypeChooser from './components/InviteTypeChooser.jsx';
import OrderForm from './components/OrderForm.jsx';
import Orders from './components/Orders.jsx';
import SubmitCocoInviteForm from './components/SubmitCocoInviteForm.jsx';
import SubmitCustomInviteForm from './components/SubmitCustomInviteForm.jsx';

// Styles
import './App.css';

// Images
import coco from './coco.png';
import mos from './mos.png';
import tendon from './tendon.png';
import mitsuyado from './mitsuyado.png';

/**
 * Feathers websocket connection
 */
const socket = io(process.env.REACT_APP_API_URL);
const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(auth());

// Feathers Services
const inviteService = client.service('invites');
const orderService = client.service('orders');
const userService = client.service('users');

function App() {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  let existingInvite = null;
  if (searchParams.get('invite')) {
    existingInvite = {
      _id: searchParams.get('invite'),
    };
  }

  const [invite, setInvite] = useState(existingInvite);
  const [orders, setOrders] = useState([]);
  const [displayCheckout, setDisplayCheckout] = useState(false);
  const [displayOrders] = useState(searchParams.get('admin'));
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsUpdateCheck, setCartItemsUpdateCheck] = useState('');
  // ordersUpdateCheck is used to re-render the orders list. Uncomment when we display orders again.
  const [ordersUpdateCheck, setOrdersUpdateCheck] = useState('');
  const [inviteTypeData, setInviteTypeData] = useState(null);
  const [user, setUser] = useState(null);

  /**
   * Invite service
   */
  // Get new invites from the server
  // useEffect(() => {
  //   inviteService.on('created', invite => {
  //     // setMessageCount(messageCount + 1);
  //     // document.title = `${messageCount} new messages have been emitted`;
  //   });
  // }, []);

  /**
   * Order service
   */
  //
  // useEffect(() => {
  //   inviteService.on('created', invite => {

  //     // Subscribe to all orders related to this invite
  //     client.on('connection', connection => {
  //       // On a new real-time connection, add it to the
  //       // orders channel
  //       client.channel('orders').join(connection);
  //     });
  //   });
  // }, []); //only re-run the effect if new message comes in

  // Load invite object
  // WE know the difference between the existingInvite created from the url and the actual loaded object by checking for the timestamp
  useEffect(() => {
    if (invite && invite._id && !invite.timestamp) {
      inviteService.find({
        query: {
          _id: searchParams.get('invite')
        }
      })
      .then(data => setInvite(data.data[0]));
    }
  }, [invite, searchParams]);

  // Get existing orders
  useEffect(() => {
    if (invite && invite._id) {
      // @TOOD: Connect to an invite specific room
      orderService
        .find({
          query: {
            inviteId: invite._id,
            $sort: {
              timestamp: -1
            }
          }
        })
        .then(data => {
          setOrders(data.data);
        });
    }
  }, [invite]);

  // Get new orders as they come in
  useEffect(() => {
    orderService.on('created', order => {
      // Merge with orders and setOrders
      // Add to front of array to show up on top of admin screen
      setOrders([order].concat(orders));
      setOrdersUpdateCheck(JSON.stringify([order].concat(orders)));
    });
  });

  useEffect(() => {
    orderService.on('patched', updatedOrder => {
      const matchingIndex = orders.findIndex(order => order._id === updatedOrder._id);
      if (matchingIndex >= 0) {
        const updatedOrders = orders;
        updatedOrders[matchingIndex] = updatedOrder;
        setOrders(updatedOrders);
        setOrdersUpdateCheck(JSON.stringify(updatedOrders));
      }
    });
  });

  useEffect(() => {
    if (invite && invite._id) {
      inviteService.on('patched', updatedInvite => {
        if (updatedInvite._id === invite._id) {
          setInvite(updatedInvite);
        }
      });
    }
  }, [invite]);

  function setCartItemsWrapper(items) {
    setCartItems(items);
    setCartItemsUpdateCheck(JSON.stringify(items));
  }

  // Try manually running auth code here
  // client.service('users').create({
  //   username: 'my@email.com',
  //   password: 'my-password',
  // });
  client.reAuthenticate().then(() => {
     console.log('authenticated');
  })
  .then(() => {
    return client.get('authentication');
  })
  .then((userResponse) => {
    setUser(userResponse.user.username);
    console.log(user);
  })
  .catch(error => {
    console.log(error);
    // show login page
    // client.authenticate({
    //   strategy: 'local',
    //   username: 'my@email.com',
    //   password: 'my-password',
    // }).then(() => {
    //   // Logged in
    //   console.log('logged in');
    // }).catch(e => {
    //   // Show login page (potentially with `e.message`)
    //   console.error('Authentication error', e);
    // });
  });

  function renderMain() {
    let render = null;
    if (displayOrders && invite) {
      render = (
        <Orders
          orders={orders}
          orderService={orderService}
          inviteService={inviteService}
          ordersUpdateCheck={ordersUpdateCheck}
          invite={invite}
        />
      );
    }
    else if (displayCheckout) {
      Mixpanel.track('Viewed checkout page');
      render = (
        <Checkout
          invite={invite}
          setCartItems={setCartItemsWrapper}
          cartItemsUpdateCheck={cartItemsUpdateCheck}
          cartItems={cartItems}
          orderService={orderService}
          orderCount={Object.keys(orders).length}
          toggleCheckout={toggleCheckout}
        />
      );
    }
    else if (invite) {
      Mixpanel.track('Viewed order form');
      render = (
        <OrderForm
          invite={invite}
          cartItems={cartItems}
          setCartItems={setCartItemsWrapper}
        />
      );
    }
    else if (inviteTypeData) {
      if (inviteTypeData.type === 'coco') {
        render = (
          <SubmitCocoInviteForm
            setInvite={setInvite}
            inviteService={inviteService}
            userService={userService}
            user={user}
            authenticate={client.authenticate}
          />
        );
      }
      else if (inviteTypeData.type === 'custom') {
        render = (
          <SubmitCustomInviteForm
            setInvite={setInvite}
            inviteService={inviteService}
          />
        );
      }

    }
    else {
      render = (
        <InviteTypeChooser setInviteTypeData={setInviteTypeData} />
      );
    }

    return render;
  }

  function toggleCheckout() {
    setDisplayCheckout(!displayCheckout);
  }

  const appClasses = (inviteTypeData && inviteTypeData.type) ?
    `App ${inviteTypeData.type}` :
    "App";

  return (
    <div className={appClasses}>
      <header className="App-header">
        <div className="logos">
          <img src={coco} className="App-logo" alt="logo" />
          <img src={mos} className="App-logo" alt="logo" />
          <img src={tendon} className="App-logo" alt="logo" />
          <img src={mitsuyado} className="App-logo" alt="logo" />
        </div>
        <h1>Make Sabay</h1>
      </header>
      { renderMain() }
      { Object.keys(cartItems).length > 0 && !displayCheckout &&
        <CartPreview
          cartItems={cartItems}
          toggleCheckout={toggleCheckout}
        />
      }
    </div>
  );
}

export default App;
