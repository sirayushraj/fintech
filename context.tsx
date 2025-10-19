import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Expense, Subscription, SavingsGoal, BillReminder, TodoItem, Budget } from './types';
import { mockExpenses, mockSubscriptions, mockSavingsGoals, mockBillReminders, mockTodoItems, mockBudgets } from './data/mockData';

type State = {
  expenses: Expense[];
  subscriptions: Subscription[];
  savingsGoals: SavingsGoal[];
  billReminders: BillReminder[];
  todos: TodoItem[];
  budgets: Budget[];
  income: number;
  isAuthenticated: boolean;
};

type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription }
  | { type: 'DELETE_SUBSCRIPTION'; payload: string }
  | { type: 'ADD_SAVINGS_GOAL'; payload: SavingsGoal }
  | { type: 'DELETE_SAVINGS_GOAL'; payload: string }
  | { type: 'UPDATE_SAVINGS_GOAL_AMOUNT'; payload: { id: string; amount: number } }
  | { type: 'ADD_REMINDER'; payload: BillReminder }
  | { type: 'DELETE_REMINDER'; payload: string }
  | { type: 'PAY_REMINDER'; payload: string }
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }
  | { type: 'ADD_TODO'; payload: TodoItem }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_INCOME'; payload: number }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };

const initialState: State = {
  expenses: mockExpenses,
  subscriptions: mockSubscriptions,
  savingsGoals: mockSavingsGoals,
  billReminders: mockBillReminders,
  todos: mockTodoItems,
  budgets: mockBudgets,
  income: 50000,
  isAuthenticated: false,
};

const DataContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'SET_INCOME':
        return { ...state, income: action.payload };
    
    // Expenses
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter(item => item.id !== action.payload) };

    // Subscriptions
    case 'ADD_SUBSCRIPTION':
      return { ...state, subscriptions: [action.payload, ...state.subscriptions] };
    case 'DELETE_SUBSCRIPTION':
      return { ...state, subscriptions: state.subscriptions.filter(item => item.id !== action.payload) };

    // Savings Goals
    case 'ADD_SAVINGS_GOAL':
      return { ...state, savingsGoals: [action.payload, ...state.savingsGoals] };
    case 'DELETE_SAVINGS_GOAL':
        return { ...state, savingsGoals: state.savingsGoals.filter(item => item.id !== action.payload) };
    case 'UPDATE_SAVINGS_GOAL_AMOUNT':
        const goalToUpdate = state.savingsGoals.find(g => g.id === action.payload.id);
        if (!goalToUpdate) return state;

        const newExpenseForGoal: Expense = {
            id: crypto.randomUUID(),
            name: `Contribution to ${goalToUpdate.name}`,
            category: 'Savings',
            amount: action.payload.amount,
            date: new Date().toISOString().split('T')[0],
        };
        return {
            ...state,
            savingsGoals: state.savingsGoals.map(goal =>
                goal.id === action.payload.id
                    ? { ...goal, currentAmount: goal.currentAmount + action.payload.amount }
                    : goal
            ),
            expenses: [newExpenseForGoal, ...state.expenses],
        };
    
    // Reminders
    case 'ADD_REMINDER':
        return { ...state, billReminders: [action.payload, ...state.billReminders] };
    case 'DELETE_REMINDER':
        return { ...state, billReminders: state.billReminders.filter(item => item.id !== action.payload) };
    case 'PAY_REMINDER':
        const reminderToPay = state.billReminders.find(r => r.id === action.payload);
        if (!reminderToPay || reminderToPay.paid) return state;

        const newExpense: Expense = {
            id: crypto.randomUUID(),
            name: reminderToPay.name,
            category: 'Bills',
            amount: reminderToPay.amount,
            date: new Date().toISOString().split('T')[0],
        };
        return {
            ...state,
            billReminders: state.billReminders.map(reminder =>
                reminder.id === action.payload ? { ...reminder, paid: true } : reminder
            ),
            expenses: [newExpense, ...state.expenses],
        };

    // Budgets
    case 'ADD_BUDGET':
        return { ...state, budgets: [action.payload, ...state.budgets] };
    case 'DELETE_BUDGET':
        return { ...state, budgets: state.budgets.filter(item => item.id !== action.payload) };
    
    // To-Do
    case 'ADD_TODO':
        return { ...state, todos: [action.payload, ...state.todos] };
    case 'DELETE_TODO':
        return { ...state, todos: state.todos.filter(item => item.id !== action.payload) };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    default:
      return state;
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
