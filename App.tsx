import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';
import ProfilePage from './components/ProfilePage';
import SellPage from './components/SellPage';
import MyAdsPage from './components/MyAdsPage';
import AdminPortal from './components/AdminPortal';
import PublishPage from './components/PublishPage';
import { MOCK_PRODUCTS, MOCK_TRANSACTIONS, USERS } from './constants';
import { Product, Transaction, ChatMessage, TransactionStatus } from './types';
import { HomeIcon, ChatBubbleOvalLeftEllipsisIcon, ShoppingCartIcon, ListBulletIcon, UserCircleIcon } from './components/icons';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentUser = USERS.CURRENT_USER;

  const handleNavigate = (page: string) => {
    setSelectedProduct(null);
    setSelectedTransaction(null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
    window.scrollTo(0, 0);
  };

  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentPage('chatDetail');
  };
  
  const handleContactSeller = (product: Product) => {
    // Check if a transaction already exists for this product and buyer
    let existingTransaction = transactions.find(t => t.product.id === product.id && t.buyer.id === currentUser.id);

    if (!existingTransaction) {
      // Create a new transaction if one doesn't exist
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        product: product,
        buyer: currentUser,
        seller: product.seller,
        status: TransactionStatus.PENDING,
        messages: [],
        events: [{ status: TransactionStatus.PENDING, date: new Date().toISOString() }],
      };
      setTransactions(prev => [...prev, newTransaction]);
      existingTransaction = newTransaction;
    }

    setSelectedTransaction(existingTransaction);
    setCurrentPage('chatDetail');
  };

  const handleProductAdd = (newProductData: Omit<Product, 'id' | 'seller'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: products.length + 1,
      seller: currentUser,
    };
    setProducts(prev => [newProduct, ...prev]);
    // For demo purposes, navigate to My Ads page after adding
    handleNavigate('my-ads');
    alert('Listing published successfully!');
  };

  const handleSendMessage = (transactionId: number, message: Omit<ChatMessage, 'id' | 'sender' | 'timestamp'>) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(t => {
        if (t.id === transactionId) {
          const newMessage: ChatMessage = {
            ...message,
            id: t.messages.length + 1,
            sender: currentUser,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return { ...t, messages: [...t.messages, newMessage] };
        }
        return t;
      })
    );
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
      setTransactions(prev => 
          prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
      setSelectedTransaction(updatedTransaction);
  };
  
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPage = () => {
    if (selectedProduct && currentPage === 'productDetail') {
      return <ProductDetail product={selectedProduct} onBack={() => handleNavigate('home')} onContactSeller={handleContactSeller} />;
    }
    if (selectedTransaction && currentPage === 'chatDetail') {
      return <ChatPage 
        transaction={selectedTransaction} 
        currentUser={currentUser} 
        onBack={() => handleNavigate('chat')} 
        onSendMessage={handleSendMessage} 
        onUpdateTransaction={handleUpdateTransaction}
      />;
    }

    switch (currentPage) {
      case 'sell':
        return <SellPage onProductAdd={handleProductAdd} />;
      case 'profile':
        return <ProfilePage currentUser={currentUser} transactions={transactions} onTransactionSelect={handleTransactionSelect} />;
      case 'chat':
        return <ChatListPage currentUser={currentUser} transactions={transactions} onTransactionSelect={handleTransactionSelect} />;
      case 'my-ads':
        return <MyAdsPage currentUser={currentUser} products={products} onProductSelect={handleProductSelect} onNavigate={handleNavigate} onContactSeller={handleContactSeller} />;
      case 'admin':
        return <AdminPortal onNavigate={handleNavigate} />;
      case 'publish':
        return <PublishPage />;
      case 'home':
      default:
        return <HomePage products={filteredProducts} onProductSelect={handleProductSelect} onBrowseAll={() => { /* can expand this later */}} onContactSeller={handleContactSeller} />;
    }
  };

  const showHeader = currentPage !== 'chatDetail';
  const showFooter = currentPage !== 'chatDetail';

  const navItems = [
    { page: 'home', label: 'Home', icon: HomeIcon },
    { page: 'chat', label: 'Chat', icon: ChatBubbleOvalLeftEllipsisIcon },
    { page: 'sell', label: 'Sell', icon: ShoppingCartIcon },
    { page: 'my-ads', label: 'My Ads', icon: ListBulletIcon },
    { page: 'profile', label: 'Profile', icon: UserCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {showHeader && (
        <Header 
          onNavigate={handleNavigate} 
          currentUser={currentUser} 
          currentPage={currentPage}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
      )}
      <main className="pb-24 md:pb-0">
        {renderPage()}
      </main>

      {showFooter && (
        <footer className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl z-50 h-20">
            <nav className="flex justify-around items-center h-full">
                {navItems.map(item => {
                    const isActive = currentPage === item.page;
                    if (item.page === 'sell') {
                        return (
                            <a key={item.page} onClick={() => handleNavigate(item.page)} className="flex flex-col items-center justify-center w-full cursor-pointer -mt-6">
                                <div className={`rounded-full p-4 transition-all duration-300 ${isActive ? 'bg-teal-600 scale-110 shadow-lg' : 'bg-teal-500 shadow-md'} text-white`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <span className={`text-xs font-medium mt-1 transition-colors ${isActive ? 'text-teal-500' : 'text-slate-500'}`}>{item.label}</span>
                            </a>
                        );
                    }
                    return (
                        <a key={item.page} onClick={() => handleNavigate(item.page)} className={`flex flex-col items-center justify-center w-full h-full transition-colors cursor-pointer ${isActive ? 'text-teal-500' : 'text-slate-500 hover:text-teal-500'}`}>
                            <item.icon className="w-7 h-7 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </a>
                    );
                })}
            </nav>
        </footer>
      )}
    </div>
  );
}

export default App;