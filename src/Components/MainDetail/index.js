import React, { memo } from "react";
import WithDetailMovieStyle from "../../HOC/withDetailMovieStyle";

function MainDetail(props) {
  const { movie, renderDate } = props;
  return (
    <main className="movie-main">
      <div className="myContainer row">
        <div className="col-12 col-md-6">
          {/* ngày công chiếu */}
          <div className="rowInfo">
            <div className="titleInfo">Ngày công chiếu</div>
            <div className="contentInfo">{renderDate(0)}</div>
          </div>
          {/*đạo diễn  */}
          <div className="rowInfo">
            <div className="titleInfo">Đạo diễn</div>
            <div className="contentInfo">Quo vero architecto</div>
          </div>
          {/* Diễn viên */}
          <div className="rowInfo">
            <div className="titleInfo">Diễn viên</div>
            <div className="contentInfo">Lorem range, Ipsum dolor</div>
          </div>
          {/* Thể loại */}
          <div className="rowInfo">
            <div className="titleInfo">Thể loại</div>
            <div className="contentInfo">Dramma, Vietsub</div>
          </div>
          {/* Định dạng */}
          <div className="rowInfo">
            <div className="titleInfo">Định dạng</div>
            <div className="contentInfo">2D/Digital</div>
          </div>
          {/* Quốc gia */}
          <div className="rowInfo">
            <div className="titleInfo">Ngôn Ngữ</div>
            <div className="contentInfo">Tiếng Việt</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="rowInfo">
            <div className="titleInfo">Nội dung</div>
          </div>
          <div className="rowInfo">
            <p className="description contentInfo">{movie.moTa}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default memo(WithDetailMovieStyle(MainDetail, "movie"));
