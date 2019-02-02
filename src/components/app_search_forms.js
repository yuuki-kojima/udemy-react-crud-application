import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const AppSearchForms = ({
  rarity,
  sortKey,
  currency,
  handleRarityChange,
  handleSortChange,
  handleCurrencyChange,
}) => {

  const rarityValues = [
    'All',
    'Common',
    'Uncommon',
    'Rare',
    'Epic',
    'Legendary'
  ]

  const currencyValues = [
    'Ethereum',
    'Yen',
  ]

  // const sorKeyValues = [
  //   { value: 'listing_date', strings: 'Recently Listed' },
  //   { value: 'lowest_price', strings: 'Lowest Price' },
  //   { value: 'highest_price', strings: 'Highest Price'}
  // ]

  return (
    <div className="search" style={{textAlign:'center', marginBottom:30}}>
      <FormControl>
        <InputLabel>Currency</InputLabel>
        <Select
          native
          value = {currency ? currency : 'All'}
          onChange= {handleCurrencyChange}
          inputProps={{
              name: 'currency',
              id: 'currency',
          }}
        >
          {
            currencyValues.map( (value, index) => {
              return <option key={index} value={value}>{value}</option>
            })
          }
        </Select>
      </FormControl>
      <FormControl style={{marginLeft: 10}}>
        <InputLabel>Rarity</InputLabel>
        <Select
          native
          value = {rarity ? rarity : 'All'}
          onChange = {handleRarityChange}
          inputProps={{
              name: 'rarity',
              id: 'rarity',
          }}
        >
          {
            rarityValues.map( (value, index) => {
              return <option key={index} value={value}>{value}</option>
            })
          }
        </Select>
      </FormControl>
      {/*
      <FormControl style={{marginLeft: 10}}>
        <InputLabel>Sort</InputLabel>
        <Select
          native
          value = {sortKey ? sortKey : 'listing_date'}
          onChange = {handleSortChange}
          inputProps={{
              name: 'sortKey',
              id: 'sortKey',
          }}
        >
          {
            sorKeyValues.map( ({value, strings}, index) => {
              return <option key={index} value={value}>{strings}</option>
            })
          }
        </Select>
      </FormControl>
      */}
    </div>
  )
}

export default AppSearchForms
