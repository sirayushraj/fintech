import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { Budget } from '../../types';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useData();
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  
  const existingCategories = state.budgets.map(b => b.category);
  const availableCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'].filter(c => !existingCategories.includes(c));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (availableCategories.length === 0) return; // Should not happen if button is disabled
    
    const newBudget: Budget = {
      id: crypto.randomUUID(),
      category,
      amount: parseFloat(amount),
    };
    dispatch({ type: 'ADD_BUDGET', payload: newBudget });
    onClose();
    // Reset form
    setAmount('');
    if(availableCategories.length > 1) {
        setCategory(availableCategories[1]); // Set to next available
    }
  };

  return (
    <Modal title="Add New Budget" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="budgetCategory" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
            <select id="budgetCategory" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none">
                {availableCategories.length > 0 ? 
                    availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>) :
                    <option disabled>No available categories</option>
                }
            </select>
             {availableCategories.length === 0 && <p className="text-xs text-text-secondary mt-1">You have already created a budget for all available categories.</p>}
        </div>
        <div>
            <label htmlFor="budgetAmount" className="block text-sm font-medium text-text-secondary mb-1">Budget Amount (₹)</label>
            <input id="budgetAmount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 10000" required min="0" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={availableCategories.length === 0} className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">Add Budget</button>
        </div>
      </form>
    </Modal>
  );
};

export default BudgetModal;
