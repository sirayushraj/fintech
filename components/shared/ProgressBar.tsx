import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, className }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={`w-full bg-white/20 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-accent h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;