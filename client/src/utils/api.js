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

export const createUser = async (email, token) => {
  try {
    await api.post(`/user/register`, { email }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // toast.error("Something went wrong, Please try again.");
    // throw error.response.data.message;
    console.log("User Already Exists!");
  }
};

// Book Visit API

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(`/user/bookVisit/${propertyId}`, {
      email: email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Could not Book Visit, Please try again.");
    throw error;
  }
};

// Cancel Booking
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(`/user/cancelBooking/${id}`, {
      email: email,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  } catch (error) {
    toast.error("Could not Cancel Visit, Please try again.");
    throw error;
  }
};

// Add to Fav

export const addToFav = async (id, email, token) => {
  try {
    await api.post(`/user/toFav/${id}`, {
      email: email,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  } catch (error) {
    toast.error("Could not add to Fav, Please try again.");
    throw error;
  }
};


// Get all favs
export const getAllFav = async (email, token) => {
  if (!email || !token) return;
  else {
    try {
      const res = await api.post(
        `/user/favouriteResidencies`, { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data["favoriteResidenciesID"];
    } catch (error) {
      toast.error("Something went wrong while fetching favourites");
      throw error;
    }
  }

}

// Get all bookings

export const fetchAllBookings = async (email, token) => {
  if (!email || !token) return;
  else {
    try {
      const res = await api.post(
        `/user/getAllBookings`, { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data["bookedVisits"];
    } catch (error) {
      toast.error("Something went wrong while fetching bookings");
      throw error;
    }
  }
} 