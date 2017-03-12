import React from 'react';


const Food = (props) => (
  <tr>
    <td>{props.date}</td><td>{props.name}</td><td>{props.cals}</td><td>{props.comment}</td><td><a onClick={() => props.onFavorite(props.id)}>Favorite</a> | <a onClick={() => props.onHate(props.id)}>Hate</a> | <a onClick={() => props.onDelete(props.id)}>Delete</a></td>
  </tr>
)


export default Food;