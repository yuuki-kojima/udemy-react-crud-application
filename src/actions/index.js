import axios from 'axios'
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
const getAssetsRequest = (assets, payload) => {
  return{
    type: GET_ASSETS_REQUEST,
    assets,
    payload,
  }
}

export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS'
const getAssetsSuccess = (assets, offset, hasMore,) => {
  return{
    type: GET_ASSETS_SUCCESS,
    assets,
    offset,
    hasMore,
  }
}

export const GET_ASSETS_FAILURE = 'GET_ASSETS_FAILURE'
const getAssetsFailure = (error) => {
  return{
    type: GET_ASSETS_FAILURE,
    error
  }
}

export const getAssets = (payload) => async(dispatch, getState) => {
  // const { orders, count } = await seaport.api.getOrders({
  //   asset_contract_address: '0x273f7f8e6489682df756151f5525576e322d51a3',
  //   side: OrderSide.Sell,
  //   limit: 10,
  // })
  // console.log(orders)
  const { getQuery, setProperty } = await import('../utils/assetTypeMethods/' + payload.type)
  let limit = 20
  let zeroSellOrderLength = 0
  let assets = getState().assets.assets
  let offset = getState().assets.offset

  if(payload.assetName) {limit = null}

  const payloadKeys = Object.keys(payload)
  const changePayload = payloadKeys.map(key => {
    return payload[key] === getState().assets.payload[key]
  })
  const changeMode = () => {
    return payload.mode === getState().assets.payload.mode
  }

  //現在のStateと検索条件が変わる場合はAssetsとOffsetを初期化
  if(changePayload.includes(false)){
    assets = []
    offset = 0
  }
  if(changeMode === false){
    payload.assetName = null
  }

  const query = getQuery(payload, offset, limit)

  dispatch(getAssetsRequest(assets, payload))
  try {

    // // TestUse
    // const query = 'https://api.opensea.io/api/v1/assets?asset_contract_address=0x273f7f8e6489682df756151f5525576e322d51a3&on_sale=true&order_by=sell_orders&order_direction=desc&limit=30'
    // const response = await axios.get(query)
    //
    // console.log(response)

    // const testobj = Object.entries(response.data.assets).map(asset => {
    //     return asset[1].current_price
    // })
    // console.log(testobj)

    axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
    const yen = payload.currency === 'Yen' && await toYen()
    const responsedAssets = responsedArray.map( asset => setProperty(asset, payload, yen) )
    const hasMore = ( (responsedAssets.length + zeroSellOrderLength) < limit || limit === null) ? false : true

    assets = assets.concat(responsedAssets)
    offset += limit

    if(payload.assetName) {
      assets.sort( (a, b) => {
        return a.current_price - b.current_price
      })
    }

    dispatch(getAssetsSuccess(assets, offset, hasMore))
  } catch (error) {
    dispatch(getAssetsFailure(error))
  }
}
