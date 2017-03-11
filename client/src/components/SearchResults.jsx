import React from 'react';
import Option from './Option.jsx'

const SearchResults = (props) => (
  <div>
    {props.results.map( (option) => <Option brand={option.brand} item={option.item} cals={option.cals} />)}
  </div>
)

export default SearchResults;