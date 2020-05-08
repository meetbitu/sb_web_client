import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import React, {
  useEffect,
  useState,
} from 'react';

// Components
import SubmitRequestForm from './components/SubmitRequestForm.jsx';
import OrderForm from './components/OrderForm.jsx';
import Orders from './components/Orders.jsx';

// Styles
import './App.css';
import coco from './coco.png';

/**
 * Feathers websocket connection
 */
const socket = io(process.env.REACT_APP_API_URL);
const client = feathers();
client.configure(feathers.socketio(socket));

// this works:
// client.service('invites').create({
//   text: 'invite from client init'
// });

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
  const [ordersUpdateCheck, setOrdersUpdateCheck] = useState('');

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

  // Get existing orders
  useEffect(() => {
    if (invite && invite._id) {
      // @TOOD: Connect to an invite specific room
      orderService
        .find({ query: { inviteId: invite._id }})
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

  function renderForms() {
    if (invite) {
      return (
        <OrderForm
          invite={invite}
          orderService={orderService}
        />
      );
    }
    else {
      return (<SubmitRequestForm
        setInvite={setInvite}
        inviteService={inviteService}
      />);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={coco} className="App-logo" alt="logo" />
        <h1>Make Sabay</h1>
      </header>
      { renderForms() }
      <Orders
        orders={orders}
        orderService={orderService}
        ordersUpdateCheck={ordersUpdateCheck}
      />
    </div>
  );
}

export default App;
