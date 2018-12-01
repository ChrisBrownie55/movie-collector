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
    case 'UPDATE_CURRENT_URL':
      return {
        ...state,
        currentUrl: action.currentUrl
      };
    case 'ERROR':
      // TODO: Tell user to try again
      console.error('An error has occurred:', action.error);
      break;
    default:
      console.warn(`Warning: "${action.type}" is not an action`);
      break;
  }
  return state;
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

export { store, login, logout };