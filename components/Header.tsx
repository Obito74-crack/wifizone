
import React from 'react';

const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.555A5.5 5.5 0 0112 15c1.45 0 2.803.558 3.889 1.555m-7.778 0a9 9 0 0115.556 0M4.222 12.667a12.5 12.5 0 0115.556 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19.5a.5.5 0 100-1 .5.5 0 000 1z" />
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 shadow-lg p-4">
            <div className="container mx-auto flex items-center justify-center">
                <WifiIcon />
                <h1 className="ml-3 text-2xl font-bold text-white tracking-wider">
                    Ma WiFi Zone
                </h1>
            </div>
        </header>
    );
};

export default Header;
