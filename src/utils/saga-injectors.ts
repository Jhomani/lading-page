import { InStore } from './reducer-injectors';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

interface InDescriptor {
  saga: Function;
  mode?: string;
}

export function injectSagaFactory(store: InStore) {
  return function injectSaga(key: string, descriptor: InDescriptor, args) {
    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode ?? DAEMON,
    };
    const { saga, mode } = newDescriptor ?? {};

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory(store: InStore) {
  return function ejectSaga(key: string) {
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        if (process.env.NODE_ENV === 'production') {
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: InStore) {

  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store),
  };
}
