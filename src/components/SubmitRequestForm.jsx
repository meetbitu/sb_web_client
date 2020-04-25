import feathers from '@feathersjs/feathers';
import io from 'socket.io-client';
import React from 'react';
import socketio from '@feathersjs/socketio-client';

function SubmistRequestForm() {
  // Feathers api setup
  const baseUrl = {
    rest: 'http://appserver.socialbuyingapi.internal:3030',
    socket: 'http://social-buying-api.lndo.site',
  };

  // REST
  // const rest = require('@feathersjs/rest-client');
  // const client = feathers();

  // // Connect to a different URL
  // const restClient = rest(baseUrl.rest);

  // // Configure an AJAX library (see below) with that client
  // client.configure(restClient.fetch(window.fetch));

  // // Connect to the `http://feathers-api.com/invites` service
  // const inviteService = client.service('invites');

  // Websockets
  const socket = io(baseUrl.socket, {
    transports: ['websocket'],
    forceNew: true
  });

  const client = feathers();
  client.configure(socketio(socket));

  const inviteService = client.service('invites');

  inviteService.on('created', invite => console.log('Created a invite', invite));

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: event.target.request.value
    }).then((data) => {
      console.log(data);
    });

  }

  return (
    <form
      className="submit-request"
      onSubmit={submitRequest}
    >
      <input
        type="text"
        name="request"
        placeholder="Jolibee tonight 🍗"
      />
      <div className="form-actions">
        <button
          type="submit"
          className="request-submit"
        >
          Invite your friends
        </button>
      </div>
    </form>
  );
}

export default SubmistRequestForm;
