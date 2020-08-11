import React, { Component } from "react";
import { Link } from "react-router-dom";
import { callAPI } from "./../../callAPI";
import { requests } from "./../../requests";
import MovieThumbnail from "../MovieThumbnail";
export default class SingleMovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.movie,
    };
  }

  componentDidMount() {
    //then key thoiLuong: vao cho props nhan dc
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

  renderStar = () => {
    const { movie } = this.props;
    let danhGia = movie.danhGia;
    if (danhGia >= 8) {
      return (
        <>
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star2.png" alt="star" />
        </>
      );
    } else if (danhGia >= 5) {
      return (
        <>
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star2.png" alt="star" />
        </>
      );
    } else {
      return (
        <>
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star1.png" alt="star" />
          <img src="./images/star2.png" alt="star" />
        </>
      );
    }
  };

  renderAge = () => {
    const { movie } = this.props;
    let danhGia = movie.danhGia;
    if (danhGia <= 5) {
      return ["showing__age green", "P"];
    }
    return ["showing__age", "C13"];
  };

  stylePoint = (point) => {
    return point < 10 ? `${point}.0` : point;
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="movieThumbnail col-6 col-sm-4 col-md-3">
        <MovieThumbnail movie={movie} />
        <span className={this.renderAge()[0]}>{this.renderAge()[1]}</span>
        <div className="showing__head">
          <span className={this.renderAge()[0]}>{this.renderAge()[1]}</span>{" "}
          {movie.tenPhim}
          <div className="playBtn__overlay btnContainer">
            <Link
              to={`/phim/${movie.maPhim}`}
              href="#!!!!"
              className="btnBuyTicket"
            >
              MUA VÉ
            </Link>
          </div>
        </div>
        <p className="showing__length">
          {this.state.movie.thoiLuong ? this.state.movie.thoiLuong : " 100"}{" "}
          phút
        </p>
        <div className="showing__point">
          <span>{this.stylePoint(movie.danhGia)}</span>
          <div className="star">{this.renderStar()}</div>
        </div>
      </div>
    );
  }
}
