const express = require("express");
const mongoose = require("mongoose");

const Event = require("../models/eventModel");
const Subscriber = require("../models/subscriberModel");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../utils/validators");
const sendEmail = require("../utils/mailer");

const router = express.Router();

// GET all events
const getAllEvents = async (req, res) => {
  const events = await Event.find({}).sort({ date: -1 });
  setTimeout(() => res.status(200).json({ events }), 0);
};

// GET a single event
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to show not found." });
  }
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "Event to show not found." });
  }
  setTimeout(() => res.status(200).json({ event }), 0);
};

// validate and POST an event
const createEvent = async (req, res, next) => {
  const { title, date, image, description } = req.body;

  let errors = {};

  if (!isValidText(title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    const event = await Event.create({ title, date, image, description });
    res.status(200).json({ message: "Event saved.", event });
    // send emails to every subscriber after a new event is added
    const subscribers = await Subscriber.find({});
    sendEmail(subscribers, { title, date, description, id: event._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to delete not found." });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "Event to delete not found." });
  }

  res.status(200).json({ message: "Event deleted." });
};

// PATCH an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, date, image, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to update not found." });
  }

  let errors = {};

  if (!isValidText(title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!event) {
    return res.status(404).json({ error: "Event to update not found." });
  }

  res.status(200).json(event);
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
