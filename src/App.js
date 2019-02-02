import React, { Component } from 'react';

//Analytics
import withTracker from './components/withTracker'

// コンテナ読み込み
import AssetsIndex from './containers/assets_index';

// コンポーネント読み込み
import ResponsiveDrawer from './components/ResponsiveDrawer'
import Top from './components/Top'
import About from './components/About'

// 共通スタイル読み込み
import './App.css';

// Route関連
import { Route, Switch } from 'react-router-dom';

// 不明なRouteは全てNotFound
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
            <Route path='/mch' exact component={withTracker(AssetsIndex)}/>
            <Route component={withTracker(NotFound)}/>
          </Switch>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default App;
