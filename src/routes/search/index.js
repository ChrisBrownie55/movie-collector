import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

import debounce from 'lodash/debounce';

import MoviesList from '../../components/movies-list';
import Icon from 'preact-material-components/Icon';

import style from './style.css';

class Search extends Component {
  state = {
    query: '',
    results: [],
    page: null,
    totalPages: null,
    totalResults: null
  }

  goToMovies = () => route('/');

  getMovieApiData = async (query, pageNumber=1) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${query}&language=en-US&api_key=c484c277ac7430163b9fe24f31a93f16`);
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
          movieName: movie.title
        }))
      });
    } catch (error) {
      console.warn('Warning, an error has occurred:', error);
      // TODO: Notify user unable to fetch
    }
  }

  handleInput = debounce(event => {
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

  render({ user: { photoURL } }, { page, totalPages }) {
    const pageIndicator = page && (
      <section class={style.pageIndicator}>
        <button onClick={this.previousPage} class={style.back} disabled={page <= 1}>&lt;</button>
        <span class={style.pageNumber}>{page} of {totalPages}</span>
        <button onClick={this.nextPage} class={style.forward} disabled={page >= totalPages}>&gt;</button>
      </section>
    );

    return (
      <div class={`${style.searchPage} page`}>
        <header class={style.header}>
          <img onClick={this.goToMovies} class={style.avatar} src={photoURL} alt="avatar" />
          <Icon class={style.search}>search</Icon>
        </header>
        <div class={style.searchInput}>
          <label for="search-input">Search Movies</label>
          <input onInput={this.handleInput} id="search-input" name="search" type="text" placeholder="Fantastic Beasts" />
        </div>
        <MoviesList movies={this.state.results} />
        {pageIndicator}
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user })
)(Search);