import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { PlusIcon, TrashIcon } from '../icons';
import BudgetModal from '../shared/BudgetModal';

const Budgets: React.FC = () => {
    const { state, dispatch } = useData();
    const { budgets, expenses } = state;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getSpentAmount = (category: string) => {
        return expenses
            .filter(e => e.category === category)
            .reduce((sum, e) => sum + e.amount, 0);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this budget category?')) {
            dispatch({ type: 'DELETE_BUDGET', payload: id });
        }
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

    return (
        <>
        <div className="space-y-6 animate-fade-in-up">
             <div className="flex justify-end">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
                <PlusIcon className="w-5 h-5" />
                <span>Add Budget</span>
                </button>
            </div>
            {budgets.length > 0 ? (
                <div className="space-y-6">
                    {budgets.map(budget => {
                        const spent = getSpentAmount(budget.category);
                        const remaining = budget.amount - spent;
                        const isOverspent = remaining < 0;

                        return (
                            <Card key={budget.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold">{budget.category}</h3>
                                        <p className="text-sm text-text-secondary">Budget: {formatCurrency(budget.amount)}</p>
                                    </div>
                                    <button onClick={() => handleDelete(budget.id)} className="text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110 -mr-2 -mt-2 p-2">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="my-3">
                                    <ProgressBar value={spent} max={budget.amount} />
                                    <div className="flex justify-between mt-1 text-sm">
                                        <span className="font-medium text-text-primary">Spent: {formatCurrency(spent)}</span>
                                        <span className={`font-medium ${isOverspent ? 'text-danger' : 'text-text-secondary'}`}>
                                            {isOverspent ? `Overspent by ${formatCurrency(Math.abs(remaining))}` : `Remaining: ${formatCurrency(remaining)}`}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card>
                    <p className="text-text-secondary text-center py-8">No budgets created. Add a budget to start tracking your spending.</p>
                </Card>
            )}
        </div>
        <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Budgets;