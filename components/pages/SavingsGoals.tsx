import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { PlusIcon, TrashIcon } from '../icons';
import SavingsGoalModal from '../shared/SavingsGoalModal';
import AddFundsModal from '../shared/AddFundsModal';
import type { SavingsGoal } from '../../types';

const SavingsGoals: React.FC = () => {
  const { state, dispatch } = useData();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isFundsModalOpen, setIsFundsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      dispatch({ type: 'DELETE_SAVINGS_GOAL', payload: id });
    }
  };

  const openAddFundsModal = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setIsFundsModalOpen(true);
  };
  
  const closeFundsModal = () => {
    setSelectedGoal(null);
    setIsFundsModalOpen(false);
  }

  return (
    <>
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-end">
            <button onClick={() => setIsGoalModalOpen(true)} className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
              <PlusIcon className="w-5 h-5" />
              <span>Add New Goal</span>
            </button>
        </div>
        {state.savingsGoals.length > 0 ? (
          <div className="space-y-6">
            {state.savingsGoals.map(goal => (
              <Card key={goal.id}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{goal.name}</h3>
                    <button onClick={() => handleDelete(goal.id)} className="text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110 -mr-2 -mt-2 p-2">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="my-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-accent-secondary">{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-sm font-medium text-text-secondary">Target: {formatCurrency(goal.targetAmount)}</span>
                  </div>
                  <ProgressBar value={goal.currentAmount} max={goal.targetAmount} />
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={() => openAddFundsModal(goal)} className="bg-accent-secondary/80 text-white text-sm font-bold py-1.5 px-4 rounded-lg hover:bg-accent-secondary transition-all transform hover:scale-105">
                        Add Funds
                    </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
            <Card>
                <p className="text-text-secondary text-center py-8">You haven't set any savings goals yet. Start today!</p>
            </Card>
        )}
      </div>
      <SavingsGoalModal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} />
      <AddFundsModal isOpen={isFundsModalOpen} onClose={closeFundsModal} goal={selectedGoal} />
    </>
  );
};

export default SavingsGoals;