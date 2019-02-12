import React, {Component} from 'react';
import { withRouter } from 'react-router';

import queryString from 'query-string'

// redux
import { connect } from 'react-redux'

// Actions
import { getAssets } from '../actions'

// components
import SearchFormComponent from '../components/SearchFormComponent'
import AssetNameList from '../components/AssetNameList'

class SearchFormContainer extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      formTypes: [],
      assetInfos: [],
    }
  }

  async componentDidMount(){
    const assetType = this.props.router.location.pathname.slice(8)
    const { mode }  = queryString.parse(this.props.location.search)
    const { formTypes, assetInfos, initialMode } = await import('../utils/assetTypeMethods/' + assetType)
    this.setState({
      formTypes: formTypes,
      assetInfos: mode ? assetInfos[mode] : assetInfos[initialMode],
    })
  }

  async handleChange(e){
    e.persist();
    const { payload } = this.props.assets
    const { id, value } = e.target
    const { setCondition } = await import('../utils/assetTypeMethods/' + payload.type)
    this.props.getAssets(setCondition(id, value, payload.mode, null,  payload))
  }

  handleClick(e){
    const assetType = this.props.router.location.pathname.slice(8)
    const { mode } = this.props.assets.payload
    if(e.target.getElementsByClassName('asset-name').length !== 0){
      var assetName = e.target.getElementsByClassName('asset-name')[0].firstChild.innerHTML
    } else {
      assetName = e.target.parentElement.parentElement.getElementsByClassName('asset-name')[0].firstChild.innerHTML
    }
    this.props.history.push('/assets/' + assetType+ '?mode=' + mode + '&assetName=' + assetName)
  }

  setValues(typeKeys, payload){
    return typeKeys.reduce( (obj, key) => {
      if(payload[key]){ obj = {...obj, [key]: payload[key]} }
      return obj
    }, {})
  }

  render(){

    const { payload } = this.props.assets

    const commonTypes = {
      // currency: [
      //   {value: 'Ethereum', string: 'Ethereum'},
      //   {value: 'Yen', string: 'Yen'}
      // ],
      // sortKey: [
      //   { value: 'listing_date', string: 'Recently Listed' },
      //   { value: 'recently_sold', string: 'Recently Sold'},
      //   { value: 'lowest_price', string: 'Lowest Price' },
      //   { value: 'highest_price', string: 'Highest Price'},
      // ],
    }

    const formTypes = {
      ...commonTypes,
      ...this.state.formTypes,
    }

    const typeKeys = Object.keys(formTypes)
    const formValues = this.setValues(typeKeys, payload)
      return (<React.Fragment>
                { this.state.assetInfos &&
                  <AssetNameList
                  assetInfos={this.state.assetInfos}
                  onClick={this.handleClick}
                  />
                }
                {
                  (formValues && !payload.assetName) &&
                  <SearchFormComponent
                    typeKeys={typeKeys}
                    types={formTypes}
                    values={formValues}
                    onChange={this.handleChange}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer))
