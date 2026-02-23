const express = require("express");

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});