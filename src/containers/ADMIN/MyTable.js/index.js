import MaterialTable from "material-table";
import React, { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import useMedia from "./../../../Hook/useMedia";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import useTable from "./useTable";
import { MOBILE_MEDIA } from "../../../constants/config";
// import Alert from "@material-ui/";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function MyTable(props) {
  const { tableType, getAPI, addAPI, updateAPI, deleteAPI } = props;
  const isMobile = useMedia(MOBILE_MEDIA);

  const {
    data,
    isChanged,
    callAPI,
    handleRowUpdate,
    handleRowAdd,
    handleRowDelete,
  } = useTable(tableType);

  useEffect(() => {
    if (isChanged) {
      callAPI(getAPI, null);
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [isChanged, callAPI, getAPI]);

  return (
    <>
      <MaterialTable
        title={props.title}
        icons={tableIcons}
        localization={{
          body: {
            editRow: {
              deleteText:
                "Dữ liệu bị xóa sẽ không thể khôi phục. Bạn có chắc muốn xóa?",
            },
          },
        }}
        columns={props.columns}
        data={data}
        options={{
          headerStyle: {
            fontWeight: "900",
            backgroundColor: "#01579b",
            color: "#fff",
          },
          addRowPosition: "first",
          filtering: true,
          padding: isMobile ? "dense" : "default",
          // padding: "dense",
          maxBodyHeight: "70vh",
          draggable: false,
          rowStyle: (rowData, idx, num) => ({
            background: idx % 2 ? "#c7c6ca" : "initial",
          }),
          ...props.customTableOption,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resovle, reject) => {
              handleRowAdd(newData, resovle, reject, addAPI);
            }),
          /**
           * EDIT
           */

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve, reject, updateAPI);
            }),
          /**
           * DELETE
           */
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve, reject, deleteAPI);
            }),
        }}
      />
    </>
  );
}

MyTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
  customTableOption: PropTypes.object,

  getAPI: PropTypes.func.isRequired,
  addAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  deleteAPI: PropTypes.func,
};

MyTable.defaultProps = {
  title: "Account List",
  columns: [],
  tableType: "Account Table",

  getAPI: () => {},
  addAPI: () => {},
  updateAPI: () => {},
  deleteAPI: () => {},
};
export default MyTable;
