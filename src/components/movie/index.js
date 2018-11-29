
import { h, Component } from 'preact';
import style from './style.css';

export default class Movie extends Component {
  render() {
    return (
      <figure className={style.movie}>
        <img src={this.props.posterSrc} alt={this.props.posterAlt} />
        <figcaption>{this.props.movieName}</figcaption>
      </figure>
    );
  }
}
