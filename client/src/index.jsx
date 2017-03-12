import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FoodList from './components/FoodList.jsx';
import FoodBar from './components/FoodBar.jsx';
import Search from './components/Search.jsx';
import SearchResults from './components/SearchResults.jsx';
import Favorites from './components/Favorites.jsx';
import helpers from './helpers.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foodList: null,
      searchResults: null,
      caloriesToday: 0,
      favorites: []
    };

    this.addFood = this.addFood.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getCalories = this.getCalories.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
  }

  componentDidMount() {
    // when App renders, load food items (if any)
    this.getFood();
    this.getCalories();
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

  deleteFood(id) {
    // delete food from mongo using ID
    console.log(id);
    $.ajax({
      url: 'http://localhost:8080/delete',
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      data: JSON.stringify({id: id}),
      success: (data) => {
        console.log('deleting food in success');
      },
      error: function(err) {
        console.log('error in delete food', err)
      }
    });

    this.getFood();
    this.getCalories();
  }

  getCalories() {
    $.ajax({
      url: 'http://localhost:8080/calories',
      method: 'GET',
      success: (data) => {
        if (data) {
          console.log('inside get calories: ', data);
          var totalCals = 0;
          data.forEach(function(entry) {
            totalCals += Number(entry.cals);
          });

          this.setState({
            caloriesToday: totalCals
          })
        } else {
          console.log('no data');
        }
      },
      error: function(err) {
        console.log('error in get calories');
      }
    });
  }

  addFood(food, cals, comment) {
    var ID = food + helpers().toString();
    console.log('new food ID: ', ID);
    $.ajax({
      url:'http://localhost:8080/food',
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      data: JSON.stringify({name: food, cals: cals, comment: comment, id: ID}),
      success: (data) => {
        console.log('getting food in success');
      },
      error: function(err) {
        console.log('error in foodbarclick', err)
      }
    });
    this.getFood();
    this.getCalories();
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

  handleFavorite(foodName) {
    // when a new favorite is added, add it to list
    var favs = this.state.favorites;
    if (!favs.includes(foodName)) {
      favs.push(foodName);

      this.setState({
        favorites: favs
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Food</h1>
        <h4>Motivational Quote of the Day: "Greed is Good" - Edward Chan | Total Calories Today: {this.state.caloriesToday}</h4>
        <Search onSearch={this.onSearch}/>
        {this.state.searchResults ? <SearchResults results={this.state.searchResults} onClick={this.addFood} /> : ''}
        <FoodBar onClick={this.addFood}/>
        {this.state.foodList ? <FoodList foodList={this.state.foodList} onFavorite={this.handleFavorite} onDelete={this.deleteFood}/> : '...loading'}
        <Favorites favorites={this.state.favorites} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));