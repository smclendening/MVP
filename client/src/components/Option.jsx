import React from 'react';


const Option = (props) => (
  <li className="option" onClick={() => props.onClick(props.item, props.cals, 'No Comment')}>
    <b>{props.brand}</b>: {props.item} --- {props.cals} Calories
  </li>
)

export default Option;