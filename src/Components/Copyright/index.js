import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React, { memo } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Tix.vn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default memo(Copyright);
