// const { useReducer } = require("react");
import { useReducer, useState } from 'react';

type SetStateFn<T> = (a: Partial<T> | ((x: T) => Partial<T>)) => void;
type StateFn<T> = (a: T) => T;

const reducer = (state, action) => {
  switch (typeof action) {
    case "function":
      return { ...state, ...action(state) };
    default:
      return { ...state, ...action };
  }
};

export const customUseReducer = <T>(initialState: T): [T, Function] => {
  return useReducer(reducer, initialState);
};

export const useStatus = <T>(initialState: T): [T, SetStateFn<T>, any] => {
  const [state, setState] = useState(initialState);
  let prevStatus: T = initialState;

  const updateState = (updateValue: StateFn<T> | Object): void => {
    if (typeof updateValue === 'function')
      setState(prevState => ({ ...prevState, ...updateValue(prevState) }));
    else {
      let sameState = true;

      for (let key in updateValue) {
        if (updateValue[key] !== prevStatus[key]) {
          prevStatus[key] = updateValue[key];
          sameState = false;
        }
      }

      if (!sameState)
        setState(prevState => ({ ...prevState, ...updateValue }));
    }
  }

  const rightState = (): T => {
    return prevStatus;
  }

  return [state, updateState, rightState];
}