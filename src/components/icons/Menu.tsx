import React from 'react'

export const Menu = ({ size = '1.5rem', color = '#fff' }) => (
  <svg
    width={size}
    height={`calc(${size} - (${size} /3))`}
  >
    <path d="M0.833252 15.6667H24.1666V13.1389H0.833252V15.6667ZM0.833252 9.34722H24.1666V6.81944H0.833252V9.34722ZM0.833252 0.5V3.02778H24.1666V0.5H0.833252Z" fill={color} />
  </svg>);