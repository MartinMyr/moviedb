import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

    onClickUp(){
        if (this.state.rows) {
            const data = this.state.rows;
            data.sort(function (b, a) {
                return parseInt(b.props.movie.vote_average) - parseInt(a.props.movie.vote_average);
            });
            const movieRows = [];
            data.forEach((movie) => {
                movie.props.movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.props.movie.poster_path;
                console.log(movie.props.movie);
                const movieRow = <MovieRow key={movie.props.movie.id} movie={movie.props.movie}/>;
                movieRows.push(movieRow);
            });
            this.setState({rows: movieRows})
        }
    }

    onClick(){

      if (this.state.rows) {
          const data = this.state.rows;
          console.log(this.state.rows);
          data.sort(function (b, a) {
              return parseInt(a.props.movie.vote_average) - parseInt(b.props.movie.vote_average);
          });
          const movieRows = [];
          data.forEach((movie) => {
              movie.props.movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.props.movie.poster_path;
              console.log(movie.props.movie);
              const movieRow = <MovieRow key={movie.props.movie.id} movie={movie.props.movie}/>;
              movieRows.push(movieRow);
          });
          this.setState({rows: movieRows})
      }
    }
  performSearch(searchTerm){
    const urlString ="https://api.themoviedb.org/3/search/movie?api_key=e7e24a5efae7dd5aecf08d05791f3312&query=" +searchTerm;
    $.ajax({
        url:urlString,
        success: (searchResults) => {

            console.log("Fetched data successfully");

            const results = searchResults.results;
            var movieRows = [];

            results.sort(function(b,a){
                return parseInt(b.vote_average)  - parseInt(a.vote_average);
            });
            results.forEach((movie) => {
                movie.poster_src = "https://image.tmdb.org/t/p/w185"+ movie.poster_path;
                const movieRow = <MovieRow key ={movie.id} movie={movie}/>;
                movieRows.push(movieRow);
            });
            this.setState({rows: movieRows});
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
                  <span>
                      <h2 id="an1">Movie</h2>
                      <h2 id="an2">DB</h2>
                  </span>

              </td>
            </tr>
          </tbody>
        </table>
          <input type="text" onChange={this.searchChangeHandler.bind(this)} placeholder="Sök film"/>
          <div className="wrapper">
              <div onClick={this.onClick.bind(this)} className="fa-icon">
                  <FaArrowDown/>
              </div>
              <div onClick={this.onClickUp.bind(this)} className="fa-icon">
                  <FaArrowUp/>
              </div>
          </div>
          {this.state.rows}


      </div>
    );
  }
}

export default App;
