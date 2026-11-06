import React from 'react';

/**
 * ArrowUpIcon Component
 * @param {string} variant - Kiểu icon: "chevron" (mặc định), "arrow", hoặc "filled"
 * @param {string} className - Các class CSS/Tailwind (màu sắc, kích thước)
 * @param {object} props - Các props SVG bổ sung khác
 */
export const ArrowUpIcon = ({ 
  variant = 'chevron', 
  className = 'w-6 h-6 text-gray-700', 
  ...props 
}) => {
  if (variant === 'arrow') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    );
  }

  if (variant === 'filled') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
      >
        <path d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
    );
  }

  // Mặc định: Kiểu Chevron Up
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

export default ArrowUpIcon;