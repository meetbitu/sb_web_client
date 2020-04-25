import React from 'react';
import './App.css';

function App() {

  function submitRequest(event) {
    event.preventDefault();
    // @TODO: Feathers client
  }

  return (
    <div className="App">
      <header>
        <h1>Social Buying</h1>
      </header>
      <form className="submit-request" onSubmit={submitRequest}>
        <input type="text" />
      </form>
    </div>
  );
}

export default App;
