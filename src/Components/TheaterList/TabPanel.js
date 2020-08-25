import React from "react";

export default function TabPanel(props) {
  return <div {...props.settings}>{props.children}</div>;
}
