import React, { useState } from 'react';
import Order from './Order.jsx';
// import OrderCost from './OrderCost.jsx';

function Orders({ orders, orderService }) {
  const [groupBy, setGroupBy] = useState('person');

  const displayOrders = () => {
    let display = '';
    switch (groupBy) {
      case 'person':
        const personHeaders = orders.reduce((header, order) => {
          return header.includes(order.name) ? header : [...header, order.name];
        }, []);

        display = personHeaders.map(header => {
          let total = 0;
          const matchingOrders = orders.map(order => {
            if (order.cost) {
              total += parseFloat(order.cost, 10);
            }
            return (order.name === header) ? <Order order={order} key={order._id}/> : '';
          });

          const renderTotal = parseFloat(total).toFixed(2);
          return (
            <div key={header}>
              <h3>{header}: ₱{renderTotal}</h3>
              {matchingOrders}
            </div>
          );
        });
        break;

      case 'item':
        const itemHeaders = orders.reduce((header, order) => {
          return header.includes(order.order) ? header : [...header, `${order.order} - ${order.spice}`];
        }, []);

        display = itemHeaders.map(header => {
          const matchingOrders = orders.map(order => {
            return (`${order.order} - ${order.spice}` === header) ?
              <Order
                order={order}
                key={order._id}
              /> :
              '';
          });
          return (
            <div key={header}>
              <h3>{header}</h3>
              {matchingOrders}
            </div>
          );
        });
        break;

      default:
        display =  orders.map((order, index, array) => {
          return (
            <Order
              order={order}
              key={order._id}
              orderService={orderService}
              displayCost
            />
          );
        });
    }

    return display;
  }

  function groupByPerson(event) {
    event.preventDefault();

    setGroupBy('person');
  }

  function groupByDish(event) {
    event.preventDefault();

    setGroupBy('item');
  }

  function noGrouping(event) {
    event.preventDefault();

    setGroupBy('none');
  }

  return (
    <div className="orders">
      <button
        onClick={groupByPerson}
      >
        By Person
      </button>
      <button
        onClick={groupByDish}
      >
        By Dish
      </button>
      <button
        onClick={noGrouping}
      >
        All items
      </button>

      {displayOrders()}
    </div>
  );
}

export default Orders;
