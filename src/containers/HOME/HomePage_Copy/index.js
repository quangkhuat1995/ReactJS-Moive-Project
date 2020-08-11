import React, { Component } from "react";
// import SingleComingItem from "../../../Components/ShowTime/SingleComingItem";
// import PanelContainer from "../../../Components/ShowTime/PanelContainer";
// import TabShowing from "../../../Components/ShowTime/TabShowing";
import ShowTime from "../../../Components/ShowTime";
import News from "../../../Components/News";
import TheaterList from "../../../Components/TheaterList";
import Footer from "../../../Components/Footer";

class HomePage extends Component {
  render() {
    return (
      <>
        this is HomePage
        <ShowTime />
        <TheaterList />
        <News />
        <Footer />
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

export default HomePage;
