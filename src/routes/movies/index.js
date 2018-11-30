import { h, Component } from 'preact';
import Movie from '../../components/movie';
import style from './style.css';

export default class Movies extends Component {
  render() {
    return (
      <div class={`${style.movies} page`}>
        <Movie posterSrc="https://picsum.photos/400/300" posterAlt="placeholder" movieName="Movie Title" />
      </div>
    );
  }
}
