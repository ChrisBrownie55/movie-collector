
import { h, Component } from 'preact';
import { addToLibrary, removeFromLibrary } from '../../store';
import style from './style.css';

export default class Movie extends Component {
  render() {
    return (
      <figure class={style.movie}>
        <img src={`https://image.tmdb.org/t/p/w185${this.props.posterSrc}`} alt={this.props.posterAlt} />
        <figcaption>{this.props.movieName}</figcaption>
      </figure>
    );
  }
}
