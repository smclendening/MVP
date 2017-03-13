import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({query: e.target.value});
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div id="search">
        <form id="search-bar">
          <input id="search-input" type="text" placeholder="Search Food Database..." onKeyUp={this.handleSearch} />
        </form>
      </div>
    )
  }
}

export default Search;