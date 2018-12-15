import { h, Component } from 'preact';
import { login, loginAnonymously } from '../../store';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Icon from 'preact-material-components/Icon';

import style from './style.css';

export default class Login extends Component {
  render() {
    return (
      <div class="page">
        <div class={style.Login}>
          <Typography headline5>Welcome to Movie Collector</Typography>
          <Typography body1>If you haven't registered yet, don't worry, logging in with Google will create you an account.</Typography>
          <Button class={style.googleSignIn} onClick={login}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            <span>Sign in with Google</span>
          </Button>
          <Button class={`${style.signIn} ${style.anonymousButton}`} onClick={loginAnonymously}>
            <Icon>person_outline</Icon>
            <span>Sign in anonymously</span>
          </Button>
        </div>
      </div>
    );
  }
}
