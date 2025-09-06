import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Eye } from 'lucide-react';
import Button from '../ui/Button';
import ImageGallery from '../ui/ImageGallery';
import Avatar from '../ui/Avatar';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    await addToCart(product._id, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getConditionColor = (condition) => {
    const colors = {
      'new': 'bg-green-100 text-green-800',
      'like-new': 'bg-blue-100 text-blue-800',
      'good': 'bg-yellow-100 text-yellow-800',
      'fair': 'bg-orange-100 text-orange-800',
      'poor': 'bg-red-100 text-red-800'
    };
    return colors[condition] || colors['good'];
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <Link to={`/products/${product._id}`} className="block">
        <ImageGallery
          images={product.images || ['/placeholder-image.svg']}
          alt={product.title}
          className="h-48 rounded-t-lg"
        />
      </Link>
      
      <div className="card-content">
        <div className="flex justify-between items-start mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
            {product.condition}
          </span>
          <span className="text-sm text-gray-500">{product.category?.name}</span>
        </div>
        
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to={`/products/${product._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={!product.isAvailable || product.isSold}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {product.seller && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Avatar 
                name={product.seller.username}
                size="xs"
              />
              <span className="text-sm text-gray-600">
                by {product.seller.username}
              </span>
            </div>
          </div>
        )}
        
        {(!product.isAvailable || product.isSold) && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {product.isSold ? 'Sold' : 'Unavailable'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
