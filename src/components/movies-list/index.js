import { h, Component } from 'preact';
import Animate from 'preact-animate';
import { connect } from 'preact-redux';
import Movie from '../movie';

import style from './style.css';

class MoviesList extends Component {
  render() {
    return (
      <Animate
        component="section"
        class={style.moviesList}
        transitionName="fade"
      >
        {
          this.props.movies.map(movie => (
            <Movie key={movie.tmbdId} {...movie} />
          ))
        }
      </Animate>
    );
  }
}

export default connect(
  ({ currentURL }) => ({ currentURL })
)(MoviesList);