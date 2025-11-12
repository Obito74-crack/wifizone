import React from 'react';

const WifiIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <defs>
            <linearGradient id="wifi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.555A5.5 5.5 0 0112 15c1.45 0 2.803.558 3.889 1.555m-7.778 0a9 9 0 0115.556 0M4.222 12.667a12.5 12.5 0 0115.556 0" stroke="url(#wifi-gradient)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5a.5.5 0 100-1 .5.5 0 000 1z" stroke="url(#wifi-gradient)" />
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 shadow-lg p-4 sticky top-0 z-40 bg-opacity-90 backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-center">
                <WifiIcon />
                <h1 className="ml-2 text-4xl font-extrabold text-white tracking-wider">
                    MBAHE
                </h1>
            </div>
        </header>
    );
};

export default Header;
