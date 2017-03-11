import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FoodList from './components/FoodList.jsx';
import FoodBar from './components/FoodBar.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foodList: null,
      currentFood: null,
    };

    this.onFoodBarClick = this.onFoodBarClick.bind(this);
  }

  componentDidMount() {
    // when App renders, load food items (if any)
    this.getFood();
  }

  getFood() {
    console.log('getting food');
    $.ajax({
      url: 'http://localhost:8080/food',
      method: 'GET',
      success: (data) => {
        if (data) {
        console.log('success in mount: ', data);
          this.setState({
            foodList: data
          })
          
        } else {
          console.log('no data');
        }
      },
      error: function(err) {
        console.log('error in didMount: ', err);
      }
    });
  }

  onFoodBarClick(food, cals, comment) {
    console.log(food, cals, comment);
    $.ajax({
      url:'http://localhost:8080/food',
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      data: JSON.stringify({name: food, cals: cals, comment: comment}),
      success: (data) => {
        console.log('getting food in success');
      },
      error: function(err) {
        console.log('error in foodbarclick', err)
      }
    });
    console.log('getting food outside request');
    // why does this.getFood() happen outside of the ajax request?
    this.getFood();
  }

  render() {
    return (
      <div>
        <h1>Tri Trip</h1>
        <h3>"Greed is Good" - Edward Chan</h3>
        <FoodBar onClick={this.onFoodBarClick}/>
        {this.state.foodList ? <FoodList foodList={this.state.foodList}/> : '...loading'}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));