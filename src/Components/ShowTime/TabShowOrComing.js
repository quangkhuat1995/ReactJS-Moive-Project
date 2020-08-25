import React from "react";

import PanelContainer from "./PanelContainer";
import Slider from "../SliderSlick";

function TabShowOrComing(props) {
  const chunkArray = (myArray = [], chunk_size) => {
    let results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
    // var result = chunkArray([1,2,3,4,5,6,7,8], 3);
    //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
  };

  // renderPanelContainer = (arr) => {
  //   if (arr && arr.length > 0) {
  //     return <PanelContainer key={arr[]} movies={arr} />;
  //   }
  // };

  const { movies } = props;
  // const [page_1, page_2, page_3] = this.chunkArray(movies, 8);
  const chunkedArrs = chunkArray(movies, 8);

  return (
    <Slider>
      {/* many panel containers */}
      {chunkedArrs.map((arr, index) => (
        <PanelContainer key={index} movies={arr} />
      ))}
      {/* {this.renderPanelContainer(page_1)}
        {this.renderPanelContainer(page_3)}
        {this.renderPanelContainer(page_2)} */}
    </Slider>
  );
}

export default TabShowOrComing;
