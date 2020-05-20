import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
// import Order from './Order.jsx';
import CheckoutCostSummary from './CheckoutCostSummary.jsx';
// import OrderCost from './OrderCost.jsx';

function Orders({ orders, ordersUpdateCheck, invite }) {
  // const [displayGroup, setDisplayGroup] = useState('person');
  // const [groupedOrders, setGroupedOrders] = useState([{
  //   header: '',
  //   orders: [],
  //   displayCost: false,
  // }]);
  const [displayOrders, setDisplayOrders] = useState([]);

  // const initialCost = !isNaN(invite.splitCost) ? invite.splitCost : 0;
  // const [splitCost, setSplitCost] = useState(initialCost);

  // const updateInviteRecord = (e) => {
  //   // If we add more fields this needs to be updated
  //   inviteService.patch(invite._id, {
  //     splitCost: parseFloat(e.currentTarget.value).toFixed(2),
  //   });
  // }

  // const handleSplitCostChange = (e) => {
  //   setSplitCost(e.currentTarget.value);
  // }

  // setGroupedOrders(groupOrders('person'));

  // function groupByPerson(event) {
  //   event.preventDefault();

  //   setDisplayGroup('person');
  // }

  // function noGrouping(event) {
  //   event.preventDefault();

  //   setDisplayGroup('none');
  // }

  // const groupOrders = useCallback(() => {
  //   const regroupedOrders = {};
  //   const ordersFormattedForState = [];
  //   const totalByName = [];
  //   switch (displayGroup) {
  //     case 'person':
  //       for (let o = orders.length - 1; o >= 0; o--) {
  //         if (typeof regroupedOrders[orders[o].name] === 'undefined') {
  //           regroupedOrders[orders[o].name] = [];
  //         }

  //         // regroupedOrders[orders[o].name].push(orders[o]);
  //         regroupedOrders[orders[o].name].push(<Order orderService={orderService} order={orders[o]} invite={invite} key={orders[o]._id} />);

  //         if (typeof totalByName[orders[o].name] === 'undefined') {
  //           totalByName[orders[o].name] = 0;
  //         }

  //         if (orders[o].cost) {
  //           totalByName[orders[o].name] += parseFloat(orders[o].cost, 10);
  //         }
  //       }

  //       for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
  //         const header = Object.keys(regroupedOrders)[i];
  //         // Add portion of fixed costs
  //         if (!isNaN(invite.splitCost)) {
  //           totalByName[header] += (invite.splitCost / Object.keys(regroupedOrders).length);
  //         }
  //         ordersFormattedForState.push({
  //           header: `${header}: ₱${parseFloat(totalByName[header]).toFixed(2)}`,
  //           orders: regroupedOrders[header],
  //           displayCost: false,
  //         });
  //       }
  //       break;

  //     // case 'item':
  //     //   for (let o = orders.length - 1; o >= 0; o--) {
  //     //     if (typeof regroupedOrders[`${orders[o].order} - ${orders[o].spice}`] === 'undefined') {
  //     //       regroupedOrders[`${orders[o].order} - ${orders[o].spice}`] = [];
  //     //     }

  //     //     // regroupedOrders[`${orders[o].order} - ${orders[o].spice}`].push(orders[o]);
  //     //     regroupedOrders[`${orders[o].order} - ${orders[o].spice}`].push(<Order orderService={orderService} order={orders[o]} key={orders[o]._id} />);
  //     //   }

  //     //   for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
  //     //     const header = Object.keys(regroupedOrders)[i];
  //     //     ordersFormattedForState.push({
  //     //       header: header,
  //     //       orders: regroupedOrders[header],
  //     //       displayCost: false,
  //     //     });
  //     //   }
  //     //   break;

  //     default:
  //       for (let o = orders.length - 1; o >= 0; o--) {
  //         if (typeof regroupedOrders['Enter final cost'] === 'undefined') {
  //           regroupedOrders['Enter final cost'] = [];
  //         }

  //         regroupedOrders['Enter final cost'].push(<Order orderService={orderService} order={orders[o]} key={orders[o]._id} displayCost />);
  //       }

  //       for (let i = Object.keys(regroupedOrders).length - 1; i >= 0; i--) {
  //         const header = Object.keys(regroupedOrders)[i];
  //         ordersFormattedForState.push({
  //           header: header,
  //           orders: regroupedOrders[header],
  //           displayCost: false,
  //         });
  //       }
  //       break;

  //   }

  //   return ordersFormattedForState;
  // }, [orders, displayGroup, orderService, invite.splitCost]);

  // useEffect(() => {
  //   const field = (
  //     <label>
  //     Split costs:
  //     <input
  //       type="number"
  //       step="0.01"
  //       name="split-cost"
  //       value={splitCost}
  //       onChange={handleSplitCostChange}
  //       onBlur={updateInviteRecord}
  //       placeholder="Split Cost"
  //      />
  //     </label>
  //   );
  //   setSplitCostField(field);
  // }, [displayGroup, splitCost, updateInviteRecord]);


  const renderOrders = useCallback(() => {
    return (
      <div className="orders">
        <h2>{invite.text}</h2>
        {orders.map(order => {
          const projectedCustomerCount = orders.length;
          // let price = n => isNaN(n.price) ? 0 : parseFloat(n.price) * parseFloat(n.quantity);
          // const subtotal = order.items.reduce((previous, current) => previous + price(current), 0);

          let total = order.subtotal;
          if (invite.splitCost) {
            total += parseFloat(invite.splitCost) / parseFloat(projectedCustomerCount);
          }

          return (
            <div className="order" key={order._id}>
              <h3>{order.name}</h3>
              <CheckoutCostSummary
                items={order.items}
                invite={invite}
                total={total}
                orderCount={projectedCustomerCount}
              />
            </div>
          );
        })}
      </div>
    );
  }, [orders, invite]);

  useEffect(() => {
    setDisplayOrders(
      renderOrders()
    );
  }, [renderOrders, ordersUpdateCheck]);


  return (
    <div>
      {displayOrders}
    </div>
  );
}

export default Orders;
