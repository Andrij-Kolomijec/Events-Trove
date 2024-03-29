const express = require("express");

const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getEvent);

router.use(requireAuth);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id", updateEvent);

module.exports = router;
