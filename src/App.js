import React, { useState } from 'react';

// Components
import SubmitRequestForm from './components/SubmitRequestForm.jsx';
import OrderForm from './components/OrderForm.jsx';

// Styles
import './App.css';

function App() {

  const [order, setOrder] = useState(false);
  const [_id, setId] = useState(null);

  function switchForm() {
    setOrder(!order);
  }

  function setInviteId(_id) {
    setId(_id);
  }

  function renderForms() {
    if (order && _id) {
      return <OrderForm _id={_id} />;
    }
    else {
      return (<SubmitRequestForm
        switchForm={switchForm}
        setInviteId={setInviteId}
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
