import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Calendar } from "react-rainbow-components";
import Button from "@mui/material/Button";

import { useContext } from "react";
import UserDetailsContext from "../../context/userDetailsContext";

const calendarContainerStyles = {
  width: "24rem",
  height: "27rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const DatePicker = (props) => {

  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const {
    userDetails: { bookings },
    setUserDetails,
  } = useContext(UserDetailsContext)
  return (
    <div>
      <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
        <Card
          style={calendarContainerStyles}
          className="rainbow-p-around_large"
        >
          <Calendar
            id="calendar-1"
            value={props.value}
            onChange={props.setValue}
            minDate={new Date()}
          />
          {
            bookings?.map((booking) => booking.id).includes(id) ? (
              <Button variant="outline" w={"100%"} color="red"><span>Cancel Booking</span></Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00a3dc !important",
                }}
                disabled={!props.value || props.isLoading}
                onClick={() => {
                  props.onClick();
                }}
              >
                Book Visit
              </Button>)}
        </Card>
      </div>
    </div >
  );
};

export default DatePicker;
