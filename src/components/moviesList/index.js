import { h, Component } from 'preact';
import Movie from '../movie';

import style from './style.css';

const isFunctionOrNull = value => value instanceof Function || value === null;

export default class MoviesList extends Component {
  render() {
    return (
      <section class={style.moviesList}>
        {
          this.props.movies.map(movie => (
            <Movie
              {...movie}
              onRemoveFromLibrary={this.props.onRemoveFromLibrary}
              onAddToLibrary={this.props.onAddToLibrary}
            />
          ))
        }
      </section>
    );
  }

  static propTypes = {
    movies: {
      checker: value => Array.isArray(value) && value.every(v => v instanceof Object),
      message: 'movies must be an array of objects',
      isRequired: true
    },
    onRemoveFromLibrary: {
      checker: isFunctionOrNull,
      message: 'onRemoveFromLibrary must be a function or null',
      isRequired: true
    },
    onAddToLibrary: {
      checker: isFunctionOrNull,
      message: 'onAddToLibrary must be a function or null',
      isRequired: true
    }
  };
}