import React from "react";
import SingleMovieItem from "./SingleMovieItem";

export default function PanelContainer(props) {
  const renderSingleMovie = () => {
    const { movies } = props;
    return movies.map((movie) => {
      return <SingleMovieItem key={movie.maPhim} movie={movie} />;
    });
  };

  return <div className="panel__container">{renderSingleMovie()}</div>;
}
