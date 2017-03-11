import React from 'react';

const Option = (props) => (
  <div class="option">
    {props.brand}: {props.item} --- {props.cals} Calories
  </div>
)

export default Option;