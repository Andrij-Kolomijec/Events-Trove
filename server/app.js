const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/events");

const app = express();
const port = process.env.PORT || 4000;

// middleware

// attaches data send in the body to the request object
// => allows access to req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

// app.get("/", (req, res) => {
//   res.json({ message: "welcome" });
// });
app.use("/events", eventRoutes);

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
