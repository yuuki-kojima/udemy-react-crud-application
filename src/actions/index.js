import axios from 'axios'
import * as address from '../utils/contractAddress';
import * as apiKey from '../utils/apiKey';
import { toYen } from '../utils/currency'

// //Opensea ADK
// import * as Web3 from 'web3'
// import { OpenSeaPort, Network } from 'opensea-js'
// import { OrderSide } from 'opensea-js/lib/types'
//
// //Opensea Client
// const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
// const seaport = new OpenSeaPort(provider, {
//   networkName: Network.Main
// })


export const GET_ASSETS_REQUEST = 'GET_ASSETS_REQUEST'
const getAssetsRequest = (assets, rarity, offset, mode, sortKey, currency) => {
  return{
    type: GET_ASSETS_REQUEST,
    assets,
    rarity,
    offset,
    mode,
    sortKey,
    currency,
  }
}

export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS'
const getAssetsSuccess = (assets, offset, rarity, hasMore, mode, sortKey, currency) => {
  return{
    type: GET_ASSETS_SUCCESS,
    assets,
    offset,
    rarity,
    hasMore,
    mode,
    sortKey,
    currency,
  }
}

export const GET_ASSETS_FAILURE = 'GET_ASSETS_FAILURE'
const getAssetsFailure = (error) => {
  return{
    type: GET_ASSETS_FAILURE,
    error
  }
}

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const ROOT_URL = 'https://api.opensea.io/api/v1'
const QUERY_MCHH = '&on_sale=true&order_by=listing_date&order_direction=desc'
const limit = 20

export const getAssets = ({rarity, mode, sortKey, currency}) => async(dispatch, getState) => {
  // const { orders, count } = await seaport.api.getOrders({
  //   asset_contract_address: '0x273f7f8e6489682df756151f5525576e322d51a3',
  //   side: OrderSide.Sell,
  //   limit: 10,
  // })
  // console.log(orders)

  const length = getState().assets.length
  let zeroSellOrderLength = 0
  let assets = getState().assets[length - 1].assets
  let offset = getState().assets[length - 1].offset
  const pastRarity = getState().assets[length - 1].rarity
  const pastMode = getState().assets[length - 1].mode
  const pastSortKey = getState().assets[length - 1].sortKey
  const pastCurrency = getState().assets[length - 1].currency

  //現在のStateと検索条件が変わる場合はAssetsとOffsetを初期化
  if(pastRarity !== rarity
    || pastMode !== mode
    || pastSortKey !== sortKey
    || pastCurrency !== currency){
    assets = []
    offset = 0
  }

  let contractAddress = (mode === 'Hero') ? address.MCH_HERO : address.MCH_EXTENSION
  let query = `${ROOT_URL}/assets?asset_contract_address=${contractAddress}${QUERY_MCHH}`

  if(rarity && rarity !== 'All'){
    query += query + '&trait__string__rarity=' + rarity
  }
  query += query + '&offset=' + offset +  '&limit=' + limit

  dispatch(getAssetsRequest(assets, rarity, offset, mode, sortKey, currency))
  try {

    // TestUse
    // query = 'https://api.opensea.io/api/v1/assets?asset_contract_address=0x273f7f8e6489682df756151f5525576e322d51a3&on_sale=true&order_by=num_sales&order_direction=desc&limit=30'
    // const response = await axios.get(query)
    //
    // console.log(response)

    // const testobj = Object.entries(response.data.assets).map(asset => {
    //     return asset[1].current_price
    // })
    // console.log(testobj)

    const response = await axios.get(query, {headers: {'X-API-KEY': apiKey.OPENSEA} })

    // offset === 0 の場合、sell_order.length === 0 を除外
    const responsedArray = (offset === 0)
      ? Object.entries(response.data.assets).filter(asset => {
          return asset[1].sell_orders.length !== 0
        })
      : Object.entries(response.data.assets)

    zeroSellOrderLength = Object.entries(response.data.assets).filter(asset => {
      return asset[1].sell_orders.length === 0
    }).length

    const yen = currency === 'Yen' && await toYen()

    const setPrice = {
      'Ethereum': price => price,
      'Yen': price => Math.round(price * yen).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,'),
    }

    const responsedAssets = responsedArray.map(asset => {
      return {
        token_id: asset[1].token_id,
        listing_date: asset[1].listing_date,
        image_url: asset[1].image_thumbnail_url,
        current_price: setPrice[currency](Math.round(asset[1].sell_orders[0].current_price / 1000000000000000000 * 10000) / 10000),
        permalink: asset[1].permalink,
        name: asset[1].traits.filter(trait => {
          return trait.trait_type === mode.toLowerCase() + '_name';
        })[0].value,
        lv: asset[1].traits.filter(trait => {
          return trait.trait_type === 'lv';
        })[0].value,
        rarity: asset[1].traits.filter(trait => {
          return trait.trait_type === 'rarity';
        })[0].value,
      }
    })

    const hasMore = ( (responsedAssets.length + zeroSellOrderLength) < limit) ? false : true

    assets = assets.concat(responsedAssets)
    offset += limit

    dispatch(getAssetsSuccess(assets, offset, rarity, hasMore, mode, sortKey, currency))
  } catch (error) {
    dispatch(getAssetsFailure(error))
  }
}
