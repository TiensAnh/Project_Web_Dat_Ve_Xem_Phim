import React from 'react';

function LoadingSpinner({ text = 'Đang tải dữ liệu...' }) {
    return (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#2563eb' }}>
            <i 
                className="fa-solid fa-circle-notch fa-spin" 
                style={{ fontSize: '38px', marginBottom: '14px', display: 'inline-block' }}
                aria-hidden="true"
            ></i>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>{text}</p>
        </div>
    );
}

export default LoadingSpinner;