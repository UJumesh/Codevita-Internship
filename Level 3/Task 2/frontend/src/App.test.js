import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the real-time notification dashboard', () => {
  render(<App />);

  expect(screen.getByText(/real-time skill notification/i)).toBeInTheDocument();
  expect(screen.getByText(/connection status/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter skill name/i)).toBeInTheDocument();
});
