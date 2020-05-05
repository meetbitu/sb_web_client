import React, { useState } from 'react';
import Order from './Order.jsx';
// import OrderCost from './OrderCost.jsx';

function Orders({ orders }) {
  const [groupBy, setGroupBy] = useState('none');

  const displayOrders = () => {
    switch (groupBy) {
      case 'person':
        const personHeaders = orders.reduce((header, order) => {
          return header.includes(order.name) ? header : [...header, order.name];
        }, []);

        return personHeaders.map(header => {
          const matchingOrders = orders.map(order => {
            if (order.name === header) {
              return <Order order={order} key={order._id}/>;
            }
          });
          return (
            <div key={header}>
              <h3>{header}</h3>
              {matchingOrders}
            </div>
          );
        });
        break;

      case 'item':
        const itemHeaders = orders.reduce((header, order) => {
          return header.includes(order.order) ? header : [...header, order.order];
        }, []);

        return itemHeaders.map(header => {
          const matchingOrders = orders.map(order => {
            if (order.order === header) {
              return <Order order={order} key={order._id}/>;
            }
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
        return orders.map((order, index, array) => {
          return <Order order={order} key={order._id}/>;
        });
    }
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
      {displayOrders()}

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
    </div>
  );
}

export default Orders;
