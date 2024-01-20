import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";

const PropertyCard = (props) => {
  return (
    <div className="flexColStart r-card">
      <AiFillHeart size={24} color="white" />
      <img src={props.card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{props.card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(props.card.title, { length: 15 })}
      </span>
      <span className="secondaryText">
        {truncate(props.card.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
