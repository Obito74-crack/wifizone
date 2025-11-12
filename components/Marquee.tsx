import React from 'react';

const Marquee: React.FC = () => {
  const messages = [
    "Bienvenue chez MBAHE WIFI !",
    "Profitez de nos forfaits ultra-rapides.",
    "Paiement facile et sécurisé par Orange Money et MoMo.",
    "Connectez-vous en un instant.",
    "Le meilleur du WiFi, au meilleur prix."
  ];

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md overflow-hidden relative w-full h-12 border-b border-slate-200 dark:border-slate-700">
      <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex items-center h-full">
        {messages.map((msg, i) => (
          <span key={i} className="text-lg font-semibold mx-12 text-slate-700 dark:text-slate-300">{msg}</span>
        ))}
        {/* Duplicate messages for a seamless loop effect */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="text-lg font-semibold mx-12 text-slate-700 dark:text-slate-300" aria-hidden="true">{msg}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
