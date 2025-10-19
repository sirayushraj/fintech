export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextPaymentDate: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

export interface BillReminder {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Budget {
    id: string;
    category: string;
    amount: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
