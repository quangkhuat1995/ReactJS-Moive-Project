import { useEffect } from "react";

function useTitle(title, admin = null) {
  useEffect(() => {
    if (admin === "admin") {
      document.title = `Dashboard | ${title}`;
    } else {
      document.title = `Tix | ${title}`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
}

export default useTitle;
