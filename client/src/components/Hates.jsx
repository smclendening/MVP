import React from 'react';

const Hates = (props) => (
  <div>
  <h4>I HATE These Foods!</h4>
    <ul>
    {props.hates.map( (food) => <li>{food}</li> )}
    </ul>
  </div>
)

export default Hates;