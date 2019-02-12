import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const SearchFormComponent = ( {typeKeys, types, values, onChange} ) => (
  <div className="search" style={{textAlign:'center'}}>
    {
      typeKeys.map( (key, index) => (
        <FormControl key={index} style={{margin:5}}>
          <InputLabel>{key}</InputLabel>
          <Select
            native
            value={values[key] ? values[key] : types[key][0].value}
            onChange={onChange}
            inputProps={{
                name: key,
                id: key,
            }}
          >
            {
              types[key].map( (type, index) => (
                <option key={index} value={type.value}>{type.string}</option>
              ))
            }
          </Select>
        </FormControl>
      ))
    }
  </div>
)

export default SearchFormComponent
