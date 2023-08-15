import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders without crashing', () => {
  render(<Card />);
});