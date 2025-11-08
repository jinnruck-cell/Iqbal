
import React from 'react';
import { Transaction, User, TransactionStatus } from '../types';
import { HandshakeIcon } from './icons';

interface ProfilePageProps {
  currentUser: User;
  transactions: Transaction[];
  onTransactionSelect: (transaction: Transaction) => void;
}

const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
        case TransactionStatus.COMPLETED: return 'bg-green-100 text-green-800';
        case TransactionStatus.ITEM_SHIPPED: return 'bg-blue-100 text-blue-800';
        case TransactionStatus.PAYMENT_PROCESSING: return 'bg-indigo-100 text-indigo-800';
        case TransactionStatus.OFFER_ACCEPTED: return 'bg-purple-100 text-purple-800';
        case TransactionStatus.OFFER_MADE: return 'bg-yellow-100 text-yellow-800';
        case TransactionStatus.CANCELLED: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, transactions, onTransactionSelect }) => {
  const userTransactions = transactions.filter(
    (t) => t.buyer.id === currentUser.id || t.seller.id === currentUser.id
  );
  
  const activeTransactions = userTransactions.filter(t => t.status !== TransactionStatus.COMPLETED && t.status !== TransactionStatus.CANCELLED);
  const completedTransactions = userTransactions.filter(t => t.status === TransactionStatus.COMPLETED);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full mr-6 ring-4 ring-indigo-200" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
          <p className="text-gray-500">Member since 2023</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Transactions ({activeTransactions.length})</h2>
            {activeTransactions.length > 0 ? (
                <ul className="space-y-4">
                    {activeTransactions.map(t => (
                        <li key={t.id} onClick={() => onTransactionSelect(t)} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors">
                           <img src={t.product.imageUrl} alt={t.product.title} className="w-16 h-16 rounded-md object-cover mr-4"/>
                           <div className="flex-grow">
                                <p className="font-semibold text-gray-800">{t.product.title}</p>
                                <p className="text-sm text-gray-500">
                                    {t.buyer.id === currentUser.id ? `As Buyer with ${t.seller.name}` : `As Seller with ${t.buyer.name}`}
                                </p>
                           </div>
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(t.status)}`}>
                                {t.status}
                           </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No active transactions.</p>
            )}
        </div>

         {/* Completed Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History ({completedTransactions.length})</h2>
            {completedTransactions.length > 0 ? (
                <ul className="space-y-4">
                     {completedTransactions.map(t => (
                        <li key={t.id} onClick={() => onTransactionSelect(t)} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors">
                           <img src={t.product.imageUrl} alt={t.product.title} className="w-16 h-16 rounded-md object-cover mr-4"/>
                           <div className="flex-grow">
                                <p className="font-semibold text-gray-800">{t.product.title}</p>
                                <p className="text-sm text-gray-500">
                                    {t.buyer.id === currentUser.id ? `Purchased from ${t.seller.name}` : `Sold to ${t.buyer.name}`}
                                </p>
                           </div>
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(t.status)}`}>
                                {t.status}
                           </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No completed transactions yet.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
