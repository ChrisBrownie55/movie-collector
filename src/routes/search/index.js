import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import debounce from 'lodash/debounce';
import Animate from 'preact-animate';

import MoviesList from '../../components/movies-list';
import Illustration from '../../components/illustration';
import SearchInput from '../../components/search-input';
import Avatar from '../../components/avatar';

import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';

import svg from '../../assets/empty-search.svg';
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

  handleInput = debounce(async value => {
    if (value === '') {
      this.setState({ ...initialState, inputFilled: false });
      return;
    }
    const query = encodeURIComponent(value);
    await this.getMovieApiData(query);
    this.setState({ inputFilled: true });
  }, 500);

  loadPage = pageNumber => {
    this.getMovieApiData(this.state.query, pageNumber);
  }

  previousPage = async () => {
    if (this.state.page === 1) return;
    await this.loadPage(this.state.page - 1);
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  nextPage = async () => {
    if (this.state.page === this.state.totalPages) return;
    await this.loadPage(this.state.page + 1);
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  };

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
          <Avatar onClick={this.goToMovies} class={style.avatar} src={photoURL} />
          <Icon class={style.search}>search</Icon>
        </header>
        <SearchInput onInput={this.handleInput} label="Search movies" id="search-input" name="search" type="text" placeholder="Fantastic Beasts" />
        <Animate transitionName="fade" exclusive>
          {!inputFilled
            ? (
              <Illustration key={0} src={svg} alt="Illustration of a lady on a bench">
                Waiting for instructions...
              </Illustration>
            )
            : <MoviesList key={1} movies={results} style={{ marginTop: '2rem' }} />
          }
        </Animate>
        {pageIndicator}
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user })
)(Search);