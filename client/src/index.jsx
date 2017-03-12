import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FoodList from './components/FoodList.jsx';
import FoodBar from './components/FoodBar.jsx';
import Search from './components/Search.jsx';
import SearchResults from './components/SearchResults.jsx';
import Favorites from './components/Favorites.jsx';
import Hates from './components/Hates.jsx';
import TopBar from './components/TopBar.jsx';
import Quote from './components/Quote.jsx';
import helpers from './helpers.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foodList: null,
      searchResults: null,
      caloriesToday: 0,
      favorites: [],
      hates: [],
      fattestFood: null,
      showQuote: false
    };

    this.addFood = this.addFood.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getCalories = this.getCalories.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.getHates = this.getHates.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleHate = this.handleHate.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.getFattest = this.getFattest.bind(this);
    this.handleQuoteClick = this.handleQuoteClick.bind(this);
  }

  componentDidMount() {
    // when App renders, load food items (if any)
    this.getFood();
    this.getCalories();
    this.getFavorites();
    this.getHates();
    //this.getFattest();
  }

  getFattest() {
    var foods = this.state.foodList;
    var fattest = foods.reduce(function(prev, cur) {
      return Number(prev.cals) > Number(cur.cals) ? prev : cur;
    });

    console.log('fattest now hmm', fattest);

    this.setState({
      'fattestFood': fattest
    })

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

          this.getFattest();
          
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
    this.getFavorites();
    this.getHates();
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
      data: JSON.stringify({name: food, cals: cals, comment: comment, favorite: false, hate: false, id: ID}),
      success: (data) => {
        console.log('getting food in success');
      },
      error: function(err) {
        console.log('error in foodbarclick', err)
      }
    });
    this.getFood();
    this.getCalories();
    this.getFattest();
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

  handleFavorite(id) {

    $.ajax({
      url: 'http://localhost:8080/favorites',
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      data: JSON.stringify({id: id}),
      success: (data) => {
        console.log('handling fav food in success');
      },
      error: function(err) {
        console.log('error in handle fav food', err)
      }
    });

    this.getFood();
    this.getCalories();
    this.getFavorites();
  }

  getFavorites() {
    $.ajax({
      url: 'http://localhost:8080/favorites',
      method: 'GET',
      success: (data) => {
        if (data) {
          var results = [];
          data.forEach(function(entry) {
            results.push(entry.name);
          });

          this.setState({
            favorites: results
          })

        } else {
          console.log('no data');
        }
      },
      error: function(err) {
        console.log('error in get calories');
      }
    });

    console.log(this.state.favorites);

  }

  handleHate(id) { 
    $.ajax({
      url: 'http://localhost:8080/hates',
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      data: JSON.stringify({id: id}),
      success: (data) => {
        console.log('handling hated food in success');
      },
      error: function(err) {
        console.log('error in handle hated food', err)
      }
    });

    this.getFood();
    this.getCalories();
    this.getFavorites();
    this.getHates();
  }

  getHates() {
    $.ajax({
      url: 'http://localhost:8080/hates',
      method: 'GET',
      success: (data) => {
        if (data) {
          var results = [];
          data.forEach(function(entry) {
            results.push(entry.name);
          });

          this.setState({
            hates: results
          })

        } else {
          console.log('no data');
        }
      },
      error: function(err) {
        console.log('error in get calories');
      }
    });

    console.log(this.state.hates);

  }

  handleQuoteClick() {
    this.setState({
      showQuote: !this.state.showQuote
    })
  }

  render() {
    return (
      <div>
        <div id="top-header"><h1>What'd You Eat?</h1></div>
        <TopBar onClick={this.handleQuoteClick} calories={this.state.caloriesToday} fattest={this.state.fattestFood ? this.state.fattestFood : {cals: 0, name: 'test'}}/>
        {this.state.showQuote ? <Quote /> : ''}
        <Search onSearch={this.onSearch}/>
        {this.state.searchResults ? <SearchResults results={this.state.searchResults} onClick={this.addFood} /> : ''}
        <FoodBar onClick={this.addFood}/>
        {this.state.foodList ? <FoodList foodList={this.state.foodList} onFavorite={this.handleFavorite} onHate={this.handleHate} onDelete={this.deleteFood}/> : '...loading'}
        <Favorites favorites={this.state.favorites} />
        <Hates hates={this.state.hates} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));