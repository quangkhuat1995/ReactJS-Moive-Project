import React, { Component } from "react";

export default class NavLink extends Component {
  render() {
    const { className, href } = this.props;
    return (
      <a data-toggle="tab" className={className} href={`#${href}`}>
        {this.props.children}
      </a>
    );
  }
}
