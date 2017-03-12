import React from 'react';

var cals = 23;

// const TopBar = (props) => (
//   <div>
//     <h4>Motivational Quote of the Day:</h4> <blockquote>Greed is Good!"</blockquote> - Edward Chan
//     <div>Total Calories Today: {props.calories}</div>
//     <div>You would have to run up and down the HR stairs <b>{Math.round(Number(props.fattest.cals) / cals)} times</b> to burn off that tasty <b>{props.fattest.name}</b> - wow! Better get started haha!</div>
//   </div>
// )

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id="topbar">
        <div class="in-bar">Total Calories Today: {this.props.calories}</div>
        <div class="in-bar">You would have to run up and down the HR stairs <b>{Math.round(Number(this.props.fattest.cals) / cals)} times</b> to burn off that tasty <b>{this.props.fattest.name}</b> - wow! Better get started haha!</div>
        <button class="in-bar" type="button" onClick={this.props.onClick}>Click here for a Motivational Quote!</button>
      </div>
    )
  }
}

export default TopBar;