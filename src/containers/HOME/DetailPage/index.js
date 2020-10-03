import React, { useEffect } from "react";
import { connect } from "react-redux";
import Carousel from "../../../Components/Carousel";
import CarouselItem from "../../../Components/Carousel/CarouselItem";
import CirclePoint from "../../../Components/CirclePoint";
import DiscussSection from "../../../Components/DiscussSection";
import { actGetReviews } from "../../../Components/DiscussSection/modules/action";
import Loading from "../../../Components/Loading";
import ModalPopup from "../../../Components/ModalPopup";
import MovieInfo from "../../../Components/MovieInfo";
import MovieThumbnail from "../../../Components/MovieThumbnail";
import NavigationTab from "../../../Components/NavigationTab";
// import Portal from "../../../Components/Portal";
import SingleShowTimeDetail from "../../../Components/SingleShowTimeDetail";
import { actFetchListHeThongRap } from "../../../Components/TheaterList/modules/action";
import { MOBILE_MEDIA } from "../../../constants/config";
import WithDetailMovieStyle from "../../../HOC/withDetailMovieStyle";
import useMedia from "../../../Hook/useMedia";
import useTitle from "../../../Hook/useTitle";
import MainTitleDesktop from "./MainTitleDesktop";
import MainTitleMobile from "./MainTitleMobile";
import { actFetchDetailMovie } from "./modules/action";

const MainTitleDesktopStyle = WithDetailMovieStyle(
  MainTitleDesktop,
  "detailMovie"
);

const MainTitleMobileStyle = WithDetailMovieStyle(
  MainTitleMobile,
  "detailMovie"
);

const items = {
  lichChieu: "Lịch chiếu",
  thongTin: "Thông tin",
  danhGia: "Đánh giá",
};

function DetailPage(props) {
  const isMobile = useMedia(MOBILE_MEDIA);
  useTitle("Chi tiết");
  // console.log(props.detailMovie);
  const {
    detailMovie,
    loadingDetailMovie,
    fetchDetailMovie,
    fetchReviewsPost,
    fetchListHeThongRap,
    listHeThongRap,
    loadingReview,
  } = props;

  useEffect(() => {
    const slug = props.match.params.slug; //1132-ted-part-2
    const maPhim = slug.slice(0, slug.indexOf("-"));

    fetchDetailMovie(maPhim);
    fetchReviewsPost();
    //nếu chưa có trên store thì fetch về
    if (!listHeThongRap || listHeThongRap.length === 0) {
      fetchListHeThongRap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingDetailMovie || loadingReview) return <Loading />;
  return (
    <>
      <div style={{ marginTop: 60 }} />
      {/* CAROUSEL/ HERO */}
      <Carousel isHero>
        {/* Hero banner for detailPage */}
        <CarouselItem detailMovie={detailMovie} isHero />

        {/* Movie detail, only showed on desktop */}
        {!isMobile && (
          <div className="hero-detail myContainer">
            <div className="row align-items-center">
              {/* thumbnail & trailer */}
              <div className="movieThumbnail col-3">
                <MovieThumbnail movie={detailMovie} allowNavigate={false} />
              </div>
              {/* main detail title*/}
              <div className="col-6">
                <MainTitleDesktopStyle detailMovie={detailMovie} />
              </div>
              {/* danh gia/ points */}
              <div className="hero__detail--pointgroup col-3 d-flex flex-column align-items-center mx-auto">
                <CirclePoint movie={detailMovie} />
              </div>
            </div>
          </div>
        )}
      </Carousel>

      {/* Title on moblie view */}
      {isMobile && (
        <section className="mobile-main-title myContainer">
          <div className="myContainer">
            <MainTitleMobileStyle detailMovie={detailMovie} />
          </div>
        </section>
      )}

      <section className="main" id="main">
        <div className="myContainer">
          <NavigationTab items={items} />

          <div className="tab-content">
            {/* Lịch chiếu*/}
            <div
              className=" tab-pane fade show active"
              id="lichChieu"
              role="tabpanel"
              aria-labelledby="lichChieu-tab"
            >
              <SingleShowTimeDetail />
            </div>
            {/* Thông tin*/}
            <div
              className=" tab-pane fade"
              id="thongTin"
              role="tabpanel"
              aria-labelledby="thongTin-tab"
            >
              <MovieInfo movie={detailMovie} />
            </div>
            {/* Đánh giá */}
            <div
              className=" tab-pane fade"
              id="danhGia"
              role="tabpanel"
              aria-labelledby="danhGia-tab"
            >
              <DiscussSection />
            </div>
          </div>
        </div>
      </section>

      <ModalPopup />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    detailMovie: state.detailMovieReducer.detailMovie,
    loadingDetailMovie: state.detailMovieReducer.loading,
    loadingReview: state.reviewsReducer.loading,
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //lay id de goi API hien thong tin chi tiet cua phim
    fetchDetailMovie: (maPhim) => {
      dispatch(actFetchDetailMovie(maPhim));
    },
    //lay danh sach heThongRap (maHeThongRap,logo,...)
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
    //lay danh sach reviews
    fetchReviewsPost: () => {
      dispatch(actGetReviews());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
