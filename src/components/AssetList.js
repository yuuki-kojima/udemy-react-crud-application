import React from 'react';

import { setPrice } from '../utils/currency'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Link from '@material-ui/core/Link';

const AssetList = ({assets, currency}) => {
  const referrerAddress = '0x4e66c8fea449D7aC5C2a55061c0FCf24C4106A9c'
  const SetList = {
    'mch': (asset) => {
      return(
        <GridListTile
          key={asset.token_id}
          style={{
            width: 185,
            height: 185,
            margin: 4,
          }}
        >
          <Link href={asset.permalink + '?ref=' +referrerAddress} target='_blank'>
            <img className="asset-image" src={asset.image_url} alt={asset.name} />
            <GridListTileBar
              title={<span>{asset.name}</span>}
              subtitle={<span>lv{asset.lv} {asset.rarity}<br />{setPrice[currency](asset.current_price)}</span>}
            />
          </Link>
        </GridListTile>
      )
    },
  }

  return (
    <GridList
      style={{justifyContent: 'center'}}
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
