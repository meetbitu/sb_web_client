import React, {
  // useState,
  useEffect,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function SubmitCocoInviteForm({ setInvite, inviteService }) {
  // const initialState = {
  //     request: "",
  // };
  // const [input, setInput] = useState(initialState);
  // const [startedTyping, setTyping] = useState(false);

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'submit request form',
      'first_contact_time': Date.now(),
    });
  }, []); // Only fire once

  // const handleInputChange = (e) => {
  //   if (!startedTyping) {
  //     setTyping(true);

  //     Mixpanel.track('Started typing in the initial request form');
  //   }

  //   setInput({
  //     ...input,
  //     [e.currentTarget.name]: e.currentTarget.value
  //   });
  // }

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: "Let's order CoCo together",
      timestamp: Date.now(),
      // text: `Order CoCo with ${event.target.request.value}`,
    }).then((data) => {
      setInvite(data);

      Mixpanel.track('Successfully created a request');

      // Should we update the browser address?
    }).catch(e => {
      console.log(e);
      // @TODO: Display an error message
    });

  }

  return (
    <form
      className="submit-request"
      onSubmit={submitRequest}
    >
{/*      <input
        type="text"
        name="request"
        value={input.request}
        onChange={handleInputChange}
        placeholder="Name 🍛"
      />*/}
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

export default SubmitCocoInviteForm;
