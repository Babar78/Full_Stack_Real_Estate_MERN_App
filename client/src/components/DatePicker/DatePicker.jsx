import React from "react";
import { Card, Calendar } from "react-rainbow-components";
import Button from "@mui/material/Button";

const initialState = {
  date: new Date("2024-1-06 00:00:00"),
};

const calendarContainerStyles = {
  width: "24rem",
  height: "27rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const DatePicker = (props) => {
  const [state, setState] = React.useState(initialState);
  return (
    <div>
      <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
        <Card
          style={calendarContainerStyles}
          className="rainbow-p-around_large"
        >
          <Calendar
            id="calendar-1"
            value={state.date}
            onChange={(value) => setState({ date: value })}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00a3dc !important",
            }}
            onClick={() => {
              props.setOpened(false);
            }}
          >
            Book Visit
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DatePicker;
