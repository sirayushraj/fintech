import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuIcon, EditIcon } from '../icons';
import { useData } from '../../context';
import IncomeModal from '../shared/IncomeModal';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { state } = useData();
  const { income, expenses } = state;
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingFunds = income - totalExpenses;

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);


  const getTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path || path === 'dashboard') return 'Dashboard';
    if (path === 'goals') return 'Savings Goals';
    if (path === 'todo') return 'To-Do List';
    if (path === 'chatbot') return 'FinBot AI';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <>
      <header className="bg-glass backdrop-blur-lg p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="lg:hidden text-text-primary mr-4">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-text-primary">{getTitle()}</h1>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
            <div>
                <span className="text-xs text-text-secondary">Remaining Funds</span>
                <p className="font-bold text-lg">{formatCurrency(remainingFunds)}</p>
            </div>
            <div className="h-8 border-l border-border"></div>
            <div className="flex items-center space-x-2">
                <div>
                    <span className="text-xs text-text-secondary">Monthly Income</span>
                    <p className="font-bold text-lg">{formatCurrency(income)}</p>
                </div>
                <button onClick={() => setIncomeModalOpen(true)} className="text-text-secondary hover:text-accent transition-colors">
                    <EditIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
      </header>
      <IncomeModal isOpen={isIncomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
    </>
  );
};

export default Header;