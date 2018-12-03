import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
      /*const movies = [
          {
            id:0,
            poster_path:"",
            title:"Avengers: Infinity war",
            overview:"hellooooo",
          },
          {
              id:1,
              poster_path:"",
              title:"Avengers: Infinity love",
              overview:"byeeeee",
          }];

     const movieRows =[];
      movies.forEach((movie)=>{
         const movieRow = <MovieRow movie={movie}/>

        movieRows.push(movieRow);
      });

      this.state = {rows: movieRows}
      */

      this.performSearch()
  }
      performSearch() {
        const urlString ="https://api.themoviedb.org/3/search/movie?query=marvel&api_key=e7e24a5efae7dd5aecf08d05791f3312";
        $.ajax({
            url:urlString,
            success: (searchResults) => {
                console.log("Fetched data successfully")
          },
            error:(xhr, status, err) => {
                console.log("Failed to fetch data")
            }
        })
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
          {this.state.rows}
        <input type="text" placeholder="enter search term"/>

      </div>
    );
  }
}

export default App;
