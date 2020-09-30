import React, { Fragment } from "react";
import { useTogglePost } from "./newsContext";
// import { useToggleContext } from "../../Hook/useToggleShow";
import NewsItem from "./NewsItem";
function NewsGroup() {
  // const context = useContext(Context);
  const { indexShow, oriPosts } = useTogglePost();

  return oriPosts.map((posts, idx) => (
    <Fragment key={idx}>
      {idx <= indexShow
        ? posts.map((post, index) => (
            <NewsItem
              key={post.id}
              index={8 * idx + index}
              post={post}
              indexShow={idx}
            />
          ))
        : null}
    </Fragment>
  ));
}

export default NewsGroup;
