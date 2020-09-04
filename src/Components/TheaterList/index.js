import React, { useEffect } from "react";
import NavTabLogo from "./NavTabLogo";
import TabContentTheater from "./TabContentTheater";
import TabContentMovies from "./TabContentMovies";
import Loading from "./../Loading";
import {
  actFetchListHeThongRap,
  actFetchThongTinLichChieu,
} from "./modules/action";
import { connect } from "react-redux";

const setTimeClick = () => {
  //xoa het class acctive cua link
  document
    .querySelectorAll(".theater__details .tab-pane .nav__wrapper")
    .forEach((link) => {
      link.classList.remove("active");
    });
  // async sau click vao link (se tu them class active da xoa vao phan tu dau tien cua pane co class active (do lick vao tam hinh))
  setTimeout(() => {
    document.querySelectorAll(".theater__details .tab-pane").forEach((tab) => {
      if (tab.classList.contains("active")) {
        // console.log(tab.firstElementChild.firstElementChild);

        tab.firstElementChild.firstElementChild.click();
      }
    });
  }, 250);
  console.log("i run");
};

function TheaterList(props) {
  const { fetchListHeThongRap, fetchListHeThongLichChieu } = props;
  useEffect(() => {
    fetchListHeThongRap();
    fetchListHeThongLichChieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // khi bam vao logo thi se tu dong (wait 0.25s) bam vao link dau tien co .active
    const imgs = document.querySelectorAll(".theater__logos .nav__wrapper");

    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        setTimeClick();
      });
    });

    // console.log("did mount");
  });

  if (props.loading) return <Loading />;
  return (
    <section className="theater">
      <div className="myContainer">
        <div className="row">
          {/*  */}
          {/* COT THU 1*/}
          {/*  */}
          {/* NAV THEATER LOGO */}
          {/* <div className='nav nav-tabs theater__logos flex-column'>
     
          </div> */}
          <NavTabLogo />

          {/*  */}
          {/* COT THU 2 */}
          {/*  */}
          {/* NAV THEATER DETAILS */}
          <TabContentTheater />

          {/*  */}
          {/* COT THU 3 */}
          {/*  */}
          {/* MOVIE LIST */}
          <div className="tab-content theater__movies">
            <TabContentMovies />
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.listHeThongRapReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
    fetchListHeThongLichChieu: () => {
      dispatch(actFetchThongTinLichChieu());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TheaterList);
