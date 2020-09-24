import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { useSelector } from "react-redux";

function ModalPopup() {
  const detailMovie = useSelector(
    (state) => state.listMovieReducer.detailMovie
  );

  useEffect(() => {
    //stop video when close modal
    $("#movieTrailer").on("hidden.bs.modal", function (e) {
      $("#movieTrailer iframe").attr(
        "src",
        $("#movieTrailer iframe").attr("src")
      );
    });
  }, []);

  // const {  detailMovie } = props;

  return ReactDOM.createPortal(
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
              src={detailMovie?.trailer}
              // src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
              autoPlay
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
// $("#comingSoonTrailer").on('hidden.bs.modal', function (e) {
//           $("#comingSoonTrailer iframe").attr("src", $("#comingSoonTrailer iframe").attr("src"));
//       });
// const mapStateToProps = (state) => {
//   return {
//     detailMovie: state.listMovieReducer.detailMovie,
//   };
// };

// export default connect(mapStateToProps, null)(ModalPopup);
export default memo(ModalPopup);
