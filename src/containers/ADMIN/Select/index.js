import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function MySelect(props) {
  //list có thể là list tên phim, tên hệ thống rạp, tên cụm rạp (1,2,...,10)
  const { list, labelID, name } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    maPhim: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={labelID}>Chọn phim</InputLabel>
      <Select
        native
        value={state.maPhim}
        onChange={handleChange}
        inputProps={{
          name: `${name}`,
          id: `${labelID}`,
        }}
      >
        <option aria-label="None" value="" />
        {list.map((item) => (
          <option key={item.maPhim} value={item.maPhim}>
            {item.tenPhim}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

MySelect.propTypes = {};

export default MySelect;
