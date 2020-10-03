import React, { Fragment } from "react";

import { useTogglePost } from "../../context/TogglePostContext";
import DiscussItem from "./DiscussItem";

function DiscussGroup() {
  const { indexShow, oriPosts } = useTogglePost();
  return oriPosts.map((comments, idx) => (
    <Fragment key={idx}>
      {idx <= indexShow
        ? comments.map((post, index) => (
            <DiscussItem key={post.id} post={post} />
          ))
        : null}
    </Fragment>
  ));
}

export default DiscussGroup;
