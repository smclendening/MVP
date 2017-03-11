import React from 'react';
import Food from './Food.jsx'

var date = new Date().toString().slice(0, 10);

const FoodList = (props) => (
  <table id="food-list">
    <th>Date</th> <th>Food</th> <th>Calories</th> <th>Comment</th>
    {props.foodList.map( (food) => <Food date={date} name={food.name} cals={food.cals} comment={food.comment}/>)}
  </table>
)

export default FoodList;