import React from "react";
import PropTypes from "prop-types";

function Interact(props) {
  const { like, comment, hasLabel } = props;
  return (
    <div className="interact__wrapper">
      <div className="interact__item">
        <span>
          <img src="/images/like.png" alt="like" />
          <span className="like__num">{like}</span>
          {hasLabel && <span className="like__num">Thích</span>}
        </span>
      </div>
      {comment && (
        <div className="interact__item">
          <span>
            <img src="/images/comment.png" alt="comment" />
            <span className="comment__num">{comment}</span>
          </span>
        </div>
      )}
    </div>
  );
}

Interact.propTypes = {
  like: PropTypes.number,
  hasLabel: PropTypes.bool,
  comment: PropTypes.number,
};
Interact.defaultProps = {
  hasLabel: false,
};

export default Interact;
