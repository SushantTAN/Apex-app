import * as types from '../actionTypes';

const initialState = {
  counter: 120,
}

const resetReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_COUNTER:
      return { ...state, counter: action.payload };

    case types.DECREMENT_COUNTER:
      return { ...state, counter: state.counter - 1 };

    default:
      return state;

  }
}
export default resetReducer;