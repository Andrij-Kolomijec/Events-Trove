const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ mssg: "welcome" });
});

app.listen(port, () => {
  console.log(`Connected to MongoDB & listening on port ${port}.`);
});
