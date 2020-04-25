import React from 'react';

function SubmistRequestForm({ setInvite, inviteService }) {

  function submitRequest(event) {
    event.preventDefault();

    // Use the invites service from the server
    inviteService.create({
      text: event.target.request.value
    }).then((data) => {
      setInvite(data);
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
