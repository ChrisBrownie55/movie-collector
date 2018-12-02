import { h, Component } from 'preact';
import CSSTransitionGroup from 'preact-css-transition-group';
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
      <CSSTransitionGroup
        component="section"
        class={style.moviesList}
        transitionName="fade"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {
          this.props.movies.map(movie => (
            <Movie key={movie.id} {...movie} {...this.movieListener} />
          ))
        }
      </CSSTransitionGroup>
    );
  }
}

export default connect(
  ({ currentURL }) => ({ currentURL })
)(MoviesList);