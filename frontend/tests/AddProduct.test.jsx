import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddProduct from '../src/pages/AddProduct';

// Mock the services and hooks
jest.mock('../src/services/productService', () => ({
  productService: {
    getCategories: jest.fn(() => Promise.resolve({ categories: [] })),
    createProduct: jest.fn(() => Promise.resolve({}))
  }
}));

jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1', username: 'testuser' }
  })
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AddProduct Component', () => {
  test('renders add product form', () => {
    renderWithRouter(<AddProduct />);
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  test('renders form fields', () => {
    renderWithRouter(<AddProduct />);
    expect(screen.getByLabelText('Product Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
    expect(screen.getByLabelText('Price (USD) *')).toBeInTheDocument();
  });
});
