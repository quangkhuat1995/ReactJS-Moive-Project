import React, { Component } from "react";
import { Link } from "react-router-dom";
import { callAPI } from "./../../callAPI";
import { requests } from "./../../requests";
import MovieThumbnail from "../MovieThumbnail";
import WithDetailMovieStyle from "./../../HOC/withDetailMovieStyle";
class SingleMovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.movie,
    };
  }

  componentDidMount() {
    //them key thoiLuong: vao cho props nhan dc
    const { movie } = this.props;
    let requestObj = requests(null, null, movie.maPhim);
    callAPI(requestObj.layThongTinPhim, "GET")
      .then((result) => {
        if (result.data.lichChieu && result.data.lichChieu.length > 0) {
          let thoiLuong = result.data.lichChieu[0].thoiLuong;
          if (thoiLuong) {
            this.setState({
              movie: { ...this.state.movie, thoiLuong },
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // renderStar = () => {
  //   const { movie } = this.props;
  //   let danhGia = movie.danhGia;
  //   if (danhGia >= 8) {
  //     return (
  //       <>
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star2.png" alt="star" />
  //       </>
  //     );
  //   } else if (danhGia >= 5) {
  //     return (
  //       <>
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star2.png" alt="star" />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star1.png" alt="star" />
  //         <img src="./images/star2.png" alt="star" />
  //       </>
  //     );
  //   }
  // };

  // renderAge = () => {
  //   const { movie } = this.props;
  //   let danhGia = movie.danhGia;
  //   if (danhGia <= 5) {
  //     return ["showing__age green", "P"];
  //   }
  //   return ["showing__age", "C13"];
  // };

  // stylePoint = (point) => {
  //   return point < 10 ? `${point}.0` : point;
  // };

  render() {
    const { movie } = this.props;
    //props nay duoc nhan tu HOC
    const { stylePoint, renderStar, renderAge, renderDate } = this.props;
    // let day = renderDate(5)
    return (
      <div className="movieThumbnail col-6 col-sm-4 col-md-3">
        <MovieThumbnail movie={movie} renderDate={renderDate(5)} />
        <span className={renderAge[0]}>{renderAge[1]}</span>
        <div className="showing__head">
          <span className={renderAge[0]}>{renderAge[1]}</span> {movie.tenPhim}
          <div className="playBtn__overlay btnContainer">
            <Link to={`/phim/${movie.maPhim}`} className="btnBuyTicket">
              MUA VÉ
            </Link>
          </div>
        </div>
        <p className="showing__length">
          {this.state.movie.thoiLuong ? this.state.movie.thoiLuong : " 100"}{" "}
          phút - TIX {stylePoint(movie.danhGia)}
        </p>
        <div className="showing__point">
          <span>{stylePoint(movie.danhGia)}</span>
          <div className="star">{renderStar}</div>
        </div>
      </div>
    );
  }
}

export default WithDetailMovieStyle(SingleMovieItem, "movie");
