import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';
import { Link } from 'react-router-dom';
import { EditIcon } from '../icons';
import IncomeModal from '../shared/IncomeModal';

const Dashboard: React.FC = () => {
  const { state } = useData();
  const { expenses, savingsGoals, billReminders, income } = state;
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const upcomingReminders = billReminders.filter(r => !r.paid).slice(0, 3);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <>
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-text-primary">Welcome Back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="!p-0">
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium text-text-secondary">Monthly Income</h3>
                    <button onClick={() => setIncomeModalOpen(true)} className="text-text-secondary hover:text-accent transition-colors">
                        <EditIcon className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(income)}</p>
            </div>
        </Card>
        <Card className="!p-0"><div className="p-4 sm:p-6"><h3 className="text-md font-medium text-text-secondary">Total Expenses (This Month)</h3><p className="text-2xl font-bold text-danger">{formatCurrency(totalExpenses)}</p></div></Card>
        <Card className="!p-0"><div className="p-4 sm:p-6"><h3 className="text-md font-medium text-text-secondary">Savings Progress</h3><p className="text-2xl font-bold text-accent-secondary">{formatCurrency(totalSaved)}</p></div></Card>
        <Card className="!p-0"><div className="p-4 sm:p-6"><h3 className="text-md font-medium text-text-secondary">Remaining Funds</h3><p className="text-2xl font-bold">{formatCurrency(income - totalExpenses)}</p></div></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Savings Goals">
          <div className="space-y-4">
            {savingsGoals.slice(0, 3).map(goal => (
              <div key={goal.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{goal.name}</span>
                  <span className="text-sm font-medium text-text-secondary">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                </div>
                <ProgressBar value={goal.currentAmount} max={goal.targetAmount} />
              </div>
            ))}
             {savingsGoals.length > 3 && <Link to="/goals" className="text-accent hover:underline font-medium mt-4 inline-block">View all goals</Link>}
          </div>
        </Card>

        <Card title="Upcoming Bill Reminders">
          <ul className="space-y-3">
            {upcomingReminders.length > 0 ? upcomingReminders.map(reminder => (
              <li key={reminder.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{reminder.name}</p>
                  <p className="text-sm text-text-secondary">Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
                </div>
                <p className="font-bold">{formatCurrency(reminder.amount)}</p>
              </li>
            )) : <p className="text-text-secondary">No upcoming bills. You're all caught up!</p>}
             {billReminders.length > 3 && <Link to="/reminders" className="text-accent hover:underline font-medium mt-2 inline-block">View all reminders</Link>}
          </ul>
        </Card>
      </div>
    </div>
    <IncomeModal isOpen={isIncomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
    </>
  );
};

export default Dashboard;