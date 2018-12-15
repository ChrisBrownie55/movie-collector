import { createStore } from 'redux';
import { route } from 'preact-router';
import firebase, { auth, provider, firestore } from './firebase';

const initialState = {
  currentURL: '',
  user: null,
  isAnonymous: false,
  movies: []
};

let moviesRef;

/************
 * Reducers *
 ************/
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
        movies: action.movies,
        movieIds: new Set(action.movies.map(movie => movie.tmbdId))
      };
    case 'SET_CURRENT_URL':
      return {
        ...state,
        currentURL: action.currentURL
      };
    case 'SET_ANONYMITY':
      return {
        ...state,
        isAnonymous: action.isAnonymous
      };
    default:
      break;
  }
  return state;
});

/***********
 * Actions *
 ***********/
async function login() {
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

async function loginAnonymously() {
  try {
    await auth.signInAnonymously();
    store.dispatch({
      type: 'SET_ANONYMITY',
      isAnonymous: true
    });
  } catch (error) {
    // TODO: Notify the user of error
    console.error('An error has occurred while creating an anonymous account:', error);
  }
}

async function deleteUser() {
  const { user } = store.getState();

  if (!user) {
    return;
  }

  try {
    await user.delete();
  } catch (error) {
    console.log('Unable to remove user');
  }
}

async function logout() {
  await auth.signOut();
  route('/login');

  if (store.getState().isAnonymous) {
    deleteUser();

    store.dispatch({
      type: 'SET_ANONYMITY',
      isAnonymous: false
    });
  }

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

function addToLibrary(movie) {
  return moviesRef.update({
    movies: firebase.firestore.FieldValue.arrayUnion(movie)
  });
}

function removeFromLibrary(movie) {
  return moviesRef.update({
    movies: firebase.firestore.FieldValue.arrayRemove(movie)
  });
}

function setupFirebase() {
  auth.onAuthStateChanged(user => {
    if (user) {
      moviesRef = firestore.collection('movies').doc(user.uid);

      // Get movies initially and on updates
      // then store in state
      moviesRef.onSnapshot(snapshot => {
        // if there aren't any movies set it to empty array
        if (!snapshot.exists) {
          moviesRef.set({
            movies: []
          });
          return;
        }

        const { movies } = snapshot.data();
        store.dispatch({
          type: 'SET_MOVIES',
          movies: movies
            // Sort the movies by their names
            .sort((a, b) => a.movieName.localeCompare(b.movieName))
        });
      });

      store.dispatch({
        type: 'SET_ANONYMITY',
        isAnonymous: user.isAnonymous
      });

      // Set user then go to home
      store.dispatch({
        type: 'SET_USER',
        user
      });
    }
  });
}

export { store, login, loginAnonymously, logout, setCurrentURL, addToLibrary, removeFromLibrary, setupFirebase };