import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { setCurrentURL, route } from '../store.js';
import { connect } from 'preact-redux';

import Header from './header';

// Routes
import Login from '../routes/login';
import Movies from '../routes/movies';
import Search from '../routes/search';
import NotFound from '../routes/404';

class App extends Component {
  state = {
    currentUrl: '',
    user: null,
    movies: []
  }

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
