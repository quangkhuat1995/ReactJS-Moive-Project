import React from "react";
import withMainTitleDetail from "./HOC/withMainTitleDetail";

function MainTitleDesktop(props) {
  //props renderAge nhan tu HOC, props detailMovie nhan tu component cha truyen vao (index cua page detail)
  return (
    <h6 className="title">
      <span className={props.renderAge[0]}>{props.renderAge[1]}</span>{" "}
      {props.detailMovie.tenPhim}
    </h6>
  );
}

export default withMainTitleDetail(MainTitleDesktop);
