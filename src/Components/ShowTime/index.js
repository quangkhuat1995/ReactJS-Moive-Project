import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { connect } from "react-redux";
import NavigationTab from "../NavigationTab";
import TabShowOrComing from "./TabShowOrComing";

const chunkArray = (myArray, chunk_size) => {
  let results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
  // var result = chunkArray([1,2,3,4,5,6,7,8], 3);
  //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
};
const items = {
  showing: "Đang chiếu",
  coming: "Sắp chiếu",
};
function ShowTime(props) {
  const { listMovie } = props;
  let myList = [...listMovie];
  // const items = useMemo(() => items, [])
  const movieArray = chunkArray(myList, 24); // [ [24 items] , [20 items] ]
  // console.log(movieArray);
  console.log(props);
  // console.log(targetRef);
  return (
    <section className="showtime" id="lichchieu">
      <div className="myContainer">
        <NavigationTab items={items} />
        <div className="tab-content showtime__content">
          {/* Showing / Đang Chiếu */}
          <div
            className="showtime__panel tab-pane fade show active"
            id="showing"
            role="tabpanel"
            aria-labelledby="showing-tab"
          >
            <TabShowOrComing movies={movieArray[0]} />
          </div>
          {/* Coming / Sắp Chiếu */}
          <div
            className="showtime__panel tab-pane fade"
            id="coming"
            role="tabpanel"
            aria-labelledby="coming-tab"
          >
            <TabShowOrComing movies={movieArray[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

ShowTime.propTypes = {
  listMovie: PropTypes.array.isRequired,
};
ShowTime.defaultProps = {
  listMovie: [],
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
  };
};

export default connect(mapStateToProps, null)(ShowTime);
