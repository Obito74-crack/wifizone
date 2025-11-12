
import React, { useState, useCallback } from 'react';
import { TariffPlan, Credentials, PaymentStatus, PaymentMethod } from '../types';
import { generateCredentials } from '../services/mikrotikService';

interface PaymentModalProps {
  plan: TariffPlan | null;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.Idle);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [error, setError] = useState('');

  const handlePayment = useCallback(async (method: PaymentMethod) => {
    if (!plan || !/^\d{9}$/.test(phoneNumber)) {
      setError('Veuillez entrer un numéro de téléphone valide (9 chiffres).');
      return;
    }
    setError('');
    setStatus(PaymentStatus.Processing);
    
    // Simuler l'appel à la passerelle de paiement
    console.log(`Initiation du paiement pour ${plan.name} avec ${method} vers le numéro ${phoneNumber}`);
    try {
      // Dans une application réelle, vous attendriez un webhook de la passerelle de paiement.
      // Ici, nous simulons un succès et générons directement les informations d'identification.
      const creds = await generateCredentials(plan);
      setCredentials(creds);
      setStatus(PaymentStatus.Success);
    } catch (err) {
      setError('Une erreur est survenue lors de la génération de vos accès. Veuillez réessayer.');
      setStatus(PaymentStatus.Error);
    }
  }, [plan, phoneNumber]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!plan) return null;

  const renderContent = () => {
    switch (status) {
      case PaymentStatus.Processing:
        return (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Traitement de votre paiement...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Veuillez valider sur votre téléphone.</p>
          </div>
        );
      case PaymentStatus.Success:
        return (
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Paiement Réussi !</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Utilisez ces identifiants pour vous connecter.</p>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Nom d'utilisateur</span>
                  <p className="font-mono text-lg text-gray-800 dark:text-white">{credentials?.username}</p>
                </div>
                <button onClick={() => copyToClipboard(credentials?.username || '')} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mot de passe</span>
                  <p className="font-mono text-lg text-gray-800 dark:text-white">{credentials?.password}</p>
                </div>
                <button onClick={() => copyToClipboard(credentials?.password || '')} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>
            <button onClick={onClose} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Fermer
            </button>
          </div>
        );
      default: // Idle or Error
        return (
          <>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Acheter: {plan.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Prix: {plan.price} FCFA</p>
              <div className="mt-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Numéro de téléphone</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                   <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                    className="block w-full px-4 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    placeholder="6XXXXXXXX"
                    maxLength={9}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => handlePayment(PaymentMethod.OrangeMoney)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                Payer avec Orange Money
              </button>
              <button onClick={() => handlePayment(PaymentMethod.MoMo)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-yellow-400 text-base font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors">
                Payer avec MoMo
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="flex justify-end pt-2 pr-2">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentModal;
