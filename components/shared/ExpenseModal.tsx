import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { Expense } from '../../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useData();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      category,
      date,
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    onClose();
    // Reset form
    setName('');
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Bills', 'Savings', 'Other'];

  return (
    <Modal title="Add New Expense" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Expense Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Coffee" required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">Amount (₹)</label>
                <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 150" required min="0" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Date</label>
                <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
            </div>
        </div>
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Add Expense</button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
