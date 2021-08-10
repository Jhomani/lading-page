import React, { useEffect, useState } from 'react';
import { Logo } from '@components/icons'

import { switchLanguage } from "@redux/actions/app";
import { toggleColorMode } from '@utils/global'
import { useDispatch, useStore } from 'react-redux';

interface InItem {
  path: string;
  label: string | JSX.Element;
  prettier?: boolean
}

interface InNavBar {
  leftItems: InItem[];
  rightItems: InItem[];
}

const NavBar = ({ }: InNavBar) => {
  const [bgNav, setBgNav] = useState('g-bg-transp');

  useEffect(() => {
    if (window) {
      window.onscroll = ev => {
        let scrollTop = ev.target.scrollingElement.scrollTop;
        if (scrollTop <= 51) setBgNav('g-bg-transp');
        else setBgNav('');
      };

      if (window.scrollY <= 51) setBgNav('g-bg-transp');
      else setBgNav('');
    }
  }, []);

  return <>
    <nav className={`navbar-component ${bgNav}`}>
      <div className="navbar-container">
        <ul className="navbar-left">
          <li className="text-color">
            <Logo size="4em" />&nbsp;Clevermade Soft
          </li>
          <li>Services</li>
        </ul>
        <div className="navbar-left">


        </div>
        <ul className="navbar-right">
          <li><a href="#">Services</a></li>
          <li>Services</li>
          <li>Services</li>
        </ul>
      </div>
    </nav>
  </>;
}

export default NavBar;