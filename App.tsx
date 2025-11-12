import React, { useState } from 'react';
import Header from './components/Header';
import PricingCard from './components/PricingCard';
import PaymentModal from './components/PaymentModal';
import LoginForm from './components/LoginForm';
import TabButton from './components/TabButton';
import Marquee from './components/Marquee';
import { TariffPlan, View } from './types';

const tariffPlans: TariffPlan[] = [
    { id: 1, name: 'Illimité 1H', price: 100, duration: '1 Heure', speed: '5 Mbps', users: 1, color: 'bg-gradient-to-br from-cyan-500 to-blue-500' },
    { id: 2, name: 'Illimité 24H', price: 1000, duration: '24 Heures', speed: '15 Mbps', users: 1, color: 'bg-gradient-to-br from-green-500 to-teal-500' },
    { id: 3, name: 'Illimité 24H Eco', price: 500, duration: '24 Heures', speed: '5 Mbps', users: 1, color: 'bg-gradient-to-br from-lime-500 to-green-500' },
    { id: 4, name: 'Forfait 5J', price: 500, duration: '5 Jours', data: '10 Giga', speed: '5 Mbps', users: 1, color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { id: 5, name: 'Forfait 30J', price: 5000, duration: '30 Jours', data: '100 Giga', speed: '5 Mbps', users: 1, color: 'bg-gradient-to-br from-red-500 to-rose-500' },
    { id: 6, name: 'Forfait 30J Plus', price: 5000, duration: '30 Jours', data: '100 Giga', speed: '10 Mbps', users: 3, color: 'bg-gradient-to-br from-fuchsia-500 to-purple-600' },
    { id: 7, name: 'Forfait 30J Pro', price: 7500, duration: '30 Jours', data: '100 Giga', speed: '15 Mbps', users: 2, color: 'bg-gradient-to-br from-indigo-500 to-violet-600' },
    { id: 8, name: 'Forfait 30J Expert', price: 10000, duration: '30 Jours', data: '500 Giga', speed: '20 Mbps', users: 5, color: 'bg-gradient-to-br from-slate-600 to-slate-800' },
];

const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LoginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>;

function App() {
  const [currentView, setCurrentView] = useState<View>(View.Buy);
  const [selectedPlan, setSelectedPlan] = useState<TariffPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan: TariffPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay setting plan to null to allow for closing animation
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case View.Buy:
        return (
          <div key="buy-view" className="animate-fade-in">
             <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-2">Choisissez votre forfait</h2>
             <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Connectez-vous au meilleur réseau, en quelques clics.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
               {tariffPlans.map(plan => (
                 <PricingCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
               ))}
             </div>
          </div>
        );
      case View.Login:
        return (
          <div key="login-view" className="animate-fade-in">
            <LoginForm />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <Header />
      <Marquee />
      <main className="container mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <TabButton label="Acheter un forfait" icon={<ShoppingCartIcon />} isActive={currentView === View.Buy} onClick={() => setCurrentView(View.Buy)} />
            <TabButton label="J'ai déjà un code" icon={<LoginIcon />} isActive={currentView === View.Login} onClick={() => setCurrentView(View.Login)} />
        </div>
        
        {renderCurrentView()}
        
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 mt-8">
        <p>&copy; {new Date().getFullYear()} MBAHE WIFI. Tous droits réservés.</p>
      </footer>
      
      {isModalOpen && <PaymentModal plan={selectedPlan} onClose={closeModal} />}
    </div>
  );
}

export default App;
