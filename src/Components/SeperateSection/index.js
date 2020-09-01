import React, { memo } from "react";

function SeperateSection() {
  const styles = {
    background: "url('/images/section.png') center center/cover ",
    marginTop: "20px",
    paddingTop: "10%",
  };
  return <section style={styles}></section>;
}

export default memo(SeperateSection);
