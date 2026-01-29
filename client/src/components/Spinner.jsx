import React from 'react';

const Spinner = ({ size = 20, color }) => {
    const spinnerColor = color || 'currentColor';

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: 'spin 1s linear infinite' }}
        >
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={spinnerColor}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                opacity="0.25"
            />
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={spinnerColor}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
                strokeDashoffset="23.55"
            />
        </svg>
    );
};

export default Spinner;
