import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import { PlusIcon, TrashIcon } from '../icons';
import ExpenseModal from '../shared/ExpenseModal';

const Expenses: React.FC = () => {
  const { state, dispatch } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    }
  };
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <>
      <div className="space-y-6 animate-fade-in-up">
        <Card className="!p-0">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border">
            <h2 className="text-xl font-bold text-text-primary">All Expenses</h2>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
              <PlusIcon className="w-5 h-5" />
              <span>Add Expense</span>
            </button>
          </div>
          {state.expenses.length > 0 ? (
            <ul className="divide-y divide-border">
              {state.expenses.map(expense => (
                <li key={expense.id} className="p-4 sm:p-6 flex justify-between items-center transition-colors duration-200 hover:bg-white/10">
                  <div>
                    <p className="font-bold text-text-primary">{expense.name}</p>
                    <p className="text-sm text-text-secondary">{expense.category} &bull; {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-danger">{formatCurrency(expense.amount)}</p>
                    <button onClick={() => handleDelete(expense.id)} className="text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             <p className="p-6 text-text-secondary text-center">No expenses recorded yet. Add one to get started!</p>
          )}
        </Card>
      </div>
      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Expenses;