import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from '../icons';
import { getFinancialAdvice } from '../../services/geminiService';
import type { ChatMessage } from '../../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! I am FinBot, your personal financial assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getFinancialAdvice(messages, currentInput);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having some trouble right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-glass backdrop-blur-lg rounded-xl shadow-lg border border-border animate-fade-in-up">
      <header className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-text-primary">FinBot AI Assistant</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md lg:max-w-xl px-4 py-2 rounded-xl whitespace-pre-wrap shadow-md ${msg.sender === 'user' ? 'bg-accent text-white animate-glow' : 'bg-white/20 text-text-primary'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 border-t border-border">
        <div className="flex items-center bg-white/10 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about budgeting, savings, etc..."
            className="flex-1 bg-transparent p-3 outline-none text-text-primary placeholder-text-secondary"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 text-accent disabled:text-text-secondary disabled:cursor-not-allowed transition-transform transform hover:scale-110">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chatbot;