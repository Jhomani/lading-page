import createReducer from './create-reducer';

export interface InStore {
  dispatch: Function,
  subscribe: Function,
  getState: Function,
  replaceReducer: Function,
  runSaga: Function,
  injectedReducers: Object,
  injectedSagas: Object,
}

export function injectReducerFactory(store: InStore) {
  return function injectReducer(key: string, reducer: Function) {
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: InStore) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}