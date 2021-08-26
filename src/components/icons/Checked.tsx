import React from 'react'

export const Checked = ({ size = '1.5rem', color = '#fff' }) => (
  <svg
    width={size}
    height={size}
  >
    <line
      x1="3.34231"
      y1="10.1159"
      x2="7.51591"
      y2="16.2202"
      stroke={color}
      stroke-width="4"
      strokeLinecap="round" />
    <line
      x1="7.97372"
      y1="16.6197"
      x2="20.101"
      y2="2.18253"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round" />
  </svg>);