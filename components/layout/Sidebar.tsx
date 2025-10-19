import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../../context';
import { DashboardIcon, ExpensesIcon, SubscriptionsIcon, GoalsIcon, RemindersIcon, BudgetIcon, TodoIcon, ChatbotIcon, CloseIcon, LogoutIcon, CalculatorIcon } from '../icons';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/expenses', label: 'Expenses', icon: ExpensesIcon },
  { path: '/subscriptions', label: 'Subscriptions', icon: SubscriptionsIcon },
  { path: '/budgets', label: 'Budgets', icon: BudgetIcon },
  { path: '/goals', label: 'Savings Goals', icon: GoalsIcon },
  { path: '/reminders', label: 'Reminders', icon: RemindersIcon },
  { path: '/calculators', label: 'Calculators', icon: CalculatorIcon },
  { path: '/todo', label: 'To-Do List', icon: TodoIcon },
  { path: '/chatbot', label: 'FinBot AI', icon: ChatbotIcon },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const NavItem: React.FC<{ item: typeof navItems[0], isMobile: boolean }> = ({ item, isMobile }) => (
    <NavLink
      to={item.path}
      onClick={isMobile ? toggleSidebar : undefined}
      className={({ isActive }) =>
        `flex items-center p-3 my-1 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-accent/80 text-white shadow-[0_0_15px_rgba(255,128,191,0.8)]' 
            : 'text-text-sidebar hover:bg-white/20 hover:text-white'
        }`
      }
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );
  
  return (
    <>
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-glass backdrop-blur-xl w-64 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-border flex flex-col`}>
        <div className="flex items-center justify-between mb-8 lg:mb-6">
          <h1 className="text-2xl font-bold text-text-primary">FinTrack</h1>
          <button onClick={toggleSidebar} className="lg:hidden text-text-primary">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavItem item={item} isMobile={isOpen} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
           <button
            onClick={handleLogout}
            className="flex items-center p-3 my-1 rounded-lg transition-all duration-300 w-full text-text-sidebar hover:bg-white/20 hover:text-white"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
          <div className="text-center text-xs text-text-sidebar/80 mt-4">
            <p>&copy; 2024 FinTrack</p>
          </div>
        </div>
      </aside>
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;