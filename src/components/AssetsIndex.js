import React, { Component } from 'react';

//containers
import AssetLists from '../containers/AssetLists'
import TabContainer from '../containers/TabContainer'
import SearchFormContainer from '../containers/SearchFormContainer'
import LoadMoreContainer from '../containers/LoadMoreContainer'
import LoadingContainer from '../containers/LoadingContainer'

class AssetsIndex extends Component {

  render() {
    return (
      <React.Fragment>
        <TabContainer />
        <main style={{paddingTop:20}}>
          <SearchFormContainer />
          <div className="contents" style={{maxWidth:980, margin: '0 auto'}}>
            <AssetLists />
            <LoadMoreContainer />
            <LoadingContainer />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default AssetsIndex
