import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import { PlusIcon, TrashIcon } from '../icons';
import ReminderModal from '../shared/ReminderModal';

const Reminders: React.FC = () => {
  const { state, dispatch } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePay = (id: string) => {
    dispatch({ type: 'PAY_REMINDER', payload: id });
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
        dispatch({ type: 'DELETE_REMINDER', payload: id });
    }
  };
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <>
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
              <PlusIcon className="w-5 h-5" />
              <span>Add Reminder</span>
            </button>
        </div>
      <Card className="!p-0">
        {state.billReminders.length > 0 ? (
        <ul className="divide-y divide-border">
          {state.billReminders.map(reminder => (
            <li key={reminder.id} className={`p-4 sm:p-6 flex justify-between items-center transition-all duration-300 hover:bg-white/10 ${reminder.paid ? 'opacity-50' : ''}`}>
              <div>
                <p className={`font-bold text-text-primary ${reminder.paid ? 'line-through' : ''}`}>{reminder.name}</p>
                <p className="text-sm text-text-secondary">Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                 <p className={`text-lg font-semibold ${reminder.paid ? 'line-through' : ''}`}>{formatCurrency(reminder.amount)}</p>
                 <button 
                   onClick={() => handlePay(reminder.id)}
                   disabled={reminder.paid}
                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 ${reminder.paid ? 'bg-white/20 text-text-primary cursor-default' : 'bg-accent text-white hover:bg-accent/80'}`}
                 >
                   {reminder.paid ? 'Paid' : 'Mark as Paid'}
                 </button>
                 <button onClick={() => handleDelete(reminder.id)} className="text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110">
                    <TrashIcon className="w-5 h-5" />
                 </button>
              </div>
            </li>
          ))}
        </ul>
        ) : (
            <p className="p-6 text-text-secondary text-center">No reminders set. Stay on top of your bills by adding one!</p>
        )}
      </Card>
    </div>
    <ReminderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Reminders;