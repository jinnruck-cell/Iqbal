import React from 'react';
import { Product } from '../types';
import { GridIcon, HandshakeIcon } from './icons';
import ProductCard from './ProductCard';

interface HomePageProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
    onBrowseAll: () => void;
    onContactSeller: (product: Product) => void;
}

const CATEGORIES = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1542393545-18f5cd20a1f5?q=80&w=800' },
    { name: 'Home Goods', image: 'https://images.unsplash.com/photo-1598971861713-56d8a7825272?q=80&w=800' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1602293589930-4538de3a5323?q=80&w=800' },
]

const HomePage: React.FC<HomePageProps> = ({ products, onProductSelect, onBrowseAll, onContactSeller }) => {
    const trendingProducts = products.slice(0, 4);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] text-white">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop" 
                    alt="Modern living room with leather chair" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start z-20">
                    <h1 className="text-4xl md:text-5xl font-bold !leading-tight max-w-2xl text-shadow-md">
                        Relux: Smart Finds, Secured. Buy & Sell Used Goods with Confidence
                    </h1>
                    <p className="mt-4 text-lg max-w-xl text-slate-100 text-shadow">
                        Our Escrow System Protects Both Buyers & Sellers
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button onClick={onBrowseAll} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-md transition-colors text-base shadow-lg">
                            Browse Items
                        </button>
                        <button className="bg-black/20 backdrop-blur-sm border border-white/50 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-md transition-colors text-base">
                            Learn About Escrow
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                    {/* Featured Categories */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-800 mb-8">Featured Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {CATEGORIES.map(cat => (
                                 <div key={cat.name} className="relative rounded-lg overflow-hidden h-48 group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
                                     <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                     <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-md text-white">
                                         <GridIcon className="w-5 h-5"/>
                                     </div>
                                     <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-white">{cat.name}</h3>
                                 </div>
                            ))}
                        </div>
                    </section>

                    {/* Trending Items */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-800 mb-8">Trending Items</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trendingProducts.map(product => (
                                <ProductCard key={product.id} product={product} onSelect={onProductSelect} onContactSeller={onContactSeller} />
                            ))}
                        </div>
                    </section>
                    
                    {/* How it Works */}
                    <section>
                         <div className="bg-teal-100/50 border border-teal-200 rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                             <div className="flex-shrink-0 bg-white p-4 rounded-full shadow">
                                <HandshakeIcon className="w-10 h-10 text-teal-500" />
                             </div>
                             <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-slate-800">How It Works:</h3>
                                <p className="text-slate-600 mt-1 text-lg">Payment is Held Securely Until You Confirm Receipt.</p>
                             </div>
                             <button className="mt-4 md:mt-0 flex-shrink-0 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Explore More
                            </button>
                         </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomePage;