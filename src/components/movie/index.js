
import { h, Component } from 'preact';
import style from './style.css';

export default class Movie extends Component {
  handleError = event => {
    
  }

  render({ posterSrc, movieName }) {
    return (
      <figure class={style.movie}>
        <img onError={this.handleError} src={`https://image.tmdb.org/t/p/w185${posterSrc}`} alt="movie poster" />
        <figcaption>{movieName}</figcaption>
      </figure>
    );
  }
}
