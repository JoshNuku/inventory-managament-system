import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div style={{
                position: 'fixed',
                top: 60,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                maxWidth: 400,
                padding: '0 16px',
                pointerEvents: 'none'
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '14px 16px',
                            background: toast.type === 'error' ? '#FF3B30' : '#34C759',
                            borderRadius: 14,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 500,
                            pointerEvents: 'auto',
                            animation: 'slideDown 0.3s ease'
                        }}
                    >
                        {toast.type === 'error' ? (
                            <AlertCircle size={20} style={{ flexShrink: 0 }} />
                        ) : (
                            <CheckCircle size={20} style={{ flexShrink: 0 }} />
                        )}
                        <span style={{ flex: 1 }}>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                opacity: 0.7,
                                cursor: 'pointer',
                                padding: 4,
                                display: 'flex'
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    );
};

export default ToastContext;
