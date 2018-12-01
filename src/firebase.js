import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCm2tf7uXDHtb9G78xVJA5841wNR0FT0aA',
  authDomain: 'movie-collector-dc8ec.firebaseapp.com',
  databaseURL: 'https://movie-collector-dc8ec.firebaseio.com',
  projectId: 'movie-collector-dc8ec',
  storageBucket: 'movie-collector-dc8ec.appspot.com',
  messagingSenderId: '33504702919'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();