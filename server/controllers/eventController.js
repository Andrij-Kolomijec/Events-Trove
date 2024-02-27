const express = require("express");
const mongoose = require("mongoose");

const Event = require("../models/eventModel");

const router = express.Router();

const getAllEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to show not found." });
  }
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "Event to show not found." });
  }

  res.status(200).json(event);
};

const createEvent = async (req, res, next) => {
  const { title, date, image, description } = req.body;

  try {
    const event = await Event.create({ title, date, image, description });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to delete not found." });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "Event to delete not found." });
  }

  res.status(200).json(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event to update not found." });
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
