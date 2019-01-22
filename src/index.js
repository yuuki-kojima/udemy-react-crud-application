import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import './index.css';
import reducer from './reducers';
import AssetsIndex from './components/assets_index';
import * as serviceWorker from './serviceWorker';
import withTracker from './components/withTracker'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={withTracker(AssetsIndex)}/>
        <Route exact component={withTracker(AssetsIndex)}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
