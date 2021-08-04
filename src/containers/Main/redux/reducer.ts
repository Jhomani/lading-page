import { INITIAL_REQUEST_MAIN_SUCCESS } from './constants';
import { InPayment } from '@utils/services'

interface InMainResources {
  roleUser: string,
  products: InPayment[]
}

const initialStateMain: InMainResources = {
  roleUser: '',
  products: []
};

export function mainReducer(state = initialStateMain, action) {
  switch (action.type) {
    case INITIAL_REQUEST_MAIN_SUCCESS:
      let { role } = action.payload;

      return { ...state, roleUser: role };
    default:
      return state;
  }
}

export default mainReducer;
