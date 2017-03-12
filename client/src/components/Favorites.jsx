import React from 'react';

const Favorites = (props) => (
  <div>
  <h4>Favorite Foods</h4>
    <ul>
    {props.favorites.map( (food) => <li>{food}</li> )}
    </ul>
  </div>
)

export default Favorites;