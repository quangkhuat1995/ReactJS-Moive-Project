import React, { useMemo } from "react";
import SliderSlick from "./../SliderSlick";
import PanelContainer from "./PanelContainer";

const chunkArray = (myArray = [], chunk_size) => {
  let results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
  // var input = chunkArray([1,2,3,4,5,6,7,8], 3);
  //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
};

function TabShowOrComing(props) {
  const { movies } = props;
  // const [page_1, page_2, page_3] = this.chunkArray(movies, 8);
  // const chunkedArrs =  chunkArray(movies, 8);
  const chunkedArrs = useMemo(() => chunkArray(movies, 8), [movies]);

  return (
    <SliderSlick customSlick={{ dots: false }}>
      {/* many panel containers */}
      {chunkedArrs.map((arr, index) => (
        <PanelContainer key={index} movies={arr} />
      ))}
      {/* {this.renderPanelContainer(page_1)}
        {this.renderPanelContainer(page_3)}
        {this.renderPanelContainer(page_2)} */}
    </SliderSlick>
  );
}

export default TabShowOrComing;
