import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DatePicker from "../DatePicker/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  return (
    <div>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <DatePicker setOpened={setOpened} />
        </div>
      </Modal>
    </div>
  );
};

export default BookingModal;
