import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavorites,
  residencyToFavourites,
} from "../controllers/userController.js";
// import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/getAllBookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/toFav/:rid", residencyToFavourites);
router.get("/favouriteResidencies", getAllFavorites);

export { router as userRoute };
