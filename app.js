import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware (optional)
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello World 🚀");
});

// Another Route
app.get("/about", (req, res) => {
  res.send("This is the About Page");
});

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.m5hhm5r.mongodb.net/?appName=Cluster0/`,
  ).then(() =>
    app.listen(5000, () => {
      console.log(" CONNECTED TO DATABASE");
      console.log("Server running on http://localhost:5000");
    }),
  )
  .catch((error) => console.log("Database connection error:", error));


