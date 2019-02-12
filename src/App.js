import React, { Component } from 'react';

//Analytics
import withTracker from './components/withTracker'

// コンポーネント読み込み
import AssetsIndex from './components/AssetsIndex';
import ResponsiveDrawer from './components/ResponsiveDrawer'
import Top from './components/Top'
import About from './components/About'

//Utils
import * as assetTypes from './utils/AssetTypes'

// Common Style
import './App.css';

// Route
import { Route, Switch } from 'react-router-dom';

const NotFound = () => {
  return(
    <h2>Not Found</h2>
  )
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <ResponsiveDrawer>
          <Switch>
            <Route path='/' exact component={withTracker(Top)}/>
            <Route path='/about' exact component={withTracker(About)}/>
            <Route path={ '/assets/' + assetTypes.MY_CRYPT_HEROES } exact component={withTracker(AssetsIndex)}/>
            <Route component={withTracker(NotFound)}/>
          </Switch>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default App;
