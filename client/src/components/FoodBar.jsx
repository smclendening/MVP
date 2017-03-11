import React from 'react';

class FoodBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="food-bar">
        <form>
          Food: <input id="food input" type="text"  />
          Calories: <input id="cal input" type="text" />
          <button type="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default FoodBar;