import { h, Component } from 'preact';
import { route } from 'preact-router';

import Icon from 'preact-material-components/Icon';

import style from './style.css';

export default class Movies extends Component {
  goToSearch = () => route('/search');

  render() {
    return (
      <div class={`${style.movies} page`}>
        <header class={style.header}>
          <img class={style.avatar} src={this.props.user.photoURL} alt="avatar" />
          <Icon class={style.search} onClick={this.goToSearch}>search</Icon>
        </header>
        <h1 class={style.displayName}>{this.props.user.displayName.split(' ')[0]}'s Movies</h1>
      </div>
    );
  }

  static propTypes = {
    user: {
      checker: value => value instanceof Object,
      message: 'user must be an object',
      isRequired: true
    },
    movies: {
      checker: value => Array.isArray(value) && value.every(v => v instanceof Object),
      message: 'movies must be an array of objects',
      isRequired: true
    }
  }
}
