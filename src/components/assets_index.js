import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Fab from '@material-ui/core/Fab';

//action
import { getAssets, initialize } from '../actions'

class AssetsIndex extends Component {

  constructor(props) {
    super(props);
    this.ItemsRef = React.createRef()
    this.handleRarityChange = this.handleRarityChange.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // this.props.initialize('', 'Extention')
    this.props.getAssets('', 'Hero')
    document.addEventListener('scroll', this.trackScrolling)
  }

  componentDidUpdate() {
    document.addEventListener('scroll', this.trackScrolling)
  }

  isBottom(el) {
    const documentHeight = document.documentElement.offsetHeight
    const windowHeight = window.innerHeight + window.pageYOffset
    return documentHeight <= windowHeight
  }

  trackScrolling = () => {
    if (this.isBottom(this.ItemsRef.current) && this.props.assets.hasMore !== false) {
      // this.props.getAssets(this.props.assets.rarity, this.props.assets.mode)
      document.removeEventListener('scroll', this.trackScrolling)
    }
  }

  renderAssets({assets, isFetching}){
    const length = assets.length
    const referrerAddress = '0x054019B40bE415d0E2B833B5BaD0a7491D4178b0'
    if(length === 0 && !isFetching){
      return <Typography variant="h3" align='center'>no result</Typography>
    } else {
      return (
        <GridList cellHeight={180}>
          {
            assets.map(asset => (
              <GridListTile key={asset.token_id} style={{width: 185, height: 185, textAlign: 'center'}}>
                <Link href={asset.permalink + '?ref=' +referrerAddress} target='_blank'>
                  <img className="asset-image" src={asset.image_url} alt={asset.name} />
                  <GridListTileBar
                    title={<span>{asset.name} lv{asset.lv}</span>}
                    subtitle={<span>{asset.rarity} Ξ {asset.current_price}</span>}
                  />
                </Link>
              </GridListTile>
            ))
          }
        </GridList>
      )
    }
  }

  handleRarityChange(e){
    this.props.getAssets(e.target.value, this.props.assets.mode)
  }

  handleModeChange(e, mode){
    this.props.getAssets(this.props.assets.rarity, mode)
  }

  handleClick(){
    this.props.getAssets(this.props.assets.rarity, this.props.assets.mode)
  }

  render() {
    const {assets} = this.props
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" align='center' color="inherit">
              Digital Asset Garage
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default" style={{paddingTop:65}}>
        <Tabs value={assets.mode} onChange={this.handleModeChange} variant="fullWidth">
          <Tab value="Hero" label="Hero" />
          <Tab value="Extention" label="Extention" />
        </Tabs>
        </AppBar>
        <div>
          <main ref={this.ItemsRef} style={{paddingTop:20}}>
            <div className="search" style={{textAlign:'center', marginBottom:30}}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Rarity</InputLabel>
                <Select
                  native
                  value = {assets.rarity ? assets.rarity : 'all'}
                  onChange = {this.handleRarityChange}
                >
                  <option value='all'>All</option>
                  <option value='Common'>Common</option>
                  <option value='Uncommon'>Uncommon</option>
                  <option value='Rare'>Rare</option>
                  <option value='Epic'>Epic</option>
                  <option value='Legendary'>Legendary</option>
                </Select>
              </FormControl>
            </div>
            <div className="contents">
              { this.renderAssets({...assets}) }
              {
                (assets.hasMore === true && !assets.isFetching)
                && <div style={{textAlign:'center', margin:30}}>
                     <Fab
                       variant="extended"
                       aria-label="Delete"
                       onClick={this.handleClick}
                     >
                      Load More...
                     </Fab>
                   </div>
              }
              {
                assets.isFetching
                && <div style={{textAlign:'center', margin:30}}>
                     <CircularProgress size={100}/>
                   </div>
              }
            </div>
          </main>
          <footer>
          </footer>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const length = state.assets.length
  const currenstState = state.assets[length - 1]
  return {assets: currenstState}
}

const mapDispatchToProps = ({ getAssets, initialize })

export default connect(mapStateToProps, mapDispatchToProps)(AssetsIndex)
