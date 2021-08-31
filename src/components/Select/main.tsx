import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ShortArrow } from '@components/icons'

interface OptionIn {
  key: string | number;
  label: string | JSX.Element;
}

interface SelectIn {
  options: OptionIn[];
  initial: string | number;
  onSelected(selected: string | number): void;
}

const optionsObj = {};

export const Select = (props: SelectIn) => {
  const { initial, options, onSelected } = props;

  const [display, setDisplay] = useState(false);
  const [selected, setSelected] = useState(initial);
  const container = useRef(null);

  useMemo(() => {
    options.forEach(({ key, label }) => optionsObj[key] = label);
  }, [options])

  const toggleOptions = () => {
    if (display) closeOptions();
    else setDisplay(true);
  }

  const handleSelected = (key: number | string) => {
    setSelected(key);
    onSelected(key);

    if (display) closeOptions();
  }

  const closeOptions = () => {
    let node: HTMLElement = container.current;

    if (node) {
      let opts: HTMLElement = node.querySelector('ul.options');
      let input: HTMLElement = node.querySelector('input[type]');

      if (opts) opts.classList.add('closeAnimation');
      if (input) input.blur();

      setTimeout(() => setDisplay(false), 400)
    }
  };


  return <>
    <div className="select-container" ref={container}>
      <div className="selected" onClick={toggleOptions}>
        <input
          type="button"
          onBlur={() => display && closeOptions()}
          value={optionsObj[selected]}
        />
        <ShortArrow className="selectIcon" />
      </div>
      {display &&
        <ul className="options">
          {options.map((item, i) =>
            item.key == selected
              ? <li
                className="primary-selected-btn"
                key={i}
                onMouseDown={handleSelected.bind({}, item.key)}
              >
                <span>
                  {item.label}
                </span>
              </li>
              : <li
                key={i}
                onMouseDown={handleSelected.bind({}, item.key)}
              >
                <span>
                  {item.label}
                </span>
              </li>)
          }
        </ul>
      }
    </div>
  </>;
}
