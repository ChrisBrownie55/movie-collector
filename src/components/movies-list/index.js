import { h, Component } from 'preact';
import CSSTransitionGroup from 'preact-css-transition-group';
import { connect } from 'preact-redux';
import Movie from '../movie';

import style from './style.css';

class MoviesList extends Component {
  render() {
    return (
      <CSSTransitionGroup
        component="section"
        class={style.moviesList}
        transitionName="fade"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {
          this.props.movies.map(movie => (
            <Movie key={movie.tmbdId} {...movie} />
          ))
        }
      </CSSTransitionGroup>
    );
  }
}

export default connect(
  ({ currentURL }) => ({ currentURL })
)(MoviesList);