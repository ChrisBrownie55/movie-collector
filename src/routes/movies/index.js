import { h, Component } from 'preact';
import Movie from '../../components/movie';
import style from './style.css';

export default class Movies extends Component {
  render() {
    return (
      <div class={`${style.movies} page`}>
        <section class={style.moviesList}>
          <Movie posterSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcvWv3fwAHmQMx4nFrOwAAAABJRU5ErkJggg==" posterAlt="placeholder" movieName="Movie Title" />
          <Movie posterSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcvWv3fwAHmQMx4nFrOwAAAABJRU5ErkJggg==" posterAlt="placeholder" movieName="Movie Title" />
        </section>
      </div>
    );
  }
}
