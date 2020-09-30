import React, { useMemo } from "react";
import { useTogglePost } from "./newsContext";

// import { useToggleContext } from "../../Hook/useToggleShow";

function BtnViewMore() {
  const { oriPosts, indexShow, showMore, showLess } = useTogglePost();

  const renderBtn = useMemo(() => {
    if (indexShow === 0) {
      return (
        <button className="btnViewMore" onClick={() => showMore()}>
          XEM THÊM
        </button>
      );
    }
    if (indexShow === oriPosts.length - 1) {
      return (
        <button className="btnViewMore" onClick={() => showLess()}>
          THU GỌN
        </button>
      );
    }
    if (indexShow > 0) {
      return (
        <>
          <button className="btnViewMore" onClick={() => showMore()}>
            XEM THÊM
          </button>
          <button className="btnViewMore" onClick={() => showLess()}>
            THU GỌN
          </button>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexShow]);

  return <div className="button__container">{renderBtn}</div>;
}

export default BtnViewMore;
