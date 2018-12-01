import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

import Icon from 'preact-material-components/Icon';

import style from './style.css';

class Movies extends Component {
  goToSearch = () => route('/search');

  render({ user: { photoURL, displayName } }) {
    return (
      <div class={`${style.movies} page`}>
        <header class={style.header}>
          <img class={style.avatar} src={photoURL} alt="avatar" />
          <Icon class={style.search} onClick={this.goToSearch}>search</Icon>
        </header>
        <h1 class={style.displayName}>{displayName.split(' ')[0]}'s Movies</h1>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user })
)(Movies);