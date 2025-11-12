
import React from 'react';

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick, icon }) => {
    const baseClasses = "flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900";
    const activeClasses = "bg-blue-600 text-white shadow-md";
    const inactiveClasses = "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600";
    
    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    );
};

export default TabButton;
