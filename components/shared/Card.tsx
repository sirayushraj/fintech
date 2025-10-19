import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-glass backdrop-blur-md rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1 ${className}`}>
      {title && <h2 className="text-xl font-bold text-text-primary mb-4 p-4 sm:p-6 border-b border-border">{title}</h2>}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default Card;