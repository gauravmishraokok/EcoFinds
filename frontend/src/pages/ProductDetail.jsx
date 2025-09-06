import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import { ArrowLeft, ShoppingCart, Heart, Share2, User, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getProduct(id);
      setProduct(response.product);
    } catch (err) {
      setError('Product not found');
      console.error('Error loading product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (product.seller._id === user.id) {
      toast.error('Cannot add your own product to cart');
      return;
    }

    const result = await addToCart(product._id, 1);
    if (result.success) {
      toast.success('Added to cart!');
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImageIndex] || '/placeholder-image.svg'}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
                    {product.condition}
                  </span>
                  <span className="text-sm text-gray-500">{product.category?.name}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{product.views} views</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
              </div>

              {/* Seller Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={product.seller.profileImage || '/placeholder-image.svg'}
                    alt={product.seller.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{product.seller.username}</h4>
                    {product.seller.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.seller.location}
                      </div>
                    )}
                  </div>
                </div>
                {product.seller.bio && (
                  <p className="mt-2 text-sm text-gray-600">{product.seller.bio}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.isAvailable || product.isSold || product.seller._id === user?.id}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {!product.isAvailable || product.isSold ? 'Not Available' : 'Add to Cart'}
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5 mr-2" />
                    Save
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                </div>
                
                {(!product.isAvailable || product.isSold) && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      {product.isSold ? 'This item has been sold.' : 'This item is currently unavailable.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
