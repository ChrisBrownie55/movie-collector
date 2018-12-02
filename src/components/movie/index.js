
import { h, Component } from 'preact';
import style from './style.css';
import movieImagePlaceholder from '../../assets/movie-image-placeholder.svg';

export default class Movie extends Component {
  state = {
    posterSrc: `https://image.tmdb.org/t/p/w185${this.props.posterSrc}`
  };

  handleError = () => this.setState({ posterSrc: movieImagePlaceholder });

  render({ movieName }, { posterSrc }) {
    return (
      <figure class={style.movie}>
        <img onError={this.handleError} src={posterSrc} alt="movie poster" />
        <figcaption>{movieName}</figcaption>
      </figure>
    );
  }
}
