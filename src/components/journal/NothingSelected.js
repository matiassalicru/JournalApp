import React from "react";

export const NothingSelected = () => {
  return (
    <div className="nothing__main-content animate__animated animate__backInDown animate__faster">
      <p>
        Select something or
        <br />
        Create a new entry!
      </p>

      <i className="far fa-star fa-4x mt-5"></i>
    </div>
  );
};
