import React, {
  useState,
} from 'react';

function LineItemForm({ name, options, price, appendCartOrder }) {
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
    }

    if (options && !input.options) {
      order.options = options[0];
    }

    appendCartOrder(order);
    setExpanded(false);
  }

  function increaseQuantity() {
    const increasedQuantity = quantity + 1;
    setQuantity(increasedQuantity);
  }


  function decreaseQuantity() {
    if (quantity > 0) {
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
      >
        {optionsSelect}
        <textarea
          type="text"
          name="additions"
          className="line-item-additional-info"
          onChange={handleInputChange}
          placeholder="Notes or requests"
        />
        <div className="quantity-widget">
          <button
            key="quantity-decrease"
            type="button"
            onClick={decreaseQuantity}
          >
            -
          </button>
          {quantity}
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
        <h2>{name}</h2>
        <span className="item-price"> ₱{price}</span>
      </button>

      {renderAddToCart()}
    </div>
  );
}

export default LineItemForm;
