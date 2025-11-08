
import React from 'react';
import { Product } from '../types';
import { ArrowLeftIcon } from './icons';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onContactSeller: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onContactSeller }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 font-semibold">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Marketplace
      </button>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover" />
          <div className="p-8 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-3xl font-light text-indigo-600 mt-2">${product.price}</p>
            <div className="border-t my-6"></div>
            <div className="flex items-center mb-6">
              <img className="h-12 w-12 rounded-full object-cover" src={product.seller.avatarUrl} alt={product.seller.name} />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Sold by</p>
                <p className="font-semibold text-gray-800">{product.seller.name}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed flex-grow">{product.description}</p>
            <button
              onClick={() => onContactSeller(product)}
              className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Seller & Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
