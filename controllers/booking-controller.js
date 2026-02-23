import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Bookings from "../models/Booking.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;

  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return res.status(500).json({ message: "Error finding movie or user" });
  }

  if (!existingMovie) {
    return res.status(404).json({ message: "Movie not found by given ID" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found with given id" });
  }

  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);

    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });

    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching booking" });
  }

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Bookings.findByIdAndDelete(id).populate("user movie");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });

    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to Delete" });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};

export const getAllBookings = async (req, res, next) => {
  let bookings;

  try {
    bookings = await Bookings.find()
      .populate("user", "name email") // ✅ Get user name and email
      .populate("movie", "title posterUrl releaseDate actors description"); // ✅ Get movie details
  } catch (err) {
    return res.status(500).json({ message: "Error fetching bookings" });
  }

  if (!bookings) {
    return res.status(500).json({ message: "Unable to find Bookings" });
  }

  return res.status(200).json({ bookings });
};
