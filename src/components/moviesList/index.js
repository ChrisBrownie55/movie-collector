import { h, Component } from 'preact';
import Movie from '../movie';

import style from './style.css';

const isFunction = value => value instanceof Function;

export default class MoviesList extends Component {
  render() {
    return (
      <section class={style.moviesList}>
        {
          this.props.movies.map(movie => (
            <Movie {...movie} />
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
      checker: isFunction,
      message: 'onRemoveFromLibrary must be a function',
      isRequired: true
    },
    onAddToLibrary: {
      checker: isFunction,
      message: 'onAddToLibrary must be a function',
      isRequired: true
    }
  };
}