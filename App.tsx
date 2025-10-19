import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import Expenses from './components/pages/Expenses';
import Subscriptions from './components/pages/Subscriptions';
import SavingsGoals from './components/pages/SavingsGoals';
import Reminders from './components/pages/Reminders';
import TodoList from './components/pages/TodoList';
import Chatbot from './components/pages/Chatbot';
import Budgets from './components/pages/Budgets';
import Login from './components/pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Calculators from './components/pages/Calculators';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="goals" element={<SavingsGoals />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="calculators" element={<Calculators />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;