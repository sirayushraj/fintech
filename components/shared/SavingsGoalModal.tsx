import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { SavingsGoal } from '../../types';

interface SavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavingsGoalModal: React.FC<SavingsGoalModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useData();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: SavingsGoal = {
      id: crypto.randomUUID(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
    };
    dispatch({ type: 'ADD_SAVINGS_GOAL', payload: newGoal });
    onClose();
    // Reset form
    setName('');
    setTargetAmount('');
  };

  return (
    <Modal title="Add New Savings Goal" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="goalName" className="block text-sm font-medium text-text-secondary mb-1">Goal Name</label>
          <input id="goalName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., New Laptop" required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-text-secondary mb-1">Target Amount (₹)</label>
            <input id="targetAmount" type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="e.g., 80000" required min="1" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Create Goal</button>
        </div>
      </form>
    </Modal>
  );
};

export default SavingsGoalModal;
