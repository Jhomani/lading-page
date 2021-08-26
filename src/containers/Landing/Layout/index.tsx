import React from 'react';
import Navbar from '@components/Navbar';
import { Language } from '@components/LangHelper';

interface InLandingLayout {
  authenticated?: boolean;
  children: JSX.Element | string;
}

const leftItems = [
  {
    path: '#prices',
    label: <Language langKey='navPrice' />
  },
  {
    path: '#aboutus',
    label: <Language langKey='navAboutus' />
  },
  {
    path: '#portfolio',
    label: <Language langKey='navPortfolio' />
  },
  {
    path: '#services',
    label: <Language langKey='navServices' />
  },
  {
    path: '#contactus',
    label: <Language langKey='navContact' />,
    prettier: true
  },
]


const LandingLayout = ({ children }: InLandingLayout) => {
  return <>
    <Navbar leftItems={leftItems} rightItems={[]} />
    {children}
    <h1> this is footer </h1>
    <h1> this is footer </h1>
    <h1> this is footer </h1>
    <h1> this is footer </h1>
  </>;
}

export default LandingLayout;