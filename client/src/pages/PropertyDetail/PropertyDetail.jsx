import React from "react";
import "./PropertyDetail";

import { PuffLoader } from "react-spinners";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getPropertyDetails } from "../../utils/api";

const PropertyDetail = () => {
  // Get the Id from URL
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  // Get Data From Backend
  const { data, isError, isLoading } = useQuery(["residency", id], () =>
    getPropertyDetails(id)
  );

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius="1"
          color="#4066ff"
          aria-label="loading..."
        />
      </div>
    );
  }
  return <div className="wrapper">PropertyDetail</div>;
};

export default PropertyDetail;
