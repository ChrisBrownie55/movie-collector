import { createStore } from 'redux';
import router from 'preact-router';
import { auth, provider, database } from './firebase';

const initialState = {
  currentUrl: '',
  user: null,
  movies: []
};

const store = createStore((state=initialState, action) => {
  switch (action.type) {
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

auth.onAuthStateChanged(user => {
  if (user) {
    this.moviesRef = database.ref('/movies/' + user.uid);

    // Get movies initially and on updates
    // then store in state
    this.moviesRef.on('value', snapshot => {
      const movies = snapshot.val();
      store.dispatch({
        type: 'SET_MOVIES',
        movies: Object.keys(movies)
          // Get all of the movies and store their `id`
          .map(key => ({
            ...movies[key],
            id: key
          }))
          // Sort the movies by their names
          .sort((a, b) => a.movieName.localeCompare(b.movieName))
      });
    });

    // Set user then go to home
    store.dispatch({
      type: 'SET_USER',
      user
    });

    router.route('/');
  }
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

  store.dispatch({
    type: 'SET_USER',
    user: null
  });
}

function setCurrentURL(url) {
  store.dispatch({
    type: 'SET_CURRENT_URL',
    currentUrl: url
  });
}

function route(url, replace=false) {
  setCurrentURL(url);
  router.route(url, replace);
}

export { store, login, logout, route, setCurrentURL };