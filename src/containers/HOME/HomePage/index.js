import React, { useEffect } from "react";
import { connect } from "react-redux";
import ModalPopup from "../../../Components/ModalPopup";
import News from "../../../Components/News";
import Search from "../../../Components/Search";
import SeperateSection from "../../../Components/SeperateSection";
import ShowTime from "../../../Components/ShowTime";
import TheaterList from "../../../Components/TheaterList";
// import Footer from "../../../Components/Footer";
import Loading from "./../../../Components/Loading";
import { actFetchListMoive } from "./modules/action";
import Carousel from "../../../Components/Carousel";
import PropTypes from "prop-types";
import Ads from "../../../Components/Ads";

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
      <Carousel />
      <Search />
      <ShowTime listMovie={listMovie} />

      <SeperateSection />
      <TheaterList />

      <SeperateSection />
      <News />

      <SeperateSection />
      <Ads />

      <ModalPopup />
    </>
  );
}
HomePage.propTypes = {
  listMovie: PropTypes.array,
  loading: PropTypes.bool,
};
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
