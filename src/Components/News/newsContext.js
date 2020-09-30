import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { chunkArray } from "../../utils/movies";

const TogglePostContext = createContext();
// const ToggleDispatchContext = createContext();

export function TogglePostProvider(props) {
  const { initialPosts, indexShow: initialIndexShow, children } = props;

  const oriPosts = useMemo(() => chunkArray([...initialPosts].reverse(), 8), [
    initialPosts,
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
  initialPosts: PropTypes.array,
};
TogglePostProvider.defaultProps = {
  indexShow: 0,
  initialPosts: [],
};
