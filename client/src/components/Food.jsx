import React from 'react';


const Food = (props) => (
  <div>
    <b>{props.date}</b> --- {props.name} --- {props.cals} calories --- {props.comment}
  </div>
)

export default Food;