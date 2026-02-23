import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);


mongoose
  .connect(
    `mongodb+srv://harikeshchander499_db_user:${process.env.MONGODB_PASSWORD}@moviesdb.i0u1zvg.mongodb.net/`,
  )
  .then(() =>
    app.listen(5000, () => {
      console.log(" CONNECTED TO DATABASE");
      console.log("Server running on http://localhost:5000");
    }),
  )
  .catch((error) => console.log("Database connection error:", error));