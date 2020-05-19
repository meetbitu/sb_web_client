import React from 'react';

function InviteTypeChoice({ type, title, description, setInviteTypeData, imgSrc, emoji }) {
  const typeClass = type.replace( /([A-Z])/g, " $1" ).toLowerCase();

  function renderGraphic() {
    let output = '';
    if (imgSrc) {
      output = <img src={imgSrc} className="App-logo" alt="logo" />;
    }
    else if (emoji) {
      output = (
        <div className="invite-type-emoji">
          {emoji}
        </div>
      );
    }

    return output;
  }

  function chooseThisType(event) {
    event.preventDefault();

    setInviteTypeData({
      type,
      // graphic: renderGraphic(),
    });
  }

  return (
    <div className={`invite-type-choice ${typeClass}`}>
      {renderGraphic()}
      <h2>{title}</h2>
      <p>{description}</p>

      <form
      className="submit-request"
      onSubmit={chooseThisType}
    >
      <div className="form-actions">
        <button
          type="submit"
          className="request-submit"
        >
          Select
        </button>
      </div>
    </form>
    </div>
  );
}

export default InviteTypeChoice;
