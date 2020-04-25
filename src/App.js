import feathers from '@feathersjs/feathers';
import io from 'socket.io-client';
import React, { useState } from 'react';
import socketio from '@feathersjs/socketio-client';

// Components
import SubmitRequestForm from './components/SubmitRequestForm.jsx';
import OrderForm from './components/OrderForm.jsx';
import Orders from './components/Orders.jsx';

// Styles
import './App.css';

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
  const [orders, setOrders] = useState({});

  /**
   * Feathers websocket connection
   */
  /**
   * Request service setup
   */
  // Feathers api setup
  const baseUrl = {
    rest: 'http://appserver.socialbuyingapi.internal:3030',
    socket: 'http://social-buying-api.lndo.site',
  };

  const socket = io(baseUrl.socket, {
    transports: ['websocket'],
    forceNew: true
  });
  const client = feathers();
  client.configure(socketio(socket));

  /**
   * Invite service
   */
  const inviteService = client.service('invites');
  inviteService.on('created', invite => console.log('Created a invite', invite));

  /**
   * Order service
   */
  const orderService = client.service('orders');

  // Subscribe to all orders related to this invite
  client.on('connection', connection => {
    // On a new real-time connection, add it to the
    // orders channel
    client.channel('orders').join(connection);
  });

  orderService.on('created', order => console.log('Created a order', order));

  if (invite && invite._id) {
    orderService
      .find({ inviteId: invite._id })
      .then(data => {
        if (orders.length !== data.data.length) {
          setOrders(data.data);
        }
      });
  }

  // eslint-disable-next-line no-unused-vars
  function setInviteData(data) {
    setInvite(invite);
  }

  function renderForms() {
    if (invite) {
      return (
        <div className="order-container">
          <OrderForm
            invite={invite}
            orderService={orderService}
          />
        </div>
      );
    }
    else {
      return (<SubmitRequestForm
        setInvite={setInvite}
        inviteService={inviteService}
      />);
    }
  }

  function renderRelatedOrders() {
    return (orders.length) ? <Orders orders={orders} /> : '';
  }

  return (
    <div className="App">
      <header>
        <h1>Make Sabay</h1>
      </header>
      { renderForms() }
      { renderRelatedOrders() }
    </div>
  );
}

export default App;
