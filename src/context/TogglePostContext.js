import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { chunkArray } from "../utils/movies";

const TogglePostContext = createContext();
// const ToggleDispatchContext = createContext();

export function TogglePostProvider(props) {
  const {
    postSize,
    initialPosts,
    indexShow: initialIndexShow,
    children,
  } = props;

  const [posts, setposts] = useState(initialPosts);
  useEffect(() => {
    setposts(initialPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosts.length]);

  const oriPosts = useMemo(() => chunkArray([...posts].reverse(), postSize), [
    posts,
    postSize,
  ]);
  // return [[ ],[ ],...]

  //Lấy phần tử đầu tiên
  const [indexShow, setIndexShow] = useState(initialIndexShow);

  // console.log("indexShow", indexShow);

  const showMore = useCallback(() => {
    //bé hơn length của array mới showmore được
    if (indexShow < oriPosts.length - 1) {
      setIndexShow((idx) => idx + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexShow]);

  const showLess = useCallback(() => {
    // lớn hơn index 0 mới less dc

    if (indexShow > 0) {
      setIndexShow((idx) => idx - 1);
    }
  }, [indexShow]);

  const contextValue = {
    oriPosts,
    indexShow,
    showMore,
    showLess,
  };

  return (
    <TogglePostContext.Provider value={contextValue}>
      {/* <ToggleDispatchContext> */}

      {children}
      {/* </ToggleDispatchContext> */}
    </TogglePostContext.Provider>
  );
}

export function useTogglePost() {
  const context = useContext(TogglePostContext);
  if (context === undefined) {
    throw new Error("useItemState must be used within a CountProvider");
  }
  return context;
}

// function useToggleDispatch() {
//   const context = useContext(ToggleDispatchContext);
//   if (context === undefined) {
//     throw new Error("useItemDispatch must be used within a CountProvider");
//   }
//   return context;
// }

TogglePostProvider.propTypes = {
  initialIndexShow: PropTypes.number,
  postSize: PropTypes.number,
  initialPosts: PropTypes.array,
};
TogglePostProvider.defaultProps = {
  indexShow: 0,
  postSize: 8,
  initialPosts: [],
};
