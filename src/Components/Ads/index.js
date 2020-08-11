import React from "react";

export default function Ads() {
  return (
    <section className="ads" id="ungdung">
      <div className="myContainer">
        <div className="row">
          <div className="col-12 col-lg-6 ads__item">
            <p className="ads__title">Ứng dụng tiện lợi dành cho</p>
            <p className="ads__title">người yêu điện ảnh</p>
            <br />
            <p className="ads__subtitle">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <br />
            <button className="btnDownload">App miễn phí - Tải về ngay!</button>
            <p className="text__underbutton">
              TIX có hai phiên bản <a href="#!">iOS</a> &amp;
              <a href="#!">Android</a>
            </p>
          </div>
          <div className="col-12 col-lg-6 ads__item">
            <img src="./images/mobile.png" alt />
          </div>
        </div>
      </div>
    </section>
  );
}
