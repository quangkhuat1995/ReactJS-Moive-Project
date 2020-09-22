import React from "react";
import PropTypes from "prop-types";

function ActionButtons(props) {
  // const { handleDelete, handleEdit } = props;
  console.log(props);
  const handleEdit = (e) => {
    e.persist();
    // onClick(target);
    console.log(e.target);
  };
  const handleDelete = (e) => {
    e.persist();
    // onClick(target);
    console.log(e);
  };
  return (
    <>
      <button onClick={(e) => handleEdit(e)}>edit</button>
      <button onClick={(e) => handleDelete(e)}>delete</button>
    </>
  );
}

ActionButtons.propTypes = {};

export default ActionButtons;
