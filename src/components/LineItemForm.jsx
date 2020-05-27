import React, {
  useState,
} from 'react';
import Mixpanel from '../imports/Mixpanel';

function LineItemForm({ name, options, price, appendCartOrder, category }) {
  const [expanded, setExpanded] = useState(false);

  const initialInput = {
    options: '',
    additions: '',
  };
  const [input, setInput] = useState(initialInput);
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  function toggleDish() {
    setExpanded(!expanded);
  }

  function onSubmit(e) {
    e.preventDefault();

    const order = {
      order: name,
      options: input.options,
      additions: input.additions,
      quantity,
      price,
      category,
    }

    if (options && !input.options) {
      order.options = options[0];
    }

    appendCartOrder(order);
    setExpanded(false);

    Mixpanel.track('Added an item to cart');
  }

  function increaseQuantity() {
    const increasedQuantity = quantity + 1;
    setQuantity(increasedQuantity);
  }


  function decreaseQuantity() {
    if (quantity > 1) {
      const decreasedQuantity = quantity - 1;
      setQuantity(decreasedQuantity);
    }
  }

  function renderAddToCart() {
    const optionsSelect = options ?
      <select name="options" onChange={handleInputChange}>{options.map(option => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>)
      )}
      </select> : '';
    return (expanded) ? (
      <form
        onSubmit={onSubmit}
        className="item-form"
      >
        {optionsSelect}
        {/*<textarea
          type="text"
          name="additions"
          className="line-item-additional-info"
          onChange={handleInputChange}
          placeholder="Notes or requests"
        />*/}
        <div className="add-to-cart-wrapper">
          <div className="quantity-widget">
            <button
              key="quantity-decrease"
              type="button"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button
              key="quantity-increase"
              type="button"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <button
            type="submit"
          >
            Add to cart
          </button>
        </div>
      </form>
    ) : '';
  }

  return (
    <div className="item">
      <button
        className="item-header"
        type="display-item"
        onClick={toggleDish}
      >
        <span className="item-name">{name}</span>
        <span className="item-price"> ₱{price}</span>
      </button>

      {renderAddToCart()}
    </div>
  );
}

export default LineItemForm;
