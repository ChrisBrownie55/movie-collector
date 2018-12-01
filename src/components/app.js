import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Login from '../routes/login';
import Movies from '../routes/movies';
import Search from '../routes/search';
import NotFound from '../routes/404';

import { setCurrentURL, route } from '../store.js';

export default class App extends Component {
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
        if (!this.state.user) {
          route('/login', true);
          return;
        }
        break;
      case '/login':
        // TODO: notify user they are already logged in
        if (this.state.user) {
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
        <Header onLogout={this.logout} user={this.state.user} selectedRoute={this.state.currentUrl} />
        <Router onChange={this.handleRoute}>
          <Login onLogin={this.login} path="/login" />
          <Movies path="/" user={this.state.user} movies={this.state.movies} />
          <Search path="/search" user={this.state.user} />
          <NotFound default />
        </Router>
      </div>
    );
  }
}
