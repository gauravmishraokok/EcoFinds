import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home';

// Mock the services
jest.mock('../src/services/productService', () => ({
  productService: {
    getProducts: jest.fn(() => Promise.resolve({ products: [] })),
    getCategories: jest.fn(() => Promise.resolve({ categories: [] }))
  }
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  test('renders welcome message', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Welcome to EcoFinds')).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    renderWithRouter(<Home />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });
});
