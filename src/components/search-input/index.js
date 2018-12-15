import { h, Component } from 'preact';
import style from './style.css';

class SearchInput extends Component {
  state = {
    value: ''
  };

  componentDidUnmount() {
    this.setState({ value: '' });
  }

  handleInput = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.onInput(this.state.value);
    });
  }

  render({ label, onInput, ...props }, { value }) {
    return (
      <div class={`${style.searchInput} ${value ? style.inputFilled : ''}`}>
        <input value={this.state.value} onInput={this.handleInput} {...props} />
        <label for="search-input">{label}</label>
      </div>
    );
  }
}

export default SearchInput;
