import React from 'react';

interface SliderInputProps {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, id, value, onChange, min, max, step, unit }) => {
  const formatDisplayValue = () => {
    if (unit === '₹') {
      return `₹ ${new Intl.NumberFormat('en-IN').format(value)}`;
    }
    if (unit === '%') {
      // Show one decimal place for percentages
      return `${value.toFixed(1)} ${unit}`;
    }
    return `${value} ${unit}`;
  };

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
         <div className="bg-white/10 border border-border rounded-lg px-3 py-1 text-center">
            <span className="font-mono font-bold text-text-primary text-sm">{formatDisplayValue()}</span>
        </div>
      </div>
      <input
        type="range"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent transition-opacity hover:opacity-80"
      />
    </div>
  );
};

export default SliderInput;