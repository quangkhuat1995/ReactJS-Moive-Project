import React from "react";
import PropTypes from "prop-types";
const isBigNews = (indexShow, index) => {
  // 1 2 3 4, 9 10 11 12,.. là big; 5 6 7 8, 13 14 15 16 là small
  // const smallIdx = [
  //   8 * indexShow + 1,
  //   8 * indexShow + 2,
  //   8 * indexShow + 3,
  //   8 * indexShow + 4,
  // ];
  const bigIdx = [
    8 * indexShow + 5,
    8 * indexShow + 6,
    8 * indexShow + 7,
    8 * indexShow + 8,
  ];

  //index từ 0 nên phải +1
  const isBigIdx = bigIdx.some((idx) => idx === index + 1);
  // console.log(isBigIdx);

  if (!isBigIdx) {
    return true;
  } else {
    return false;
  }
};

function NewsItem(props) {
  const { post, index, indexShow } = props; //index từ 0 nên phải +1
  const { hinhAnh, link, tieuDe, noiDung, like, comment } = post;

  return (
    <div className="newsblock__item">
      <div className="item__img">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={hinhAnh}
            alt="tin tuc"
            style={
              !isBigNews(indexShow, index)
                ? {
                    height: 50,
                    objectFit: "cover",
                  }
                : {}
            }
          />
        </a>
      </div>
      <div className="item__info">
        <h3 className="item__info--title">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {tieuDe}
          </a>
        </h3>
        {isBigNews(indexShow, index) && (
          <p className="item__info--detail">{noiDung}</p>
        )}
      </div>
      {isBigNews(indexShow, index) && (
        <div className="item__interact">
          <div className="item__interact--detail">
            <a href={"#!"}>
              <img src="/images/like.png" alt="like" />
              <span className="like__num">{like}</span>
            </a>
          </div>
          <div className="item__interact--detail">
            <a href={"#!"}>
              <img src="/images/comment.png" alt="comment" />
              <span className="comment__num">{comment}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

NewsItem.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  indexShow: PropTypes.number.isRequired,
};

NewsItem.defaultProps = {
  post: {},
  index: 0,
  indexShow: 0,
};

export default NewsItem;
