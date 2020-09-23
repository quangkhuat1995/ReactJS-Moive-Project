import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    textTransform: "none",
    height: "50px",
    "&:active": {
      color: theme.palette.primary.light,
    },
  },
}));

export default function PageTitle(props) {
  // const theme = useTheme();
  const classes = useStyles();
  // console.log(theme);

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h2" size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
        >
          {props.button}
        </Button>
      )}
    </div>
  );
}
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.string,
};
