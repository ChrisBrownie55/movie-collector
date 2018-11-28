import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Movies from '../routes/movies';
import Auth from '../routes/auth';

import NotFound from '../routes/404';

import { auth, provider } from '../firebase.js';

export default class App extends Component {
  state = {
    currentUrl: null,
    user: null
  }

  handleRoute = e => {
    this.setState({
      currentUrl: e.url
    });
  };

  login = async () => {
    try {
      const { user } = await auth.signInWithPopup(provider);
      this.setState({ user });
    } catch (error) {
      // TODO: Notify the user of error
      console.error('An error has occurred while authenticating:', error);
    }
  }

  logout = async () => {
    await auth.signOut();
    this.setState({ user: null });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => user && this.setState({ user }));
  }

  render() {
    return (
      <div id="app">
        <Header selectedRoute={this.state.currentUrl} />
        <Router onChange={this.handleRoute}>
          <Auth onLogin={this.login} path="/" />
          <Auth onLogin={this.login} path="/auth" />
          <Auth onLogin={this.login} path="/movies/" />
          <Movies path="/movies/:userId" />
          <NotFound default />
        </Router>
      </div>
    );
  }
}
