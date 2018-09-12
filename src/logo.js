import React from 'react';

export default ({ size }) => (
  <svg
    width={size ? size : 33}
    viewBox="0 0 33 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.8838 44.25L13.1623 21.2734H20.1133C25.9878 21.2734 30.75 16.5112 30.75 10.6367V10.6367C30.75 4.76221 25.9878 0 20.1133 0L0 0"
      transform="translate(0 3)"
      stroke="url(#paint0_linear)"
      strokeWidth="4.5"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x2="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(15.375) scale(29.6694 42.6951) rotate(90)"
      >
        <stop stopColor="#6CFDCC" />
        <stop offset="1" stopColor="#5A89F9" />
      </linearGradient>
    </defs>
  </svg>
);
