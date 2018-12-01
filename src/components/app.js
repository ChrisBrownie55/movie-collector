import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { connect } from 'preact-redux';
import { setCurrentURL } from '../store';
import { auth, firestore } from '../firebase';

import Header from './header';

// Routes
import Login from '../routes/login';
import Movies from '../routes/movies';
import Search from '../routes/search';
import NotFound from '../routes/404';

class App extends Component {
  /* TODO: Use material design component linear-progress
  while the initial authentication is still happening */
  initialAuthHandled = false;

  handleRoute = e => {
    switch (e.url) {
      case '/':
      case '/search':
        // TODO: notify user they need to login to do that
        if (!this.props.user) {
          route('/login', true);
          return;
        }
        break;
      case '/login':
        // TODO: notify user they are already logged in
        if (this.props.user) {
          route('/', true);
          return;
        }
        break;
      default:
        break;
    }

    setCurrentURL(e.url);
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const moviesRef = firestore.collection('movies').doc(user.uid);

        // Get movies initially and on updates
        // then store in state
        moviesRef.onSnapshot(snapshot => {
          // if there aren't any movies set it to empty array
          if (!snapshot.exists) {
            moviesRef.set([]);
            return;
          }

          const movies = snapshot.data();
          this.props.dispatch({
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
        this.props.dispatch({
          type: 'SET_USER',
          user
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== null && prevProps.user === null) {
      route('/');
    }
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Login path="/login" />
          <Movies path="/" />
          <Search path="/search" />
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user })
)(App);
