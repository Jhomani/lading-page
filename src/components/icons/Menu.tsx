import React from 'react'

export const Menu = ({ size = '1.5rem', color = '#fff' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 16"

  >
    <path xmlns="http://www.w3.org/2000/svg" d="M0 16H24V13.3333H0V16ZM0 9.33333H24V6.66667H0V9.33333ZM0 0V2.66667H24V0H0Z" fill={color} />
  </svg>);