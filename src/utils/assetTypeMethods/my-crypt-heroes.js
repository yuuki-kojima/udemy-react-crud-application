import { culcPrice } from '../currency'
import * as address from '../contractAddress';

const ROOT_URL = 'https://api.opensea.io/api/v1'
const QUERY_MCHH = '&order_by=listing_date&order_direction=desc'

export const tabValues = [
  { key: 'my-crypt-heroes', value: 'Hero'},
  { key: 'my-crypt-heroes-extension', value: 'Extension'},
]

export const formTypes = {
  rarity: [
    {value: 'All', string: 'All'},
    {value: 'Uncommon', string: 'Uncommon'},
    {value: 'Rare', string: 'Rare'},
    {value: 'Epic', string: 'Epic'},
    {value: 'Legendary', string: 'Legendary'},
  ],
}

export const getQuery = (payload, offset, limit) => {
  const { rarity } = payload
  const contractAddress = address.MCH_HERO
  let query = `${ROOT_URL}/assets?asset_contract_address=${contractAddress}${QUERY_MCHH}&on_sale=true`
  if(rarity && rarity !== 'All'){
    query += query + '&trait__string__rarity=' + rarity
  }

  switch (payload.sortKey) {
    case 'recently_sold':
      query += query + '&order_by=last_sale&order_direction=desc'
      break
    case 'lowest_price':
      query += query + '&order_by=current_price&order_direction=asc'
      break
    case 'highest_price':
      query += query + '&order_by=current_price&order_direction=desc'
      break
    default:
      query += query + '&order_by=listing_date&order_direction=desc'
      break
  }

  if(payload.assetName){
    query += query + '&trait__string__hero_name=' + encodeURIComponent(payload.assetName) + '&offset=' + offset
  } else {
    query += '&offset=' + offset +  '&limit=' + limit
  }
  return query
}

