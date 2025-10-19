import React, { useState } from 'react';
import Card from '../shared/Card';
import SliderInput from '../shared/SliderInput';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

type FDResult = {
  principal: number;
  totalInterest: number;
  maturityValue: number;
};

type RDResult = {
    totalInvestment: number;
    totalInterest: number;
    maturityValue: number;
};

const Calculators: React.FC = () => {
  // FD State
  const [fdPrincipal, setFdPrincipal] = useState(100000);
  const [fdRate, setFdRate] = useState(6.5);
  const [fdTenure, setFdTenure] = useState(5);
  const [fdResult, setFdResult] = useState<FDResult | null>(null);

  // RD State
  const [rdInstallment, setRdInstallment] = useState(5000);
  const [rdRate, setRdRate] = useState(6.0);
  const [rdTenure, setRdTenure] = useState(3);
  const [rdResult, setRdResult] = useState<RDResult | null>(null);

  const handleCalculateFD = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = fdPrincipal;
    const rateDecimal = fdRate / 100;
    const tenure = fdTenure;
    
    // Formula: M = P * (1 + r)^t (compounded annually)
    const maturityValue = principal * Math.pow((1 + rateDecimal), tenure);
    const totalInterest = maturityValue - principal;

    setFdResult({ principal, totalInterest, maturityValue });
  };
  
  const handleCalculateRD = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyInstallment = rdInstallment;
    const annualRateDecimal = rdRate / 100;
    const n = rdTenure * 12; // Total number of monthly installments
    
    // Formula: I = R * [n(n+1)/2] * (r/12)
    const totalInterest = monthlyInstallment * (n * (n + 1) / (2 * 12)) * annualRateDecimal;
    const totalInvestment = monthlyInstallment * n;
    const maturityValue = totalInvestment + totalInterest;

    setRdResult({ totalInvestment, totalInterest, maturityValue });
  };
  
  const ResultDisplay: React.FC<{ title: string; value: string; className?: string }> = ({ title, value, className }) => (
    <div className={`p-3 bg-white/10 rounded-lg text-center ${className}`}>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="font-bold text-lg text-text-primary">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card title="Fixed Deposit (FD) Calculator">
        <form onSubmit={handleCalculateFD} className="space-y-6">
          <SliderInput label="Principal Amount" id="fdPrincipal" value={fdPrincipal} onChange={e => setFdPrincipal(Number(e.target.value))} min={1000} max={10000000} step={1000} unit="₹" />
          <SliderInput label="Annual Interest Rate" id="fdRate" value={fdRate} onChange={e => setFdRate(Number(e.target.value))} min={1} max={15} step={0.1} unit="%" />
          <SliderInput label="Tenure (in years)" id="fdTenure" value={fdTenure} onChange={e => setFdTenure(Number(e.target.value))} min={1} max={30} step={1} unit="Yrs" />
          <div className="flex justify-end pt-2">
             <button type="submit" className="bg-accent text-white font-bold py-2.5 px-8 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Calculate FD</button>
          </div>
        </form>
        {fdResult && (
          <div className="mt-6 border-t border-border pt-6 animate-fade-in-up">
            <h3 className="text-lg font-bold text-center mb-4">FD Maturity Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <ResultDisplay title="Invested Amount" value={formatCurrency(fdResult.principal)} />
               <ResultDisplay title="Total Interest" value={formatCurrency(fdResult.totalInterest)} />
               <ResultDisplay title="Maturity Value" value={formatCurrency(fdResult.maturityValue)} className="bg-accent-secondary/30" />
            </div>
          </div>
        )}
      </Card>
      
      <Card title="Recurring Deposit (RD) Calculator">
       <form onSubmit={handleCalculateRD} className="space-y-6">
          <SliderInput label="Monthly Installment" id="rdInstallment" value={rdInstallment} onChange={e => setRdInstallment(Number(e.target.value))} min={500} max={100000} step={500} unit="₹" />
          <SliderInput label="Annual Interest Rate" id="rdRate" value={rdRate} onChange={e => setRdRate(Number(e.target.value))} min={1} max={15} step={0.1} unit="%" />
          <SliderInput label="Tenure (in years)" id="rdTenure" value={rdTenure} onChange={e => setRdTenure(Number(e.target.value))} min={1} max={20} step={1} unit="Yrs" />
           <div className="flex justify-end pt-2">
             <button type="submit" className="bg-accent text-white font-bold py-2.5 px-8 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105">Calculate RD</button>
          </div>
        </form>
         {rdResult && (
          <div className="mt-6 border-t border-border pt-6 animate-fade-in-up">
            <h3 className="text-lg font-bold text-center mb-4">RD Maturity Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <ResultDisplay title="Total Investment" value={formatCurrency(rdResult.totalInvestment)} />
               <ResultDisplay title="Total Interest" value={formatCurrency(rdResult.totalInterest)} />
               <ResultDisplay title="Maturity Value" value={formatCurrency(rdResult.maturityValue)} className="bg-accent-secondary/30" />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Calculators;