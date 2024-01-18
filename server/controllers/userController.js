import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating user...");

  let { email } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    res.status(400).send({
      message: "User already exists!",
    });
  } else {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.send({
      message: "User Created Successfully!",
      user: user,
    });
  }
});

// Book Visit Controller
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        bookedVisits: true,
      },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({
        message: "This residency is already booked by you!",
      });
    } else {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          bookedVisits: {
            push: {
              id,
              date,
            },
          },
        },
      });
      res.send("Visit booked successfully!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get All Bookings Controller
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const allBookings = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        bookedVisits: true,
      },
    });
    res.status(200).send(allBookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Function to cancel a booking

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    // Finding the user
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        bookedVisits: true,
      },
    });
    // Finding the index of the booking to cancel
    const indexOfBookingToCancel = user.bookedVisits.findIndex(
      (visit) => visit.id === id
    );

    // Removing the booking from the array
    if (indexOfBookingToCancel === -1) {
      res.status(400).json({
        message: "Booking Not Found!",
      });
    } else {
      user.bookedVisits.splice(indexOfBookingToCancel, 1);
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.status(200).send("Booking cancelled successfully!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});


// Function to add Residency to Favaourites List
