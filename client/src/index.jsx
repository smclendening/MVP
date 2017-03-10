import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FoodList from './components/FoodList.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foodList: null,
      currentFood: null,
    };
  }

  componentDidMount() {
    // when App renders, load food items (if any)
    $.ajax({
      url: 'http://localhost:8080/food',
      method: 'GET',
      success: (data) => {
        if (data) {
        console.log('success: ', data);
        // console.log('parsed: ', JSON.parse(data));
        // this automatically parses it because we set content/type 
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

  render() {
    return (
      <div>
        <h1>Tri Trip</h1>
        <h3>A meal tracker for tri tip lovers.</h3>
        <h5>You can track other foods besides Tri Tip too.</h5>
        <h6>"Greed is Good" - Edward Chan</h6>
        {this.state.foodList ? <FoodList foodList={this.state.foodList}/> : '...loading'}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));