import React, {
  useState,
  useEffect,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function SubmitCustomInviteForm({ setInvite, inviteService }) {
  const initialState = {
      request: "",
      textLength: 1,
  };
  const [input, setInput] = useState(initialState);
  const [startedTyping, setTyping] = useState(false);

  useEffect(() => {
    Mixpanel.first_contact({
      'first_contact': 'submit request form',
      'first_contact_time': Date.now(),
    });
  }, []); // Only fire once

  const handleInputChange = (e) => {
    if (!startedTyping) {
      setTyping(true);

      Mixpanel.track('Started typing in the custom request form');
    }

    let textLength = 0;
    if (e.currentTarget.value.length >= 12) {
      textLength = 12;
    }
    else if (e.currentTarget.value.length === 0) {
      textLength = 0;
    }
    else if (e.currentTarget.value.length <= 2) {
      textLength = 2;
    }
    else {
      textLength = e.currentTarget.value.length;
    }

    setInput({
      [e.currentTarget.name]: e.currentTarget.value,
      textLength,
    });
  }

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: `Let's order ${event.target.request.value} together`,
    }).then((data) => {
      setInvite(data);

      Mixpanel.track('Successfully created a request');

      // Should we update the browser address?
    });

  }



  return (
    <form
      className="submit-request custom"
      onSubmit={submitRequest}
    >
      Let's order <input
        style={{width: input.textLength + 'vw'}}
        type="text"
        name="request"
        value={input.request}
        onChange={handleInputChange}
        placeholder=""
      /> together
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

export default SubmitCustomInviteForm;
