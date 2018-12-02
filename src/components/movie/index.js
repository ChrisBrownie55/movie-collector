
import { h, Component } from 'preact';
import style from './style.css';

export default class Movie extends Component {
  render({ posterSrc, movieName }) {
    return (
      <figure class={style.movie}>
        <img src={`https://image.tmdb.org/t/p/w185${posterSrc}`} alt="movie poster" />
        <figcaption>{movieName}</figcaption>
      </figure>
    );
  }
}
