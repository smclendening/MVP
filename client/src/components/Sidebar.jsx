import React from 'react';
import Favorites from './Favorites.jsx';
import Hates from './Hates.jsx';

const SideBar = (props) => (
  <div id="sidebar">
    <Favorites favorites={props.favorites}/>
    <Hates hates={props.hates}/>
  </div>
)

export default SideBar;