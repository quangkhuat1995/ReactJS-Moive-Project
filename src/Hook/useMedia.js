import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useMedia(mediaQuery) {
  let [isMatched, setIsMatched] = useState(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    let media = window.matchMedia(mediaQuery);

    if (media.matches !== isMatched) {
      setIsMatched(media.matches);
    }

    let listener = () => setIsMatched(media.matches);

    media.addListener(listener);
    //clean up
    return () => {
      media.removeListener(listener);
    };
  }, [mediaQuery]);

  return isMatched;
}
// let small = useMedia("(max-width:400px)")
// let large = useMedia("(min-width:800px)")
useMedia.propTypes = {
  mediaQuery: PropTypes.string.isRequired,
};

export default useMedia;
