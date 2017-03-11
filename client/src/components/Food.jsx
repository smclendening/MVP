import React from 'react';

const Food = (props) => (
  <div>
    {props.name}: {props.cals} Calories --- {props.comment}
  </div>
)

export default Food;