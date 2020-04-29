import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Make Sabay/i);
  expect(header).toBeInTheDocument();
});
