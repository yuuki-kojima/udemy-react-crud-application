import React, {Component} from 'react';

// redux
import { connect } from 'react-redux'

// Actions
import { getAssets } from '../actions'

// Components
import LoadMoreComponent from '../components/LoadMoreComponent'

class LoadMoreContainer extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick(){
    const { payload } = this.props.assets
    const assetType = this.props.router.location.pathname.slice(8)
    const { setCondition } = await import('../utils/assetTypeMethods/' + assetType)
    this.props.getAssets(setCondition(null, null, null, payload))
  }

  render(){
    const {hasMore, isFetching} = this.props.assets
    return(
      (hasMore === true && !isFetching)
      && <LoadMoreComponent onClick={this.handleClick} />
    )
  }

}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = ({ getAssets })

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreContainer)
