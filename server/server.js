const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.SERVER_PORT || 3001;
const mongoose = require("mongoose");
const auth = require("./routes/auth.js");
const api = require("./routes/api.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}).then(() => console.log(`[SERVER] Successfully Connected to MongoDB.`))
.catch((err) => console.log(err));

app.use(cors({
  credentials: true,
  origin: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/auth", auth);
app.use("/api", api);

app.listen(port, (err) => {
  if (err) throw err
  console.log(`[SERVER] Server has started on port ${process.env.SERVER_PORT || 3001}.`)
})