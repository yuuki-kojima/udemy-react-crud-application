import React, { Component } from 'react';
import { connect } from 'react-redux'

//containers
import AssetLists from '../containers/AssetLists'

//components
import AppTab from '../components/app_tab'
import AppSearchForms from '../components/app_search_forms'
import LoadMore from '../components/LoadMore'
import Loading from '../components/Loading'

//action
import { getAssets } from '../actions'

class AssetsIndex extends Component {

  constructor(props) {
    super(props);
    this.handleRarityChange = this.handleRarityChange.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setCondition = this.setCondition.bind(this)
  }

  componentDidMount(e) {
    this.props.getAssets(this.setCondition(e))
  }

  handleRarityChange(e){
    this.props.getAssets(this.setCondition(e))
  }

  handleModeChange(e, mode){
    this.props.getAssets(this.setCondition(e, mode))
  }

  handleCurrencyChange(e){
    this.props.getAssets(this.setCondition(e))
  }

  handleSortChange(e){
    // this.props.getAssets(this.setCondition(e))
  }

  handleClick(e){
    this.props.getAssets(this.setCondition(e))
  }

  setCondition(e, mode){
    return {
      rarity: e && e.target.id === 'rarity' ? e.target.value : this.props.state.rarity,
      mode: e && mode ? mode : this.props.state.mode,
      sortKey: e && e.target.id === 'sortKey' ? e.target.value : this.props.state.sortKey,
      currency: e && e.target.id === 'currency' ? e.target.value : this.props.state.currency,
    }
  }

  render() {
    const {mode, rarity, sortKey, currency, hasMore, isFetching} = this.props.state
    return (
      <React.Fragment>
        <AppTab
         mode={mode}
         onChange={this.handleModeChange}
        />
        <main style={{paddingTop:20}}>
          <AppSearchForms
            rarity={rarity}
            sortKey={sortKey}
            currency={currency}
            handleRarityChange = {this.handleRarityChange}
            handleSortChange = {this.handleSortChange}
            handleCurrencyChange = {this.handleCurrencyChange}
          />
          <div className="contents" style={{maxWidth:980, margin: '0 auto'}}>
            <AssetLists />
            <LoadMore
              hasMore={hasMore}
              isFetching={isFetching}
              handleClick={this.handleClick}
            />
            <Loading isFetching={isFetching} />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const length = state.assets.length
  const currenstState = state.assets[length - 1]
  return {state: currenstState}
}

const mapDispatchToProps = ({ getAssets })

export default connect(mapStateToProps, mapDispatchToProps)(AssetsIndex)