export const setProperty = (asset, payload, yen) => {
  return {
    token_id: asset[1].token_id,
    listing_date: asset[1].listing_date,
    image_url: asset[1].image_thumbnail_url,
    current_price: culcPrice[payload.currency](Math.round(asset[1].sell_orders[0].current_price / 1000000000000000000 * 10000) / 10000, yen),
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
}

export const setInitialPayload = assetName => {
  return {
    rarity: 'All',
    sortKey: 'listing_date',
    currency: 'Ethereum',
    assetName,
    type: 'my-crypt-heroes',
  }
}

export const setCondition = (id, value, assetName, payload) => {
  return {
    rarity: id === 'rarity' ? value : payload.rarity,
    sortKey: id === 'sortKey' ? value : payload.sortKey,
    currency: id === 'currency' ? value : payload.currency,
    assetName: assetName ? assetName : payload.assetName,
    type: 'my-crypt-heroes'
  }
}

export const assetInfos = [
    { rarity: "Uncommon",
      assetLists: [
        { name: "Wright Brothers", image: "https://www.mycryptoheroes.net/images/heroes/64/2001.png" },
        { name: "Spartacus", image: "https://www.mycryptoheroes.net/images/heroes/64/2002.png" },
        { name: "Franz Schubert ", image: "https://www.mycryptoheroes.net/images/heroes/64/2004.png" },
        { name: "Brothers Grimm", image: "https://www.mycryptoheroes.net/images/heroes/64/2005.png" },
        { name: "Archimedes", image: "https://www.mycryptoheroes.net/images/heroes/64/2006.png" },
        { name: "Santa Claus", image: "https://www.mycryptoheroes.net/images/heroes/64/2007.png" },
        { name: "Erwin Schrödinger", image: "https://www.mycryptoheroes.net/images/heroes/64/2008.png" },
        { name: "Mori Ranmaru", image: "https://www.mycryptoheroes.net/images/heroes/64/2009.png" },
        { name: "Franz Kafka", image: "https://www.mycryptoheroes.net/images/heroes/64/2010.png" },
        { name: "Sun Tzu", image: "https://www.mycryptoheroes.net/images/heroes/64/2011.png" },
        { name: "Ishida Mitsunari", image: "https://www.mycryptoheroes.net/images/heroes/64/2012.png" },
      ],
    },
    { rarity: "Rare",
      assetLists: [
        { name: "ETHEREMON-RED", image: "https://www.mycryptoheroes.net/images/heroes/64/3001.png" },
        { name: "ETHEREMON-BLUE", image: "https://www.mycryptoheroes.net/images/heroes/64/3005.png" },
        { name: "ETHEREMON-GREEN", image: "https://www.mycryptoheroes.net/images/heroes/64/3006.png" },
        { name: "Mata Hari", image: "https://www.mycryptoheroes.net/images/heroes/64/3004.png" },
        { name: "Jack the Ripper", image: "https://www.mycryptoheroes.net/images/heroes/64/2003.png" },
        { name: "Michel Nostradamus", image: "https://www.mycryptoheroes.net/images/heroes/64/3008.png" },
        { name: "D'Artagnan", image: "https://www.mycryptoheroes.net/images/heroes/64/3002.png" },
        { name: "Gennai Hiraga", image: "https://www.mycryptoheroes.net/images/heroes/64/3003.png" },
        { name: "Jiang Ziya", image: "https://www.mycryptoheroes.net/images/heroes/64/3009.png" },
        { name: "Emperor Nero", image: "https://www.mycryptoheroes.net/images/heroes/64/3007.png" },
        { name: "Hanzo Hattori", image: "https://www.mycryptoheroes.net/images/heroes/64/3010.png" },
        { name: "Keiji Maeda", image: "https://www.mycryptoheroes.net/images/heroes/64/3011.png" },
        { name: "Amakusa Shirō", image: "https://www.mycryptoheroes.net/images/heroes/64/3012.png" },
        { name: "Naoe Kanetsugu", image: "https://www.mycryptoheroes.net/images/heroes/64/3014.png" },
        { name: "Ivan the Terrible", image: "https://www.mycryptoheroes.net/images/heroes/64/3015.png" },
        { name: "Goemon Ishikawa", image: "https://www.mycryptoheroes.net/images/heroes/64/3013.png" },
        { name: "Matsuo Bashō", image: "https://www.mycryptoheroes.net/images/heroes/64/3016.png" },
        { name: "Xuanzang", image: "https://www.mycryptoheroes.net/images/heroes/64/3017.png" },
        { name: "Benkei", image: "https://www.mycryptoheroes.net/images/heroes/64/3018.png" },
        { name: "Huang Zhong", image: "https://www.mycryptoheroes.net/images/heroes/64/3019.png" },
        { name: "Diao Chan", image: "https://www.mycryptoheroes.net/images/heroes/64/3020.png" },
        { name: "Saint Valentine", image: "https://www.mycryptoheroes.net/images/heroes/64/3021.png" },
      ],
    },
    { rarity: "Epic",
      assetLists: [
        { name: "Zhang Fei", image: "https://www.mycryptoheroes.net/images/heroes/64/4001.png" },
        { name: "Florence Nightingale", image: "https://www.mycryptoheroes.net/images/heroes/64/4002.png" },
        { name: "Ludwig van Beethoven", image: "https://www.mycryptoheroes.net/images/heroes/64/4003.png" },
        { name: "Kojiro Sasaki", image: "https://www.mycryptoheroes.net/images/heroes/64/4004.png" },
        { name: "Kaishu Katsu", image: "https://www.mycryptoheroes.net/images/heroes/64/4005.png" },
        { name: "Billy the Kid", image: "https://www.mycryptoheroes.net/images/heroes/64/4006.png" },
        { name: "Thomas Edison", image: "https://www.mycryptoheroes.net/images/heroes/64/4007.png" },
        { name: "Marco Polo", image: "https://www.mycryptoheroes.net/images/heroes/64/4008.png" },
        { name: "Masamune Date", image: "https://www.mycryptoheroes.net/images/heroes/64/4009.png" },
        { name: "Marie Antoinette", image: "https://www.mycryptoheroes.net/images/heroes/64/4014.png" },
        { name: "Karl Marx", image: "https://www.mycryptoheroes.net/images/heroes/64/4011.png" },
        { name: "Soji Okita", image: "https://www.mycryptoheroes.net/images/heroes/64/4012.png" },
        { name: "Pyotr Tchaikovsky", image: "https://www.mycryptoheroes.net/images/heroes/64/4013.png" },
        { name: "Wang Ki", image: "https://www.mycryptoheroes.net/images/heroes/64/4010.png" },
        { name: "Yang Guifei", image: "https://www.mycryptoheroes.net/images/heroes/64/4015.png" },
        { name: "Lü Bu Bu", image: "https://www.mycryptoheroes.net/images/heroes/64/4016.png" },
        { name: "Marie Curie", image: "https://www.mycryptoheroes.net/images/heroes/64/4017.png" },
        { name: "Sun Quan", image: "https://www.mycryptoheroes.net/images/heroes/64/4018.png" },
        { name: "Kamehameha I", image: "https://www.mycryptoheroes.net/images/heroes/64/4019.png" },
        { name: "Calamity Jane", image: "https://www.mycryptoheroes.net/images/heroes/64/4020.png" },
        { name: "Vincent van Gogh", image: "https://www.mycryptoheroes.net/images/heroes/64/4021.png" },
        { name: "Tomoe Gozen", image: "https://www.mycryptoheroes.net/images/heroes/64/4022.png" },
        { name: "Zhao Yun", image: "https://www.mycryptoheroes.net/images/heroes/64/4023.png" },
      ],
    },
    { rarity: "Legendary",
      assetLists: [
        { name: "King Arthur", image: "https://www.mycryptoheroes.net/images/heroes/64/5006.png" },
        { name: "Nobunaga Oda", image: "https://www.mycryptoheroes.net/images/heroes/64/5001.png" },
        { name: "Napoleon Bonaparte", image: "https://www.mycryptoheroes.net/images/heroes/64/5002.png" },
        { name: "Cao Cao", image: "https://www.mycryptoheroes.net/images/heroes/64/5003.png" },
        { name: "George Washington", image: "https://www.mycryptoheroes.net/images/heroes/64/5004.png" },
        { name: "Leonardo da Vinci", image: "https://www.mycryptoheroes.net/images/heroes/64/5005.png" },
        { name: "Joan of Arc", image: "https://www.mycryptoheroes.net/images/heroes/64/5007.png" },
        { name: "Ryoma Sakamoto", image: "https://www.mycryptoheroes.net/images/heroes/64/5008.png" },
        { name: "Liu Bei ", image: "https://www.mycryptoheroes.net/images/heroes/64/5009.png" },
        { name: "Albert Einstein", image: "https://www.mycryptoheroes.net/images/heroes/64/5010.png" },
        { name: "Himiko", image: "https://www.mycryptoheroes.net/images/heroes/64/5011.png" },
        { name: "Johann Sebastian Bach", image: "https://www.mycryptoheroes.net/images/heroes/64/5012.png" },
        { name: "Genghis Khan", image: "https://www.mycryptoheroes.net/images/heroes/64/5013.png" }
      ],
    },
  ]
