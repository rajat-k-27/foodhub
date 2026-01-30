import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';

// Test component that uses the cart context
function TestComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount, clearCart } = useCart();

  const testItem = {
    _id: '1',
    name: 'Test Pizza',
    price: 10.99,
    image: 'test.jpg',
  };

  return (
    <div>
      <div data-testid="cart-count">{getCartItemCount()}</div>
      <div data-testid="cart-total">{getCartTotal().toFixed(2)}</div>
      <button onClick={() => addToCart(testItem)}>Add Item</button>
      <button onClick={() => removeFromCart('1')}>Remove Item</button>
      <button onClick={() => updateQuantity('1', 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('10.99');
  });

  test('should increase quantity when adding same item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-total').textContent).toBe('21.98');
  });

  test('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    const removeButton = screen.getByText('Remove Item');

    fireEvent.click(addButton);
    fireEvent.click(removeButton);

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0.00');
  });

  test('should update item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    const updateButton = screen.getByText('Update Quantity');

    fireEvent.click(addButton);
    fireEvent.click(updateButton);

    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-total').textContent).toBe('21.98');
  });

  test('should clear cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    const clearButton = screen.getByText('Clear Cart');

    fireEvent.click(addButton);
    fireEvent.click(clearButton);

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0.00');
  });

  test('should persist cart to localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    const savedCart = localStorage.getItem('cart');
    expect(savedCart).toBeTruthy();
    
    const parsedCart = JSON.parse(savedCart);
    expect(parsedCart).toHaveLength(1);
    expect(parsedCart[0].name).toBe('Test Pizza');
  });
});
