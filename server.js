const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const color = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
//router import
const userRoute = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");

//use config
dotenv.config();

//mongodb connection
connectDB();

const app = express();

//middlewars
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRouter);

//static files
app.use(express.static(path.join(__dirname, "./client1/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client1/build/index.html"));
});

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port, () => {
  console.log(
    `server Running on ${process.env.DEV_MODE} mode port no port ${port}`.bgCyan
      .white
  );
});
