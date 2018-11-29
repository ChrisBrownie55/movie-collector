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
        <main>
          <Typography headline2>Are you ready to </Typography>
          <Button raised className={style.googleSignIn}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            <span>Sign in with Google</span>
          </Button>
        </main>
      </div>
    );
  }
}
