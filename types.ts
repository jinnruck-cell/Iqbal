
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  imageUrl: string;
  seller: User;
  category: string;
}

export enum TransactionStatus {
  PENDING = 'Pending',
  OFFER_MADE = 'Offer Made',
  OFFER_ACCEPTED = 'Offer Accepted',
  PAYMENT_PROCESSING = 'Payment Processing',
  ITEM_SHIPPED = 'Item Shipped',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum MessageType {
  TEXT = 'text',
  OFFER = 'offer',
  SYSTEM = 'system',
  VIDEO = 'video',
}

export interface ChatMessage {
  id: number;
  sender: User;
  text: string;
  timestamp: string;
  type: MessageType;
  offerAmount?: number;
  videoUrl?: string;
}

export interface TransactionEvent {
  status: TransactionStatus;
  date: string;
}

export interface Transaction {
  id: number;
  product: Product;
  buyer: User;
  seller: User;
  status: TransactionStatus;
  messages: ChatMessage[];
  offerPrice?: number;
  events: TransactionEvent[];
}
