import React, { useEffect } from "react";
import $ from "jquery";
import { connect } from "react-redux";

function ModalPopup(props) {
  useEffect(() => {
    //stop video when close modal
    $("#movieTrailer").on("hidden.bs.modal", function (e) {
      $("#movieTrailer iframe").attr(
        "src",
        $("#movieTrailer iframe").attr("src")
      );
    });
  }, []);

  const renderSrc = () => {
    //props movie duoc truyen vao o trang detail
    const { loading, detailMovie, movie } = props;
    if (loading) return "";
    return detailMovie?.trailer || movie?.trailer;
  };

  return (
    <div
      className="modal fade movieModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      id="movieTrailer"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ background: "#000" }}>
          <div className="modal-body">
            <iframe
              title="trailer"
              width="100%"
              height="85%"
              src={renderSrc()}
              // src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
              autoPlay
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
// $("#comingSoonTrailer").on('hidden.bs.modal', function (e) {
//           $("#comingSoonTrailer iframe").attr("src", $("#comingSoonTrailer iframe").attr("src"));
//       });
const mapStateToProps = (state) => {
  return {
    detailMovie: state.listMovieReducer.detailMovie,
    loading: state.listMovieReducer.loading,
    // state.detailMovieReducer.detailMovie
  };
};

export default connect(mapStateToProps, null)(ModalPopup);
