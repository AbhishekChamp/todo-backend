require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string (replace with your actual MongoDB URI)
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

mongoose
    .connect(MONGO_URI, { dbName: DB_NAME })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
