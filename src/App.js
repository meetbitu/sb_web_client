import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import React, {
  useEffect,
  useState,
} from 'react';

// Components
import Cart from './components/Cart.jsx';
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

// Feathers Services
const inviteService = client.service('invites');
const orderService = client.service('orders');

function App() {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  let existingInvite = null;
  if (searchParams.get('invite') && searchParams.get('text')) {
    existingInvite = {
      _id: searchParams.get('invite'),
      text: searchParams.get('text'),
    };
  }

  const [invite, setInvite] = useState(existingInvite);
  const [orders, setOrders] = useState([]);
  const [displayCheckout, setDisplayCheckout] = useState(false);
  const [cartOrders, setCartOrders] = useState([]);
  const [ordersUpdateCheck, setOrdersUpdateCheck] = useState('');
  const [inviteTypeData, setInviteTypeData] = useState(null);

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
      setOrders(orders.concat(order));
      setOrdersUpdateCheck(JSON.stringify(orders.concat(order)));
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

  function renderMain() {
    let render = null;
    if (displayCheckout) {
      const customerCount = Object.keys(orders).length;
      render = (
        <Checkout
          invite={invite}
          cartOrders={cartOrders}
          orderService={orderService}
          customerCount={customerCount}
          toggleCheckout={toggleCheckout}
        />
      );
    }
    else if (invite) {
      render = (
        <OrderForm
          invite={invite}
          cartOrders={cartOrders}
          setCartOrders={setCartOrders}
        />
      );
    }
    else if (inviteTypeData) {
      if (inviteTypeData.type === 'coco') {
        render = (
          <SubmitCocoInviteForm
            setInvite={setInvite}
            inviteService={inviteService}
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

  function renderOrders() {
    return invite && orders.length ?
      (<Orders
        orders={orders}
        orderService={orderService}
        inviteService={inviteService}
        ordersUpdateCheck={ordersUpdateCheck}
        invite={invite}
      />) :
      '';
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
      { renderOrders() }
      { Object.keys(cartOrders).length > 0 && !displayCheckout &&
        <Cart
          cartOrders={cartOrders}
          toggleCheckout={toggleCheckout}
        />
      }
    </div>
  );
}

export default App;
