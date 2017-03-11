import React from 'react';
import Option from './Option.jsx'

const SearchResults = (props) => (
  <ul>
    {props.results.map( (option) => <Option brand={option.brand} item={option.item} cals={option.cals} onClick={props.onClick}/>)}
  </ul>
)

export default SearchResults;