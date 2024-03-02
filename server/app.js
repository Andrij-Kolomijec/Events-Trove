const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/events");
const subscribeRoute = require("./routes/subscriber");

const app = express();
const port = process.env.PORT || 4000;

// middleware

// express.json() attaches data send in the body to the
// request object => allows access to req.body
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

// app.get("/", (req, res) => {
//   res.json({ message: "welcome" });
// });
app.use("/events", eventRoutes);
app.use("/newsletter", subscribeRoute);

// connect to MongoDB and listen for requests
const mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to MongoDB & listening on port ${port}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   app.listen(port, () => {
//     console.log(`Connected to MongoDB & listening on port ${port}.`);
//   });
// });
