import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/getAllResidencies", {
      timeout: 10 * 1000,
    });
    if (response.status === 4000 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getPropertyDetails = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 4000 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email) => {
  try {
    await api.post(`/user/register`, { email });
  } catch (error) {
    // toast.error("Something went wrong, Please try again.");
    // throw error.response.data.message;
    console.log("User Already Exists!");
  }
};

// Book Visit API

export const bookVisit = async (date, propertyId, email) => {
  try {
    await api.post(`/user/bookVisit/${propertyId}`, {
      email: email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
  } catch (error) {
    toast.error("Could not Book Visit, Please try again.");
    throw error;
  }
};

// Cancel Booking
export const removeBooking = async (id, email) => {
  try {
    await api.post(`/user/cancelBooking/${id}`, {
      email: email,
    });
  } catch (error) {
    toast.error("Could not Cancel Visit, Please try again.");
    throw error;
  }
};

// Add to Fav

export const addToFav = async (id, email) => {
  try {
    await api.post(`/user/toFav/${id}`, {
      email: email,
    });
  } catch (error) {
    toast.error("Could not add to Fav, Please try again.");
    throw error;
  }
};
