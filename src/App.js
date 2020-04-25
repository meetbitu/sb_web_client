import React, { useState } from 'react';

// Components
import SubmitRequestForm from './components/SubmitRequestForm.jsx';
import OrderForm from './components/OrderForm.jsx';

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

  // eslint-disable-next-line no-unused-vars
  function setInviteData(data) {
    setInvite(invite);
  }

  function renderForms() {
    if (invite) {
      return <OrderForm invite={invite} />;
    }
    else {
      return (<SubmitRequestForm
        setInvite={setInvite}
      />);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Make Sabay</h1>
      </header>
      { renderForms() }
    </div>
  );
}

export default App;
