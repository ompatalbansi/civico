import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getStyles = () => {
        switch (type) {
            case 'success': return 'bg-success text-white';
            case 'error': return 'bg-danger text-white';
            case 'info': return 'bg-info text-dark';
            default: return 'bg-dark text-white';
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
        <div className={`toast show align-items-center border-0 ${getStyles()}`} role="alert" aria-live="assertive" aria-atomic="true" style={{ minWidth: '300px' }}>
            <div className="d-flex">
                <div className="toast-body fs-6">
                    <i className={`fas ${getIcon()} me-2`}></i> {message}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose} aria-label="Close"></button>
            </div>
        </div>
    );
};

export default Toast;
