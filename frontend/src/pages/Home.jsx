import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import { Filter, SortAsc, Leaf, Recycle, Heart, Sparkles } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'createdAt',
    order: searchParams.get('order') || 'desc'
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = {
        page: 1,
        limit: 20,
        ...filters
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });
      
      const response = await productService.getProducts(params);
      setProducts(response.products);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.categories);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sort: 'createdAt',
      order: 'desc'
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 leaf-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-sage-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-terracotta-200 rounded-full opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-moss-200 rounded-full opacity-50 animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="relative bg-gradient-sage">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <Logo size="xl" className="animate-pulse-slow" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                EcoFinds
              </h1>
              <p className="text-xl md:text-2xl text-sage-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover and sell sustainable, eco-friendly products. Join our community 
                of environmentally conscious buyers and sellers making a difference.
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2 text-sage-100">
                  <Leaf className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Sustainable</span>
                </div>
                <div className="flex items-center gap-2 text-sage-100">
                  <Recycle className="w-5 h-5" />
                  <span className="text-sm font-medium">Circular Economy</span>
                </div>
                <div className="flex items-center gap-2 text-sage-100">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">Community Driven</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="shadow-xl">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Products
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sage-600 shadow-xl">
                  Start Selling
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card glass p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-sage-600" />
            <h2 className="text-2xl font-display font-semibold text-charcoal">Discover Products</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-charcoal mb-3">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-charcoal mb-3">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-charcoal mb-3">
                Sort By
              </label>
              <select
                value={`${filters.sort}-${filters.order}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-');
                  handleFilterChange('sort', sort);
                  handleFilterChange('order', order);
                }}
                className="input"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
          title={filters.search ? `Search Results for "${filters.search}"` : 'Featured Products'}
          subtitle={products.length > 0 ? `${products.length} products found` : ''}
        />
      </div>
    </div>
  );
};

export default Home;
