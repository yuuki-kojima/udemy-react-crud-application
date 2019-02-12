import React from 'react';

import { setPrice } from '../utils/currency'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const AssetList = ({assets, currency, assetName, onClick}) => {
  const referrerAddress = '0x054019B40bE415d0E2B833B5BaD0a7491D4178b0'
  const SetList = {
    'mch': (asset) => {
      return(
        <GridListTile
          key={asset.token_id}
          style={{
            width: 180,
            height: 185,
            margin: 4,
          }}
        >
          <div>
            <img className="asset-image" src={asset.image_url} alt={asset.name} />
            <GridListTileBar
              title={<Link href={asset.permalink + '?ref=' +referrerAddress} target='_blank'>
                       <span className='asset-name' style={{color:'white'}}>{asset.name}</span>
                     </Link>}
              subtitle={<span>lv{asset.lv} {asset.rarity}<br />{setPrice[currency](asset.current_price)}</span>}
              actionIcon={
                assetName ? null :
                <IconButton onClick={onClick}>
                  <SearchIcon />
                </IconButton>
              }
            />
          </div>
        </GridListTile>
      )
    },
  }

  return (
    <GridList
      style={{justifyContent: 'center', marginTop: 30}}
    >
      {
        assets.map( asset => (
          SetList['mch'](asset)
        ))
      }
    </GridList>
  )
}

export default AssetList
