import React from "react";
import TabPanel from "./TabPanel";
import NavLink from "./NavLink";
import DetailTheaterItem from "./DetailTheaterItem";
import { connect } from "react-redux";

function TabContentTheater(props) {
  // useEffect(() => {
  //   // QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=bhdstar

  //   callAPI(requests().LayThongTinLichChieuHeThongRap, "GET")
  //     .then((result) => {
  //       setListHeThong(result.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  //render thong tin tung cum rap
  const renderNavLink = (singleHeThongRap) => {
    // console.log(singleHeThongRap.lstCumRap);
    const listCumRap = singleHeThongRap.lstCumRap;
    // console.log(listCumRap);

    if (listCumRap && listCumRap.length > 0) {
      return listCumRap.map((item, index) => {
        return (
          <NavLink
            key={item.maCumRap}
            href={item.maCumRap}
            className={`nav-item nav-link${index === 0 ? " active" : ""}`}
          >
            <DetailTheaterItem cumRap={item} heThong={singleHeThongRap} />
          </NavLink>
        );
      });
    }
  };

  const renderTabPanel = () => {
    // const { listHeThongRap } = props;
    //sort lai listCumRap de tranh api bi tra ve cham, khong dung thu tu, sort tho chu cai dau tien
    // if (listCumRap && listCumRap.length > 0) {
    //   listCumRap.sort((a, b) => {
    //     return a[0].maCumRap.localeCompare(b[0].maCumRap);
    //   });
    //   // console.log(listCumRap);
    // }
    const { listHeThongLichChieu } = props;
    return listHeThongLichChieu.map((item, index) => {
      const settings = {
        className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
        id: item.maHeThongRap,
      };
      return (
        <TabPanel key={item.maHeThongRap} settings={settings}>
          <div className="nav nav-tabs">{renderNavLink(item)}</div>
        </TabPanel>
      );
    });
  };

  return <div className="tab-content theater__details">{renderTabPanel()}</div>;
}

const mapStateToProps = (state) => {
  return {
    listHeThongLichChieu: state.listHeThongRapReducer.listHeThongLichChieu,
  };
};
export default connect(mapStateToProps, null)(TabContentTheater);
