const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

// Init middleware
app.use(express.json({ extended: false }));

// Server routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
