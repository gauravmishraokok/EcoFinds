import apiClient from './apiClient';

export const purchaseService = {
  // Checkout cart
  checkout: async () => {
    const response = await apiClient.post('/purchases/checkout');
    return response.data;
  },

  // Get user's purchases
  getPurchases: async () => {
    const response = await apiClient.get('/purchases');
    return response.data;
  },

  // Get user's sales
  getSales: async () => {
    const response = await apiClient.get('/purchases/sales');
    return response.data;
  },

  // Get single purchase
  getPurchase: async (id) => {
    const response = await apiClient.get(`/purchases/${id}`);
    return response.data;
  }
};
