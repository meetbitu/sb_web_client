import React from 'react';

function LineItem({ item }) {
  // @TODO: the key should be a line item id once we start storing that in the db
  return (
    <div className="line-item" key={item.order}>
      {item.quantity}x {item.order} {item.options} <span className="price">₱{item.price}</span>
      {item.additions &&
        <p className="description">
          {item.additions}
        </p>
      }
    </div>
  );
}

export default LineItem;
