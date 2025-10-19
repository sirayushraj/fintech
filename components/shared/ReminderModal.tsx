import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { BillReminder } from '../../types';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useData();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReminder: BillReminder = {
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      dueDate,
      paid: false,
    };
    dispatch({ type: 'ADD_REMINDER', payload: newReminder });
    onClose();
    // Reset form
    setName('');
    setAmount('');
    setDueDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Modal title="Add New Bill Reminder" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="remName" className="block text-sm font-medium text-text-secondary mb-1">Bill Name</label>
          <input id="remName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Credit Card Bill" required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="remAmount" className="block text-sm font-medium text-text-secondary mb-1">Amount (₹)</label>
                <input id="remAmount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 5000" required min="0" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
                <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
            </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Add Reminder</button>
        </div>
      </form>
    </Modal>
  );
};

export default ReminderModal;
