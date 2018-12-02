import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

import debounce from 'lodash/debounce';

import MoviesList from '../../components/movies-list';
import Icon from 'preact-material-components/Icon';

import style from './style.css';

const apiURL = query => `https://api.themoviedb.org/3/search/movie?page=1&query=${query}&language=en-US&api_key=c484c277ac7430163b9fe24f31a93f16`;

class Search extends Component {
  state = {
    query: '',
    results: [],
    page: null,
    totalPages: null,
    totalResults: null
  }

  goToMovies = () => route('/');
  handleInput = debounce(event => {
    const query = encodeURIComponent(event.target.value);
    fetch(apiURL(query))
      .then(res => res.json())
      .then(({ page, total_pages: totalPages, total_results: totalResults, results }) => {
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
      }).catch(error => console.error(error)); // TODO: Notify user unable to fetch
  }, 500);

  loadPage = pageNumber => {
    apiURL(this.state.query);
  }

  prevPage = () => {
    if (this.state.page === 1) return;

  }
  nextPage = () => {
    if (this.state.page === this.state.totalPages) return;

  };

  render({ user: { photoURL } }, { page, totalPages }) {
    const pageIndicator = page && (
      <section class={style.pageIndicator}>
        <button class={style.back} disabled={page < 1}>&lt;</button>
        <span class={style.pageNumber}>{page} of {totalPages}</span>
        <button class={style.forward} disabled={page >= totalPages}>&gt;</button>
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