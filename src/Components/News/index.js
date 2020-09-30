import React from "react";
import newsApi from "../../api/newsApi";
import useFetchData from "../../Hook/useFetchData";
// import ToggleShowContext from "../../Hook/useToggleShow";

import NavigationTab from "../NavigationTab";
import BtnViewMore from "./BtnViewMore";
import { TogglePostProvider } from "./newsContext";
import NewsGroup from "./NewsGroup";

const items = {
  news: "Điện ảnh 24h",
  review: "Review",
  km: "Khuyến mãi",
};

function News() {
  // const reviews = useFetchData(newsApi.getReviewPost);
  // const [news, reviews] = Promise.all([newscall(), reviewscall()]);
  const news = useFetchData(newsApi.getNewsPost, "posts");
  const reviews = useFetchData(newsApi.getReviewPost, "posts");
  // console.log("news", news);
  // console.log("review", reviews);

  return (
    <section className="newsblock" id="tintuc">
      <div className="myContainer">
        <NavigationTab items={items} />

        <div className="tab-content newsblock__content">
          {/* NEWS PANEL */}
          <div
            className="newsblock__panel tab-pane fade show active"
            id="news"
            role="tabpanel"
            aria-labelledby="news-tab"
          >
            {news.loading && <div>Loading data...</div>}
            {news.error && <div>Có lỗi trong khi lấy, xin thử lại sau</div>}
            {news.posts && news.posts.length > 0 && (
              <TogglePostProvider initialPosts={news.posts}>
                <NewsGroup />
                {/* Button read more NEWS */}

                <BtnViewMore />
              </TogglePostProvider>
            )}
          </div>
          {/* REVIEW PANEL */}
          <div
            className="newsblock__panel tab-pane fade"
            id="review"
            role="tabpanel"
            aria-labelledby="review-tab"
          >
            {reviews.loading && <div>Loading data...</div>}
            {reviews.error && <div>Có lỗi trong khi lấy, xin thử lại sau</div>}
            {reviews.posts && reviews.posts.length > 0 && (
              <TogglePostProvider initialPosts={reviews.posts}>
                <NewsGroup />

                <BtnViewMore />
              </TogglePostProvider>
            )}
          </div>
          {/* KHUYEN MAI PANEL */}
          <div
            className="newsblock__panel tab-pane fade"
            id="km"
            role="tabpanel"
            aria-labelledby="km-tab"
          >
            {/* km item 1 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km1.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">CGV VÉ CHỈ 79.000Đ CẢ TUẦN!</a>
                </h3>
                <p className="item__info--detail">
                  Tận hưởng Ưu Đãi lên đến 3 VÉ CGV mỗi tuần chỉ với GIÁ
                  79.000Đ/VÉ khi trên TĨ và thanh toán bằng ZaloPay.
                </p>
              </div>
              <div className="item__interact">
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/like.png" alt="tin tuc" />
                    <span className="like__num">0</span>
                  </a>
                </div>
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/comment.png" alt="tin tuc" />
                    <span className="comment__num">0</span>
                  </a>
                </div>
              </div>
            </div>
            {/* km item 2 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km2.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">BHD STẢ VÉ CHỈ 59.000Đ CẢ TUẦN!</a>
                </h3>
                <p className="item__info--detail">
                  Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá
                  59k/vé khi mua vé trên TIX và thanh toán bằng ZaloPay.
                </p>
              </div>
              <div className="item__interact">
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/like.png" alt="tin tuc" />
                    <span className="like__num">0</span>
                  </a>
                </div>
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/comment.png" alt="tin tuc" />
                    <span className="comment__num">0</span>
                  </a>
                </div>
              </div>
            </div>
            {/* km item 3 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km3.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Beta Cineplex trở lại với hàng loạt ưu đãi lớn
                  </a>
                </h3>
                <p className="item__info--detail">
                  Từ thứ 7 tuần này (9/5), toàn bộ các rạp Beta Cinemas trên
                  toàn quốc sẽ mở cửa trở lại. Mừng ngày trở lại, hàng loạt
                  khuyến mại KHỦNG đổ bộ cùng lúc dàng cho các tín đồ của TIX
                  đây.
                </p>
              </div>
              <div className="item__interact">
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/like.png" alt="tin tuc" />
                    <span className="like__num">0</span>
                  </a>
                </div>
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/comment.png" alt="tin tuc" />
                    <span className="comment__num">0</span>
                  </a>
                </div>
              </div>
            </div>
            {/* km item 4 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km4.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">CỰC NÓNG!!! GIẢM 50% KHI MUA 2 VÉ</a>
                </h3>
                <p className="item__info--detail">
                  ZaloPay mang đến ưu đãi khủng cho lần đầu thanh toán. Mở TIX
                  đặt vé ngay thôi!
                </p>
              </div>
              <div className="item__interact">
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/like.png" alt="tin tuc" />
                    <span className="like__num">0</span>
                  </a>
                </div>
                <div className="item__interact--detail">
                  <a href="#!">
                    <img src="/images/comment.png" alt="tin tuc" />
                    <span className="comment__num">0</span>
                  </a>
                </div>
              </div>
            </div>
            {/* km item 5 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km5.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [123Phim] Thứ 6 Không Đen Tối - Ưu đãi huỷ diệt 11k/vé Anh
                    Trai Yêu Quái
                  </a>
                </h3>
              </div>
            </div>
            {/* km item 6 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km6.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [123Phim] NHẬP MÃ 'PSM30K' - Giảm ngay 30k khi đặt vé Pháp
                    Sư Mù: Ai Chết Giơ Tay
                  </a>
                </h3>
              </div>
            </div>
            {/* km item 7 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km7.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">[Mega GS] Một đoá hoa thay ngàn lời yêu</a>
                </h3>
              </div>
            </div>
            {/* km item 8 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/km8.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [123Phim] NHẬP MÃ 'BKT' - Giảm ngay 20k khi đặt vé Bắc Kim
                    Thang
                  </a>
                </h3>
              </div>
            </div>
            {/* Button read more KHUYEN MAI */}
            <div className="button__container">
              <button className="btnViewMore">XEM THÊM</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default News;
