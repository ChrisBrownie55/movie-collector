import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class NotFound extends Component {
  render() {
    return (
      <div class={`${style.error} page`}>
        <h1>404</h1>
        <p>The page you tried to access does not exist.</p>
      </div>
    );
  }
}
