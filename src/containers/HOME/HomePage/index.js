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
import useMedia from "../../../Hook/useMedia";
import useTitle from "../../../Hook/useTitle";

function HomePage(props) {
  const { loadingListMovie, fetchListMovie, listMovie } = props;
  const isDesktop = useMedia("(min-width:992px)");
  useTitle("Trang chủ");
  // // console.log(props);
  useEffect(() => {
    fetchListMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingListMovie) return <Loading />;

  return (
    <>
      <Carousel />
      {isDesktop && <Search />}

      {/* <Search /> */}

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
  loadingListMovie: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
    loadingListMovie: state.listMovieReducer.loading,
    // loadingListTheater: state.listMovieReducer.loading,
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
