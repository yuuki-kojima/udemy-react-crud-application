import { culcPrice } from '../currency'
import * as address from '../contractAddress';

const ROOT_URL = 'https://api.opensea.io/api/v1'
const QUERY_MCHH = '&order_by=listing_date&order_direction=desc'

export const tabValues = ['Hero', 'Extension']

export const initialMode = 'Hero'

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
  const {mode, rarity} = payload
  const contractAddress = address.MCH[mode]
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
    query += query + '&trait__string__' + payload.mode.toLowerCase() + '_name=' + encodeURIComponent(payload.assetName) + '&offset=' + offset
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
      return trait.trait_type === payload.mode.toLowerCase() + '_name';
    })[0].value,
    lv: asset[1].traits.filter(trait => {
      return trait.trait_type === 'lv';
    })[0].value,
    rarity: asset[1].traits.filter(trait => {
      return trait.trait_type === 'rarity';
    })[0].value,
  }
}

export const setInitialPayload = (type, mode, assetName) => {
  return {
    mode: mode ? mode : 'Hero',
    rarity: 'All',
    sortKey: 'listing_date',
    currency: 'Ethereum',
    assetName,
    type,
  }
}

export const setCondition = (id, value, mode, assetName, payload) => {
  return {
    rarity: id === 'rarity' ? value : payload.rarity,
    mode: mode ? mode : payload.mode,
    sortKey: id === 'sortKey' ? value : payload.sortKey,
    currency: id === 'currency' ? value : payload.currency,
    assetName: assetName ? assetName : payload.assetName,
    type: payload.type,
  }
}

