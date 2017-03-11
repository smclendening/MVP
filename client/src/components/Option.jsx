import React from 'react';


const Option = (props) => (
  <li class="option" onClick={() => props.onClick(props.item, props.cals, 'No Comment')}>
    {props.brand}: {props.item} --- {props.cals} Calories
  </li>
)

export default Option;