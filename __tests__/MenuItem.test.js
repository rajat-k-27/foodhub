import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '@/context/CartContext';
import MenuItem from '@/components/MenuItem';

const mockItem = {
  _id: '1',
  name: 'Margherita Pizza',
  description: 'Classic pizza with fresh mozzarella',
  price: 12.99,
  image: 'https://example.com/pizza.jpg',
  category: 'Pizza',
};

describe('MenuItem Component', () => {
  test('renders menu item correctly', () => {
    render(
      <CartProvider>
        <MenuItem item={mockItem} />
      </CartProvider>
    );

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Classic pizza with fresh mozzarella')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
  });

  test('displays image with correct attributes', () => {
    render(
      <CartProvider>
        <MenuItem item={mockItem} />
      </CartProvider>
    );

    const image = screen.getByAltText('Margherita Pizza');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockItem.image);
  });

  test('add to cart button is present', () => {
    render(
      <CartProvider>
        <MenuItem item={mockItem} />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  test('clicking add to cart button works', () => {
    render(
      <CartProvider>
        <MenuItem item={mockItem} />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // Button should still be clickable after adding
    expect(addButton).toBeInTheDocument();
  });
});
