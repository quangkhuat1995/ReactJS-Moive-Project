import React, { Component } from "react";
import NavTabLogo from "./NavTabLogo";
// import { requests } from "./../../requests";
// import { callAPI } from "../../callAPI";
import TabContentTheater from "./TabContentTheater";
import TabContentMovies from "./TabContentMovies";
import { actFetchListHeThongRap } from "./modules/action";
import { connect } from "react-redux";

class TheaterList extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     heThongRap: [],
  //   };
  // }
  componentDidMount() {
    // callAPI(requests().layThongTinHeThongRap, "GET")
    //   .then((result) => {
    //     // console.log(result.data);
    //     this.setState({
    //       heThongRap: result.data,
    //     });
    //   })
    //   .catch((err) => console.log(err));

    this.props.fetchListHeThongRap();
  }
  render() {
    const { listHeThongRap } = this.props;
    return (
      <section className="theater">
        <div className="myContainer">
          <div className="row">
            {/*  */}
            {/* COT THU 1*/}
            {/*  */}
            {/* NAV THEATER LOGO */}
            <NavTabLogo listHeThongRap={listHeThongRap} />

            {/*  */}
            {/* COT THU 2 */}
            {/*  */}
            {/* NAV THEATER DETAILS */}
            <TabContentTheater listHeThongRap={listHeThongRap} />

            {/*  */}
            {/* COT THU 3 */}
            {/*  */}
            {/* MOVIE LIST */}
            <TabContentMovies listHeThongRap={listHeThongRap} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TheaterList);
