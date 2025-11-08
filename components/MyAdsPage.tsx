import React from 'react';
import { Product, User } from '../types';
import ProductCard from './ProductCard';

interface MyAdsPageProps {
  currentUser: User;
  products: Product[];
  onProductSelect: (product: Product) => void;
  onNavigate: (page: string) => void;
  onContactSeller: (product: Product) => void;
}

const MyAdsPage: React.FC<MyAdsPageProps> = ({ currentUser, products, onProductSelect, onNavigate, onContactSeller }) => {
  const userProducts = products.filter(p => p.seller.id === currentUser.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Listings</h1>

      {userProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {userProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelect={onProductSelect} onContactSeller={onContactSeller} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md mt-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">No items listed</h2>
          <p className="mt-1 text-gray-500">You haven't listed any items for sale yet.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => onNavigate('sell')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              List Your First Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdsPage;