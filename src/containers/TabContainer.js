import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'

// Actions
import { getAssets } from '../actions'

// Components
import TabComponent from '../components/TabComponent'

class TabContainer extends Component {

  constructor(props) {
    super(props);
    this.handleModeChange = this.handleModeChange.bind(this)
    this.state = {
      tabValues: [],
    }
  }

  async componentDidMount(){
    const assetType = this.props.router.location.pathname.slice(8)
    const { tabValues } = await import('../utils/assetTypeMethods/' + assetType)
    this.setState({tabValues: tabValues})
  }

  async handleModeChange(e, mode){
    const assetType = this.props.router.location.pathname.slice(8)
    this.props.history.push('/assets/' + assetType + '?mode=' + mode)
  }

  render(){
    const tabValues = this.state.tabValues
    if(tabValues.length > 0){
      const { mode } = this.props.assets.payload
      return (<TabComponent
                mode={mode}
                values={tabValues}
                onChange={this.handleModeChange}
              />)
    } else {
      return null
    }
  }

}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = ({ getAssets })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabContainer))
