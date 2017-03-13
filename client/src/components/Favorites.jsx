import React from 'react';

const Favorites = (props) => (
  <div id="favorites">
  <h4 className="listheader">Favorite Foods</h4>
    <ul className="list">
    {props.favorites.map( (food) => <li>{food}</li> )}
    </ul>
  </div>
)

export default Favorites;