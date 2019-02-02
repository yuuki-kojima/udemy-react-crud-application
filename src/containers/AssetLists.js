import React, {Component} from 'react';
import { connect } from 'react-redux'

import AssetList from '../components/AssetList'
import NoResult from '../components/NoResult'

class AssetLists extends Component {

  render(){
    const {assets, currency, isFetching} = this.props.state
    const length = assets.length

    return (
      <React.Fragment>
      {
        (length === 0 && !isFetching)
          ? <NoResult />
          : <AssetList
              assets={assets}
              currency={currency}
            />
      }
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  const length = state.assets.length
  const currenstState = state.assets[length - 1]
  return {state: currenstState}
}

export default connect(mapStateToProps)(AssetLists)
