import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Material-UI
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

//Router
import {BrowserRouter as Router} from "react-router-dom";

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

//Redux-thunk
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

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
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
