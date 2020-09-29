import React, { memo } from "react";
import NavigationTab from "../NavigationTab";

const items = {
  news: "Điện ảnh 24h",
  review: "Review",
  km: "Khuyến mãi",
};
function News() {
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
            {/* News item 1 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new1.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Xem Căn Phòng Đẫm Máu trước khi quyết định đi chơi hè tại
                    vùng quê hẻo lánh!
                  </a>
                </h3>
                <p className="item__info--detail">
                  Sở hữu nhiều trường đoạn nhát ma gây ám ảnh, bộ phim “Căn
                  Phòng Đẫm Máu” không phải là lựa chọn phù hợp đối với những ai
                  có tiền sử tim mạch hay huyết áp cao.
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
            {/* News item 2 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new2.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Rờm - Phim thắng giải cao nhất tại LHP quốc tế Busan ấn định
                    ngày ra rạp tại Việt Nam
                  </a>
                </h3>
                <p className="item__info--detail">
                  Sau khi chính thức được cấp giấy phép phát hành, bộ phim Ròm
                  của đạo diễn Trần Thanh Huy thông báo ngày khởi chiếu tại Việt
                  Nam vào cuối tháng 7 tới đây.
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
            {/* News item 3 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new3.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Quang Tuấn thường "tự kỷ" trên phim trường để tập trung diễn
                    vai tội phạm
                  </a>
                </h3>
                <p className="item__info--detail">
                  Lần thứ 2 vào vai phản diện trên màn ảnh, Quang Tuấn mang đến
                  một hình ảnh hoàn toàn khác với nhân vật tên tội phạm biến
                  thái có vỏ bọc tri thức.
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
            {/* News item 4 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new4.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Phim cho cả gia định vui vẻ nhân dịp lễ Quốc Tế Thiếu Nhi
                    1/6
                  </a>
                </h3>
                <p className="item__info--detail">
                  Phim chiếu rạp dịp Quốc tế Thiếu nhi của năm 2020 có phần kém
                  sôi động hơn những năm trước nhưng không vì vậy mà khán giả
                  nhỏ tuổi bị “ngó lơ”. Cùng điểm qua hai tựa phim hoạt hình đầy
                  màu sắc phiêu lưu, đáng yêu và cực kỳ ý nghĩa này nghĩa của
                  mùa Tết thiếu nhi trong cuối tuần này nào!.
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
            {/* News item 5 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new5.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">Antebellum ấn định ngày khởi chiếu chính thức</a>
                </h3>
              </div>
            </div>
            {/* News item 6 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new6.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">David Fincher bậc thầy sử dụng Visual Effects</a>
                </h3>
              </div>
            </div>
            {/* News item 7 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new7.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Thiên Linh Cái: Chuyện Chưa Kể làm tốt hơn phiên bản chiếu
                    rạp Thất Sơn Tâm Linh
                  </a>
                </h3>
              </div>
            </div>
            {/* News item 8 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/new8.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    Baba Yaga và những màn cameo làm khán giả thót tim trên màn
                    ảnh rộng!
                  </a>
                </h3>
              </div>
            </div>
            {/* Button read more NEWS */}
            <div className="button__container">
              <button className="btnViewMore">XEM THÊM</button>
            </div>
          </div>
          {/* REVIEW PANEL */}
          <div
            className="newsblock__panel tab-pane fade"
            id="review"
            role="tabpanel"
            aria-labelledby="review-tab"
          >
            {/* review item 1 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view1.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    ‘BlacKkKlansman’ - cốc nước lạnh để người Mỹ thức tỉnh
                  </a>
                </h3>
                <p className="item__info--detail">
                  Tác phẩm nhận đề cử Phim truyện xuất sắc tại Oscar 2019 của
                  đạo diễn Spike Lee là một lát cắt nữa về nạn phân biệt chủng
                  tộc - nỗi đau gây nhức nhối nước Mỹ cho tới tận hôm nay.
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
            {/* reviews item 2 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view2.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">American Sniper - Chính nghĩa hay phi nghĩa?</a>
                </h3>
                <p className="item__info--detail">
                  American Sniper khắc họa một tay súng bắn tỉa “huyền thoại”
                  của Hải quân Mỹ với 4 lần tham chiến ở Trung Đông. Câu chuyện
                  phim chậm rãi đưa người xem qua từng thời khắc khác nhau của
                  Kyle, từ thửa nhỏ, thiếu niên, rồi gia nhập quân đội, rồi tham
                  chiến. Từng khoảnh khắc bắt đầu nhẹ nhàng...
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
            {/* reviews item 3 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view3.png" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">Review: Spider-Man: Into The Spider-Vesre</a>
                </h3>
                <p className="item__info--detail">
                  Năm 2018 là một năm đầy thành công của nhân vật Người Nhện.
                  Sau thành công của Spider-Man: Homecoming, “nhện nhọ” có màn
                  hành động thuyết phục khán giả trong Avengers: Infinity War.
                  Và rồi chúng ta lại có bộ phim hoạt hình đỉnh cao nhất của
                  nhân vật "nhện nhọ".
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
            {/* reviews item 4 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view4.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    COVID-19 là bản chính thức của MEV-1 phim contagion (2011)
                  </a>
                </h3>
                <p className="item__info--detail">
                  Là một bộ phim chính kịch được ra mắt vào năm 2011, với bộ đôi
                  đạo diễn và biên kịch là Steven Soderbergh và Scott Z. Burns,
                  cùng sự tham gia của dàn sao như Gwyneth Palt="tin tuc"row,
                  Matt Damon, Kate Winslet, Marion Cotillard, Laurence
                  Fishburne, Bryan Cranston và Jude Law.
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
            {/* reviews item 5 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view5.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [Review] Siêu Vệ Sĩ Sợ Vợ - Giải cứu Tổng thống chưa bao giờ
                    lầy lội và hài hước đến thế
                  </a>
                </h3>
              </div>
            </div>
            {/* reviews item 6 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view6.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [Review] Bloodshot - Mở màn ấn tượng cho Vũ trụ Siêu anh
                    hùng Valiant
                  </a>
                </h3>
              </div>
            </div>
            {/* reviews item 7 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view7.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [Review] Nắng 3: Lời Hứa Của Cha - Câu chuyện tình thân cảm
                    động của Khả Như và Kiều Minh Tuấn
                  </a>
                </h3>
              </div>
            </div>
            {/* reviews item 8 */}
            <div className="newsblock__item">
              <div className="item__img">
                <a href="#!">
                  <img src="/images/view8.jpg" alt="tin tuc" />
                </a>
              </div>
              <div className="item__info">
                <h3 className="item__info--title">
                  <a href="#!">
                    [Review] Onward - Khi phép thuật mạnh mẽ nhất chính là tình
                    thân
                  </a>
                </h3>
              </div>
            </div>
            {/* Button read more REVIEW */}
            <div className="button__container">
              <button className="btnViewMore">XEM THÊM</button>
            </div>
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
export default memo(News);
