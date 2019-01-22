import axios from 'axios'

export const GET_ASSETS_REQUEST = 'GET_ASSETS_REQUEST'
const getAssetsRequest = (assets, rarity, offset, mode) => {
  return{
    type: GET_ASSETS_REQUEST,
    assets,
    rarity,
    offset,
    mode
  }
}

export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS'
const getAssetsSuccess = (assets, offset, rarity, hasMore, mode) => {
  return{
    type: GET_ASSETS_SUCCESS,
    assets,
    offset,
    rarity,
    hasMore,
    mode
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
const CONTRACT_ADDRESS_HERO = '0x273f7f8e6489682df756151f5525576e322d51a3'
const CONTRACT_ADDRESS_EXTENTION = '0xdceaf1652a131f32a821468dc03a92df0edd86ea'
const QUERY_MCHH = '&on_sale=true&order_by=listing_date&order_direction=desc'
const limit = 20

export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS'
const initializeSuccess = (mode, initialOffset) => {
  return{
    type: INITIALIZE_SUCCESS,
    mode,
    initialOffset,
  }
}

export const initialize = (mode) => async dispatch => {
  var contractAddress = (mode === 'Hero') ? CONTRACT_ADDRESS_HERO : CONTRACT_ADDRESS_EXTENTION
  var query = `${ROOT_URL}/assets?asset_contract_address=${contractAddress}${QUERY_MCHH}&limit=10`
  const response = await axios.get(query)

  const initialOffset = Object.entries(response.data.assets).filter(asset => {
    return asset[1].listing_date === null
  }).length
  dispatch(initializeSuccess(mode, initialOffset))
}

export const getAssets = (rarity, mode) => async(dispatch, getState) => {
  const length = getState().assets.length
  var nullLength = 0
  var assets = getState().assets[length - 1].assets
  var offset = getState().assets[length - 1].offset
  const pastRarity = getState().assets[length - 1].rarity
  const pastMode = getState().assets[length - 1].mode
  if(pastRarity !== rarity || pastMode !== mode){
    assets = []
    offset = 0
  }
  var contractAddress = (mode === 'Hero') ? CONTRACT_ADDRESS_HERO : CONTRACT_ADDRESS_EXTENTION
  var query = `${ROOT_URL}/assets?asset_contract_address=${contractAddress}${QUERY_MCHH}`
  if(rarity && rarity !== 'all'){
    query += query + '&trait__string__rarity=' + rarity
  }
  query += query + '&offset=' + offset +  '&limit=' + limit
  dispatch(getAssetsRequest(assets, rarity, offset, mode))
  try {
    const response = await axios.get(query)

    // offset === 0 の場合、listing_data = null を除外
    const responsedArray = (offset === 0)
      ? Object.entries(response.data.assets).filter(asset => {
          return asset[1].listing_date !== null
        })
      : Object.entries(response.data.assets)

    nullLength = Object.entries(response.data.assets).filter(asset => {
      return asset[1].listing_date === null
    }).length

    if(mode === 'Hero'){
      var responsedAssets = responsedArray.map(asset => {
        return {
          token_id: asset[1].token_id,
          image_url: asset[1].image_thumbnail_url,
          current_price: Math.round(asset[1].sell_orders[0].current_price / 1000000000000000000 * 10000) / 10000,
          permalink: asset[1].permalink,
          name: asset[1].traits.filter(trait => {
            return trait.trait_type === 'hero_name';
          })[0].value,
          lv: asset[1].traits.filter(trait => {
            return trait.trait_type === 'lv';
          })[0].value,
          rarity: asset[1].traits.filter(trait => {
            return trait.trait_type === 'rarity';
          })[0].value,
        }
      })
    } else {
      responsedAssets = responsedArray.map(asset => {
        return {
          token_id: asset[1].token_id,
          image_url: asset[1].image_thumbnail_url,
          current_price: Math.round(asset[1].sell_orders[0].current_price / 1000000000000000000 * 10000) / 10000,
          permalink: asset[1].permalink,
          name: asset[1].traits.filter(trait => {
            return trait.trait_type === 'extension_name';
          })[0].value,
          lv: asset[1].traits.filter(trait => {
            return trait.trait_type === 'lv';
          })[0].value,
          rarity: asset[1].traits.filter(trait => {
            return trait.trait_type === 'rarity';
          })[0].value,
        }
      })
    }
    const hasMore = ( (responsedAssets.length + nullLength) < limit) ? false : true

    assets = assets.concat(responsedAssets)
    offset += limit
    dispatch(getAssetsSuccess(assets, offset, rarity, hasMore, mode))
  } catch (error) {
    dispatch(getAssetsFailure(error))
  }
}
