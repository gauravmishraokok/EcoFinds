import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, isLoading, error, title, subtitle }) => {
  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <h1 className="text-center">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>}
          {subtitle && <p className="text-lg text-gray-775">{subtitle}</p>}
        </div>
      )}
      
      <ProductList products={products} isLoading={isLoading}  />
    </div>
  );
};

export default ProductGrid;
\

