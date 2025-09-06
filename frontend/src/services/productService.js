import apiClient from './apiClient';

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },

  // Get user's products
  getMyProducts: async () => {
    const response = await apiClient.get('/products/my-products');
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  }
};
