import apiClient from './apiClient';

export const cartService = {
  // Get user's cart
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart', {
      productId,
      quantity
    });
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/${itemId}`, {
      quantity
    });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  }
};
