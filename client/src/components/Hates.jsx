import React from 'react';

const Hates = (props) => (
  <div id="hates">
  <h4 className="listheader">I HATE These Foods!</h4>
    <ul className="list">
    {props.hates.map( (food) => <li>{food}</li> )}
    </ul>
  </div>
)

export default Hates;