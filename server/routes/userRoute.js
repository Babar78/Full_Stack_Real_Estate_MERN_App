import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavorites,
  residencyToFavourites,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";
// import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/getAllBookings", getAllBookings);
router.post("/cancelBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, residencyToFavourites);
router.post("/favouriteResidencies/", jwtCheck, getAllFavorites);

export { router as userRoute };
