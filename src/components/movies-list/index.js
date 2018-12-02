import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { addToLibrary, removeFromLibrary } from '../../store';
import Movie from '../movie';

import style from './style.css';

class MoviesList extends Component {
  componentDidUpdate() {
    if (this.props.currentURL === '/') {
      this.movieListener = {
        removeFromLibrary
      };
    } else {
      this.movieListener = {
        addToLibrary
      };
    }
  }

  render() {
    return (
      <section class={style.moviesList}>
        {
          this.props.movies.map(movie => (
            <Movie {...movie} {...this.movieListener} />
          ))
        }
      </section>
    );
  }
}

export default connect(
  ({ currentURL }) => ({ currentURL })
)(MoviesList);