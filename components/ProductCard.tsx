import React from 'react';
import { Product } from '../types';
import { HeartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onContactSeller: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onContactSeller }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
      onClick={() => onSelect(product)}
    >
      <div className="relative">
        <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.title} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-medium text-slate-700 truncate">{product.title}</h3>
          <p className="text-lg font-bold text-slate-900 mt-1">${product.price.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-1">Condition: {product.condition}</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onContactSeller(product);
                }}
                className="w-full bg-teal-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
                Contact Seller
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    // Future favorite/wishlist functionality can be hooked here
                }} 
                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50 flex-shrink-0"
                aria-label="Add to favorites"
            >
                <HeartIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;