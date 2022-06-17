import React from "react";

const NotFound = (props) => {
  return (
    <div className="container">
      <div className="col">
        <h3 className="text-dark text-left mb-4">Page not found</h3>
        <img
          src={`${process.env.PUBLIC_URL}/not_found.png`}
          alt="page not found"
        />
      </div>
    </div>
  );
};

export default NotFound;
