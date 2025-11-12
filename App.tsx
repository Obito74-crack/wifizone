
import React, { useState } from 'react';
import Header from './components/Header';
import PricingCard from './components/PricingCard';
import PaymentModal from './components/PaymentModal';
import LoginForm from './components/LoginForm';
import TabButton from './components/TabButton';
import { TariffPlan, View } from './types';

const tariffPlans: TariffPlan[] = [
    { id: 1, name: 'Forfait Jour', price: 500, duration: 'Validité: 24 Heures', speed: 'Illimitée', color: 'bg-gradient-to-br from-blue-500 to-blue-700' },
    { id: 2, name: 'Forfait Semaine', price: 2500, duration: 'Validité: 7 Jours', speed: 'Illimitée', data: '10 Go Limite', color: 'bg-gradient-to-br from-purple-500 to-purple-700' },
    { id: 3, name: 'Forfait Mois', price: 10000, duration: 'Validité: 30 Jours', speed: 'Illimitée', data: '50 Go Limite', color: 'bg-gradient-to-br from-teal-500 to-teal-700' },
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
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <TabButton label="Acheter un forfait" icon={<ShoppingCartIcon />} isActive={currentView === View.Buy} onClick={() => setCurrentView(View.Buy)} />
            <TabButton label="J'ai un code" icon={<LoginIcon />} isActive={currentView === View.Login} onClick={() => setCurrentView(View.Login)} />
        </div>

        {currentView === View.Buy ? (
          <div>
             <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-2">Choisissez votre forfait</h2>
             <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Connectez-vous en quelques clics.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {tariffPlans.map(plan => (
                 <PricingCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
               ))}
             </div>
          </div>
        ) : (
          <LoginForm />
        )}
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Ma WiFi Zone. Tous droits réservés.</p>
      </footer>
      
      {isModalOpen && <PaymentModal plan={selectedPlan} onClose={closeModal} />}
    </div>
  );
}

export default App;
