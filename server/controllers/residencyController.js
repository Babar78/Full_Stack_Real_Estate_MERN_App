import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    res.status(201).json({
      message: "Residency created successfully",
      residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Residency already exists");
    } else {
      throw new Error(error.message);
    }
  }
});

// Function to get all residencies

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});


// Function to get a specific residency by id

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try{

    const residency = await prisma.residency.findUnique({
      where: {
        id: id ,
      },
    });

    res.status(200).json({
      message: "Residency found",
      residency,
    });

  }
  catch(error){
    throw new Error(error.message);
  }
});
