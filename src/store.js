import { createStore } from 'redux';

const initialState = {

};

const store = createStore((state=initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      break;
    case 'LOGOUT':
      break;
    case 'ADD_TO_LIBRARY':
      break;
    case 'REMOVE_FROM_LIBRARY':
      break;
    default:
      console.warn(`Warning: "${action.type}" is not an action`);
      break;
  }
});

export { store };