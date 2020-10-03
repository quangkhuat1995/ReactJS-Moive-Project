import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const portal = document.getElementById("modal-root");
export default function Portal(props) {
  const { children } = props;
  const aDiv = document.createElement("div");
  useEffect(() => {
    portal.appendChild(aDiv);
    return () => {
      portal.removeChild(aDiv);
    };
  }, [aDiv]);

  return createPortal(children, aDiv);
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};
