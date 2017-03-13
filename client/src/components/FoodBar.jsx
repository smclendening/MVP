import React from 'react';

class FoodBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      calories: '',
      comment: ''
    }

    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleCalChange = this.handleCalChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleFoodChange(e) {
    e.preventDefault();
    this.setState({food: e.target.value})
  }

  handleCalChange(e) {
    e.preventDefault();
    this.setState({calories: e.target.value})
  }

  handleCommentChange(e) {
    e.preventDefault();
    this.setState({comment: e.target.value});
  }

  // not sure why onBlur works but onChange doesn't - look into this later
  // also not sure why had to make an anon function in the onClick of the button
  // EXPLANATION: turns out the onClick was getting called immediately on render or something
  // https://github.com/facebook/react/issues/2840

  render() {
    return (
      <div id="food-bar">
      <div id="record-message"><b>OR:</b> Record your food manually below:</div>
      <div id="food-record">
        <form> 
          <input className="input" placeholder="Food..." type="text" onBlur={this.handleFoodChange} />
          <input className="input" type="text" placeholder="Calories..." onBlur={this.handleCalChange} />
          <input className="input" type="text" placeholder="Comment..." onBlur={this.handleCommentChange} />
        <button type="button" onClick={() => this.props.onClick(this.state.food, this.state.calories, this.state.comment)}>Record Food</button>
        </form>
      </div>
      </div>
    )
  }
}

export default FoodBar;