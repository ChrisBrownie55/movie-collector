import { h, Component } from 'preact';

class ImgWithFallback extends Component {
  state = {
    usingFallback: false
  };

  componentDidUpdate({ src }) {
    if (this.state.usingFallback && src !== this.props.src) {
      this.setState({ usingFallback: false });
    }
  }

  handleError = () => this.setState({ usingFallback: true });

  render({ src, fallback, ...props }, { usingFallback }) {
    const currentSrc = usingFallback
      ? fallback
      : src;
    
    return <img src={currentSrc} onError={!usingFallback && this.handleError} {...props} />
  }
}

export default ImgWithFallback;