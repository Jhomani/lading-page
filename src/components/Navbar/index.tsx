import React, { useEffect, useState, useRef, memo } from 'react';
import { useRouter } from 'next/router';
import logo from '@components/images/logo.png';
import Link from 'next/link';

import { switchLanguage } from "@redux/actions/app";
import { toggleColorMode } from '@utils/global'
import { useDispatch, useStore } from 'react-redux';

interface ItemIn {
  path?: string;
  label: string | JSX.Element;
}

interface NavBarIn {
  items: ItemIn[];
}

const NavBar = ({ items }: NavBarIn) => {
  const [bgNav, setBgNav] = useState('clean-navbar');
  const navBar = useRef(null);
  const router = useRouter();


  useEffect(() => {
    if (window) {
      window.onscroll = ev => {
        let scrollTop = ev.target.scrollingElement.scrollTop;
        if (scrollTop <= 51) setBgNav('clean-navbar');
        else setBgNav('');
      };

      if (window.scrollY > 51) setBgNav('');
    }

    if (navBar.current) {
      let items = navBar.current.querySelectorAll('a.nav-item');

      for (let i of items) {
        let itemRef = i.getAttribute('href');

        if (itemRef === router.pathname) {
          i.classList.add('primary-selected');
        }

        i.onclick = e => {
          let target: HTMLElement = e.target;

          items.forEach(j => j.classList.remove('primary-selected'));
          target.classList.add('primary-selected')
        }
      }
    }
  }, []);

  console.log('this is navbar....')

  return <>
    <nav className={`navbar-component ${bgNav}`}>
      <div className="navbar-container" ref={navBar}>
        <ul className="navbar-left">
          <li>
            <Link href="/">
              <a href="/" className="nav-item">
                <img src={logo} alt='logo' height='100%' />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="navbar-right">
          {/* more than 759px */}
          {/* <li>
            <Link href="/services">
              <a href="/services" className="nav-item"> Services </a>
            </Link>
          </li>
          <li>
            <Link href="/prices">
              <a href="/prices" className="nav-item"> Prices </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="/" className="nav-item"> Home </a>
            </Link>
          </li> */}
          {/* loss than 759px */}
          <li className="nav-item">
            open
          </li>
          <li className="nav-item">
            theme
          </li>

        </ul>
      </div>
    </nav>
  </>;
}

export default memo(NavBar, (prev, next) => {
  console.log(prev, next);

  return true;
});