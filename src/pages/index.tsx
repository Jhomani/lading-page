import React, { memo } from 'react';
import { Language } from '@components/LangHelper';
import Layout from '@landing/Layout';

const IndexPage = () => {
  const handleSwitchLang = () => { }

  console.log('refesh this component');

  return <Layout>
    <div className="landing">
      <h2 className="landing-title"><Language langKey="landingTitle" /></h2>
      <button onClick={handleSwitchLang.bind({}, 'ES')}>theme</button>
    </div>
  </Layout>;
}

export default memo(IndexPage);