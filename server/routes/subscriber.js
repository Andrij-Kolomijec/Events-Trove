const express = require("express");

const {
  subscribe,
  unsubscribe,
} = require("../controllers/subscriberController");

const router = express.Router();

router.post("/", subscribe);

router.delete("/:id", unsubscribe);

module.exports = router;
