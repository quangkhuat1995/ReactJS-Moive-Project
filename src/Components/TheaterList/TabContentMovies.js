import React, { Component } from "react";
import { callAPI } from "../../callAPI";
import { requests } from "../../requests";
import TabPanel from "./TabPanel";
import DetailMovieItem from "./DetailMovieItem";

export default class TabContentMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCumRapDetail: [],
    };
  }

  layMaHeThongRap = () => {
    const { listHeThongRap } = this.props;
    return listHeThongRap.map((item) => item.maHeThongRap);
  };
  // /QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09&maHeThongRap=bhdstar
  componentDidUpdate(preProps, preState) {
    let dsMaHeThongRap = this.layMaHeThongRap();

    if (this.props.listHeThongRap.length !== preProps.listHeThongRap.length) {
      let cumRap = [];
      dsMaHeThongRap.forEach((ma) => {
        callAPI(
          `${requests().LayThongTinLichChieuHeThongRap}&maHeThongRap=${ma}`,
          "GET"
        )
          .then((result) => {
            // console.log(result.data[0].lstCumRap);

            // cumRap.push(result.data[0].lstCumRap);
            cumRap = [...cumRap, ...result.data[0].lstCumRap];
            // console.log(cumRap);

            this.setState({
              listCumRapDetail: cumRap,
            });
          })

          .catch((err) => console.log(err));
      });
    }
  }
  renderMovieDetail = (dsPhim, maCumRap) => {
    if (dsPhim && dsPhim.length > 0) {
      return dsPhim.map((phim, index) => {
        return <DetailMovieItem key={phim.maPhim} movie={phim} ma={maCumRap} />;
      });
    }
  };
  renderTabPanel = () => {
    const { listCumRapDetail } = this.state;
    if (listCumRapDetail && listCumRapDetail.length > 0) {
      return listCumRapDetail.map((item, index) => {
        const settings = {
          className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
          id: item.maCumRap,
        };
        return (
          <TabPanel key={item.maCumRap} settings={settings} detail={item}>
            {this.renderMovieDetail(item.danhSachPhim, item.maCumRap)}
          </TabPanel>
        );
      });
    }
  };

  render() {
    return (
      <div className="tab-content theater__movies">{this.renderTabPanel()}</div>
    );
  }
}
