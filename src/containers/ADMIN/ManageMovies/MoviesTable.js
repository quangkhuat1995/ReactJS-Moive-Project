import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { actFetchListMoive } from "../../HOME/HomePage/modules/action";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import {
  FormControlLabel,
  Icon,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ActionButtons from "../ActionButtons";

function MoviesTable(props) {
  const { fetchListMovie, listMovie } = props;
  useEffect(() => {
    fetchListMovie();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return <>haha</>;
}

MoviesTable.propTypes = {
  listMovie: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actFetchListMoive());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesTable);
