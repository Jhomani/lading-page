import React, { memo } from 'react';
import { switchLanguage } from "@redux/actions/app";
import { useDispatch } from 'react-redux';
import { Language } from '@components/LangHelper';
import { toggleColorMode } from '@utils/global'

const IndexPage = () => {
  const dispatch = useDispatch();

  const handleSwitchLang = (locale: 'EN' | 'ES') => {
    toggleColorMode();

    // dispatch(switchLanguage(locale));
  }

  console.log('refesh this component');

  return (<div className="landing">
    <h1 className="landing-title"><Language langKey="landingTitle" /></h1>
    <button onClick={handleSwitchLang.bind({}, 'ES')}>theme</button>
  </div>);
}

export default memo(IndexPage);