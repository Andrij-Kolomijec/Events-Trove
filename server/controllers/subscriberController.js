const Subscriber = require("../models/subscriberModel");
const mongoose = require("mongoose");
const sendEmail = require("../utils/mailer");

async function subscribe(req, res) {
  const { email } = req.body;

  try {
    const subscriber = await Subscriber.subscribe(email);
    res.status(200).json({ message: "Subscribed.", subscriber });
    // send email upon subscription
    sendEmail([subscriber]);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
}

const unsubscribe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Subscriber not found." });
  }

  const subscriber = await Subscriber.findOneAndDelete({ _id: id });

  if (!subscriber) {
    return res.status(404).json({ error: "Subscriber not found." });
  }

  res.status(200).json({ message: "Unsubscribed successfully." });
};

module.exports = { subscribe, unsubscribe };
