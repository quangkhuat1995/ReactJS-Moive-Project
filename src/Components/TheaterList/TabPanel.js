import React, { Component } from "react";

export default class TabPanel extends Component {
  render() {
    return <div {...this.props.settings}>{this.props.children}</div>;
  }
}
