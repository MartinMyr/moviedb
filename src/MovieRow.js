import React from 'react'

class MovieRow extends React.Component{
    render(){
        return <table className="table" key={this.props.movie.id}>
            <tbody>
            <tr>
                <td width="150">
                    <img width="150" alt="poster" src={this.props.movie.poster_src}/>
                </td>
                <td className="center">
                    <h2>{this.props.movie.title}</h2>
                    <p className="movie-desc">{this.props.movie.overview}</p>
                </td>
            </tr>
            </tbody>
        </table>
    }
}

export default MovieRow