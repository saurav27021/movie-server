import express from "express";
import { getBookingById, newBooking, deleteBooking, getAllBookings } from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/", getAllBookings);
bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;