
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { addToLibrary, removeFromLibrary } from '../../store';
import 'preact-material-components/Button/style.css';
import style from './style.css';

import ImgWithFallback from '../img-with-fallback';

class Movie extends Component {
  addToLibrary = () => {
    addToLibrary({
      movieName: this.props.movieName,
      posterSrc: this.props.posterSrc,
      tmbdId: this.props.tmbdId
    });
  }

  removeFromLibrary = () => {
    removeFromLibrary({
      movieName: this.props.movieName,
      posterSrc: this.props.posterSrc,
      tmbdId: this.props.tmbdId
    });
  }

  render({ movieName, posterSrc, tmbdId, movieIds }) {
    let actionButton = movieIds.has(tmbdId)
      ? <button onClick={this.removeFromLibrary}class={style.actionButton}>Remove from library</button>
      : <button onClick={this.addToLibrary} class={style.actionButton}>Add to library</button>;

    return (
      <figure class={style.movie}>
        <div class={style.actions}>
          {actionButton}
        </div>
        <ImgWithFallback class={style.moviePoster} src={`https://image.tmdb.org/t/p/w185${posterSrc}`} fallback="../../assets/movie-placeholder.svg" alt="movie poster" />
        <figcaption title={movieName}>{movieName}</figcaption>
      </figure>
    );
  }
}

export default connect(
  ({ movieIds }) => ({ movieIds })
)(Movie);