import React, { memo } from "react";
import listAdvertiseImages from "./../../constants/advertiseData";
import SliderSlick from "./../SliderSlick";
const customSlick = {
  speed: 500,
  dots: false,
  arrows: false,
};
function Ads() {
  return (
    <section className="ads" id="ungdung">
      <div className="myContainer">
        <div className="row">
          <div className="col-12 col-lg-6 text-center text-lg-left ">
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
          <div className="col-12 col-lg-6 ">
            <img
              className="ads__mobile-img"
              src="/images/mobile.png"
              alt="tix-app"
            />
            <div className="slider-wrapper">
              {
                <SliderSlick customSlick={customSlick}>
                  {listAdvertiseImages.map((img, index) => (
                    <div key={index}>
                      <img className="img-fluid" src={img} alt="app-tix" />
                    </div>
                  ))}
                </SliderSlick>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(Ads);
