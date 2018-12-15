import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

import MoviesList from '../../components/movies-list';
import Illustration from '../../components/illustration';

import Icon from 'preact-material-components/Icon';

import svg from '../../assets/no-content.svg';
import style from './style.css';

class Movies extends Component {
  goToSearch = () => route('/search');

  render({ user: { photoURL, displayName, isAnonymous }, movies }) {
    const name = isAnonymous
      ? 'Your'
      : `${displayName.split(' ')[0]}'s`;

    return (
      <div class={`${style.movies} page`}>
        <header class={style.header}>
          <img class={style.avatar} src={photoURL} alt="avatar" />
          <Icon class={style.search} onClick={this.goToSearch}>search</Icon>
        </header>
        <h1 class={style.displayName}>{name} Movies</h1>
        { !movies.length
          ? (
            <Illustration src={svg} alt="Darth Vader attacking Luke Skywalker">
              You don’t have any movies yet.
              <br />
              Try adding them from the search tab.
            </Illustration>
          ) : <MoviesList movies={movies} />
        }
      </div>
    );
  }
}

export default connect(
  ({ user, movies, isAnonymous }) => ({ user, movies, isAnonymous })
)(Movies);