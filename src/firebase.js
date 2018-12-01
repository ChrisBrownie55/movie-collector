import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

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

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence().catch(error => console.warn(error));

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();