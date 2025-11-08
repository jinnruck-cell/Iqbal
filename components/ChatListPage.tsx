import React from 'react';
import { Transaction, User } from '../types';

interface ChatListPageProps {
  currentUser: User;
  transactions: Transaction[];
  onTransactionSelect: (transaction: Transaction) => void;
}

const ChatListPage: React.FC<ChatListPageProps> = ({ currentUser, transactions, onTransactionSelect }) => {
  const userTransactions = transactions.filter(
    (t) => t.buyer.id === currentUser.id || t.seller.id === currentUser.id
  );

  const getOtherParticipant = (transaction: Transaction) => {
      return transaction.buyer.id === currentUser.id ? transaction.seller : transaction.buyer;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>
      
      {userTransactions.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {userTransactions.map(t => {
              const otherUser = getOtherParticipant(t);
              const lastMessage = t.messages[t.messages.length - 1];

              return (
                <li key={t.id} onClick={() => onTransactionSelect(t)} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-12 h-12 rounded-full object-cover mr-4"/>
                  <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-800">{otherUser.name}</p>
                          {lastMessage && <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{lastMessage.timestamp}</p>}
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {lastMessage ? `${lastMessage.sender.id === currentUser.id ? "You: " : ""}${lastMessage.text}` : `Chat about ${t.product.title}`}
                      </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
         <div className="text-center bg-white p-12 rounded-lg shadow-md mt-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4z" />
            </svg>
            <h2 className="mt-2 text-xl font-semibold text-gray-700">No conversations yet</h2>
            <p className="mt-1 text-gray-500">When you contact a seller or a buyer contacts you, you'll see your chats here.</p>
         </div>
      )}
    </div>
  );
};

export default ChatListPage;
