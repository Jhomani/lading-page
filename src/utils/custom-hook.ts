// const { useReducer } = require("react");
import { useReducer, useState } from 'react';

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

// export function useStateCustom<T>(x: T): [T, (a: (x: T) => T | Partial<T>) => void];
// export function useStateCustom<T>(x: T): [T, (a: Partial<T>) => void];

type SetStateFn<T> = (a: Partial<T> | ((x: T) => Partial<T>)) => void;

export const useStateCustom = <T>(
  initialState: T
): [T, SetStateFn<T>] => {
  const [state, setState] = useState(initialState);

  const updateState = (updateValue: ((a: T) => T) | Object): void => {
    if (typeof updateValue === 'function')
      return setState(
        prevState => ({ ...prevState, ...updateValue(prevState) })
      );
    else
      return setState(prevState => ({ ...prevState, ...updateValue }));
  }


  return [state, updateState];
}