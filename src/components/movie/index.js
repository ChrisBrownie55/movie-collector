
import { h, Component } from 'preact';
import style from './style.css';

const isString = value => typeof value === 'string'

export default class Movie extends Component {
  render() {
    return (
      <figure className={style.movie}>
        <img src={this.props.posterSrc} alt={this.props.posterAlt} />
        <figcaption>{this.props.movieName}</figcaption>
      </figure>
    );
  }

  static propTypes = {
    posterSrc: {
      checker: isString,
      message: 'posterSrc must be a string',
      isRequired: true
    },
    posterAlt: {
      checker: isString,
      message: 'posterAlt must be a string',
      isRequired: true
    },
    movieName: {
      checker: isString,
      message: 'movieName must be a string',
      isRequired: true
    }
  }
}