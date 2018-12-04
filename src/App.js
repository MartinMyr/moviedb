import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  performSearch(searchTerm){
    const urlString ="https://api.themoviedb.org/3/search/movie?api_key=e7e24a5efae7dd5aecf08d05791f3312&query=" +searchTerm;
    $.ajax({
        url:urlString,
        success: (searchResults) => {

            console.log("Fetched data successfully");

            const results = searchResults.results;
            var movieRows = [];

            results.forEach((movie) => {
                movie.poster_src = "https://image.tmdb.org/t/p/w185"+ movie.poster_path;
                const movieRow = <MovieRow key ={movie.id} movie={movie}/>;
                movieRows.push(movieRow);
            });
            this.setState({rows: movieRows})
      },
        error:(xhr, status, err) => {
            console.log("Failed to fetch data")
        }
    })
  }

    searchChangeHandler(event){
      const boundObject = this;
      const searchTerm = event.target.value;
      this.performSearch(searchTerm);
    }

  render() {
    return (
      <div className="App">
        <table id="head">
          <tbody>
            <tr >
              <td>
              <h2>MovieDB</h2>
              </td>
            </tr>
          </tbody>
        </table>
          <input type="text" onChange={this.searchChangeHandler.bind(this)} placeholder="enter search term"/>
          {this.state.rows}


      </div>
    );
  }
}

export default App;
