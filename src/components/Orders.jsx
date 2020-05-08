import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import Order from './Order.jsx';
// import OrderCost from './OrderCost.jsx';

function Orders({ orders, orderService, ordersUpdateCheck }) {
  const [displayGroup, setDisplayGroup] = useState('person');
  const [groupedOrders, setGroupedOrders] = useState([{
    header: '',
    orders: [],
    displayCost: false,
  }]);

  const groupOrders = useCallback(() => {
    const regroupedOrders = {};
    const ordersFormattedForState = [];
    const totalByName = [];
    switch (displayGroup) {
      case 'person':
        for (let o = orders.length - 1; o >= 0; o--) {
          if (typeof regroupedOrders[orders[o].name] === 'undefined') {
            regroupedOrders[orders[o].name] = [];
          }

          // regroupedOrders[orders[o].name].push(orders[o]);
          regroupedOrders[orders[o].name].push(<Order orderService={orderService} order={orders[o]} key={orders[o]._id} />);

          if (typeof totalByName[orders[o].name] === 'undefined') {
            totalByName[orders[o].name] = 0;
          }

          if (orders[o].cost) {
            totalByName[orders[o].name] += parseFloat(orders[o].cost, 10);
          }
        }

        for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
          const header = Object.keys(regroupedOrders)[i];
          ordersFormattedForState.push({
            header: `${header}: ₱${totalByName[header]}`,
            orders: regroupedOrders[header],
            displayCost: false,
          });
        }
        break;

      case 'item':
        for (let o = orders.length - 1; o >= 0; o--) {
          if (typeof regroupedOrders[`${orders[o].order} - ${orders[o].spice}`] === 'undefined') {
            regroupedOrders[`${orders[o].order} - ${orders[o].spice}`] = [];
          }

          // regroupedOrders[`${orders[o].order} - ${orders[o].spice}`].push(orders[o]);
          regroupedOrders[`${orders[o].order} - ${orders[o].spice}`].push(<Order orderService={orderService} order={orders[o]} key={orders[o]._id} />);
        }

        for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
          const header = Object.keys(regroupedOrders)[i];
          ordersFormattedForState.push({
            header: header,
            orders: regroupedOrders[header],
            displayCost: false,
          });
        }
        break;

      default:
        for (let o = orders.length - 1; o >= 0; o--) {
          if (typeof regroupedOrders['Enter final cost'] === 'undefined') {
            regroupedOrders['Enter final cost'] = [];
          }

          regroupedOrders['Enter final cost'].push(<Order orderService={orderService} order={orders[o]} key={orders[o]._id} displayCost />);
        }

        for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
          const header = Object.keys(regroupedOrders)[i];
          ordersFormattedForState.push({
            header: header,
            orders: regroupedOrders[header],
            displayCost: false,
          });
        }
        break;

    }

    return ordersFormattedForState;
  }, [orders, displayGroup, orderService]);

  // setGroupedOrders(groupOrders('person'));

  useEffect(() => {
    console.log('orders useeffect set group');
    setGroupedOrders(
      groupOrders()
      // groupOrders(),
      // groupOrders(),
    );
  }, [groupOrders, ordersUpdateCheck]);

  function groupByPerson(event) {
    event.preventDefault();

    setDisplayGroup('person');
  }

  function groupByDish(event) {
    event.preventDefault();

    setDisplayGroup('item');
  }

  function noGrouping(event) {
    event.preventDefault();

    setDisplayGroup('none');
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
      {groupedOrders.map(group => {
        return (
          <div className="group" key={group.header}>
            <h2>{group.header}</h2>
            {group.orders.map(order => order)}
          </div>
        )
      })}
    </div>
  );
}

export default Orders;
