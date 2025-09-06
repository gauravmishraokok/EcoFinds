import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { purchaseService } from '../services/purchaseService';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Button from '../components/ui/Button';
import { Package, Calendar, User, ArrowLeft } from 'lucide-react';

const Purchases = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await purchaseService.getPurchases();
      setPurchases(response.purchases);
    } catch (err) {
      setError('Failed to load purchases');
      console.error('Error loading purchases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
      refunded: { color: 'bg-gray-100 text-gray-800', text: 'Refunded' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
                <p className="text-gray-600 mt-1">View all your past purchases</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Package className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your purchase history here.</p>
              <Link to="/">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {purchases.map((purchase) => (
                <div key={purchase._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={purchase.product.images?.[0] || '/placeholder-image.svg'}
                          alt={purchase.product.title}
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                        <div>
                          <Link to={`/products/${purchase.product._id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                              {purchase.product.title}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {purchase.seller.username}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(purchase.purchaseDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(purchase.status)}
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          {formatPrice(purchase.totalPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {purchase.quantity}
                        </p>
                      </div>
                    </div>
                    
                    {purchase.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {purchase.notes}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Order ID: {purchase._id.slice(-8).toUpperCase()}
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/products/${purchase.product._id}`}>
                          <Button variant="outline" size="sm">
                            View Product
                          </Button>
                        </Link>
                        {purchase.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Purchases;
