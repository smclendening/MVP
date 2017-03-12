import React from 'react';


const Food = (props) => (
  <tr>
    <td>{props.date}</td><td>{props.name}</td><td>{props.cals}</td><td>{props.comment}</td><td><a onClick={() => props.onFavorite(props.name)}>Favorite</a> | <a>Hate</a> | <a onClick={() => props.onDelete(props.id)}>Delete</a></td>
  </tr>
)


export default Food;