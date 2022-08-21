import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './redux/store';

import React from 'react';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <Routes />
    </PaperProvider>
  </Provider>
);

export default App;
