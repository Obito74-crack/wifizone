import React from 'react';
import { TariffPlan } from '../types';

const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SpeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const DataIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M8 4v16m8-16v16" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;


interface PricingCardProps {
  plan: TariffPlan;
  onSelect: (plan: TariffPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`relative flex flex-col rounded-2xl shadow-xl p-6 text-white ${plan.color} transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}>
      <div className="absolute top-0 right-0 bg-white text-gray-800 rounded-tr-2xl rounded-bl-2xl px-4 py-2 font-bold text-lg shadow-lg">
        {plan.price}<span className="text-xs font-semibold"> FCFA</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="opacity-80 mb-6 font-medium">{plan.data ? `Volume: ${plan.data}` : "Volume: Illimité"}</p>
      
      <div className="border-t border-white/20 my-4"></div>

      <ul className="space-y-3 mb-6 text-sm flex-grow font-medium">
        <li className="flex items-center">
          <ClockIcon />
          <span>Durée: {plan.duration}</span>
        </li>
        <li className="flex items-center">
          <SpeedIcon />
          <span>Bande Passante: {plan.speed}</span>
        </li>
        <li className="flex items-center">
          <UsersIcon />
          <span>Nombre d'utilisateurs: {plan.users}</span>
        </li>
      </ul>
      <button 
        onClick={() => onSelect(plan)}
        className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 shadow-md"
      >
        Choisir ce forfait
      </button>
    </div>
  );
};

export default PricingCard;
