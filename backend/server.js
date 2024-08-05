require("dotenv").config();
const express = require("express");
const appRout = require("./routes/sytemRoutes");
const workRouter = require("./routes/workoutsRout");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

// Middle ware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// routes

app.use("/", appRout);
app.use("/api/workouts", workRouter);

//dataabse mongodb online connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(
        `Server is running on port ${port} and Connected To the online Mongodb server`
      );
    });
  })
  .catch((error) => console.log(error));
// server
