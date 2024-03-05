import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DatePicker from "../DatePicker/DatePicker";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import UserDetailsContext from "../../context/userDetailsContext";
import dayjs from "dayjs";

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
  const [value, setValue] = React.useState(null);

  const { userDetails: {token}, setUserDetails } = React.useContext(UserDetailsContext);

  const handleBookingSuccess = () => {
    toast.success("Visit booked successfully!", { position: "bottom-right" });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ]
    }))
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => {
      handleBookingSuccess();
    },
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => {
      setOpened(false);
    },
  });

  return (
    <div>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <DatePicker
            setOpened={setOpened}
            value={value}
            setValue={setValue}
            isLoading={isLoading}
            onClick={() => mutate()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BookingModal;
