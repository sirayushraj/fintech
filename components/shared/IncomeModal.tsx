import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useData } from '../../context';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IncomeModal: React.FC<IncomeModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useData();
  const [income, setIncome] = useState(state.income.toString());

  useEffect(() => {
    if (isOpen) {
      setIncome(state.income.toString());
    }
  }, [isOpen, state.income]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = parseFloat(income);
    if (!isNaN(newIncome) && newIncome >= 0) {
      dispatch({ type: 'SET_INCOME', payload: newIncome });
      onClose();
    }
  };

  return (
    <Modal title="Set Your Monthly Income" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-text-secondary mb-1">
            Monthly Income (₹)
          </label>
          <input
            id="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g., 50000"
            className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"
            required
            min="0"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
            Save Income
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default IncomeModal;