import express from "express";
import { 
  getMovieById, 
  getAllMovies, 
  addMovie,
  createMovieForBooking 
} from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie); 
movieRouter.post("/auto-create", createMovieForBooking); 

export default movieRouter;