export const assetInfos = {
  'Hero': [
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
  ],
  'Extension': [
      { rarity: "Common",
        assetLists: [
          { name: "Novice Blade", image: "https://www.mycryptoheroes.net/images/extensions/64/1001.png" },
          { name: "Novice Musket", image: "https://www.mycryptoheroes.net/images/extensions/64/1002.png" },
          { name: "Novice Quill", image: "https://www.mycryptoheroes.net/images/extensions/64/1003.png" },
          { name: "Novice Armor", image: "https://www.mycryptoheroes.net/images/extensions/64/1004.png" },
          { name: "Novice Horse", image: "https://www.mycryptoheroes.net/images/extensions/64/1005.png" },
          { name: "Novice Katana", image: "https://www.mycryptoheroes.net/images/extensions/64/1006.png" },
          { name: "Novice Book", image: "https://www.mycryptoheroes.net/images/extensions/64/1008.png" },
          { name: "Novice Ring", image: "https://www.mycryptoheroes.net/images/extensions/64/1009.png" },
          { name: "Novice Shield", image: "https://www.mycryptoheroes.net/images/extensions/64/1010.png" },
          { name: "Axe", image: "https://www.mycryptoheroes.net/images/extensions/64/1011.png" },
          { name: "ETHEREMON-EKOPI", image: "https://www.mycryptoheroes.net/images/extensions/64/1012.png" },
          { name: "Yumi", image: "https://www.mycryptoheroes.net/images/extensions/64/1013.png" },
          { name: "Cross Spear", image: "https://www.mycryptoheroes.net/images/extensions/64/1014.png" },
          { name: "Halberd", image: "https://www.mycryptoheroes.net/images/extensions/64/1015.png" },
          { name: "Scrolls", image: "https://www.mycryptoheroes.net/images/extensions/64/1016.png" },
          { name: "Necklace", image: "https://www.mycryptoheroes.net/images/extensions/64/1017.png" },
          { name: "Kabuto", image: "https://www.mycryptoheroes.net/images/extensions/64/1018.png" },
        ]
      },
      { rarity: "Uncommon",
        assetLists: [
        { name: "Elite Blade", image: "https://www.mycryptoheroes.net/images/extensions/64/2001.png" },
        { name: "Elite Musket", image: "https://www.mycryptoheroes.net/images/extensions/64/2002.png" },
        { name: "Elite Quill", image: "https://www.mycryptoheroes.net/images/extensions/64/2003.png" },
        { name: "Elite Armor", image: "https://www.mycryptoheroes.net/images/extensions/64/2004.png" },
        { name: "Elite Horse", image: "https://www.mycryptoheroes.net/images/extensions/64/2005.png" },
        { name: "Cutie Cat", image: "https://www.mycryptoheroes.net/images/extensions/64/2007.png" },
        { name: "Elite Katana", image: "https://www.mycryptoheroes.net/images/extensions/64/2006.png" },
        { name: "Elite Book", image: "https://www.mycryptoheroes.net/images/extensions/64/2008.png" },
        { name: "Elite Ring", image: "https://www.mycryptoheroes.net/images/extensions/64/2009.png" },
        { name: "Elite Shield", image: "https://www.mycryptoheroes.net/images/extensions/64/2010.png" },
        { name: "Elite Axe", image: "https://www.mycryptoheroes.net/images/extensions/64/2011.png" },
        { name: "ETHEREMON-MALAKEL’E", image: "https://www.mycryptoheroes.net/images/extensions/64/2012.png" },
        { name: "Elite Yumi", image: "https://www.mycryptoheroes.net/images/extensions/64/2013.png" },
        { name: "Elite Cross Spear", image: "https://www.mycryptoheroes.net/images/extensions/64/2014.png" },
        { name: "Elite Halberd", image: "https://www.mycryptoheroes.net/images/extensions/64/2015.png" },
        { name: "Elite Scrolls", image: "https://www.mycryptoheroes.net/images/extensions/64/2016.png" },
        { name: "Elite Necklace", image: "https://www.mycryptoheroes.net/images/extensions/64/2017.png" },
        { name: "Elite Kabuto", image: "https://www.mycryptoheroes.net/images/extensions/64/2018.png" },
        ],
      },
      { rarity: "Rare",
        assetLists: [
        { name: "Brave Blade", image: "https://www.mycryptoheroes.net/images/extensions/64/3001.png" },
        { name: "Brave Musket", image: "https://www.mycryptoheroes.net/images/extensions/64/3002.png" },
        { name: "Wisdom Quill", image: "https://www.mycryptoheroes.net/images/extensions/64/3003.png" },
        { name: "Brave Armor", image: "https://www.mycryptoheroes.net/images/extensions/64/3004.png" },
        { name: "Brave Horse", image: "https://www.mycryptoheroes.net/images/extensions/64/3005.png" },
        { name: "Cutie Kyubi", image: "https://www.mycryptoheroes.net/images/extensions/64/3007.png" },
        { name: "Brave Katana", image: "https://www.mycryptoheroes.net/images/extensions/64/3006.png" },
        { name: "Wisdom Book", image: "https://www.mycryptoheroes.net/images/extensions/64/3008.png" },
        { name: "Wisdom Ring", image: "https://www.mycryptoheroes.net/images/extensions/64/3009.png" },
        { name: "Brave Shield", image: "https://www.mycryptoheroes.net/images/extensions/64/3010.png" },
        { name: "Brave Axe", image: "https://www.mycryptoheroes.net/images/extensions/64/3011.png" },
        { name: "ETHEREMON-MAPLA", image: "https://www.mycryptoheroes.net/images/extensions/64/3012.png" },
        { name: "Brave Yumi", image: "https://www.mycryptoheroes.net/images/extensions/64/3013.png" },
        { name: "Brave Cross Spear", image: "https://www.mycryptoheroes.net/images/extensions/64/3014.png" },
        { name: "Brave Halberd", image: "https://www.mycryptoheroes.net/images/extensions/64/3015.png" },
        { name: "Wizdom Scrolls", image: "https://www.mycryptoheroes.net/images/extensions/64/3016.png" },
        { name: "Wizdom Necklace", image: "https://www.mycryptoheroes.net/images/extensions/64/3017.png" },
        { name: "Brave Kabuto", image: "https://www.mycryptoheroes.net/images/extensions/64/3018.png" },
        ],
      },
      { rarity: "Epic",
        assetLists: [
        { name: "Imperial Blade", image: "https://www.mycryptoheroes.net/images/extensions/64/4001.png" },
        { name: "The Three Musketeers' Musket", image: "https://www.mycryptoheroes.net/images/extensions/64/4002.png" },
        { name: "Master Musician's Quill", image: "https://www.mycryptoheroes.net/images/extensions/64/4003.png" },
        { name: "Fluted Armor", image: "https://www.mycryptoheroes.net/images/extensions/64/4004.png" },
        { name: "Red Hare", image: "https://www.mycryptoheroes.net/images/extensions/64/4005.png" },
        { name: "Cutie Alien", image: "https://www.mycryptoheroes.net/images/extensions/64/4007.png" },
        { name: "Izuminokami Kanesada", image: "https://www.mycryptoheroes.net/images/extensions/64/4006.png" },
        { name: "Crime and Punishment", image: "https://www.mycryptoheroes.net/images/extensions/64/4008.png" },
        { name: "Mysterious stone glow", image: "https://www.mycryptoheroes.net/images/extensions/64/4009.png" },
        { name: "Prytwen", image: "https://www.mycryptoheroes.net/images/extensions/64/4010.png" },
        { name: "Tecumseh’s Tomahawk", image: "https://www.mycryptoheroes.net/images/extensions/64/4011.png" },
        { name: "ETHEREMON-SIBERIZEN", image: "https://www.mycryptoheroes.net/images/extensions/64/4012.png" },
        { name: "Raijyodo", image: "https://www.mycryptoheroes.net/images/extensions/64/4013.png" },
        { name: "Bone-piercing Spear", image: "https://www.mycryptoheroes.net/images/extensions/64/4014.png" },
        { name: "Zhang Eight Snake Halberd", image: "https://www.mycryptoheroes.net/images/extensions/64/4015.png" },
        { name: "The Art of War", image: "https://www.mycryptoheroes.net/images/extensions/64/4016.png" },
        { name: "Siberian cedar necklace", image: "https://www.mycryptoheroes.net/images/extensions/64/4017.png" },
        { name: "Shingen's Kabuto", image: "https://www.mycryptoheroes.net/images/extensions/64/4018.png" },
        ],
      },
      { rarity: "Legendary",
        assetLists: [
        { name: "MCH Blade", image: "https://www.mycryptoheroes.net/images/extensions/64/5001.png" },
        { name: "Grande Armée", image: "https://www.mycryptoheroes.net/images/extensions/64/5002.png" },
        { name: "Playwright's Quill", image: "https://www.mycryptoheroes.net/images/extensions/64/5003.png" },
        { name: "MCH Armor", image: "https://www.mycryptoheroes.net/images/extensions/64/5004.png" },
        { name: "Bucephalus", image: "https://www.mycryptoheroes.net/images/extensions/64/5005.png" },
        { name: "Heshikiri Hasebe", image: "https://www.mycryptoheroes.net/images/extensions/64/5006.png" },
        { name: "Codex Atlanticus", image: "https://www.mycryptoheroes.net/images/extensions/64/5008.png" },
        { name: "Ring of the Queen", image: "https://www.mycryptoheroes.net/images/extensions/64/5009.png" },
        { name: "Aegis", image: "https://www.mycryptoheroes.net/images/extensions/64/5010.png" },
        { name: "Viking Axe", image: "https://www.mycryptoheroes.net/images/extensions/64/5011.png" },
        { name: "ETHEREMON-ZEDAKAZM", image: "https://www.mycryptoheroes.net/images/extensions/64/5012.png" },
        { name: "Yoichi no Yumi", image: "https://www.mycryptoheroes.net/images/extensions/64/5013.png" },
        { name: "Tonbokiri", image: "https://www.mycryptoheroes.net/images/extensions/64/5014.png" },
        { name: "Lü Bu's Halberd", image: "https://www.mycryptoheroes.net/images/extensions/64/5015.png" },
        { name: "Da Tang Western Region", image: "https://www.mycryptoheroes.net/images/extensions/64/5016.png" },
        { name: "Necklace of the sun god", image: "https://www.mycryptoheroes.net/images/extensions/64/5017.png" },
        { name: "Crescent Moon Kabuto", image: "https://www.mycryptoheroes.net/images/extensions/64/5018.png" },
        ],
      },
    ]
}
