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
import {
  actFetchListHeThongRap,
  actFetchThongTinLichChieu,
} from "../../../Components/TheaterList/modules/action";
// import useFetchData from "../../../Hook/useFetchData";
// import newsApi from "../../../api/newsApi";

function HomePage(props) {
  useTitle("Trang chủ");
  const isDesktop = useMedia("(min-width:992px)");
  // const news= useFetchData(newsApi.getNewsPost,'news')
  // const reviews = useFetchData(newsApi.getReviewPost,'post') ;

  const {
    loadingTheater,
    loadingListMovie,

    fetchListMovie,
    fetchListHeThongRap,
    fetchListHeThongLichChieu,
  } = props;

  useEffect(() => {
    fetchListMovie();
    fetchListHeThongRap();
    fetchListHeThongLichChieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingTheater || loadingListMovie) return <Loading />;

  return (
    <>
      <Carousel />
      {isDesktop && <Search />}

      {/* <Search /> */}

      <ShowTime />

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
    loadingListMovie: state.listMovieReducer.loading,
    loadingTheater: state.listHeThongRapReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actFetchListMoive());
    },
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
    fetchListHeThongLichChieu: () => {
      dispatch(actFetchThongTinLichChieu());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
