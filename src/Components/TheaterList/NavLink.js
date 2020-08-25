import React from "react";

export default function NavLink(props) {
  const { className, href } = props;
  return (
    <a data-toggle="tab" className={className} href={`#${href}`}>
      {props.children}
    </a>
  );
}
