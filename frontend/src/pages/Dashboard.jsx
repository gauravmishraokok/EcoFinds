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
      const products = productsResponse?.products || [];
      setRecentProducts(products.slice(0, 5));
      
      // Load sales data
      const salesResponse = await purchaseService.getSales();
      const sales = salesResponse?.sales || [];
      setRecentSales(sales.slice(0, 5));
      
      // Calculate stats
      const totalProducts = products.length;
      const totalSales = sales.length;
      const totalRevenue = sales.reduce((sum, sale) => sum + (sale?.totalPrice || 0), 0);
      
      // Load purchases for total purchases count
      const purchasesResponse = await purchaseService.getPurchases();
      const purchases = purchasesResponse?.purchases || [];
      const totalPurchases = purchases.length;
      
      setStats({
        totalProducts,
        totalSales,
        totalPurchases,
        totalRevenue
      });
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      // Set default values on error
      setStats({
        totalProducts: 0,
        totalSales: 0,
        totalPurchases: 0,
        totalRevenue: 0
      });
      setRecentProducts([]);
      setRecentSales([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-earth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-soft-gray rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="card p-6">
                    <div className="h-4 bg-soft-gray rounded mb-2"></div>
                    <div className="h-8 bg-soft-gray rounded"></div>
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
      <div className="min-h-screen bg-gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-charcoal">Dashboard</h1>
            <p className="text-dark-gray mt-2">Welcome back, {user?.username}!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-sage-100 rounded-lg">
                  <Package className="h-6 w-6 text-sage-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-gray">My Products</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-moss-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-moss-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-gray">Total Sales</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.totalSales}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-terracotta-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-terracotta-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-gray">Purchases</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.totalPurchases}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-2 bg-clay-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-clay-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-dark-gray">Revenue</p>
                  <p className="text-2xl font-bold text-charcoal">{formatPrice(stats.totalRevenue)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <div className="card">
              <div className="p-6 border-b border-soft-gray">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-display font-semibold text-charcoal">Recent Products</h2>
                  <Link to="/my-listings">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-medium-gray mb-4" />
                    <p className="text-dark-gray mb-4">No products yet</p>
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
                          <p className="text-sm font-medium text-charcoal truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-dark-gray">
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
            <div className="card">
              <div className="p-6 border-b border-soft-gray">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-display font-semibold text-charcoal">Recent Sales</h2>
                  <Link to="/sales">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentSales.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="mx-auto h-12 w-12 text-medium-gray mb-4" />
                    <p className="text-dark-gray">No sales yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale._id} className="flex items-center space-x-4">
                        <img
                          src={sale.product?.images?.[0] || '/placeholder-image.svg'}
                          alt={sale.product?.title || 'Product'}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {sale.product?.title || 'Unknown Product'}
                          </p>
                          <p className="text-sm text-dark-gray">
                            Sold to {sale.buyer?.username || 'Unknown Buyer'} • {formatDate(sale.purchaseDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-charcoal">
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
          <div className="mt-8 card p-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
