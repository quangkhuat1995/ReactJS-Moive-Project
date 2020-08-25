import React, { useEffect } from "react";
import ShowTime from "../../../Components/ShowTime";
import News from "../../../Components/News";
import TheaterList from "../../../Components/TheaterList";
// import Footer from "../../../Components/Footer";
import Loading from "./../../../Components/Loading";
import { connect } from "react-redux";
import { actFetchListMoive } from "./modules/action";
import ModalPopup from "../../../Components/ModalPopup";
import Search from "../../../Components/Search";

function HomePage(props) {
  const { fetchListMovie, listMovie, loading } = props;
  // console.log(props);
  useEffect(() => {
    fetchListMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      this is HomePage
      <Search />
      <ShowTime listMovie={listMovie} />
      <TheaterList />
      <News />
      <ModalPopup />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
    loading: state.listMovieReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actFetchListMoive());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
