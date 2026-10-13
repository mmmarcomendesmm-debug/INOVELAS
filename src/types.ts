export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  perTime?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  relationship: string;
  role: string;
  status: 'available' | 'busy';
  statusLabel: string;
  skills: string[];
  photo: string;
}

export interface Review {
  id: string;
  author: string;
  daysAgo: string;
  rating: number;
  text: string;
  targetMember?: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  priceLabel: string;
  photo: string;
  verified: boolean;
  services: Service[];
  about: string;
  team: TeamMember[];
  portfolio: string[];
}

export interface Transaction {
  id: string;
  date: string;
  title: string;
  client: string;
  direction: 'income' | 'expense';
  value: number;
  status: 'paid' | 'pending';
  category: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'client';
  text: string;
  time: string;
}

export interface Chat {
  id: string;
  clientName: string;
  clientPhoto: string;
  lastMessage: string;
  unreadCount?: number;
  online: boolean;
  time: string;
  messages: Message[];
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
  userLiked?: boolean;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientPhoto: string;
  employeeName: string;
  locationDesc: string;
  category: string;
  price: number;
  notes?: string;
  timeline: { title: string; time: string }[];
  warning?: string;
}
