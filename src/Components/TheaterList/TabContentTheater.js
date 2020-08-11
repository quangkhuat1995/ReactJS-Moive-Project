import React, { Component } from "react";
import TabPanel from "./TabPanel";
import NavLink from "./NavLink";
import { callAPI } from "../../callAPI";
import { requests } from "../../requests";
import DetailTheaterItem from "./DetailTheaterItem";

export default class TabContentTheater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCumRap: [],
    };
  }

  layMaHeThongRap = () => {
    const { listHeThongRap } = this.props;
    return listHeThongRap.map((item) => item.maHeThongRap);
  };

  // Lấy maCumRap
  // QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=bhdstar
  componentDidUpdate(preProps, preState) {
    let listMaHeThongRap = this.layMaHeThongRap();

    if (this.props.listHeThongRap.length !== preProps.listHeThongRap.length) {
      let cumRap = [];

      listMaHeThongRap.forEach((ma) => {
        callAPI(
          `${requests().layThongTinCumRapTheoHeThong}?maHeThongRap=${ma}`,
          "GET"
        )
          .then((result) => {
            cumRap.push(result.data);
            // cumRap.sort((a, b) => {
            //   return a[0].maCumRap - b[0].maCumRap;
            // });
            // console.log(cumRap);
            this.setState({
              listCumRap: cumRap,
            });
          })

          .catch((err) => console.log(err));
      });
    }
  }

  //render thong tin tung cum rap
  renderNavLink = (itemHeThong, singleListCumRap) => {
    // console.log(singleListCumRap);
    if (singleListCumRap && singleListCumRap.length > 0) {
      return singleListCumRap.map((item, index) => {
        return (
          <NavLink
            key={item.maCumRap}
            href={item.maCumRap}
            className={`nav-item nav-link${index === 0 ? " active" : ""}`}
          >
            <DetailTheaterItem heThong={itemHeThong} cumRap={item} />
          </NavLink>
        );
      });
    }
  };

  renderTabPanel = () => {
    const { listHeThongRap } = this.props;
    const { listCumRap } = this.state;
    //sort lai listCumRap de tranh api bi tra ve cham, khong dung thu tu
    if (listCumRap && listCumRap.length > 0) {
      listCumRap.sort((a, b) => {
        return a[0].maCumRap.localeCompare(b[0].maCumRap);
      });
      // console.log(listCumRap);
    }

    return listHeThongRap.map((item, index) => {
      const settings = {
        className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
        id: item.maHeThongRap,
      };
      return (
        <TabPanel
          key={item.maHeThongRap}
          settings={settings}
          cumRap={listCumRap[index]}
        >
          <div className="nav nav-tabs">
            {this.renderNavLink(item, listCumRap[index])}
          </div>
        </TabPanel>
      );
    });
  };

  render() {
    return (
      <div className="tab-content theater__details">
        {this.renderTabPanel()}
      </div>
    );
  }
}
