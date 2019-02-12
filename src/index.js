import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Material-UI
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

//Router
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'

//Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

//Redux-thunk
import thunk from 'redux-thunk'

import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const store = createStore(
  reducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
)

// Material-UIテーマカスタマイズ
const theme = createMuiTheme({
  palette: {
    type: 'light', // light or dark
    primary: indigo, // primaryのカラー
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
