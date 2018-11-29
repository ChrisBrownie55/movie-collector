import { h, Component } from 'preact';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

import style from './style.css';

export default class Login extends Component {
  render() {
    return (
      <div className="page">
        <div className={style.Login}>
          <Typography headline5>Welcome to Movie Collector</Typography>
          <Typography body1>If you haven't registered yet, don't worry, logging in with Google will create you an account.</Typography>
          <Button className={style.googleSignIn}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    );
  }
}
