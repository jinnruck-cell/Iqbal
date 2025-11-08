import React, { useState, useRef, useEffect } from 'react';
import { Transaction, User, MessageType, ChatMessage, TransactionStatus } from '../types';
import { ArrowLeftIcon, PaperAirplaneIcon, PaperClipIcon, CurrencyDollarIcon } from './icons';

interface ChatPageProps {
  transaction: Transaction;
  currentUser: User;
  onBack: () => void;
  onSendMessage: (transactionId: number, message: Omit<ChatMessage, 'id' | 'sender' | 'timestamp'>) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
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
};

const ChatPage: React.FC<ChatPageProps> = ({ transaction, currentUser, onBack, onSendMessage, onUpdateTransaction }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const otherUser = transaction.buyer.id === currentUser.id ? transaction.seller : transaction.buyer;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [transaction.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    onSendMessage(transaction.id, {
      text: newMessage,
      type: MessageType.TEXT,
    });
    setNewMessage('');
  };

  const handleMakeOffer = (amount: number) => {
    const newStatus = TransactionStatus.OFFER_MADE;
    onSendMessage(transaction.id, {
        text: `Made an offer of $${amount.toFixed(2)}`,
        type: MessageType.OFFER,
        offerAmount: amount,
    });

    const updatedTransaction = {
      ...transaction,
      status: newStatus,
      offerPrice: amount,
      events: [...transaction.events, { status: newStatus, date: new Date().toISOString() }]
    };
    onUpdateTransaction(updatedTransaction);
  };
  
  const handleAcceptOffer = () => {
    const newStatus = TransactionStatus.OFFER_ACCEPTED;
     onSendMessage(transaction.id, {
        text: `Accepted offer for $${transaction.offerPrice?.toFixed(2)}`,
        type: MessageType.SYSTEM,
    });
    const updatedTransaction = {
      ...transaction,
      status: newStatus,
      events: [...transaction.events, { status: newStatus, date: new Date().toISOString() }]
    };
    onUpdateTransaction(updatedTransaction);
  }

  const isCurrentUserSeller = transaction.seller.id === currentUser.id;
  const isCurrentUserBuyer = transaction.buyer.id === currentUser.id;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 flex-shrink-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-teal-600 font-semibold">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-800">{otherUser.name}</h1>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
                 <div className="w-16 h-10 flex justify-end">
                    <img className="h-10 w-10 rounded-full object-cover" src={otherUser.avatarUrl} alt={otherUser.name} />
                </div>
            </div>
        </div>
      </header>

      {/* Product Banner */}
      <div className="bg-white p-3 border-b border-t flex items-center gap-4 flex-shrink-0">
        <img src={transaction.product.imageUrl} alt={transaction.product.title} className="w-12 h-12 rounded-md object-cover" />
        <div className="flex-grow">
            <p className="font-semibold text-gray-800 truncate">{transaction.product.title}</p>
            <p className="text-sm text-gray-800 font-bold">${transaction.offerPrice?.toFixed(2) || transaction.product.price.toFixed(2)}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
            {transaction.status}
        </span>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {transaction.messages.map((message, index) => (
          <div key={message.id || index} className={`flex w-full items-end gap-2 ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'} ${message.type === MessageType.SYSTEM ? '!justify-center' : ''}`}>
            {message.sender.id !== currentUser.id && message.type !== MessageType.SYSTEM && (
              <img src={message.sender.avatarUrl} alt={message.sender.name} className="w-8 h-8 rounded-full object-cover self-end" />
            )}
            
            {message.type === MessageType.TEXT && (
                <div className={`max-w-md p-3 rounded-lg ${message.sender.id === currentUser.id ? 'bg-teal-500 text-white' : 'bg-white shadow-sm'}`}>
                    <p>{message.text}</p>
                </div>
            )}
            
            {message.type === MessageType.OFFER && (
                 <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 border border-yellow-200">
                    <p className="text-center font-semibold text-gray-700">{message.sender.name} offered ${message.offerAmount?.toFixed(2)}</p>
                    {isCurrentUserSeller && transaction.status === TransactionStatus.OFFER_MADE && (
                       <div className="mt-3 flex justify-center gap-3">
                           <button onClick={handleAcceptOffer} className="px-4 py-2 bg-green-500 text-white font-bold rounded-md text-sm hover:bg-green-600">Accept</button>
                           <button className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-md text-sm hover:bg-gray-300">Counter</button>
                       </div>
                    )}
                 </div>
            )}
            
            {message.type === MessageType.SYSTEM && (
                 <div className="w-full text-center text-xs text-gray-500 my-2">
                    <span className="bg-gray-200 px-3 py-1 rounded-full">{message.text}</span>
                 </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="bg-white p-4 border-t sticky bottom-0">
        <div className="flex items-center gap-2">
            {isCurrentUserBuyer && [TransactionStatus.PENDING, TransactionStatus.OFFER_MADE].includes(transaction.status) && (
                 <button onClick={() => handleMakeOffer(transaction.product.price * 0.9)} className="p-2 text-gray-500 hover:text-teal-600 rounded-full hover:bg-teal-50" title="Make an offer">
                    <CurrencyDollarIcon className="w-6 h-6" />
                </button>
            )}
            <button className="p-2 text-gray-500 hover:text-teal-600 rounded-full hover:bg-teal-50" title="Attach file">
                <PaperClipIcon className="w-6 h-6" />
            </button>
            <input 
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button onClick={handleSendMessage} className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition-colors" title="Send message">
                <PaperAirplaneIcon className="w-5 h-5" />
            </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
