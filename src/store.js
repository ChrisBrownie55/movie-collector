import { createStore } from 'redux';
import { auth, provider, database } from '../firebase';

const initialState = {
  currentUrl: '',
  user: null,
  movies: []
};

const store = createStore((state=initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case 'ADD_TO_LIBRARY':
      return {
        ...state
      };
    case 'REMOVE_FROM_LIBRARY':
      return {
        ...state
      };
    default:
      console.warn(`Warning: "${action.type}" is not an action`);
      break;
  }
});

function login(user) {
  return {
    type: 'LOGIN',
    user
  };
}

function logout() {
  return {
    type: 'LOGOUT'
  };
}

export { store };