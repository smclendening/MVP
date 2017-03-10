import React from 'react';
import Food from './Food.jsx'

const FoodList = (props) => (
  <div>
    {props.foodList.map( (food) => <Food name={food.name} cals={food.cals} />)}
  </div>
)

export default FoodList;