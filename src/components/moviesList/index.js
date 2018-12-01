import { h, Component } from 'preact';
import Movie from '../movie';

import style from './style.css';

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
}