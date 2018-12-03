import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import debounce from 'lodash/debounce';

import MoviesList from '../../components/movies-list';
import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';

import style from './style.css';

const initialState = {
  query: '',
  results: [],
  page: null,
  totalPages: null,
  totalResults: null
};

class Search extends Component {
  state = {
    ...initialState,
    inputFilled: false
  };

  goToMovies = () => route('/');

  getMovieApiData = async (query, pageNumber=1) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=${pageNumber}&query=${query}&language=en-US&api_key=c484c277ac7430163b9fe24f31a93f16`);
      const {
        page,
        total_pages: totalPages,
        total_results: totalResults,
        results
      } = await res.json();

      this.setState({
        query,
        page,
        totalPages,
        totalResults,
        results: results.map(movie => ({
          posterSrc: movie.poster_path,
          movieName: movie.title,
          tmbdId: movie.id
        }))
      });
    } catch (error) {
      console.warn('Warning, an error has occurred:', error);
      // TODO: Notify user unable to fetch
    }
  }

  handleInput = debounce(event => {
    if (event.target.value === '') {
      this.setState({ ...initialState });
      return;
    }
    const query = encodeURIComponent(event.target.value);
    this.getMovieApiData(query);
  }, 500);

  loadPage = pageNumber => {
    this.getMovieApiData(this.state.query, pageNumber);
  }

  previousPage = () => {
    if (this.state.page === 1) return;
    this.loadPage(this.state.page - 1);
  }
  nextPage = () => {
    if (this.state.page === this.state.totalPages) return;
    this.loadPage(this.state.page + 1);
  };

  handleChange = event => this.setState({ inputFilled: !!event.target.value })

  render({ user: { photoURL } }, { page, totalPages, results, inputFilled }) {
    const pageIndicator = results.length
      ? (
        <footer class={style.pageIndicator}>
          { page > 1
            ? <IconButton onClick={this.previousPage} class={style.back}><i class="material-icons">keyboard_arrow_left</i></IconButton>
            : null
          }
          <p class={style.pageNumber}>page {page} of {totalPages}</p>
          { page < totalPages
            ? <IconButton onClick={this.nextPage} class={style.forward}><i class="material-icons">keyboard_arrow_right</i></IconButton>
            : null
          }
        </footer>)
      : null;

    return (
      <div class={`${style.searchPage} page`}>
        <header class={style.header}>
          <img onClick={this.goToMovies} class={style.avatar} src={photoURL} alt="avatar" />
          <Icon class={style.search}>search</Icon>
        </header>
        <div class={`${style.searchInput} ${inputFilled ? style.inputFilled : ''}`}>
          <label for="search-input">Search Movies</label>
          <input onChange={this.handleChange} onInput={this.handleInput} id="search-input" name="search" type="text" placeholder="Fantastic Beasts" />
        </div>
        <MoviesList movies={results} />
        {pageIndicator}
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user })
)(Search);