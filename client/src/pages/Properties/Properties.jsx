import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Properties = () => {
  // useState for searchbar
  const [filter, setFilter] = useState("");

  const { data, isError, isLoading } = useProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching the data!</span>
      </div>
    );
  }

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

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} placeholder="Search by title/city/country..." />
        <div className="paddings flexCenter properties">
          {/* {data.map((card, index) => (
            <PropertyCard card={card} key={index} />
          ))} */}

          {
            data.filter((property) =>
              property.title.toLowerCase().includes(filter.toLowerCase()) ||
              property.city.toLowerCase().includes(filter.toLowerCase()) ||
              property.country.toLowerCase().includes(filter.toLowerCase())
            ).map(
              (card, index) => (
                <PropertyCard card={card} key={index} />
              )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Properties;
