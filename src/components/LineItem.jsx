import React from 'react';

function LineItem({ item, removeCartItem }) {
  // @TODO: the key should be a line item id once we start storing that in the db
  const totalPrice = parseFloat(item.quantity) * parseFloat(item.price);

  return (
    <div className="line-item" key={item.order}>
      {removeCartItem &&
        <span
          role="img"
          aria-label="remove item from cart"
          className="remove-item"
          title="Remove this item from your cart"
          onClick={() => removeCartItem(item)}
        >🚫</span>
      }
      {item.quantity}x {item.order} {item.options} <span className="price">₱{totalPrice}</span>
      {item.additions &&
        <p className="description">
          {item.additions}
        </p>
      }
    </div>
  );
}

export default LineItem;
