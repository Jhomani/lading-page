import React from 'react'

export const DarkMode = ({ size = '1.5rem', color = '#212121' }) => (
  <svg
    width={size}
    height={size}
  >
    <path d="M19.31 8.46939V3.77939H14.62L11.31 0.469391L8 3.77939H3.31V8.46939L0 11.7794L3.31 15.0894V19.7794H8L11.31 23.0894L14.62 19.7794H19.31V15.0894L22.62 11.7794L19.31 8.46939ZM11.31 17.7794C10.42 17.7794 9.57 17.5794 8.81 17.2294C10.87 16.2794 12.31 14.1994 12.31 11.7794C12.31 9.35939 10.87 7.27939 8.81 6.32939C9.57 5.97939 10.42 5.77939 11.31 5.77939C14.62 5.77939 17.31 8.46939 17.31 11.7794C17.31 15.0894 14.62 17.7794 11.31 17.7794Z" fill={color} />
  </svg>);

export const LightMode = ({ size = '1.5rem', color = '#fff' }) => (
  <svg
    width={size}
    height={size}
  >
    <path d="M19.3102 8V3.31H14.6202L11.3102 0L8.00024 3.31H3.31024V8L0.000244141 11.31L3.31024 14.62V19.31H8.00024L11.3102 22.62L14.6202 19.31H19.3102V14.62L22.6202 11.31L19.3102 8ZM11.3102 17.31C8.00024 17.31 5.31024 14.62 5.31024 11.31C5.31024 8 8.00024 5.31 11.3102 5.31C14.6202 5.31 17.3102 8 17.3102 11.31C17.3102 14.62 14.6202 17.31 11.3102 17.31ZM11.3102 7.31C9.10024 7.31 7.31024 9.1 7.31024 11.31C7.31024 13.52 9.10024 15.31 11.3102 15.31C13.5202 15.31 15.3102 13.52 15.3102 11.31C15.3102 9.1 13.5202 7.31 11.3102 7.31Z" fill={color} />
  </svg>
);