import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import { PlusIcon, TrashIcon } from '../icons';
import SubscriptionModal from '../shared/SubscriptionModal';


const Subscriptions: React.FC = () => {
  const { state, dispatch } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      dispatch({ type: 'DELETE_SUBSCRIPTION', payload: id });
    }
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <>
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
              <PlusIcon className="w-5 h-5" />
              <span>Add Subscription</span>
            </button>
        </div>
      {state.subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.subscriptions.map(sub => (
            <Card key={sub.id} className="!p-0 flex flex-col">
               <div className="p-4 sm:p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{sub.name}</h3>
                    <button onClick={() => handleDelete(sub.id)} className="text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110 -mr-2 -mt-2 p-2">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-2xl font-light my-2">{formatCurrency(sub.amount)} <span className="text-sm text-text-secondary">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</span></p>
                  <p className="text-sm text-text-secondary">Next payment: {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
               </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
            <p className="text-text-secondary text-center py-8">No subscriptions added yet. Click 'Add Subscription' to start tracking.</p>
        </Card>
      )}
    </div>
    <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Subscriptions;