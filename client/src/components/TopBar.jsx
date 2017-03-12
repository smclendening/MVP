import React from 'react';

var cals = 23;

const TopBar = (props) => (
  <div>
    <h4>Motivational Quote of the Day: Greed is Good! Money Makes Me Feel Young and Happy Again!" - Edward Chan</h4>
    <div>Total Calories Today: {props.calories}</div>
    <div>You would have to run up and down the HR stairs <b>{Math.round(Number(props.fattest.cals) / cals)} times</b> to burn those off that tasty <b>{props.fattest.name}</b> - wow! Better get started haha!</div>
  </div>
)

export default TopBar;