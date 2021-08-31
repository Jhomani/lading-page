import React, { useRef, useEffect } from 'react';

interface InButton {
  shadow?: 'primary' | 'normal';
  icon?: JSX.Element;
  type: 'primary' | 'secondary' | 'gradient';
  children?: JSX.Element | string;
  content?: JSX.Element | string;
}

export const Button = (props: InButton) => {
  const { children, content, type } = props;
  const btn = useRef(null);

  const handleClick = () => {
    const node: HTMLElement = btn.current;

    if (node) {
      node.classList.add('pressLight');
      setTimeout(() => node.classList.remove('pressLight'), 350)
    }
  }

  return <>
    <button
      onClick={handleClick}
      className={`btn-${type}`}
      ref={btn}
    >
      <span>
        {content ?? children}
      </span>
    </button>
  </>;
}

