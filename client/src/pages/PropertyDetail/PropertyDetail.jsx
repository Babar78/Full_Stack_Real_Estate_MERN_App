import React from "react";
import "./PropertyDetail.css";

import { PuffLoader } from "react-spinners";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getPropertyDetails } from "../../utils/api";

import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import Map from "../../components/Map/Map";

const PropertyDetail = () => {
  // Get the Id from URL
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  // Get Data From Backend
  const { data, isError, isLoading } = useQuery(["residency", id], () =>
    getPropertyDetails(id)
  );

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the Property Details!</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader
            height="80"
            width="80"
            radius="1"
            color="#4066ff"
            aria-label="loading..."
          />
        </div>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like Button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>
        {/* Image */}
        <img src={data?.residency?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left container */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.residency?.title} </span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.residency?.price}
              </span>
            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span>{data?.residency?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span>{data?.residency?.facilities?.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1f3e72" />
                <span>{data?.residency?.facilities?.bedrooms} Rooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.residency?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "0.5rem" }}>
              <MdLocationPin size={25} color="#1f3e72" />
              <span className="secondaryText">
                {data?.residency?.address},&nbsp;
                {data?.residency?.city},&nbsp;
                {data?.residency?.country}
              </span>
            </div>

            {/* booking button */}
            <button className="button">Book Your Visit</button>
          </div>
          {/* Right container*/}
          <div className="right map">
            <Map
              address={data?.residency?.address}
              city={data?.residency?.city}
              country={data?.residency?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
