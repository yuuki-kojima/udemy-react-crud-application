import axios from 'axios'

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=JPY'

const getMarketCapEthereum = async() => {
  const response = await axios.get(API_URL)
  return response.data.filter( array => {
    return array.name === 'Ethereum'
  })[0]
}

export const toYen = async() => {
  const response = await getMarketCapEthereum()
  return response.price_jpy
}

export const setPrice = {
  'Ethereum': (price) => 'Ξ ' + price,
  'Yen': (price) => price + '円'
}

export const culcPrice = {
  'Ethereum': price => price,
  'Yen': (price, yen) => Math.round(price * yen).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,'),
}
