import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { productService } from '../services/productService';
import { purchaseService } from '../services/purchaseService';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Button from '../components/ui/Button';
import { 
  User, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Edit, 
  Plus,
  Eye,
  DollarSign
} from 'lucide-react';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalRevenue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load user's products
      const productsResponse = await productService.getMyProducts();
      setRecentProducts(productsResponse.products.slice(0, 5));
      
      // Load sales data
      const salesResponse = await purchaseService.getSales();
      setRecentSales(salesResponse.sales.slice(0, 5));
      
      // Calculate stats
      const totalProducts = productsResponse.products.length;
      const totalSales = salesResponse.sales.length;
      const totalRevenue = salesResponse.sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
      
      // Load purchases for total purchases count
      const purchasesResponse = await purchaseService.getPurchases();
      const totalPurchases = purchasesResponse.purchases.length;
      
      setStats({
        totalProducts,
        totalSales,
        totalPurchases,
        totalRevenue
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
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
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.username}!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Purchases</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPurchases}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                  <Link to="/my-listings">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">No products yet</p>
                    <Link to="/add-product">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product._id} className="flex items-center space-x-4">
                        <img
                          src={product.images?.[0] || '/placeholder-image.svg'}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatPrice(product.price)} • {product.views} views
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link to={`/products/${product._id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
                  <Link to="/sales">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentSales.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No sales yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale._id} className="flex items-center space-x-4">
                        <img
                          src={sale.product.images?.[0] || '/placeholder-image.svg'}
                          alt={sale.product.title}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {sale.product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Sold to {sale.buyer.username} • {formatDate(sale.purchaseDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(sale.totalPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/add-product">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
              <Link to="/my-listings">
                <Button variant="outline" className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Listings
                </Button>
              </Link>
              <Link to="/purchases">
                <Button variant="outline" className="w-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View Purchases
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
