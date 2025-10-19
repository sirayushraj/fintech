import React, { useState } from 'react';
import Modal from './Modal';
import { useData } from '../../context';
import type { Subscription } from '../../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useData();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [nextPaymentDate, setNextPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubscription: Subscription = {
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      billingCycle,
      nextPaymentDate,
    };
    dispatch({ type: 'ADD_SUBSCRIPTION', payload: newSubscription });
    onClose();
    // Reset form
    setName('');
    setAmount('');
    setBillingCycle('monthly');
    setNextPaymentDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Modal title="Add New Subscription" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subName" className="block text-sm font-medium text-text-secondary mb-1">Subscription Name</label>
          <input id="subName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Netflix" required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="subAmount" className="block text-sm font-medium text-text-secondary mb-1">Amount (₹)</label>
                <input id="subAmount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 649" required min="0" className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
            </div>
            <div>
                <label htmlFor="billingCycle" className="block text-sm font-medium text-text-secondary mb-1">Billing Cycle</label>
                <select id="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
        </div>
        <div>
            <label htmlFor="nextPaymentDate" className="block text-sm font-medium text-text-secondary mb-1">Next Payment Date</label>
            <input id="nextPaymentDate" type="date" value={nextPaymentDate} onChange={(e) => setNextPaymentDate(e.target.value)} required className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"/>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Add Subscription</button>
        </div>
      </form>
    </Modal>
  );
};

export default SubscriptionModal;
