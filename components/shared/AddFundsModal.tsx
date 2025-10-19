import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { SavingsGoal } from '../../types';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: SavingsGoal | null;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ isOpen, onClose, goal }) => {
  const { dispatch } = useData();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal) {
      const amountToAdd = parseFloat(amount);
      if (!isNaN(amountToAdd) && amountToAdd > 0) {
        dispatch({ type: 'UPDATE_SAVINGS_GOAL_AMOUNT', payload: { id: goal.id, amount: amountToAdd } });
      }
    }
    onClose();
    setAmount('');
  };
  
  if (!goal) return null;

  return (
    <Modal title={`Add Funds to "${goal.name}"`} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fundAmount" className="block text-sm font-medium text-text-secondary mb-1">Amount to Add (₹)</label>
          <input id="fundAmount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 5000" required min="1" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Add Funds</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFundsModal;
