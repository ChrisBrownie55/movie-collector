// fixes bug where authentication from PWA opens new browser and stays there.
const ios = !!navigator.platform && /iPhone/.test(navigator.platform);
if (ios) {
  document.querySelector('link[rel="manifest"]').setAttribute('rel', 'no-on-ios');
}

import './style/index.css';
import App from './components/app';

import { store } from './store.js';
import { Provider } from 'preact-redux';

const AppWithStore = props => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

export default AppWithStore;