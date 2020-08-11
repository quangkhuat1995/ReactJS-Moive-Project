import React, { Component } from "react";

import { connect } from "react-redux";

class ModalPopup extends Component {
  renderSrc = () => {
    //props movie duoc truyen vao o trang detail
    const { loading, detailMovie, movie } = this.props;
    if (loading) return;
    return detailMovie?.trailer || movie?.trailer;
  };

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
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
                src={this.renderSrc()}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                autoPlay
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailMovie: state.listMovieReducer.detailMovie,
    loading: state.listMovieReducer.loading,
    // state.detailMovieReducer.detailMovie
  };
};

export default connect(mapStateToProps, null)(ModalPopup);
