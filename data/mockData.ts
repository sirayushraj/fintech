import type { Expense, Subscription, SavingsGoal, BillReminder, TodoItem, Budget } from '../types';

export const mockExpenses: Expense[] = [
  { id: '1', name: 'Groceries', category: 'Food', amount: 3500, date: '2024-07-28' },
  { id: '2', name: 'Electricity Bill', category: 'Utilities', amount: 1200, date: '2024-07-25' },
  { id: '3', name: 'Netflix', category: 'Entertainment', amount: 649, date: '2024-07-20' },
  { id: '4', name: 'Swiggy', category: 'Food', amount: 450, date: '2024-07-18' },
  { id: '5', name: 'Petrol', category: 'Transport', amount: 1500, date: '2024-07-15' },
  { id: '6', name: 'Movie Tickets', category: 'Entertainment', amount: 800, date: '2024-07-12' },
];

export const mockSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix Premium', amount: 649, billingCycle: 'monthly', nextPaymentDate: '2024-08-20' },
  { id: '2', name: 'Amazon Prime', amount: 1499, billingCycle: 'yearly', nextPaymentDate: '2024-10-05' },
  { id: '3', name: 'Spotify Premium', amount: 119, billingCycle: 'monthly', nextPaymentDate: '2024-08-15' },
  { id: '4', name: 'Gym Membership', amount: 2000, billingCycle: 'monthly', nextPaymentDate: '2024-08-01' },
];

export const mockSavingsGoals: SavingsGoal[] = [
  { id: '1', name: 'New Laptop', targetAmount: 80000, currentAmount: 35000 },
  { id: '2', name: 'Vacation to Goa', targetAmount: 50000, currentAmount: 45000 },
  { id: '3', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 60000 },
];

export const mockBillReminders: BillReminder[] = [
  { id: '1', name: 'Credit Card Bill', amount: 8500, dueDate: '2024-08-05', paid: false },
  { id: '2', name: 'Internet Bill', amount: 999, dueDate: '2024-08-10', paid: false },
  { id: '3', name: 'Rent', amount: 20000, dueDate: '2024-08-01', paid: true },
];

export const mockTodoItems: TodoItem[] = [
  { id: '1', text: 'Update investment portfolio', completed: false },
  { id: '2', text: 'Pay credit card bill', completed: false },
  { id: '3', text: 'Research new savings accounts', completed: true },
];

export const mockBudgets: Budget[] = [
    { id: '1', category: 'Food', amount: 10000 },
    { id: '2', category: 'Entertainment', amount: 4000 },
    { id: '3', category: 'Transport', amount: 5000 },
    { id: '4', category: 'Utilities', amount: 3000 },
];
