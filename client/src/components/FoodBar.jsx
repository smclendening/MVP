import React from 'react';

class FoodBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: '',
      calories: ''
    }

    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleCalChange = this.handleCalChange.bind(this);
  }

  handleFoodChange(e) {
    e.preventDefault();
    this.setState({food: e.target.value})
  }

  handleCalChange(e) {
    e.preventDefault();
    this.setState({calories: e.target.value})
  }

  // not sure why onBlur works but onChange doesn't - look into this later
  // also not sure why had to make an anon function in the onClick of the button
  // EXPLANATION: turns out the onClick was getting called immediately on render or something
  // https://github.com/facebook/react/issues/2840

  render() {
    return (
      <div id="food-bar">
        <form>
          Food: <input id="food input" type="text" onBlur={this.handleFoodChange} />
          Calories: <input id="cal input" type="text" onBlur={this.handleCalChange} />
        <button type="button" onClick={() => this.props.onClick(this.state.food, this.state.calories)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default FoodBar;