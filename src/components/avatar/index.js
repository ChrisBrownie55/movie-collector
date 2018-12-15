import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import ImgWithFallback from '../img-with-fallback';

const fallback = '../../assets/avatar-placeholder.svg';

class Avatar extends Component {
  render({ isAnonymous, src, ...props }) {
    console.log({ isAnonymous, src, ...props });
    return <ImgWithFallback src={isAnonymous ? fallback : src} fallback={fallback} alt="avatar" {...props} />;
  }
}

export default connect(
  ({ isAnonymous }) => ({ isAnonymous }),
)(Avatar);