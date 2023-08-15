import { render, screen } from '@testing-library/react';
import Deck from './Deck';

test('renders without crashing', () => {
  render(<Deck />);
});