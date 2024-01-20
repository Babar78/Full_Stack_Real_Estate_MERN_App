import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    // add g-wrapper class to make background dark
    <div id="get-started" className="wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Homyz</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon
          </span>
          {/* href removed from button as no path was provided and it was causing error */}
          {/* <button className="button" href> */}
          <button className="button">
            <a href="mailto:zainkeepscode@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
