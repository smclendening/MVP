import React from 'react';

const Hates = (props) => (
  <div id="hates">
  <h4>I HATE These Foods!</h4>
    <ul className="list">
    {props.hates.map( (food) => <li>{food}</li> )}
    </ul>
  </div>
)

export default Hates;