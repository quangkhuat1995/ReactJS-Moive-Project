import React, { Component } from "react";
// import { requests } from "./../../requests";
// import { callAPI } from "../../callAPI";
import SingleMovieItem from "./SingleMovieItem";

export default class PanelContainer extends Component {
  renderSingleMovie = () => {
    const { movies } = this.props;
    return movies.map((movie) => {
      return <SingleMovieItem key={movie.maPhim} movie={movie} />;
    });
  };
  render() {
    return <div className="panel__container">{this.renderSingleMovie()}</div>;
  }
}
