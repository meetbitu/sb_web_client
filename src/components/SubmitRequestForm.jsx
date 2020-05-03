import React, {
  useState,
  useEffect,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function SubmistRequestForm({ setInvite, inviteService }) {
  const initialState = {
      request: "",
  };
  const [input, setInput] = useState(initialState);
  const [startedTyping, setTyping] = useState(false);

  useEffect(() => {
    Mixpanel.first_contact('submit request form');
  }, []); // Only fire once

  const handleInputChange = (e) => {
    if (!startedTyping) {
      setTyping(true);

      Mixpanel.track('Started typing in the initial request form');
    }

    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: event.target.request.value
    }).then((data) => {
      setInvite(data);

      Mixpanel.track('Successfully created a request');

      // Should we update the browser address?
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
        value={input.request}
        onChange={handleInputChange}
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
