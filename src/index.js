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