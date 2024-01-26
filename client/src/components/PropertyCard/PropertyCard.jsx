import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const PropertyCard = (props) => {
  // intiallization
  const navigate = new useNavigate();

  // navigate to Details Page

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${props.card.id}`)}
    >
      <Heart id={props.card?.id}/>
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
