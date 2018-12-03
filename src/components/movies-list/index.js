import { h, Component } from 'preact';
import Animate from 'preact-animate';
import { connect } from 'preact-redux';
import Movie from '../movie';

import style from './style.css';

class MoviesList extends Component {
  render({ movies, ...props }) {
    return (
      <section class={style.moviesList} {...props}>
        <Animate transitionName="fade">
          {
            movies.map(movie => (
              <Movie key={movie.tmbdId} {...movie} />
            ))
          }
        </Animate>
      </section>
    );
  }
}

export default connect(
  ({ currentURL }) => ({ currentURL })
)(MoviesList);