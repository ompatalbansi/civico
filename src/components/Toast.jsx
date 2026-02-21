import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getStyles = () => {
        switch (type) {
            case 'success': return 'bg-emerald-500/90 text-white shadow-emerald-200/50';
            case 'error': return 'bg-rose-500/90 text-white shadow-rose-200/50';
            case 'info': return 'bg-blue-500/90 text-white shadow-blue-200/50';
            default: return 'bg-slate-800/95 text-white shadow-slate-200/50';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-bell';
        }
    };

    return (
        <div
            className={`flex items-center gap-4 px-6 py-4 my-10 z-100 rounded-2xl backdrop-blur-md shadow-2xl animate-slide-in-right transform transition-all hover:scale-[1.02] min-w-[320px] max-w-md pointer-events-auto ${getStyles()}`}
            role="alert"
        >
            <div className="shrink-0 text-xl">
                <i className={`fas ${getIcon()}`}></i>
            </div>
            <div className="grow">
                <p className="text-sm font-black uppercase tracking-widest leading-none mb-1 opacity-60">
                    {type}
                </p>
                <p className="font-bold text-sm tracking-wide">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/10"
                aria-label="Close"
            >
                <i className="fas fa-times text-xs"></i>
            </button>
        </div>
    );
};

export default Toast;
