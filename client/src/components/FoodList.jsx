import React from 'react';
import Food from './Food.jsx'

var date = new Date().toString().slice(0, 10);

const FoodList = (props) => (
  <table id="food-list">
    <th>Date</th> <th>Food</th> <th>Calories</th> <th>Comment</th> <th>Actions</th>
    <tbody>
    {props.foodList.map( (food) => <Food id ={food.id} date={date} name={food.name} cals={food.cals} comment={food.comment} onFavorite={props.onFavorite} onDelete={props.onDelete}/>)}
    </tbody>
  </table>
)

export default FoodList;