import React from "react";
import { ClipLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",

};

const Spinner = ({ color = "green", loading }) => {
  return (
    <div className="spinner-container">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default Spinner;
