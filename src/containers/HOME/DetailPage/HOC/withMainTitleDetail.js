import React from "react";

const withMainTitleDetail = (OriginComponent) => {
  return function (props) {
    // const ngayKhoiChieu = this.props.detailMovie.ngayKhoiChieu;

    //props nay dc nhan tu HOC withDetailMovieStyle
    const { renderDate } = props;
    // console.log(this.props.renderDate(5));

    return (
      <div className="row align-items-center main-title-detail">
        <div className="col-9 col-md-12">
          <p>{renderDate(0)}</p>
          {/* <h6 className="title">
                  {detailMovie.tenPhim} - ({this.renderAge()[1]})
                </h6> */}
          {/* <h6 className="title">
                      <span className={this.renderAge()[0]}>
                        {this.renderAge()[1]}
                      </span>{" "}
                      {detailMovie.tenPhim}
                    </h6> */}
          <OriginComponent {...props} />
          <p>2D/Digital</p>
        </div>
        <div className="col-3 col-md-12 text-center text-md-left">
          <a href="#!!!!" className="btnBuyTicket">
            Mua vé
          </a>
        </div>
      </div>
    );
  };
};

export default withMainTitleDetail;
