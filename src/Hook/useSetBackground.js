import { useEffect } from "react";

//change background of <body>
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
