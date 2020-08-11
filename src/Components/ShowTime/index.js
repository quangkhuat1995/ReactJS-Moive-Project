import React, { Component } from "react";
// import { requests } from "./../../requests";
// import { callAPI } from "../../callAPI";

import TabShowOrComing from "./TabShowOrComing";

class ShowTime extends Component {
  chunkArray = (myArray, chunk_size) => {
    let results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
    // var result = chunkArray([1,2,3,4,5,6,7,8], 3);
    //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
  };

  render() {
    const { listMovie } = this.props;
    let myList = [...listMovie];

    const movieArray = this.chunkArray(myList, 24); // [ [24 items] , [20 items] ]
    // console.log(movieArray);

    return (
      <section className="showtime" id="lichchieu">
        <div className="myContainer">
          <ul className="nav nav-tabs navigation__tab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="showing-tab"
                data-toggle="tab"
                href="#showing"
                role="tab"
                aria-controls="showing"
                aria-selected="true"
              >
                Đang chiếu
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="coming-tab"
                data-toggle="tab"
                href="#coming"
                role="tab"
                aria-controls="coming"
                aria-selected="false"
              >
                Sắp chiếu
              </a>
            </li>
          </ul>
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
}

export default ShowTime;
