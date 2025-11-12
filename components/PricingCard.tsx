
import React from 'react';
import { TariffPlan } from '../types';

interface PricingCardProps {
  plan: TariffPlan;
  onSelect: (plan: TariffPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`relative flex flex-col rounded-xl shadow-lg p-6 text-white ${plan.color} transform hover:scale-105 transition-transform duration-300`}>
      <div className="absolute top-0 right-0 -mt-3 -mr-3">
        <div className="bg-white text-gray-800 rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
          {plan.price}
          <span className="text-xs -mt-3 ml-0.5">FCFA</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="opacity-80 mb-4">{plan.duration}</p>
      <ul className="space-y-2 mb-6 text-sm flex-grow">
        <li className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Vitesse: {plan.speed}
        </li>
        {plan.data && (
          <li className="flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"></path></svg>
            Data: {plan.data}
          </li>
        )}
      </ul>
      <button 
        onClick={() => onSelect(plan)}
        className="w-full bg-white text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
      >
        Acheter ce forfait
      </button>
    </div>
  );
};

export default PricingCard;
