import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FoodList from './components/FoodList.jsx';
import FoodBar from './components/FoodBar.jsx';
import Search from './components/Search.jsx';
import SearchResults from './components/SearchResults.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foodList: null,
      searchResults: null,
    };

    this.addFood = this.addFood.bind(this);
    this.onSearch = this.onSearch.bind(this);
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

  addFood(food, cals, comment) {
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

  onSearch(query) {
    // search nutritionx API
    var options = '?results=0:5&fields=item_name,brand_name,nf_calories&appId=1d3d2317&appKey=3c775b5d05a623ee9d8272a46ef870e3'
    $.ajax({
      url: 'https://api.nutritionix.com/v1_1/search/' + query + options,
      method: 'GET',
      success: (data) => {
        // {hits: [{fields: {brand_name: '', item_name: '', nf_calories: ''}}]}
        console.log('api query results: ', data);
        var results = [];

        data.hits.forEach(function(result) {
          var option = {brand: result.fields.brand_name, item: result.fields.item_name, cals: result.fields.nf_calories};
          results.push(option);
        });

        this.setState({
          searchResults: results
        });

        console.log(this.state.searchResults);
      },
      error: (err) => {
        console.log('error on api query: ', err);
      }
    });

    //this.renderResults();
  }

  render() {
    return (
      <div>
        <h1>Tri Trip</h1>
        <h3>"Greed is Good" - Edward Chan</h3>
        <Search onSearch={this.onSearch}/>
        {this.state.searchResults ? <SearchResults results={this.state.searchResults} onClick={this.addFood} /> : ''}
        <FoodBar onClick={this.addFood}/>
        {this.state.foodList ? <FoodList foodList={this.state.foodList}/> : '...loading'}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));