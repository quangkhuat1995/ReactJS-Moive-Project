import React from "react";
import withMainTitleDetail from "./HOC/withMainTitleDetail";

function MainTitleMobile(props) {
  //props renderAge nhan tu HOC withMovieDetailStyle, props detailMovie nhan tu component cha truyen vao (index cua page detail)
  // console.log(props);

  return (
    <h6 className="title">
      {props.detailMovie.tenPhim} - ({props.renderAge[1]})
    </h6>
  );
}
export default withMainTitleDetail(MainTitleMobile);
