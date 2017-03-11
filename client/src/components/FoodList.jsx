import React from 'react';
import Food from './Food.jsx'

var date = new Date().toString().slice(0, 10);

const FoodList = (props) => (
  <div>
    {props.foodList.map( (food) => <Food date={date} name={food.name} cals={food.cals} comment={food.comment}/>)}
  </div>
)

export default FoodList;