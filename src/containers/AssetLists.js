import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'

import queryString from 'query-string'

// Actions
import { getAssets } from '../actions'

// Components
import AssetList from '../components/AssetList'
import NoResult from '../components/NoResult'

class AssetLists extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const { assetName }  = queryString.parse(this.props.location.search)
    const assetType = this.props.router.location.pathname.slice(8)
    const { setInitialPayload } = await import('../utils/assetTypeMethods/' + assetType)
    this.props.getAssets(setInitialPayload(assetName))
  }

  handleClick(e){
    const assetType = this.props.router.location.pathname.slice(8)
    const target = e.target.parentElement.parentElement.parentElement.parentElement
    if(target.getElementsByClassName('asset-name').length !== 0 ){
      var assetName = target.getElementsByClassName('asset-name')[0].innerHTML
    } else {
      assetName = target.parentElement.getElementsByClassName('asset-name')[0].innerHTML
    }
    this.props.history.push('/assets/' + assetType+ '?assetName=' + assetName)
  }

  render(){
    const {assets, isFetching, payload} = this.props.assets
    const length = assets.length

    return (
      <React.Fragment>
      {
        (length === 0 && !isFetching)
          ? <NoResult />
          : <AssetList
              assets={assets}
              currency={payload.currency}
              assetName={payload.assetName}
              onClick={this.handleClick}
            />
      }
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = ({ getAssets })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetLists))
