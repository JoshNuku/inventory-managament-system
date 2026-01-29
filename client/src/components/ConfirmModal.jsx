import React from 'react';

const ConfirmModal = ({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, isDestructive }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onCancel}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9998,
                    animation: 'fadeIn 0.2s ease'
                }}
            />

            {/* Modal */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'calc(100% - 48px)',
                maxWidth: 300,
                background: 'var(--bg-secondary)',
                borderRadius: 14,
                overflow: 'hidden',
                zIndex: 9999,
                boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
                animation: 'scaleIn 0.2s ease'
            }}>
                {/* Content */}
                <div style={{ padding: '20px 20px 16px', textAlign: 'center' }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: 17,
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                    }}>
                        {title}
                    </h3>
                    {message && (
                        <p style={{
                            margin: '8px 0 0',
                            fontSize: 13,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.4
                        }}>
                            {message}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div style={{ borderTop: '1px solid var(--separator)' }}>
                    <div style={{ display: 'flex' }}>
                        <button
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                padding: '14px 16px',
                                background: 'none',
                                border: 'none',
                                borderRight: '1px solid var(--separator)',
                                fontSize: 17,
                                fontWeight: 400,
                                color: 'var(--accent)',
                                cursor: 'pointer',
                                fontFamily: 'inherit'
                            }}
                        >
                            {cancelText || 'Cancel'}
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                flex: 1,
                                padding: '14px 16px',
                                background: 'none',
                                border: 'none',
                                fontSize: 17,
                                fontWeight: 600,
                                color: isDestructive ? 'var(--danger)' : 'var(--accent)',
                                cursor: 'pointer',
                                fontFamily: 'inherit'
                            }}
                        >
                            {confirmText || 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default ConfirmModal;
