import React, { useState } from 'react';
import { useData } from '../../context';
import Card from '../shared/Card';
import { PlusIcon, TrashIcon } from '../icons';
import type { TodoItem } from '../../types';

const TodoList: React.FC = () => {
  const { state, dispatch } = useData();
  const [newTodoText, setNewTodoText] = useState('');

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;
    
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodoText,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setNewTodoText('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        dispatch({ type: 'DELETE_TODO', payload: id });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card title="Financial To-Do List">
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
            <input 
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="e.g., Review investment portfolio"
                className="flex-1 bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none"
            />
            <button type="submit" className="bg-accent text-white font-bold p-2.5 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">
                <PlusIcon className="w-5 h-5" />
            </button>
        </form>
        {state.todos.length > 0 ? (
        <ul className="space-y-3">
          {state.todos.map(todo => (
            <li key={todo.id} className="flex items-center p-2 rounded-md transition-colors hover:bg-white/10">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="appearance-none h-5 w-5 rounded-md border-2 border-border checked:bg-accent checked:border-transparent focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer"
              />
              <label htmlFor={`todo-${todo.id}`} className={`ml-3 text-text-primary cursor-pointer flex-1 ${todo.completed ? 'line-through text-text-secondary' : ''}`}>
                {todo.text}
              </label>
              <button onClick={() => handleDelete(todo.id)} className="ml-4 text-text-secondary/60 hover:text-danger transition-all duration-200 hover:scale-110">
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
        ) : (
            <p className="text-text-secondary text-center py-8">Your to-do list is empty. Add a task to get started!</p>
        )}
      </Card>
    </div>
  );
};

export default TodoList;