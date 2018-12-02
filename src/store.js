import { createStore } from 'redux';
import { route } from 'preact-router';
import { auth, provider, database } from './firebase';

const initialState = {
  currentURL: '',
  user: null,
  movies: []
};

const store = createStore((state=initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return initialState;
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'ADD_TO_LIBRARY':
      return {
        ...state
      };
    case 'REMOVE_FROM_LIBRARY':
      return {
        ...state
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.movies
      };
    case 'SET_CURRENT_URL':
      return {
        ...state,
        currentURL: action.currentURL
      };
    default:
      break;
  }
  return state;
});

async function login(user) {
  try {
    const { user } = await auth.signInWithPopup(provider);
    store.dispatch({
      type: 'SET_USER',
      user
    });
  } catch (error) {
    // TODO: Notify the user of error
    console.error('An error has occurred while authenticating:', error);
  }
}

async function logout() {
  await auth.signOut();
  route('/login');

  store.dispatch({
    type: 'SET_USER',
    user: null
  });
}

function setCurrentURL(url) {
  store.dispatch({
    type: 'SET_CURRENT_URL',
    currentURL: url
  });
}

// TODO: Implement these functions
function addToLibrary() {}
function removeFromLibrary() {}

export { store, login, logout, setCurrentURL, addToLibrary, removeFromLibrary };