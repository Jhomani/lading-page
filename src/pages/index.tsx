import React, { memo } from 'react';
import { Language } from '@components/LangHelper';

const IndexPage = () => {
  const handleSwitchLang = () => { }

  console.log('refesh this component');

  return <>
    <div className="landing">
      <h2 className="landing-title"><Language langKey="landingTitle" /></h2>
      <button onClick={handleSwitchLang.bind({}, 'ES')}>theme</button>
    </div>
  </>;
}

export default memo(IndexPage);