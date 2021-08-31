import React, { memo } from 'react';
import { Select, Button } from '@components/index';

const options = [
  { key: 0, label: 'Carlos' },
  { key: 2, label: 'Mauro' },
  { key: 3, label: 'Jose' },
  { key: 5, label: 'Romeo' },
  { key: 10, label: 'Antonio' },
]

const IndexPage = () => {
  console.log('refesh this component');

  const handleSelected = (selected: number) => {
    console.log(selected, 'in used');
  }

  return <>
    <div className="landing">
      {/* <h2 className="landing-title"><Language langKey="landingTitle" /></h2> */}

      <Select
        options={options}
        initial={10}
        onSelected={handleSelected}
      />
      <br />

      <Button content="data for you" type="gradient" />
    </div>
  </>;
}

export default memo(IndexPage);