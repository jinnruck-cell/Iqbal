import React from 'react';
import { SearchIcon, BellIcon, ReluxLogoIcon } from './icons';

interface HeaderProps {
    onNavigate: (page: string) => void;
    currentUser: { name: string; avatarUrl: string };
    currentPage: string;
    searchQuery: string;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentUser, currentPage, searchQuery, onSearch }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40 hidden md:block">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                         <a onClick={() => onNavigate('home')} className="flex items-center gap-3 cursor-pointer">
                            <ReluxLogoIcon className="w-9 h-9 text-teal-500" />
                            <div>
                                <span className="text-2xl font-bold text-slate-800">Relux</span>
                                <p className="text-xs text-slate-500 -mt-1">Secure your second-hand treasures</p>
                            </div>
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        <a 
                            onClick={() => onNavigate('sell')} 
                            className={`font-medium cursor-pointer px-4 py-2 rounded-md transition-colors ${currentPage === 'sell' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-600'}`}
                        >
                            Sell
                        </a>
                        <a onClick={() => onNavigate('home')} className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer">Buy</a>
                    </nav>

                    {/* Icons & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-slate-400" />
                            </span>
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => onSearch(e.target.value)}
                                className="block w-full max-w-xs pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <button className="relative text-slate-500 hover:text-slate-800">
                           <BellIcon className="w-6 h-6" />
                           <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                           </span>
                        </button>
                        
                        <div className="h-8 w-px bg-slate-200"></div>

                        <a onClick={() => onNavigate('profile')} className="flex items-center cursor-pointer group">
                             <img className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-2 ring-transparent group-hover:ring-teal-500 transition-all" src={currentUser.avatarUrl} alt={currentUser.name} />
                        </a>
                         <a onClick={() => onNavigate('admin')} className="text-gray-600 hover:text-teal-600 font-medium cursor-pointer text-sm">Admin</a>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;