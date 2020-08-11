import React, { Component } from "react";
// import SingleComingItem from "../../../Components/ShowTime/SingleComingItem";
// import PanelContainer from "../../../Components/ShowTime/PanelContainer";
// import TabShowing from "../../../Components/ShowTime/TabShowing";
import ShowTime from "../../../Components/ShowTime";
import News from "../../../Components/News";
import TheaterList from "../../../Components/TheaterList";
import Footer from "../../../Components/Footer";
import Loading from "./../../../Components/Loading";
import { connect } from "react-redux";
import { actFetchListMoive } from "./modules/action";
import ModalPopup from "../../../Components/ModalPopup";

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchListMovie();
  }
  render() {
    const { listMovie, loading } = this.props;
    if (loading) return <Loading />;
    return (
      <>
        this is HomePage
        <ShowTime listMovie={listMovie} />
        <TheaterList />
        <News />
        <Footer />
        <ModalPopup />
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     detailMovie: state.detailMovieReducer.detailMovie,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDetailMovie: () => {
//       dispatch(actFetchDetailMovie());
//     },
//   };
// };
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
