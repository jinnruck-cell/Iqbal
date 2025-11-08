
import { User, Product, Transaction, TransactionStatus, MessageType } from './types';

// USERS
export const USERS = {
  CURRENT_USER: { id: 'user1', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alexjohnson' },
  SELLER_1: { id: 'user2', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=mariagarcia' },
  SELLER_2: { id: 'user3', name: 'Chen Wei', avatarUrl: 'https://i.pravatar.cc/150?u=chenwei' },
  ADMIN: { id: 'admin', name: 'System', avatarUrl: '/system.png' }
};

// PRODUCTS
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Vintage Leather Sofa',
    description: 'A beautiful vintage leather sofa, well-maintained with minor wear. Perfect for a classic living room setup. Non-smoking home.',
    price: 450.00,
    condition: 'Used - Good',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800',
    seller: USERS.SELLER_1,
    category: 'Home Goods',
  },
  {
    id: 2,
    title: 'High-Performance Blender',
    description: 'Barely used high-performance blender. Great for smoothies, soups, and more. Comes with all original accessories and box.',
    price: 95.00,
    condition: 'Used - Like New',
    imageUrl: 'https://images.unsplash.com/photo-1594434438319-2d1421379513?q=80&w=800',
    seller: USERS.SELLER_2,
    category: 'Home Goods',
  },
  {
    id: 3,
    title: 'Retro Gaming Console',
    description: 'Classic retro gaming console with two controllers and 5 built-in games. A collector\'s item in perfect working condition.',
    price: 150.00,
    condition: 'Used - Good',
    imageUrl: 'https://images.unsplash.com/photo-1593113646773-4b161e3b15d2?q=80&w=800',
    seller: USERS.SELLER_1,
    category: 'Electronics',
  },
   {
    id: 4,
    title: 'Designer Denim Jacket',
    description: 'A stylish designer denim jacket, size medium. Worn only a few times. No stains or tears.',
    price: 80.00,
    condition: 'Used - Like New',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91620649736?q=80&w=800',
    seller: USERS.SELLER_2,
    category: 'Fashion',
  }
];

// TRANSACTIONS
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    product: MOCK_PRODUCTS[0],
    buyer: USERS.CURRENT_USER,
    seller: MOCK_PRODUCTS[0].seller,
    status: TransactionStatus.OFFER_MADE,
    offerPrice: 420,
    events: [
        { status: TransactionStatus.PENDING, date: new Date(Date.now() - 86400000).toISOString() },
        { status: TransactionStatus.OFFER_MADE, date: new Date().toISOString() }
    ],
    messages: [
      { id: 1, sender: USERS.CURRENT_USER, text: 'Hi, I\'m interested in the sofa. Is the price negotiable?', timestamp: '10:30 AM', type: MessageType.TEXT },
      { id: 2, sender: USERS.SELLER_1, text: 'Hi Alex, thanks for your interest. I can be a little flexible. What did you have in mind?', timestamp: '10:35 AM', type: MessageType.TEXT },
      { id: 3, sender: USERS.CURRENT_USER, text: 'I\'d like to offer $420', timestamp: '10:40 AM', type: MessageType.OFFER, offerAmount: 420 },
    ]
  },
  {
    id: 2,
    product: MOCK_PRODUCTS[2],
    buyer: USERS.CURRENT_USER,
    seller: MOCK_PRODUCTS[2].seller,
    status: TransactionStatus.COMPLETED,
    offerPrice: 150,
     events: [
        { status: TransactionStatus.PENDING, date: new Date(Date.now() - 5*86400000).toISOString() },
        { status: TransactionStatus.OFFER_MADE, date: new Date(Date.now() - 5*86400000).toISOString() },
        { status: TransactionStatus.OFFER_ACCEPTED, date: new Date(Date.now() - 4*86400000).toISOString() },
        { status: TransactionStatus.PAYMENT_PROCESSING, date: new Date(Date.now() - 4*86400000).toISOString() },
        { status: TransactionStatus.ITEM_SHIPPED, date: new Date(Date.now() - 3*86400000).toISOString() },
        { status: TransactionStatus.COMPLETED, date: new Date(Date.now() - 1*86400000).toISOString() }
    ],
    messages: [
      { id: 1, sender: USERS.CURRENT_USER, text: 'Offering full price for the console!', timestamp: 'Yesterday', type: MessageType.OFFER, offerAmount: 150 },
      { id: 2, sender: MOCK_PRODUCTS[2].seller, text: 'Offer for $150 accepted. Awaiting payment.', timestamp: 'Yesterday', type: MessageType.SYSTEM },
      { id: 3, sender: USERS.ADMIN, text: 'Payment of $150 is processing. Seller can now ship the item.', timestamp: 'Yesterday', type: MessageType.SYSTEM },
      { id: 4, sender: USERS.ADMIN, text: 'Buyer has confirmed receipt. Transaction completed.', timestamp: 'Today', type: MessageType.SYSTEM },
    ]
  }
];
