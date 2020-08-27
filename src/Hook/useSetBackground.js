import { useEffect } from "react";

const useSetBackground = () => {
  useEffect(() => {
    document.body.style.background =
      "url('/images/background.jpg') center center/cover";

    return () => {
      document.body.style.background = "none";
    };
  }, []);
};

export default useSetBackground;
