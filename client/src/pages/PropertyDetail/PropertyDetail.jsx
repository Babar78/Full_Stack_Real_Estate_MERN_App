import React, { useState } from "react";
import "./PropertyDetail.css";

import { PuffLoader } from "react-spinners";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getPropertyDetails } from "../../utils/api";

import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import BookingModal from "../../components/BookingModal/BookingModal";
import { useAuth0 } from "@auth0/auth0-react";

const PropertyDetail = () => {
  // Get the Id from URL
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  // Get Data From Backend
  const { data, isError, isLoading } = useQuery(["residency", id], () =>
    getPropertyDetails(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const {user} = useAuth0();

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
            <button
              className="button"
              onClick={() => {
                validateLogin() && setModalOpened(true);
              }}
            >
              Book Your Visit
            </button>
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
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
